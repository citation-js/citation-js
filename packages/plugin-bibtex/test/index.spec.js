/* eslint-env mocha */

const assert = require('assert')
require('../src/')
const { plugins } = require('@citation-js/core')
const inputData = require('./input')
const outputData = require('./output')

describe('input', function () {
  for (let type in inputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })
      for (let name of Object.keys(inputData[type])) {
        let [input, expected] = inputData[type][name]
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
  for (let type in outputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (let name of Object.keys(outputData[type])) {
        let [input, expected, ...opts] = outputData[type][name]
        let actual = plugins.output.format(type, input, ...opts)
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
