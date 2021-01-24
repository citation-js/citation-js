/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const assert = require('assert')
require('../src/')
const { plugins } = require('@citation-js/core')
const inputData = require('./input')
const outputData = require('./output')

describe('input', function () {
  for (const type in inputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })
      for (const name of Object.keys(inputData[type])) {
        const [input, expected] = inputData[type][name]
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
  describe('biblatex', function () {
    describe('output', function () {
      const file = fs.readFileSync(path.join(__dirname, 'mapping/biblatex-output.bib'), 'utf8')
      const expected = plugins.input.chainLink(file)
      const input = require('./mapping/biblatex-csl.json')
      for (let i = 0; i < input.length; i++) {
        it(input[i].id, function () {
          const actual = plugins.output.format('biblatex', [input[i]], { format: 'object' })
          assert.deepStrictEqual(actual, [expected[i]])
        })
      }
    })
  })
})
