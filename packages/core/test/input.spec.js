/* eslint-env mocha */

const { plugins } = require('../src/index.js')
const expect = require('expect.js')

const cases = {
  '@csl/object': {
    'with no properties': [{}, [{}]],
    'with nonsense properties': [{ a: 1 }, [{ a: 1 }]],
    'with proper properties': [{ title: 'test' }, [{ title: 'test' }]],
    'with old CSL': [
      {
        type: 'book',
        version: '1.0.2',
        title: 'Citation Style Language',
        event: 'RFC'
      },
      [{
        type: 'software',
        version: '1.0.2',
        title: 'Citation Style Language',
        'event-title': 'RFC'
      }]
    ]
  },
  '@csl/list+object': {
    'without elements': [[], [], { link: true }],
    'with elements': [[{}], [{}], { link: true }]
  },
  '@else/list+object': {
    'nested elements': [
      [
        [
          { i: 1 }
        ],
        [
          { i: 2 },
          [
            { i: 3 }
          ]
        ],
        { i: 4 }
      ],
      [
        { i: 1 },
        { i: 2 },
        { i: 3 },
        { i: 4 }
      ]
    ]
  }
}

describe('input', function () {
  describe('interface', function () {
    const { chain, chainAsync, chainLink, chainLinkAsync, util } = plugins.input
    describe('chain', function () {
      it('parses', function () {
        expect(chain({}, { generateGraph: false })).to.eql([{}])
      })
      it('parses until success', function () {
        expect(chain('{}', { generateGraph: false })).to.eql([{}])
      })
      it('copies', function () {
        const object = {}
        expect(chain(object)[0]).not.to.be(object)
      })
      it('uses `outputs` information', function () {
        plugins.input.add('@foo', { parse () {}, outputs: '@else/json' })
        expect(chain).withArgs('foo', { forceType: '@foo' }).to.throwException()
        plugins.input.remove('@foo')
      })
      describe('options', function () {
        it('generateGraph', function () {
          expect(chain({}, { generateGraph: true })[0]).to.have.property('_graph')
          expect(chain({}, { generateGraph: false })[0]).not.to.have.property('_graph')
        })
        it('maxChainLength', function () {
          expect(chain({}, { maxChainLength: 1, generateGraph: false })).to.eql([{}])
          expect(chain).withArgs({}, { maxChainLength: 0 }).to.throwException()
        })
        it('forceType', function () {
          expect(chain({}, { generateGraph: false })).to.eql([{}])
          expect(chain).withArgs({}, { forceType: '@foo/bar' }).to.throwException()
        })
        it('strict', function () {
          expect(chain('bogus', { strict: false })).to.eql([])
          expect(chain).withArgs('bogus').to.throwException()

          expect(chain('{"bogus"}', { strict: false })).to.eql([])
          expect(chain).withArgs('{"bogus"}').to.throwException()

          expect(chain(undefined, { forceType: '@foo/bar', strict: false })).to.eql([])
          expect(chain).withArgs(undefined, { forceType: '@foo/bar' }).to.throwException()
        })
        it('target', function () {
          expect(chain({}, { generateGraph: false, target: '@csl/object' })).to.eql({})
          expect(chain).withArgs({}, { target: '@foo/bar' }).to.throwException()
        })
      })
    })
    describe('chainLink', function () {
      it('parses', function () {
        expect(chainLink({})).to.eql([{}])
      })
      it('parses only once', function () {
        // TODO non-builtin type
        expect(chainLink('{}')).to.eql({})
      })
      it('copies', function () {
        const object = {}
        expect(chainLink(object)[0]).not.to.be(object)
      })
    })
    describe('chainAsync', function () {
      it('parses', async function () {
        expect(await chainAsync({}, { generateGraph: false })).to.eql([{}])
      })
      it('parses until success', async function () {
        // TODO non-builtin type
        expect(await chainAsync('{}', { generateGraph: false })).to.eql([{}])
      })
      it('copies', async function () {
        const object = {}
        expect((await chainAsync(object))[0]).not.to.be(object)
      })
      it('uses `outputs` information', async function () {
        plugins.input.add('@foo', { parse () {}, outputs: '@else/json' })
        try {
          await chain('foo', { forceType: '@foo' })
          expect().fail('chainAsync should fail as `undefined` is invalid JSON')
        } catch (e) {
          expect(e.message).to.match(/Unexpected token u in JSON at position 0/)
        }
        plugins.input.remove('@foo')
      })
      describe('options', function () {
        it('generateGraph', async function () {
          expect((await chainAsync({}, { generateGraph: true }))[0]).to.have.property('_graph')
          expect((await chainAsync({}, { generateGraph: false }))[0]).not.to.have.property('_graph')
        })
        it('maxChainLength', async function () {
          expect(await chainAsync({}, { maxChainLength: 1, generateGraph: false })).to.eql([{}])
          try {
            await chainAsync({}, { maxChainLength: 0 })
            expect().fail('chainAsync should fail if maxChainLength is exceeded')
          } catch (e) {
            expect(e.message).to.match(/Max\. number of parsing iterations reached/)
          }
        })
        it('forceType', async function () {
          expect(await chainAsync({}, { generateGraph: false })).to.eql([{}])
          try {
            await chainAsync({}, { forceType: '@foo/bar' })
            expect().fail('chainAsync should fail if format is not available')
          } catch (e) {
            expect(e.message).to.be('No parser found for @foo/bar')
          }
        })
        it('strict', async function () {
          expect(await chainAsync('bogus', { strict: false })).to.eql([])
          try {
            await chainAsync('bogus')
            expect().fail('chainAsync should fail if input is not recognised')
          } catch (e) {}

          expect(await chainAsync('{"bogus"}', { strict: false })).to.eql([])
          try {
            await chainAsync('{"bogus"}')
            expect().fail('chainAsync should fail if input fails to parse')
          } catch (e) {}

          expect(await chainAsync(undefined, { forceType: '@foo/bar', strict: false })).to.eql([])
          try {
            await chainAsync(undefined, { forceType: '@foo/bar' })
            expect().fail('chainAsync should fail if format is not available')
          } catch (e) {}
        })
        it('target', async function () {
          expect(await chainAsync({}, { generateGraph: false, target: '@csl/object' })).to.eql({})
          try {
            await chainAsync({}, { target: '@foo/bar' })
            expect().fail('chainAsync should fail if target format is not available')
          } catch (e) {
            expect(e.message).to.match(/Max\. number of parsing iterations reached/)
          }
        })
      })
    })
    describe('chainLinkAsync', function () {
      it('parses', async function () {
        expect(await chainLinkAsync({})).to.eql([{}])
      })
      it('parses only once', async function () {
        expect(await chainLinkAsync('{}')).to.eql({})
      })
      it('copies', async function () {
        const object = {}
        expect((await chainLinkAsync(object))[0]).not.to.be(object)
      })
    })
    describe('clean', function () {
      it('clones input', function () {
        const input = [{}]
        expect(util.clean(input, false)).not.to.be(input)
      })
      it('removes unknown fields', function () {
        expect(util.clean([{ foo: 1 }], false)).to.eql([{}])
      })
      it('keeps custom fields', function () {
        expect(util.clean([{ custom: { foo: 1 } }], false)).to.eql([{ custom: { foo: 1 } }])
      })
      it('keeps valid types', function () {
        const input = [{ type: 'personal_communication' }]
        expect(util.clean(input, false)).to.eql(input)
      })
      it('removes invalid types', function () {
        let input
        input = [{ type: 'foo' }]
        expect(util.clean(input, false)).to.eql([{}])
        input = [{ type: 'proceedings-article' }]
        expect(util.clean(input, false)).to.eql([{}])
      })
      it('keeps valid names', function () {
        let input
        input = [{ author: [{ literal: 'foo' }] }]
        expect(util.clean(input, false)).to.eql(input)
        input = [{ author: [{ family: 'foo' }] }]
        expect(util.clean(input, false)).to.eql(input)
      })
      it('removes invalid names', function () {
        expect(util.clean([{ author: 'foo' }], false)).to.eql([{}])
        expect(util.clean([{ author: { literal: 'foo' } }], false)).to.eql([{}])
        expect(util.clean([{ author: ['foo'] }], false)).to.eql([{}])
        expect(util.clean([{ author: [{ foo: 1 }] }], false)).to.eql([{}])
      })
      it('keeps valid dates', function () {
        let input
        input = [{ issued: { 'date-parts': [[1, 2, 3]] } }]
        expect(util.clean(input, false)).to.eql(input)
        input = [{ issued: { raw: 'foo' } }]
        expect(util.clean(input, false)).to.eql(input)
      })
      it('keeps dates in legacy format', function () {
        expect(util.clean([{
          issued: [{ 'date-parts': [1, 2, 3] }]
        }], false)).to.eql([{
          issued: { 'date-parts': [[1, 2, 3]] }
        }])
      })
      it('removes invalid dates', function () {
        expect(util.clean([{ issued: 'foo' }], false)).to.eql([{}])
        expect(util.clean([{ issued: ['foo'] }], false)).to.eql([{}])
        expect(util.clean([{ issued: { 'date-parts': 'foo' } }], false)).to.eql([{}])
        expect(util.clean([{ issued: { 'date-parts': ['foo'] } }], false)).to.eql([{}])
        expect(util.clean([{ issued: { 'date-parts': [['foo', 'foo', 'foo']] } }], false)).to.eql([{}])
        expect(util.clean([{ issued: [{ 'date-parts': ['foo', 'foo', 'foo'] }] }], false)).to.eql([{}])
      })
      describe('performs best guess conversions', function () {
        it('on string values that should be numbers', function () {
          expect(util.clean([{ volume: '12' }], true)).to.eql([{ volume: 12 }])
          expect(util.clean([{ volume: '2nd' }], true)).to.eql([{ volume: '2nd' }])
          expect(util.clean([{
            issued: { 'date-parts': [['2019', '08', '30']] }
          }], true)).to.eql([{
            issued: { 'date-parts': [[2019, 8, 30]] }
          }])
          expect(util.clean([{
            issued: [{ 'date-parts': ['2019', '08', '30'] }]
          }], true)).to.eql([{
            issued: { 'date-parts': [[2019, 8, 30]] }
          }])
          expect(util.clean([{ issued: { 'date-parts': [[{}, '08', '30']] } }], true)).to.eql([{}])
          expect(util.clean([{ issued: [{ 'date-parts': [{}, '08', '30'] }] }], true)).to.eql([{}])
        })
        it('but it does not convert ids from strings to numbers or reverse', function () {
          expect(util.clean([{ id: '123' }], true)[0].id).to.be.a('string')
          expect(util.clean([{ id: 123 }], true)[0].id).to.be.a('number')
        })
        it('on number values that should (only) be strings', function () {
          expect(util.clean([{ scale: 1e6 }], true)).to.eql([{ scale: '1000000' }])
          expect(util.clean([{ number: 40 }], true)).to.eql([{ number: 40 }])
        })
        it('on arrays that should be single values', function () {
          expect(util.clean([{ ISBN: ['12345667890'] }], true)).to.eql([{ ISBN: '12345667890' }])
          expect(util.clean([{ ISSN: ['1234-5678', '9101-1121'] }], true)).to.eql([{ ISSN: '1234-5678' }])
        })
        it('on array with types', function () {
          expect(util.clean([{
            type: ['article-newspaper', 'review-book']
          }])).to.eql([{
            type: 'article-newspaper'
          }])
        })
        it('on mapped invalid types', function () {
          expect(util.clean([{
            type: 'proceedings-article'
          }])).to.eql([{
            type: 'paper-conference'
          }])
        })
        it('on unparsed names', function () {
          expect(util.clean([{
            author: ['Lars G. Willighagen']
          }])).to.eql([{
            author: [{ given: 'Lars G.', family: 'Willighagen' }]
          }])
          expect(util.clean([{ author: [1] }])).to.eql([{}])
        })
      })
    })
  })

  describe('internal types', function () {
    for (const type in cases) {
      describe(type, function () {
        for (const name of Object.keys(cases[type])) {
          const [input, expected] = cases[type][name]
          describe(name, function () {
            it('parses type', function () {
              expect(plugins.input.type(input)).to.be(type)
            })
            it('parses data', function () {
              expect(
                plugins.input.chain(input, { generateGraph: false })
              )
                .to.eql(expected)
            })
            it('parses data async', async function () {
              expect(
                await plugins.input.chainAsync(input, { generateGraph: false })
              )
                .to.eql(expected)
            })
          })
        }
      })
    }
  })
})
