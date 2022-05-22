const fetch = require('node-fetch')

const fs = require('fs')

const dois = ['10.1021/ja01577a030', '10.1101/2021.08.15.21262067']
const json = response => response.json()

Promise.all(dois.map(doi => fetch('https://doi.org/' + doi, {
  headers: { Accept: 'application/vnd.citationstyles.csl+json' }
})))
  .then(results => Promise.all(results.map(json)))
  .then(results => results.reduce((o, result) => {
    o[result.DOI] = [result]
    return o
  }, {}))
  .then(results => JSON.stringify(results, null, 2))
  .then(result => fs.writeFileSync('test/data/api/doi.json', result))
