// const fs = require('fs')
// const path = require('path')
//
// const packageDir = path.join(__dirname, 'packages')
// const packageSrc = fs.readdirSync(packageDir)
//   .map(package => path.join(packageDir, package, 'src'))

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
    // include: packageSrc,
    // exclude: ['packages/cli/src'],
    include: ['packages/core/src'],
    exclude: ['packages/core/src/plugin-common'],
    includePattern: '\\.js(doc)?$',
  },
  opts: {
    encoding: 'utf8',
    readme: './README.md',
    recurse: true,
    destination: './jsdoc/',
    tutorials: './packages/core/docs/'
  },
  templates: {
    default: {
      layoutFile: '.jsdoc.tmpl',
      // includeDate: false
      includeDate: true
    },
    cleverLinks: false,
    monospaceLinks: false
  }
}
