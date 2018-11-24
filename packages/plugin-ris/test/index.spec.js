/* eslint-env mocha */

const assert = require('assert')
require('../lib/')
const {plugins} = require('@citation-js/core')
const data = require('./data')

describe('output', function () {
  for (let type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (let [name, [input, expected, ...opts]] of Object.entries(data[type])) {
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
