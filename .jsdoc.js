const fs = require('fs')
const path = require('path')

const lerna = require('./lerna.json')
const version = lerna.version.split('.', 2).join('.')

const packageDir = path.join(__dirname, 'packages')
const packageSrc = fs.readdirSync(packageDir)
  .map(package => path.join(packageDir, package, 'src'))

module.exports = {
  plugins: ['plugins/markdown'],
  markdown: {
    idInHeadings: true
  },
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: packageSrc,
    exclude: [
      'packages/cli/src',
      'packages/core/src/plugin-common'
    ],
    includePattern: '\\.js(doc)?$',
  },
  opts: {
    // template: '../jsdoc-template/default',
    // template: '../jsdoc-template',
    encoding: 'utf8',
    readme: './README.md',
    recurse: true,
    destination: './jsdoc/' + version + '/',
    tutorials: './packages/core/docs/'
  },
  templates: {
    default: {
      layoutFile: '.jsdoc.tmpl',
      includeDate: true
    },
    cleverLinks: false,
    monospaceLinks: false
  }
}
