const fetch = require('node-fetch')

const LOCALES = ['en-US', 'nl-NL', 'fr-FR', 'de-DE', 'es-ES']

Promise.all(LOCALES.map(locale => fetch(`https://raw.githubusercontent.com/citation-style-language/locales/master/locales-${locale}.xml`)
  .then(response => response.text())
  .then(text => text.replace(/\n +/g, ''))
  .then(text => [locale, text])
)).then(styles => Object.fromEntries(styles))
  .then(styles => JSON.stringify(styles, null, 2))
  .then(console.log)
