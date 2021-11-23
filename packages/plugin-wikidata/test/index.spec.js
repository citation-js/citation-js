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
          it('parses data', async function () {
            const method = link ? plugins.input.chainLink : plugins.input.chain
            assert.deepStrictEqual(
              method(input, Object.assign({ generateGraph: false }, opts || {})),
              expected
            )
          })
          it('parses data async', async function () {
            const method = link ? plugins.input.chainLinkAsync : plugins.input.chainAsync
            assert.deepStrictEqual(
              await method(input, Object.assign({ generateGraph: false }, opts || {})),
              expected
            )
          })
        })
      }
    })
  }
})

describe('configuration', function () {
  describe('langs', function () {
    const qid = 'Q1'
    const config = plugins.config.get('@wikidata')

    it('changes default', function () {
      config.langs.unshift('ja')
      assert.strictEqual(
        plugins.input.chain(qid)[0].title,
        '宇宙'
      )
      config.langs.shift()
    })
    it('falls back', function () {
      config.langs.unshift('foo')
      assert.strictEqual(
        plugins.input.chain(qid)[0].title,
        'Universe'
      )
      config.langs.shift()
    })
    it('deals with no available labels', function () {
      const langs = config.langs
      config.langs = []
      plugins.input.chain(qid)
      config.langs = langs
    })
  })
})
