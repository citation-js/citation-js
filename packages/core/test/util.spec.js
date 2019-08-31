/* eslint-env mocha */

const { spawn } = require('child_process')
const path = require('path')
const assert = require('assert')

const { util } = require('../src/')

const userAgent = `Citation.js/${require('../package').version} Node.js/${process.version}`

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

let serverProcess
let serverName
const requests = {
  'responds to GET requests': [
    ['/inspect'],
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        connection: 'close',
        host: 'localhost:30200',
        'accept-encoding': 'gzip,deflate',
        'user-agent': userAgent
      },
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
      headers: {
        accept: '*/*',
        connection: 'close',
        host: 'localhost:30200',
        'accept-encoding': 'gzip,deflate',
        'user-agent': userAgent,
        'content-length': '2',
        'content-type': 'application/json'
      },
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
      headers: {
        accept: '*/*',
        connection: 'close',
        host: 'localhost:30200',
        'accept-encoding': 'gzip,deflate',
        'user-agent': userAgent,
        'content-length': '3',
        'content-type': 'text/plain'
      },
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
      headers: {
        accept: '*/*',
        connection: 'close',
        host: 'localhost:30200',
        'accept-encoding': 'gzip,deflate',
        'user-agent': 'foo'
      },
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
      assert.throws(() => util.deepCopy(input), {
        name: 'TypeError',
        message: 'Recursively copying circular structure'
      })
    })
  })

  describe('fetchFile', function () {
    before(function (done) {
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
          assert.throws(() => util.fetchFile(serverName + request[0], request[1]), expectedResponse)
        } else {
          const actualResponse = util.fetchFile(serverName + request[0], request[1])
          assert.deepStrictEqual(JSON.parse(actualResponse), expectedResponse)
        }
      })
      it(name + ' (async)', async function () {
        if (shouldThrow) {
          return assert.rejects(() => util.fetchFileAsync(serverName + request[0], request[1]), expectedResponse)
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
})
