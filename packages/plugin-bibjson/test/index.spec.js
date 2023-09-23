/* eslint-env mocha */

const assert = require('assert')
require('../src/index.js')
const { plugins } = require('@citation-js/core')
const data = require('./data.json')

describe('input', function () {
  for (const type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (const i of Object.keys(data[type])) {
        const [input, expected] = data[type][i]
        describe((+i + 1).toString().padStart(3, '0'), function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses data', function () {
            assert.deepStrictEqual(
              plugins.input.chain(input, { generateGraph: false }),
              expected
            )
          })
        })
      }
    })
  }
})
