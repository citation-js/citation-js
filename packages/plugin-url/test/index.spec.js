/* eslint-env mocha */

const assert = require('assert')
require('../src/index.js')
const { plugins } = require('@citation-js/core')

const type = '@else/url'
const input = 'https://example.org/'

describe('input', function () {
  describe(type, function () {
    it('is registered', function () {
      assert(plugins.input.has(type))
    })

    it('keeps type parser', function () {
      assert.strictEqual(plugins.input.type(input), type)
    })
    it('attempts to load data', function () {
      const output = plugins.input.chainLink(input)
      assert(output.toLowerCase().startsWith('<!doctype html>'))
    })
    it('attempts to load data (async)', async function () {
      const output = await plugins.input.chainLinkAsync(input)
      assert(output.toLowerCase().startsWith('<!doctype html>'))
    })
  })
})
