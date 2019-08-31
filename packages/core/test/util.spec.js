/* eslint-env mocha */

const path = require('path')
const assert = require('assert')

const { util } = require('../src/')

function deepNotEqual (a, b) {
  if (a == null && b == null) {
    return
  } else if (a.constructor === Array && b.constructor === Array) {
    assert.notStrictEqual(a, b)
    a.forEach((v, i) => deepNotEqual(v, b[i]))
  } else if (a.constructor === Object && b.constructor === Object) {
    assert.notStrictEqual(a, b)
    Object.keys(a).forEach(v => deepNotEqual(v, b[v]))
  } else {
    return
  }
}

describe('util', function () {
  describe('deepCopy', function () {
    it('copies', function () {
      const input = { a: [{}], b: {} }
      const output = util.deepCopy(input)
      assert.deepStrictEqual(output, input)
      deepNotEqual(output, input)
    })
    it('keeps special values', function () {
      const input = { a: Symbol('keep this') }
      const output = util.deepCopy(input)
      assert.deepStrictEqual(output, input)
      assert.strictEqual(output.a, input.a)
      deepNotEqual(output, input)
    })
    it('throws for circular structures', function () {
      const input = {}
      input.a = input
      assert.throws(() => util.deepCopy(input), {
        name: 'TypeError',
        message: 'Recursively copying circular structure'
      })
    })
  })
})
