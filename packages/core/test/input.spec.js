/* eslint-env mocha */

const {plugins} = require('../src/')
const expect = require('expect.js')

const cases = {
  '@csl/object': {
    'with no properties': [{}, [{}]],
    'with nonsense properties': [{a: 1}, [{a: 1}]],
    'with proper properties': [{title: 'test'}, [{title: 'test'}]]
  },
  '@csl/list+object': {
    'without elements': [[], [], {link: true}],
    'with elements': [[{}], [{}], {link: true}]
  },
  '@else/list+object': {
    'nested elements': [
      [
        [
          {i: 1}
        ],
        [
          {i: 2},
          [
            {i: 3}
          ]
        ],
        {i: 4}
      ],
      [
        {i: 1},
        {i: 2},
        {i: 3},
        {i: 4}
      ]
    ]
  }
}

describe('input', function () {
  describe('interface', function () {
    const {chain, chainAsync, chainLink, chainLinkAsync} = plugins.input
    describe('chain', function () {
      it('parses', function () {
        expect(chain({}, {generateGraph: false})).to.eql([{}])
      })
      it('parses until success', function () {
        // TODO non-builtin type
        expect(chain('{}', {generateGraph: false})).to.eql([{}])
      })
      it('copies', function () {
        const object = {}
        expect(chain(object)[0]).not.to.be(object)
      })
      describe('options', function () {
        it('generateGraph', function () {
          expect(chain({}, {generateGraph: true})[0]).to.have.property('_graph')
          expect(chain({}, {generateGraph: false})[0]).not.to.have.property('_graph')
        })
        it('maxChainLength', function () {
          expect(chain({}, {maxChainLength: 1, generateGraph: false})).to.eql([{}])
          expect(chain).withArgs({}, {maxChainLength: 0}).to.throwException()
        })
        it('forceType', function () {
          expect(chain({}, {generateGraph: false})).to.eql([{}])
          expect(chain).withArgs({}, {forceType: '@foo/bar'}).to.throwException()
        })
        it('strict', function () {
          expect(chain('bogus', {strict: false})).to.eql([])
          expect(chain).withArgs('bogus').to.throwException()

          expect(chain('{"bogus"}', {strict: false})).to.eql([])
          expect(chain).withArgs('{"bogus"}').to.throwException()

          expect(chain(undefined, {forceType: '@foo/bar', strict: false})).to.eql([])
          expect(chain).withArgs(undefined, {forceType: '@foo/bar'}).to.throwException()
        })
        it('target', function () {
          expect(chain({}, {generateGraph: false, target: '@csl/object'})).to.eql({})
          expect(chain).withArgs({}, {target: '@foo/bar'}).to.throwException()
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
        expect(await chainAsync({}, {generateGraph: false})).to.eql([{}])
      })
      it('parses until success', async function () {
        // TODO non-builtin type
        expect(await chainAsync('{}', {generateGraph: false})).to.eql([{}])
      })
      it('copies', async function () {
        const object = {}
        expect((await chainAsync(object))[0]).not.to.be(object)
      })
      describe('options', function () {
        it('generateGraph', async function () {
          expect((await chainAsync({}, {generateGraph: true}))[0]).to.have.property('_graph')
          expect((await chainAsync({}, {generateGraph: false}))[0]).not.to.have.property('_graph')
        })
        it('maxChainLength', async function () {
          expect(await chainAsync({}, {maxChainLength: 1, generateGraph: false})).to.eql([{}])
          try {
            await chainAsync({}, {maxChainLength: 0})
            expect(a).fail('chainAsync should fail if maxChainLength is exceeded')
          } catch (e) {
            expect(e.message).to.match(/Max\. number of parsing iterations reached/)
          }
        })
        it('forceType', async function () {
          expect(await chainAsync({}, {generateGraph: false})).to.eql([{}])
          try {
            await chainAsync({}, {forceType: '@foo/bar'})
            expect().fail('chainAsync should fail if format is not available')
          } catch (e) {
            expect(e.message).to.be('No parser found for @foo/bar')
          }
        })
        it('strict', async function () {
          expect(await chainAsync('bogus', {strict: false})).to.eql([])
          try {
            await chainAsync('bogus')
            expect().fail('chainAsync should fail if input is not recognised')
          } catch (e) {}

          expect(await chainAsync('{"bogus"}', {strict: false})).to.eql([])
          try {
            await chainAsync('{"bogus"}')
            expect().fail('chainAsync should fail if input fails to parse')
          } catch (e) {}

          expect(await chainAsync(undefined, {forceType: '@foo/bar', strict: false})).to.eql([])
          try {
            await chainAsync(undefined, {forceType: '@foo/bar'})
            expect().fail('chainAsync should fail if format is not available')
          } catch (e) {}
        })
        it('target', async function () {
          expect(await chainAsync({}, {generateGraph: false, target: '@csl/object'})).to.eql({})
          try {
            await chainAsync({}, {target: '@foo/bar'})
            expect().fail('chainAsync should fail if target format is not available')
          } catch (e) {
            expect(e.message).to.be('Max. number of parsing iterations reached')
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
  })

  describe('internal types', function () {
    for (let type in cases) {
      describe(type, function () {
        for (let name of Object.keys(cases[type])) {
          let [input, expected] = cases[type][name]
          describe(name, function () {
            it('parses type', function () {
              expect(plugins.input.type(input)).to.be(type)
            })
            it('parses data', function () {
              expect(
                plugins.input.chain(input, {generateGraph: false})
              )
                .to.eql(expected)
            })
          })
        }
      })
    }
  })
})
