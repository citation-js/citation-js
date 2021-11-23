/* eslint-env mocha */

const assert = require('assert')
const { plugins } = require('../../../test/api.js')(require('@citation-js/core'))
require('../src/index.js')

const data = require('./data.js')

describe('input', function () {
  for (const type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (const name of Object.keys(data[type])) {
        const [input, expected, { link, opts } = {}] = data[type][name]
        describe(name, function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses data', function () {
            const method = link ? plugins.input.chainLink : plugins.input.chain
            assert.deepStrictEqual(
              method(input, Object.assign({ generateGraph: false }, opts || {})),
              expected
            )
          })
        })
      }
    })
  }
})
