const http = require('http')
const { URL } = require('url')

const hostname = 'localhost'
const port = 30200
const base = `http://${hostname}:${port}/`

const server = http.createServer(function router (req, res) {
  const { pathname } = new URL(req.url, base)

  switch (pathname) {
    case '/inspect': {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      let body = ''
      req.on('data', c => { body += c })
      req.on('end', function () {
        // Drop client-injected headers that differ between fetch implementations.
        const headers = { ...req.headers }
        for (const name of ['accept-encoding', 'accept-language', 'sec-fetch-mode']) {
          delete headers[name]
        }
        res.end(JSON.stringify({
          method: req.method,
          headers,
          body
        }))
      })
      break
    }

    case '/error/404':
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end('Resource not found')
      break

    case '/html':
      res.setHeader('Content-Type', 'text/html')
      res.end('<html><body></body></html>')
      break

    case '/json':
      res.setHeader('Content-Type', 'application/json')
      res.end('{"hello":"world"}')
      break
  }
})

server.keepAliveTimeout = 1000
server.listen(port, hostname, function () { process.stdout.write(base) })
