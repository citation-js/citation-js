/* eslint-env mocha */

const assert = require('assert')
const { Cite, plugins } = require('../../../test/api.js')(require('@citation-js/core'))
require('../src/index.js')

const id = require('./id.js')
const data = require('./data.js')

describe('input', function () {
  for (const type in id) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (const name in id[type]) {
        const [input, expected] = id[type][name]

        describe(name, function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses id', function () {
            const output = plugins.input.chainLink(input)
            assert.deepStrictEqual(output, expected)
          })
        })
      }
    })
  }

  describe('@doi/api', function () {
    it('is registered', function () {
      assert(plugins.input.has('@doi/api'))
    })

    for (const name in data) {
      const [input, expected] = data[name]

      describe(name, function () {
        it('parses type', function () {
          assert.strictEqual(plugins.input.type(input), '@doi/api')
        })
        it('parses data', function () {
          const output = Cite(input).format('data', { format: 'object' })
          for (const item of output) {
            delete item.id
          }
          assert.deepStrictEqual(output, expected)
        })
        it('parses data async', async function () {
          const output = await Cite.async(input).then(cite => cite.format('data', { format: 'object' }))
          for (const item of output) {
            delete item.id
          }
          assert.deepStrictEqual(output, expected)
        })
      })
    }
  })

  describe('errors', function () {
    it('for non-existent DOI', function () {
      assert.throws(
        () => plugins.input.chain('10.1016/does-not-exist', { generateGraph: false }),
        {
          message: 'Server responded with status code 404'
        }
      )
    })
  })
})
