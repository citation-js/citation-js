/* eslint-env mocha */

const { Cite } = require('../src/index.js')
const input = require('./data.json')
const expect = require('expect.js')

const noGraph = { generateGraph: false }

describe('Cite instance', () => {
  describe('initialisation', () => {
    it('returns a Cite object', () => expect(new Cite()).to.be.a(Cite))
    context('via function', () => it('returns a Cite object', () => expect(Cite()).to.be.a(Cite)))
  })

  describe('iteration', () => it('works', () => {
    expect((new Cite())[Symbol.iterator]).to.be.a('function')
    expect([...(new Cite(input.ids, noGraph))]).to.eql(input.ids)
  }))

  describe('static', () => {
    describe('with callback', function () {
      it('works', function () {
        return new Promise(resolve => {
          Cite.async([], instance => {
            expect(instance).to.be.a(Cite)
            resolve()
          })
        })
      })
    })
    describe('without callback', function () {
      it('works', function () {
        return new Promise(resolve => {
          Cite.async([]).then(instance => {
            expect(instance).to.be.a(Cite)
            resolve()
          })
        })
      })
    })
  })

  describe('function', () => {
    let test
    beforeEach(function () {
      test = new Cite(input.empty)
      test.save()
    })

    describe('add()', () => {
      it('works', () => {
        test.add(input.empty)
        expect(test.data).to.have.length(2)
        expect(test.log).to.have.length(1)
      })

      it('saves', () => {
        test.add(input.empty, true)
        expect(test.data).to.have.length(2)
        expect(test.log).to.have.length(2)
      })
    })

    describe('set()', () => {
      it('works', () => {
        test.set(input.ids, noGraph)
        expect(test.data).to.have.length(2)
        expect(test.data).to.eql(input.ids)
        expect(test.log).to.have.length(1)
      })

      it('saves', () => {
        test.set(input.empty, true)
        expect(test.data).to.have.length(1)
        expect(test.log).to.have.length(2)
      })
    })

    describe('addAsync()', () => {
      it('works', async () => {
        await test.addAsync(input.empty)
        expect(test.data).to.have.length(2)
        expect(test.log).to.have.length(1)
      })

      it('saves', async () => {
        await test.addAsync(input.empty, true)
        expect(test.data).to.have.length(2)
        expect(test.log).to.have.length(2)
      })
    })

    describe('setAsync()', () => {
      it('works', async () => {
        await test.setAsync(input.ids, noGraph)
        expect(test.data).to.have.length(2)
        expect(test.data).to.eql(input.ids)
        expect(test.log).to.have.length(1)
      })

      it('saves', async () => {
        await test.setAsync(input.empty, true)
        expect(test.data).to.have.length(1)
        expect(test.log).to.have.length(2)
      })
    })

    describe('reset()', () => {
      it('works', () => {
        test.reset()
        expect(test.data).to.have.length(0)
        expect(test.log).to.have.length(1)
      })

      it('saves', () => {
        test.add(input.empty)
        test.reset(true)
        expect(test.data).to.have.length(0)
        expect(test.log).to.have.length(2)
      })
    })

    describe('options()', () => {
      it('works', () => {
        test.options({ lang: '1' })
        expect(test._options.lang).to.be('1')
        expect(test.log).to.have.length(1)
      })

      it('saves', () => {
        test.options({ lang: '2' }, true)
        expect(test._options.lang).to.be('2')
        expect(test.log).to.have.length(2)
      })

      it('validates', () => {
        test.options({ format: 'real' })
        expect(test._options.format).to.be('real')
        expect(test.options.bind(test)).withArgs({ format: 'foo' }).to.throwException()
      })
    })

    describe('currentVersion()', () => {
      it('works', () => {
        expect(test.currentVersion()).to.be(1)
        test.add(input.empty, true)
        expect(test.currentVersion()).to.be(2)
      })
    })

    describe('retrieveVersion()', () => {
      it('works', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true)
        expect(test.log).to.have.length(2)

        const test2 = test.retrieveVersion(1)

        expect(test2.log).to.have.length(1)
        expect(test2.data).to.have.length(1)
      })

      it('doesn\'t change origin data', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true)
        expect(test.log).to.have.length(2)

        const test2 = test.retrieveVersion(1)

        expect(test2.log).to.have.length(1)
        expect(test2.data).to.have.length(1)
        expect(test.log).to.have.length(2)
        expect(test.data).to.have.length(2)
      })

      it('handles empty input', () => {
        test.add(input.empty, true)
        const image = test.retrieveVersion()
        expect(image.data).to.have.length(1)
        expect(image.log).to.have.length(1)
      })
      it('handles invalid input', () => {
        expect(test.retrieveVersion(50)).to.be(null)
        expect(test.retrieveVersion(-1)).to.be(null)
      })
    })

    describe('undo()', () => {
      it('works', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true).save()
        expect(test.log).to.have.length(3)

        const test2 = test.undo()

        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })

      it('doesn\'t change origin data', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true).save()
        expect(test.log).to.have.length(3)

        const test2 = test.undo()

        expect(test.log).to.have.length(3)
        expect(test.data).to.have.length(2)
        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })
    })

    describe('retrieveLastVersion()', () => {
      it('works', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true)
        expect(test.log).to.have.length(2)

        const test2 = test.retrieveLastVersion()

        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })

      it('doesn\'t change origin data', () => {
        expect(test.log).to.have.length(1)
        test.add(input.empty, true)
        expect(test.log).to.have.length(2)

        const test2 = test.retrieveLastVersion()

        expect(test.log).to.have.length(2)
        expect(test.data).to.have.length(2)
        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })
    })

    describe('save()', () => {
      it('works', () => {
        expect(test.log).to.have.length(1)
        test.save().add(input.empty).save()
        expect(test.log).to.have.length(3)

        const test2 = test.undo()

        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })

      it('doesn\'t change origin data', () => {
        expect(test.log).to.have.length(1)
        test.save().add(input.empty).save()
        expect(test.log).to.have.length(3)

        const test2 = test.undo()

        expect(test.log).to.have.length(3)
        expect(test.data).to.have.length(2)
        expect(test2.log).to.have.length(2)
        expect(test2.data).to.have.length(1)
      })
    })

    describe('sort()', () => {
      it('works', () => {
        test.set(input.sort)
        expect(test.data[0].author[0].family).to.be('b')
        expect(test.data[1].author[0].family).to.be('a')

        test.sort()
        expect(test.data[0].author[0].family).to.be('a')
        expect(test.data[1].author[0].family).to.be('b')
        expect(test.log).to.have.length(1)
      })

      it('saves', () => {
        test.set(input.sort)
        expect(test.data[0].author[0].family).to.be('b')
        expect(test.data[1].author[0].family).to.be('a')

        test.sort([], true)
        expect(test.data[0].author[0].family).to.be('a')
        expect(test.data[1].author[0].family).to.be('b')
        expect(test.log).to.have.length(2)
      })

      it('works with custom sorting orders', () => {
        test.set(input.sortSpecial)
        const ids = test.getIds()

        test.sort([
          'author',
          'issued',
          'title',
          'edition',
          '!page'
        ])

        expect(test.getIds()).to.eql(ids.reverse())
      })
    })

    describe('getIds()', () => {
      it('works', () => {
        test.set(input.ids)
        expect(test.data[0].id).to.be('b')
        expect(test.data[1].id).to.be('a')

        const out = test.getIds()

        expect(out[0]).to.be('b')
        expect(out[1]).to.be('a')
      })
    })

    describe('format()', () => {
      it('works', () => {
        test.set(input.ids)
        const out = test.format('data', { format: 'object' })
        expect(out[0]).not.to.have.key('invalid')
      })
    })

    describe('validateOptions()', () => {
      it('throws on non-objects', () => {
        expect(() => Cite.validateOptions({})).to.not.throwException()
        expect(() => Cite.validateOptions(true)).to.throwException('Options should be an object')
        expect(() => Cite.validateOptions('a')).to.throwException('Options should be an object')
        expect(() => Cite.validateOptions(1)).to.throwException('Options should be an object')
        expect(() => Cite.validateOptions()).to.throwException('Options should be an object')
      })

      describe('throws on invalid values for', () => {
        it('maxChainLength', () => {
          expect(() => Cite.validateOptions({ maxChainLength: 1 })).to.not.throwException()
          expect(() => Cite.validateOptions({ maxChainLength: {} })).to.throwException('Option maxChainLength should be a number')
          expect(() => Cite.validateOptions({ maxChainLength: 'a' })).to.throwException('Option maxChainLength should be a number')
          expect(() => Cite.validateOptions({ maxChainLength: true })).to.throwException('Option maxChainLength should be a number')
        })
        it('generateGraph', () => {
          expect(() => Cite.validateOptions({ generateGraph: true })).to.not.throwException()
          expect(() => Cite.validateOptions({ generateGraph: 1 })).to.throwException('Option generateGraph should be a boolean')
          expect(() => Cite.validateOptions({ generateGraph: {} })).to.throwException('Option generateGraph should be a boolean')
          expect(() => Cite.validateOptions({ generateGraph: 'a' })).to.throwException('Option generateGraph should be a boolean')
        })
        it('strict', () => {
          expect(() => Cite.validateOptions({ strict: true })).to.not.throwException()
          expect(() => Cite.validateOptions({ strict: 1 })).to.throwException('Option strict should be a boolean')
          expect(() => Cite.validateOptions({ strict: {} })).to.throwException('Option strict should be a boolean')
          expect(() => Cite.validateOptions({ strict: 'a' })).to.throwException('Option strict should be a boolean')
        })
        it('target', () => {
          expect(() => Cite.validateOptions({ target: 'a' })).to.not.throwException()
          expect(() => Cite.validateOptions({ target: 1 })).to.throwException('Option target should be a string')
          expect(() => Cite.validateOptions({ target: {} })).to.throwException('Option target should be a string')
          expect(() => Cite.validateOptions({ target: true })).to.throwException('Option target should be a string')
        })
        it('forceType', () => {
          expect(() => Cite.validateOptions({ forceType: 'a' })).to.not.throwException()
          expect(() => Cite.validateOptions({ forceType: 1 })).to.throwException('Option forceType should be a string')
          expect(() => Cite.validateOptions({ forceType: {} })).to.throwException('Option forceType should be a string')
          expect(() => Cite.validateOptions({ forceType: true })).to.throwException('Option forceType should be a string')
        })
      })
    })
  })
})
