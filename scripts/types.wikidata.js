const wdk = require('wikidata-sdk')
const fetch = require('node-fetch')

const TYPES = {
  'review-book': 10,
  review: 9,
  'entry-dictionary': 5,
  'entry-encyclopedia': 5,
  map: 5,
  dataset: 4,
  legislation: 1,

  'article-magazine': 0,
  bill: 0,
  chapter: 0,
  classic: 0,
  collection: 0,
  entry: 0,
  figure: 0,
  graphic: 0,
  hearing: 0,
  interview: 0,
  legal_case: 0,
  manuscript: 0,
  motion_picture: 0,
  musical_score: 0,
  pamphlet: 0,
  'paper-conference': 0,
  patent: 0,
  personal_communication: 0,
  'post-weblog': 0,
  report: 0,
  song: 0,
  speech: 0,
  standard: 0,
  thesis: 0,
  treaty: 0,

  broadcast: -1,
  'article-newspaper': -1,
  'article-journal': -1,
  periodical: -2,
  regulation: -2,
  post: -5,
  webpage: -6,
  software: -7,
  article: -9,
  book: -10,
  performance: -11,
  event: -12,
  document: -100
}

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
