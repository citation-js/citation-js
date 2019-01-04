const wdk = require('wikidata-sdk')
require('isomorphic-fetch')

const ROOT = 'Q386724' // work
const PREFIX = 'https://citationstyles.org/ontology/type/'

const SOURCE_QUERY = `SELECT DISTINCT ?item ?type WHERE  {
  ?item wdt:P279+ wd:${ROOT} .
  ?item wdt:P2888|wdt:P1709 ?type .
  FILTER (STRSTARTS(STR(?type), "${PREFIX}"))
}`
const TREE_QUERY = `SELECT DISTINCT ?item ?parent WHERE {
  ?item wdt:P279+ wd:${ROOT} .
  ?item wdt:P279 ?parent .
}`

function getWikidataMapping () {
  return fetch(wdk.sparqlQuery(SOURCE_QUERY))
    .then(results => results.json())
    .then(wdk.simplify.sparqlResults)
    .then(results => results.reduce((obj, {item, type}) => {
      obj[item] = type.substring(PREFIX.length)
      return obj
    }, {}))
}

function getWikidataGraph () {
  return fetch(wdk.sparqlQuery(TREE_QUERY))
    .then(results => results.json())
    .then(wdk.simplify.sparqlResults)
    .then(results => results.reduce((obj, {item, parent}) => {
      if (obj[item]) {
        obj[item].push(parent)
      } else {
        obj[item] = [parent]
      }
      return obj
    }, {}))
}

Promise.all([
  getWikidataMapping(),
  getWikidataGraph()
])
  .then(([sourceMapping, graph]) => {
    const mapping = {}

    function add (item) {
      if (item in sourceMapping) {
        return mapping[item] = sourceMapping[item]
      } else if (item in mapping) {
        return mapping[item]
      } else if (item in graph) {
        const parents = []
          .concat(...graph[item].map(add))
          .filter((v, i, a) => v && a.indexOf(v) === i)
        return mapping[item] = parents[0]
      } else {
        // root
        return undefined
      }
    }

    Object.keys(graph).forEach(add)

    return mapping
  })
  .then(mapping => console.log(JSON.stringify(mapping)))
  .catch((err) => { throw err })
