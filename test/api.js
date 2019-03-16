const { URL } = require('url')
const wikidata = require('./data/api/wikidata')
const doi = require('./data/api/doi')

const configs = [{
  domain: /^(www\.)?wikidata\.org/,
  path: /^\/w\/api\.php/,
  response ({ searchParams }) {
    const response = { entities: {} }
    const ids = searchParams.get('ids').split('|')
    for (const id of ids) {
      response.entities[id] = wikidata.entities[id]
    }
    return JSON.stringify(response)
  }
}, {
  domain: /^((www|dx)\.)?doi\.org/,
  path: /^\//,
  response ({ pathname }) {
    return JSON.stringify(doi[pathname.slice(1)][0])
  }
}]

const mockResponse = function (request, opts) {
  const url = new URL(request)
  const { hostname, pathname: path } = url
  const { response } = configs.find(config => config.domain.test(hostname) && config.path.test(path))
  return response(url)
}

const fetchFile = (...args) => mockResponse(...args)
const fetchFileAsync = (...args) => Promise.resolve(mockResponse(...args))

module.exports = function (core) {
  if (process.env.TEST_MOCK_HTTP !== 'false') {
    const mock = require('mock-require')
    const fakeCore = Object.assign({}, core)
    fakeCore.util = Object.assign({}, core.util)
    fakeCore.util.fetchFile = fetchFile
    fakeCore.util.fetchFileAsync = fetchFileAsync

    mock('@citation-js/core', fakeCore)
  } else {
    // start sync-request beforehand (interferes with the reporter otherwise)
    try { require('sync-request')() } catch (e) { }
  }

  return core
}
