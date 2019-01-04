/* eslint-env mocha */

const assert = require('assert')
require('../src/')
const {plugins} = require('@citation-js/core')
const data = require('./data')

describe('input', function () {
  for (let type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (let i of Object.keys(data[type])) {
        let [input, expected] = data[type][i]
        describe((i + 1).padStart(3, '0'), function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses data', function () {
            assert.deepStrictEqual(
              plugins.input.chain(input, {generateGraph: false}),
              expected
            )
          })
        })
      }
    })
  }
})
