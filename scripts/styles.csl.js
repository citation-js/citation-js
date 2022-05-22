const fetch = require('node-fetch')

const STYLES = {
  apa: 'apa',
  vancouver: 'vancouver',
  harvard1: 'harvard-cite-them-right'
}

Promise.all(Object.entries(STYLES).map(([name, style]) => fetch(`https://zotero.org/styles/${style}`)
  .then(response => response.text())
  .then(text => text.replace(/\n +/g, ''))
  .then(text => [name, text])
)).then(styles => Object.fromEntries(styles))
  .then(styles => JSON.stringify(styles, null, 2))
  .then(console.log)
