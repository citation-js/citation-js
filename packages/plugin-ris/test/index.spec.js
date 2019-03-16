/* eslint-env mocha */

const assert = require('assert')
require('../src/')
const { plugins } = require('@citation-js/core')
const data = require('./data')

describe('output', function () {
  for (let type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (let name of Object.keys(data[type])) {
        let [input, expected, ...opts] = data[type][name]
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
