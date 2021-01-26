/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const assert = require('assert')
require('../src/')
const { plugins } = require('@citation-js/core')
const inputData = require('./input')
const outputData = require('./output')

function getInput (name, type) {
  const ext = type === '@bibtxt/text' ? '.txt' : '.bib'
  const file = path.join(__dirname, 'input', name + ext)
  return fs.readFileSync(file, 'utf8')
}

describe('input', function () {
  for (const type in inputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })
      for (const name of Object.keys(inputData[type])) {
        let [input, expected] = inputData[type][name]
        if (input === null) { input = getInput(name.slice(5), type) }
        describe(name, function () {
          it('parses type', function () {
            assert.strictEqual(
              plugins.input.type(input),
              type
            )
          })
          it('parses data', function () {
            assert.deepStrictEqual(
              plugins.input.chain(input, {
                generateGraph: false
              }),
              expected
            )
          })
        })
      }
    })
  }
})

function getExpectedOutput (name, type) {
  const ext = type === 'bibtxt' ? '.txt' : '.bib'
  const file = path.join(__dirname, 'output', name + ext)
  return fs.readFileSync(file, 'utf8')
}

function processOutput (output) {
  return typeof output === 'string' ? output.trim() : output
}

describe('output', function () {
  it('errors for invalid format dicts', function () {
    assert.throws(
      () => plugins.output.format('biblatex', [], { format: 'latex' }),
      {
        name: 'RangeError',
        message: 'Output dictionary "latex" not available'
      }
    )
  })

  for (const type in outputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (const name in outputData[type]) {
        let [input, expected, ...opts] = outputData[type][name]
        if (!expected) { expected = getExpectedOutput(name, type) }

        it(`with ${name} works`, function () {
          const actual = plugins.output.format(type, input, ...opts)
          assert.deepStrictEqual(processOutput(actual), processOutput(expected))
        })
      }
    })
  }
})

describe('mapping', function () {
  for (const type of ['biblatex', 'bibtex']) {
    describe(type, function () {
      const csl = require(`./mapping/${type}-csl.json`)

      describe('input', function () {
        const file = fs.readFileSync(path.join(__dirname, `mapping/${type}-input.bib`), 'utf8')
        const input = plugins.input.chainLink(file)
        for (let i = 0; i < input.length; i++) {
          it(input[i].label, function () {
            const actual = plugins.input.chain(input[i], {
              generateGraph: false,
              forceType: `@${type}/entry+object`
            })
            assert.deepStrictEqual(actual, [csl[i]])
          })
        }
      })

      describe('output', function () {
        const file = fs.readFileSync(path.join(__dirname, `mapping/${type}-output.bib`), 'utf8')
        const expected = plugins.input.chainLink(file)
        for (let i = 0; i < csl.length; i++) {
          it(csl[i].id, function () {
            const actual = plugins.output.format(type, [csl[i]], { format: 'object' })
            assert.deepStrictEqual(actual, [expected[i]])
          })
        }
      })
    })
  }
})
