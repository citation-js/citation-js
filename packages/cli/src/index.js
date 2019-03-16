#!/usr/bin/env node

const fs = require('fs')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

const { Cite, logger } = require('@citation-js/core')
require('@citation-js/plugin-bibjson')
require('@citation-js/plugin-bibtex')
require('@citation-js/plugin-csl')
require('@citation-js/plugin-doi')
require('@citation-js/plugin-ris')
require('@citation-js/plugin-wikidata')

const program = require('commander')
program
  .version(require('../package.json').version)
  .usage('[options]')

  .option('-i, --input <path>', 'Input file. If all input options are omitted, it uses stdin')
  .option('-t, --text <string>', 'Input text. If all input options are omitted, it uses stdin')
  .option('-u, --url <string>', 'Deprecated in favor of -t, --text. If all input options are omitted, it uses stdin')

  .option('-o, --output <path>', 'Output file (omit file extension). If this option is omitted, the output is written to stdout')

  .option('--pipe', 'Pipe and transform from stdin to stdout')

  .option('-R, --output-non-real', 'Output as a text file', false)
  .option('-f, --output-type <option>', 'Output structure type: string, html, json', 'json')
  .option('-s, --output-style <option>', 'Output scheme. A combination of --output-format json and --output-style citation-* is considered invalid. ' + 'Options: csl (Citation Style Lanugage JSON), bibtex, citation-* (where * is any formatting style)', 'csl')
  .option('-l, --output-language <option>', 'Output language. [RFC 5646](https://tools.ietf.org/html/rfc5646) codes', 'en-US')

  .option('--log-level <level>', 'Log level: silent, error, warn, info, debug, http', 'warn')

  .parse(process.argv)

main(program).catch(console.error)

module.exports = main
async function main (options) {
  process.stdin.setEncoding('utf8')

  logger.level = options.logLevel

  if (options.pipe) {
    await pipe(process.stdin, process.stdout, options)
  } else {
    const input = await getInput(options)
    await writeOutput(await processInput(input, options), options)
  }
}

module.exports.pipe = pipe
function pipe (stdin, stdout, options) {
  return new Promise((resolve, reject) => {
    const useless = ['input', 'text', 'url', 'output'].filter(option => options[option])
    if (useless.length) {
      reject(new Error(`Cannot use options "${
        useless.map(option => `--${option}`).join(', ')
      }" together with --pipe`))
    }

    stdin.on('readable', async () => {
      const input = stdin.read()
      if (input) {
        const output = await processInput(input, options)
        stdout.write(output + '\n')
      }
    })
    stdin.on('end', () => { resolve() })
    stdin.on('error', (err) => { reject(err) })
  })
}

async function getInput (options) {
  if (options.input) {
    return readFile(options.input, 'utf8')
  } else if (options.text || options.url) {
    return options.text || options.url
  } else {
    return new Promise(function (resolve, reject) {
      let input = ''
      process.stdin.on('readable', () => { input += process.stdin.read() || '' })
      process.stdin.on('end', () => { resolve(input) })
      process.stdin.on('error', (err) => { reject(err) })
    })
  }
}

async function processInput (input, options) {
  const data = await Cite.async(input)
  let output = data.get({
    format: 'string',
    type: options.outputType,
    style: options.outputStyle,
    lang: options.outputLanguage
  })

  if (!options.outputNonReal && options.outputType === 'html') {
    output = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>' + output + '</body></html>'
  }

  return output
}

function writeOutput (output, options) {
  if (!options.output) {
    process.stdout.write(output + '\n')
  } else {
    const extension = getExtension(options)
    writeFile(options.output + '.' + extension, output)
  }
}

function getExtension (options) {
  const lookup = {
    string: 'txt',
    html: 'html',
    json: 'json'
  }

  if (options.outputStyle === 'bibtex' && options.outputType === 'string') {
    return 'bib'
  } else if (options.outputNonReal) {
    return 'txt'
  } else {
    return lookup[options.outputType]
  }
}
