/* eslint-env mocha */

const assert = require('assert')
require('../src/index.js')
const { plugins } = require('@citation-js/core')
const inputData = require('./input.js')
const outputData = require('./data.js')

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

describe('output', function () {
  for (const type in outputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (const name of Object.keys(outputData[type])) {
        const [input, expected, ...opts] = outputData[type][name]
        const actual = plugins.output.format(type, input, ...opts)
        it(`with ${name} works`, function () {
          assert.deepStrictEqual(
            typeof actual === 'string' ? actual.trim() : actual,
            expected
          )
        })
      }
    })
  }
})
