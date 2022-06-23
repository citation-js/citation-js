/* eslint-env mocha */

const assert = require('assert')
require('../src/index.js')
const { plugins } = require('@citation-js/core')
const data = require('./data.js')

const CSL = plugins.config.get('@csl')
CSL.templates.add('custom', `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" page-range-format="minimal">
  <bibliography>
    <layout>
      <text variable="title"/>
    </layout>
  </bibliography>
</style>`)
CSL.locales.add('custom', `<?xml version="1.0" encoding="utf-8"?>
<locale xmlns="http://purl.org/net/xbiblio/csl" version="1.0" xml:lang="custom">
  <style-options punctuation-in-quote="true"/>
  <date form="text">
    <date-part name="month" suffix=" "/>
    <date-part name="day" suffix=", "/>
    <date-part name="year"/>
  </date>
  <date form="numeric">
    <date-part name="month" form="numeric-leading-zeros" suffix="/"/>
    <date-part name="day" form="numeric-leading-zeros" suffix="/"/>
    <date-part name="year"/>
  </date>
  <terms>
    <term name="no date" form="short">custom</term>
  </terms>
</locale>`)
CSL.locales.add('zh_CN', `<?xml version="1.0" encoding="utf-8"?>
<locale xmlns="http://purl.org/net/xbiblio/csl" version="1.0" xml:lang="zh-CN">
  <style-options punctuation-in-quote="true"/>
  <date form="text">
    <date-part name="month" suffix=" "/>
    <date-part name="day" suffix=", "/>
    <date-part name="year"/>
  </date>
  <date form="numeric">
    <date-part name="month" form="numeric-leading-zeros" suffix="/"/>
    <date-part name="day" form="numeric-leading-zeros" suffix="/"/>
    <date-part name="year"/>
  </date>
  <terms>
    <term name="no date" form="short">custom</term>
    <term name="et-al" form="short">custom</term>
  </terms>
</locale>`)
CSL.templates.add('harvard1:fr-FR', CSL.templates.get('harvard1').replace(/en-GB/g, 'fr-FR'))

describe('output', function () {
  for (const type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (const name of Object.keys(data[type])) {
        const [input, expected, ...opts] = data[type][name]
        it(`with ${name} works`, function () {
          const actual = plugins.output.format(type, input, ...opts)
          assert.deepStrictEqual(
            typeof actual === 'string' ? actual.trim() : actual,
            expected
          )
        })
      }
    })
  }

  describe('engine caching', function () {
    it('clears item cache', function () {
      const a = plugins.output.format('bibliography', [
        { id: '4', title: 'foo' }
      ])
      const b = plugins.output.format('bibliography', [
        { id: '4', title: 'bar' }
      ])

      assert.notStrictEqual(a, b)
    })

    it('clears disambiguation cache', function () {
      // Force new engine (sorry)
      const template = 'apa-disambig-cache'
      CSL.templates.add(template, CSL.templates.get('apa'))

      plugins.output.format('bibliography', [
        { id: '4', title: 'foo', author: [{ family: 'a' }] }
      ], { template })
      plugins.output.format('bibliography', [
        { id: '5', title: 'bar', author: [{ family: 'a' }] }
      ], { template })
    })
  })

  describe('errors', function () {
    it('for non-existing entry ids', function () {
      assert.throws(
        () => plugins.output.format(
          'citation',
          [{ id: 'notthis', title: 'foo' }],
          { entry: 'this' }
        ),
        { message: 'Cannot find entry with id \'this\'' }
      )
    })
    it('for non-existing formats', function () {
      assert.throws(
        () => plugins.output.format(
          'bibliography',
          [{ id: 'foo' }],
          { format: 'foo' }
        ),
        { message: 'Cannot find format \'foo\'' }
      )
    })
  })
})
