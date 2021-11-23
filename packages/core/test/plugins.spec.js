/* eslint-env mocha */

const { plugins } = require('../src/index.js')
const expect = require('expect.js')

const ref = '@test'
const type = `${ref}/foo`
const subType = `${ref}/bar`
const data = [{ foo: 1 }]
const parse = () => data
const parseAsync = async () => data
const format = data => data
const dict = {
  foo: ['«<({[', ']})>»']
}

describe('plugins', function () {
  afterEach(function () { plugins.remove(ref) })

  it('registers', function () {
    plugins.add(ref)
    expect(plugins.has(ref)).to.be.ok()
  })
  it('works', function () {
    plugins.add(ref, {
      input: { [type]: { parseType: { predicate: /foo/ } } },
      output: { [type] () {} },
      dict: { [type]: {} },
      config: {}
    })
    expect(plugins.input.has(type)).to.ok()
    expect(plugins.input.type('foo')).to.be(type)
    expect(plugins.output.has(type)).to.ok()
    expect(plugins.dict.has(type)).to.ok()
    expect(plugins.config.has(ref)).to.ok()
  })
  it('removes', function () {
    plugins.add(ref, {
      input: { [type]: { parseType: { predicate: /foo/ } } },
      output: { [type] () {} },
      dict: { [type]: {} },
      config: {}
    })
    plugins.remove(ref)
    expect(plugins.input.has(type)).to.not.be.ok()
    expect(plugins.input.hasTypeParser(type)).to.not.be.ok()
    expect(plugins.input.hasDataParser(type)).to.not.be.ok()
    expect(plugins.input.hasDataParser(type, true)).to.not.be.ok()
    expect(plugins.input.type('foo')).to.not.be(type)
    expect(plugins.output.has(type)).to.not.be.ok()
    expect(plugins.dict.has(type)).to.not.be.ok()
    expect(plugins.config.has(ref)).to.not.be.ok()
  })

  describe('config', function () {
    afterEach(function () { plugins.config.remove(ref) })

    it('works', function () {
      plugins.config.add(ref, { foo: 1 })
      expect(plugins.config.get(ref)).to.eql({ foo: 1 })
    })
    it('removes', function () {
      plugins.config.add(ref, { foo: 1 })
      plugins.config.remove(ref)
      expect(plugins.config.get(ref)).to.not.be.ok()
    })
  })

  describe('dict', function () {
    afterEach(function () { plugins.dict.remove(ref) })

    it('registers', function () {
      plugins.dict.add(ref, dict)
      expect(plugins.dict.has(ref)).to.be.ok()
    })
    it('works', function () {
      plugins.dict.add(ref, dict)
      expect(plugins.dict.get(ref)).to.eql(dict)
    })
    it('removes', function () {
      plugins.dict.add(ref, dict)
      plugins.dict.remove(ref)
      expect(plugins.dict.has(ref)).to.not.be.ok()
      expect(plugins.dict.get).withArgs(ref).to.throwException()
    })
    it('lists', function () {
      plugins.dict.add(ref, dict)
      plugins.dict.add('ref', dict)
      expect(plugins.dict.list().slice(-2)).to.eql([ref, 'ref'])
    })

    describe('validation', function () {
      it('checks ref', function () {
        expect(plugins.dict.add).withArgs(1).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
      })
      it('checks dict', function () {
        expect(plugins.dict.add).withArgs(ref, 1).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
      })
      it('checks entries', function () {
        expect(plugins.dict.add).withArgs(ref, { foo: 1 }).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
        expect(plugins.dict.add).withArgs(ref, { foo: [1] }).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
      })
    })
  })

  describe('output', function () {
    afterEach(function () { plugins.output.remove(ref) })

    it('registers', function () {
      plugins.output.add(ref, format)
      expect(plugins.output.has(ref)).to.be.ok()
    })
    it('works', function () {
      plugins.output.add(ref, format)
      expect(plugins.output.format(ref, data)).to.eql(data)
    })
    it('removes', function () {
      plugins.output.add(ref, format)
      plugins.output.remove(ref)
      expect(plugins.output.has(ref)).to.not.be.ok()
      expect(plugins.output.format).withArgs(ref).to.throwException()
    })
    it('lists', function () {
      plugins.output.add(ref, format)
      plugins.output.add('ref', format)
      expect(plugins.output.list().slice(-2)).to.eql([ref, 'ref'])
    })

    describe('validation', function () {
      it('checks ref', function () {
        expect(plugins.output.add).withArgs(1).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
      })
      it('checks formatter', function () {
        expect(plugins.output.add).withArgs(ref, 1).to.throwException(e => {
          expect(e).to.be.a(TypeError)
        })
      })
    })
  })

  describe('input', function () {
    describe('typeParser', function () {
      afterEach(function () { plugins.input.remove(type) })

      it('registers', function () {
        plugins.input.add(type, { parseType: {} })
        expect(plugins.input.hasTypeParser(type)).to.be.ok()
      })
      it('works', function () {
        plugins.input.add(type, { parseType: { predicate: /foo/ } })
        expect(plugins.input.type('foo')).to.be(type)
      })
      it('removes', function () {
        plugins.input.add(type, { parseType: { predicate: /foo/ } })
        plugins.input.remove(type)
        expect(plugins.input.hasTypeParser(type)).to.not.be.ok()
        expect(plugins.input.type('foo')).to.not.be(type)
      })
      it('removes overwritten indices', function () {
        plugins.input.add(type, { parseType: {} })
        plugins.input.add(type, { parse () {} })
        plugins.input.remove(type)
        expect(plugins.input.hasTypeParser(type)).to.not.be.ok()
        expect(plugins.input.hasDataParser(type)).to.not.be.ok()
      })
      it('removes non-existing', function () {
        expect(plugins.input.remove).withArgs(type).not.to.throwException()
      })

      context('subtypes', function () {
        afterEach(function () {
          plugins.input.remove(type)
          plugins.input.remove(subType)
        })

        it('registers', function () {
          plugins.input.add(type, { parseType: {} })
          plugins.input.add(subType, { parseType: { extends: type } })
          expect(plugins.input.hasTypeParser(type)).to.be.ok()
          expect(plugins.input.hasTypeParser(subType)).to.be.ok()
        })
        it('waits on parent type', function () {
          plugins.input.add(subType, { parseType: { extends: type, predicate: /foo/ } })
          plugins.input.add(type, { parseType: { predicate: /fo/ } })
          expect(plugins.input.hasTypeParser(type)).to.be.ok()
          expect(plugins.input.hasTypeParser(subType)).to.be.ok()
          expect(plugins.input.type('foo')).to.be(subType)
        })
        it('works', function () {
          plugins.input.add(type, { parseType: { predicate: /fo/ } })
          plugins.input.add(subType, { parseType: { extends: type, predicate: /foo/ } })
          expect(plugins.input.type('foo')).to.be(subType)
        })
        it('delegates to parent type', function () {
          plugins.input.add(type, { parseType: { predicate: /fo/ } })
          plugins.input.add(subType, { parseType: { extends: type, predicate: /foobar/ } })
          expect(plugins.input.type('foo')).to.be(type)
        })
        it('removes', function () {
          plugins.input.add(type, { parseType: { predicate: /fo/ } })
          plugins.input.add(subType, { parseType: { extends: type, predicate: /foo/ } })
          plugins.input.remove(subType)
          expect(plugins.input.hasTypeParser(subType)).to.not.be.ok()
          expect(plugins.input.type('foo')).to.not.be(subType)
        })
      })

      describe('class', function () {
        const { TypeParser } = plugins.input.util

        it('can be combined', function () {
          const { predicate } = new TypeParser({
            predicate: object => Object.keys(object).length === 2,
            propertyConstraint: { props: 'foo' }
          })
          expect(predicate({ foo: 1, bar: 2 })).to.be.ok()
          expect(predicate({ bar: 1, baz: 2 })).not.to.be.ok()
          expect(predicate({ foo: 1 })).not.to.be.ok()
          expect(predicate({})).not.to.be.ok()
        })
        it('validates', function () {
          let instance
          instance = new TypeParser({})
          expect(instance.validate.bind(instance)).not.to.throwException()
          instance = new TypeParser(1)
          expect(instance.validate.bind(instance)).to.throwException(e => {
            expect(e).to.be.a(TypeError)
            expect(e).to.match(/typeParser was number; expected object/)
          })
        })

        describe('dataType', function () {
          it('outputs properly', function () {
            const instance = new TypeParser({ dataType: 'SimpleObject' })
            expect(instance.dataType).to.be('SimpleObject')
          })
          it('can be inferred', function () {
            expect((new TypeParser({ predicate: /foo/ })).dataType).to.be('String')
            expect((new TypeParser({ tokenList: /foo/ })).dataType).to.be('String')
            expect((new TypeParser({ elementConstraint: '@foo/bar' })).dataType).to.be('Array')
            expect((new TypeParser({})).dataType).to.be('Primitive')
            expect((new TypeParser({ dataType: 'Array', predicate: /foo/ })).dataType).to.be('Array')
          })
          it('validates', function () {
            const instance = new TypeParser({ dataType: 'String' })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-datatypes', function () {
            const instance = new TypeParser({ dataType: 'Blue' })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(RangeError)
              expect(e).to.match(/dataType was Blue; expected one of/)
            })
          })
          it('invalidates non-strings', function () {
            const instance = new TypeParser({ dataType: 12 })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(RangeError)
              expect(e).to.match(/dataType was 12; expected one of/)
            })
          })
          describe('values', function () {
            it('String', () => { expect(plugins.input.util.dataTypeOf('foo')).to.be('String') })
            it('Array', () => { expect(plugins.input.util.dataTypeOf([])).to.be('Array') })
            it('SimpleObject', () => { expect(plugins.input.util.dataTypeOf({})).to.be('SimpleObject') })
            it('ComplexObject', () => { expect(plugins.input.util.dataTypeOf(/foo/)).to.be('ComplexObject') })
            it('Primitive', () => { expect(plugins.input.util.dataTypeOf(null)).to.be('Primitive') })

            describe('typeOf', function () {
              it('Undefined', () => { expect(plugins.input.util.typeOf(undefined)).to.be('Undefined') })
              it('Null', () => { expect(plugins.input.util.typeOf(null)).to.be('Null') })
              it('primitive literal', () => { expect(plugins.input.util.typeOf('')).to.be('String') })
              it('Object', () => { expect(plugins.input.util.typeOf({})).to.be('Object') })
            })
          })
        })
        describe('predicate', function () {
          it('outputs properly for functions', function () {
            const { predicate } = new TypeParser({ predicate: a => a === 'foo' })
            expect(predicate('foo')).to.be.ok()
            expect(predicate('bar')).not.to.be.ok()
          })
          it('outputs properly for regex', function () {
            const { predicate } = new TypeParser({ predicate: /^foo$/ })
            expect(predicate('foo')).to.be.ok()
            expect(predicate('bar')).not.to.be.ok()
          })
          it('validates functions', function () {
            const instance = new TypeParser({ predicate: function () {} })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('validates regex', function () {
            const instance = new TypeParser({ predicate: /a/ })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-predicates', function () {
            const instance = new TypeParser({ predicate: 'Blue' })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(TypeError)
              expect(e).to.match(/predicate was string; expected RegExp or function/)
            })
          })
        })
        describe('tokenList', function () {
          it('outputs properly for objects', function () {
            const { predicate } = new TypeParser({ tokenList: { token: /a/ } })
            expect(predicate('a a a')).to.be.ok()
            expect(predicate(' a a a ')).to.be.ok()
            expect(predicate('a b a')).not.to.be.ok()
          })
          it('outputs properly for regex', function () {
            const { predicate } = new TypeParser({ tokenList: /a/ })
            expect(predicate('a a a')).to.be.ok()
            expect(predicate('a b a')).not.to.be.ok()
          })
          it('outputs properly for object with split', function () {
            const { predicate } = new TypeParser({
              tokenList: {
                token: /^a$/,
                split: /b/
              }
            })
            expect(predicate('ababa')).to.be.ok()
            expect(predicate('a a a')).not.to.be.ok()
            expect(predicate('abcba')).not.to.be.ok()
          })
          it('outputs properly for object without trim', function () {
            const { predicate } = new TypeParser({
              tokenList: {
                token: /^a$/,
                trim: false
              }
            })
            expect(predicate('a a a')).to.be.ok()
            expect(predicate(' a a a ')).not.to.be.ok()
          })
          it('outputs properly for object without every', function () {
            const { predicate } = new TypeParser({
              tokenList: {
                token: /^a$/,
                every: false
              }
            })
            expect(predicate('a b a b a')).to.be.ok()
            expect(predicate('b b')).not.to.be.ok()
          })
          it('validates objects', function () {
            const instance = new TypeParser({ tokenList: {} })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('validates regex', function () {
            const instance = new TypeParser({ tokenList: /a/ })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-tokenlists', function () {
            const instance = new TypeParser({ tokenList: 'Blue' })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(TypeError)
              expect(e).to.match(/tokenList was string; expected object or RegExp/)
            })
          })
        })
        describe('propertyConstraint', function () {
          it('outputs properly for one prop', function () {
            const { predicate } = new TypeParser({
              propertyConstraint: {
                props: 'foo'
              }
            })
            expect(predicate({ foo: 1, bar: 2 })).to.be.ok()
            expect(predicate({ foo: 1 })).to.be.ok()
            expect(predicate({})).not.to.be.ok()
            expect(predicate({ bar: 2 })).not.to.be.ok()
          })
          it('outputs properly for prop predicates', function () {
            const { predicate } = new TypeParser({
              propertyConstraint: {
                props: ['foo'],
                value: value => value === 1
              }
            })
            expect(predicate({ foo: 1 })).to.be.ok()
            expect(predicate({ foo: 2 })).not.to.be.ok()
            expect(predicate({})).not.to.be.ok()
            expect(predicate({ bar: 1 })).not.to.be.ok()
          })
          it('outputs properly for match=every', function () {
            const { predicate } = new TypeParser({
              propertyConstraint: {
                props: ['foo', 'bar'],
                match: 'every'
              }
            })
            expect(predicate({ foo: 1, bar: 2 })).to.be.ok()
            expect(predicate({ foo: 1, bar: 2, baz: 3 })).to.be.ok()
            expect(predicate({ foo: 1 })).not.to.be.ok()
            expect(predicate({})).not.to.be.ok()
            expect(predicate({ foo: 1, baz: 3 })).not.to.be.ok()
            expect(predicate({ baz: 3 })).not.to.be.ok()
          })
          it('outputs properly for match=some', function () {
            const { predicate } = new TypeParser({
              propertyConstraint: {
                props: ['foo', 'bar'],
                match: 'some'
              }
            })
            expect(predicate({ foo: 1, bar: 2 })).to.be.ok()
            expect(predicate({ foo: 1, bar: 2, baz: 3 })).to.be.ok()
            expect(predicate({ foo: 1 })).to.be.ok()
            expect(predicate({ foo: 1, baz: 3 })).to.be.ok()
            expect(predicate({})).not.to.be.ok()
            expect(predicate({ baz: 3 })).not.to.be.ok()
          })
          it('outputs properly for match=none', function () {
            const { predicate } = new TypeParser({
              propertyConstraint: {
                props: ['foo', 'bar'],
                match: 'none'
              }
            })
            expect(predicate({})).to.be.ok()
            expect(predicate({ baz: 3 })).to.be.ok()
            expect(predicate({ foo: 1, bar: 2 })).not.to.be.ok()
            expect(predicate({ foo: 1, bar: 2, baz: 3 })).not.to.be.ok()
            expect(predicate({ foo: 1 })).not.to.be.ok()
            expect(predicate({ foo: 1, baz: 3 })).not.to.be.ok()
          })
          it('validates objects', function () {
            const instance = new TypeParser({ propertyConstraint: {} })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('validates arrays', function () {
            const instance = new TypeParser({ propertyConstraint: [] })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-objects', function () {
            const instance = new TypeParser({ propertyConstraint: 'Blue' })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(TypeError)
              expect(e).to.match(/propertyConstraint was string; expected array or object/)
            })
          })
        })
        describe('elementConstraint', function () {
          it('outputs properly', function () {
            plugins.input.add('@foo/bar', { parseType: { predicate: /foo/ } })
            const { predicate } = new TypeParser({ elementConstraint: '@foo/bar' })
            expect(predicate([])).to.be.ok()
            expect(predicate(['foo'])).to.be.ok()
            expect(predicate(['foo', 'foo'])).to.be.ok()

            expect(predicate(['bar'])).not.to.be.ok()
            expect(predicate(['foo', 'bar'])).not.to.be.ok()
            expect(predicate(['bar', 'bar'])).not.to.be.ok()
          })
          it('validates', function () {
            const instance = new TypeParser({ elementConstraint: '@foo/bar' })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-strings', function () {
            const instance = new TypeParser({ elementConstraint: 12 })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(TypeError)
              expect(e).to.match(/elementConstraint was number; expected string/)
            })
          })
        })
        describe('extends', function () {
          it('outputs properly', function () {
            const { extends: extend } = new TypeParser({ extends: '@foo/bar' })
            expect(extend).to.be('@foo/bar')
          })
          it('validates', function () {
            const instance = new TypeParser({ extends: '@foo/bar' })
            expect(instance.validate.bind(instance)).to.not.throwException()
          })
          it('invalidates non-strings', function () {
            const instance = new TypeParser({ extends: 2 })
            expect(instance.validate.bind(instance)).to.throwException(e => {
              expect(e).to.be.a(TypeError)
              expect(e).to.match(/extends was number; expected string/)
            })
          })
        })
      })
    })
    describe('dataParser', function () {
      afterEach(function () { plugins.input.remove(type) })

      it('registers', function () {
        plugins.input.add(type, { parse })
        expect(plugins.input.hasDataParser(type)).to.be.ok()
      })
      it('works', function () {
        plugins.input.add(type, { parse })
        expect(plugins.input.data('foo', type)).to.eql(data)
      })
      it('removes', function () {
        plugins.input.add(type, { parse })
        plugins.input.remove(type)
        expect(plugins.input.hasDataParser(type)).to.not.be.ok()
        expect(plugins.input.data).withArgs('foo', type).to.throwException()
      })

      describe('async', function () {
        afterEach(function () { plugins.input.remove(type) })

        it('registers', function () {
          plugins.input.add(type, { parseAsync })
          expect(plugins.input.hasDataParser(type, true)).to.be.ok()
        })
        it('works', async function () {
          plugins.input.add(type, { parseAsync })
          expect(await plugins.input.dataAsync('foo', type)).to.eql(data)
        })
        it('removes', async function () {
          plugins.input.add(type, { parseAsync })
          plugins.input.remove(type)
          expect(plugins.input.hasDataParser(type, true)).to.not.be.ok()
          try {
            await plugins.input.dataAsync('foo', type)
            expect().fail('dataAsync should fail if format is not available')
          } catch (e) {
            expect(e.message).to.match(new RegExp(`No parser found for ${type}`))
          }
        })
      })

      describe('class', function () {
        const { DataParser } = plugins.input.util
        it('works', function () {
          const instance = new DataParser(() => {})
          const async = new DataParser(() => {}, { async: true })
          expect(typeof instance.parser).to.be('function')
          expect(typeof async.parser).to.be('function')
          expect(instance.async).not.to.be.ok()
          expect(async.async).to.be.ok()
        })
        it('validates', function () {
          const instance = new DataParser(() => {})
          expect(instance.validate.bind(instance)).not.to.throwException()
        })
        it('invalidates non-functions', function () {
          const instance = new DataParser(12)
          expect(instance.validate.bind(instance)).to.throwException(e => {
            expect(e).to.be.a(TypeError)
            expect(e).to.match(/parser was number; expected function/)
          })
        })
      })
    })

    describe('class', function () {
      const { FormatParser } = plugins.input.util
      it('validates format', function () {
        let instance
        instance = new FormatParser('@foo/bar')
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('@foo')
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('@foo/baz+bar')
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('foo')
        expect(instance.validate.bind(instance)).to.throwException()
        instance = new FormatParser('foo/bar')
        expect(instance.validate.bind(instance)).to.throwException()
        instance = new FormatParser('foo/baz+bar')
        expect(instance.validate.bind(instance)).to.throwException()
      })
      it('validates parsers', function () {
        let instance
        instance = new FormatParser('@foo/bar', { parseType: { dataType: 'String' } })
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('@foo/bar', { parseType: { dataType: 12 } })
        expect(instance.validate.bind(instance)).to.throwException()

        instance = new FormatParser('@foo/bar', { parseAsync: () => {} })
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('@foo/bar', { parse: 12 })
        expect(instance.validate.bind(instance)).to.throwException()

        instance = new FormatParser('@foo/bar', { parseAsync: () => {} })
        expect(instance.validate.bind(instance)).not.to.throwException()
        instance = new FormatParser('@foo/bar', { parseAsync: 12 })
        expect(instance.validate.bind(instance)).to.throwException()
      })
    })
  })
})
