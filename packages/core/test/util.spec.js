/* eslint-env mocha */

const { spawn } = require('child_process')
const path = require('path')
const assert = require('assert')

const { util } = require('../src/index.js')
const pkg = require('../package')

const userAgent = `Citation.js/${pkg.version} Node.js/${process.version}`

function deepNotEqual (a, b) {
  if (a == null && b == null) {
    return false
  } else if (a.constructor === Array && b.constructor === Array) {
    assert.notStrictEqual(a, b)
    a.forEach((v, i) => deepNotEqual(v, b[i]))
  } else if (a.constructor === Object && b.constructor === Object) {
    assert.notStrictEqual(a, b)
    Object.keys(a).forEach(v => deepNotEqual(v, b[v]))
  }
}

const nodeVersion = parseInt(process.version.split('.')[0])
function getHeaders (headers) {
  if (nodeVersion >= 18) {
    return {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate',
      'accept-language': '*',
      connection: 'keep-alive',
      host: 'localhost:30200',
      'sec-fetch-mode': 'cors',
      ...headers
    }
  } else {
    return {
      accept: '*/*',
      'accept-encoding': 'gzip,deflate',
      connection: 'close',
      host: 'localhost:30200',
      ...headers
    }
  }
}

let serverProcess
let serverName
const requests = {
  'responds to GET requests': [
    ['/inspect'],
    {
      method: 'GET',
      headers: getHeaders({ 'user-agent': userAgent }),
      body: ''
    }
  ],
  'responds to POST requests': [
    [
      '/inspect',
      {
        body: {}
      }
    ],
    {
      method: 'POST',
      headers: getHeaders({
        'user-agent': userAgent,
        'content-length': '2',
        'content-type': 'application/json'
      }),
      body: '{}'
    }
  ],
  'responds to POST requests with non-JSON bodies': [
    [
      '/inspect',
      {
        body: 'foo'
      }
    ],
    {
      method: 'POST',
      headers: getHeaders({
        'user-agent': userAgent,
        'content-length': '3',
        'content-type': 'text/plain'
      }),
      body: 'foo'
    }
  ],
  'throws on unsuccesful error codes': [
    ['/error/404'],
    {
      name: 'Error',
      message: 'Server responded with status code 404',
      status: 404
    },
    true
  ],
  'throws on incompatible content types': [
    [
      '/html',
      {
        checkContentType: true,
        headers: { Accept: 'application/vnd.citationstyles.csl+json' }
      }
    ],
    {
      name: 'Error',
      message: 'Server responded with content-type text/html',
      status: 200
    },
    true
  ],
  'responds on compatible types': [
    [
      '/json',
      {
        checkContentType: true,
        headers: { Accept: 'application/json' }
      }
    ],
    { hello: 'world' }
  ],
  'responds when all types are compatible': [
    [
      '/json',
      {
        checkContentType: true
      }
    ],
    { hello: 'world' }
  ],
  'accept custom user agents as header': [
    [
      '/inspect',
      {
        headers: { 'User-Agent': 'foo' }
      }
    ],
    {
      method: 'GET',
      headers: getHeaders({ 'user-agent': 'foo' }),
      body: ''
    }
  ]
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
      // assert.throws(() => util.deepCopy(input), {
      //   name: 'TypeError',
      //   message: 'Recursively copying circular structure'
      // })
      assert.throws(() => util.deepCopy(input), function (error) {
        assert.strictEqual(error.name, 'TypeError')
        assert.strictEqual(error.message, 'Recursively copying circular structure')
        return true
      })
    })
  })

  describe('fetchFile', function () {
    before(function (done) {
      this.timeout(4000)
      serverProcess = spawn(process.execPath, [path.join(__dirname, 'server.js')])
      serverProcess.stderr.on('data', chunk => console.error(chunk.toString()))
      serverProcess.stdout.on('data', function (chunk) {
        serverName = chunk.toString().trim().slice(0, -1)
        done()
      })
    })

    after(function (done) {
      serverProcess.on('close', done)
      serverProcess.kill()
    })

    for (const name in requests) {
      const [request, expectedResponse, shouldThrow] = requests[name]
      it(name, function () {
        if (shouldThrow) {
          // assert.throws(() => util.fetchFile(serverName + request[0], request[1]), expectedResponse)
          assert.throws(() => util.fetchFile(serverName + request[0], request[1]), function (error) {
            for (const prop in expectedResponse) {
              assert.strictEqual(error[prop], expectedResponse[prop])
            }
            return true
          })
        } else {
          const actualResponse = util.fetchFile(serverName + request[0], request[1])
          assert.deepStrictEqual(JSON.parse(actualResponse), expectedResponse)
        }
      })
      it(name + ' (async)', async function () {
        if (shouldThrow) {
          // return assert.rejects(() => util.fetchFileAsync(serverName + request[0], request[1]), expectedResponse)
          return util.fetchFileAsync(serverName + request[0], request[1]).catch(function (error) {
            for (const prop in expectedResponse) {
              assert.strictEqual(error[prop], expectedResponse[prop])
            }
            return true
          })
        } else {
          const actualResponse = await util.fetchFileAsync(serverName + request[0], request[1])
          assert.deepStrictEqual(JSON.parse(actualResponse), expectedResponse)
        }
      })
    }

    it('accept custom user agent as setting', function () {
      const [request, expectedResponse] = requests['accept custom user agents as header']
      const headers = { ...request[1].headers }
      delete headers['User-Agent']
      util.setUserAgent('foo')
      const actualResponse = util.fetchFile(serverName + request[0], { ...request[1], headers })
      assert.deepStrictEqual(JSON.parse(actualResponse), expectedResponse)
      util.setUserAgent(userAgent)
    })
    it('accept custom user agent as setting (async)', async function () {
      const [request, expectedResponse] = requests['accept custom user agents as header']
      const headers = { ...request[1].headers }
      delete headers['User-Agent']
      util.setUserAgent('foo')
      const actualResponse = await util.fetchFileAsync(serverName + request[0], { ...request[1], headers })
      assert.deepStrictEqual(JSON.parse(actualResponse), expectedResponse)
      util.setUserAgent(userAgent)
    })

    it('use default user agent (async)', async function () {
      const [request, expectedResponse] = requests['accept custom user agents as header']
      const headers = { ...request[1].headers }
      delete headers['User-Agent']
      util.setUserAgent(undefined)
      const actualResponse = await util.fetchFileAsync(serverName + request[0], { ...request[1], headers })
      assert.deepStrictEqual(JSON.parse(actualResponse), {
        ...expectedResponse,
        headers: {
          ...expectedResponse.headers,
          'user-agent': 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)'
        }
      })
      util.setUserAgent(userAgent)
    })
  })

  describe('fetchId', function () {
    it('generates an id', function () {
      assert.ok(/^\d+$/.test(util.fetchId([], '')), 'id does not conform to pattern')
    })
    it('uses prefix', function () {
      assert.ok(/^foo\d+$/.test(util.fetchId([], 'foo')), 'id does not conform to pattern')
    })
  })

  describe('Register', function () {
    it('takes an existing object', function () {
      assert.strictEqual((new util.Register({ foo: 'bar' })).get('foo'), 'bar')
    })
    it('set()', function () {
      const register = new util.Register()
      register.set('foo', 'bar')
      assert.strictEqual(register.get('foo'), 'bar')
    })
    it('add()', function () {
      const register = new util.Register()
      register.add('foo', 'bar')
      assert.strictEqual(register.get('foo'), 'bar')
    })
    it('remove()', function () {
      const register = new util.Register({ foo: 'bar' })
      register.remove('foo')
      assert.notStrictEqual(register.get('foo'), 'bar')
    })
    it('get()', function () {
      const register = new util.Register({ foo: 'bar' })
      assert.strictEqual(register.get('foo'), 'bar')
    })
    it('has()', function () {
      const register = new util.Register({ foo: 'bar' })
      assert.ok(register.has('foo'))
    })
    it('list()', function () {
      const register = new util.Register({ foo: 'bar' })
      assert.deepStrictEqual(register.list(), ['foo'])
    })
  })
})
