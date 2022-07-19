const wdk = require('wikidata-sdk')
const fetch = require('node-fetch')
const { TYPE_PRIORITIES: TYPES } = require('../packages/plugin-wikidata/lib/prop.js')

const SOURCE_QUERY = `PREFIX csl: <https://citationstyles.org/ontology/type/>
SELECT DISTINCT ?item ?type WHERE {
  {
    VALUES (?uri ?type) { ${Object.keys(TYPES).map(type => `(csl:${type} "${type}")`).join(' ')} }
    ?root wdt:P2888|wdt:P1709 ?uri .
  } UNION {
    VALUES ?root { wd:Q3331189 wd:Q7725634 }
    BIND("book" as ?type)
  }
  ?item wdt:P279* ?root .
}`

fetch(wdk.sparqlQuery(SOURCE_QUERY))
  .then(results => results.json())
  .then(wdk.simplify.sparqlResults)
  .then(results => results.reduce((obj, { item, type }) => {
    if (!obj[item] || TYPES[type] > TYPES[obj[item]]) {
      obj[item] = type
    } else if (obj[item] && TYPES[type] === TYPES[obj[item]]) {
      console.error(item, obj[item], type)
    }

    return obj
  }, {}))
  .then(mapping => console.log(JSON.stringify(mapping)))
  .catch((err) => { throw err })
