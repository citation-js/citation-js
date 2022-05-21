# @citation-js/plugin-csl
Plugin for CSL output for Citation.js. Output generation is done with [`citeproc-js`](https://github.com/Juris-M/citeproc-js).

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-csl.svg)](https://npmjs.org/package/@citation-js/plugin-csl)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-csl.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-csl?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/plugin-csl.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@citation-js/plugin-csl)
---

## Install

    npm install @citation-js/plugin-csl

## Usage

Register by importing the package:

```js
require('@citation-js/plugin-csl')
```

## Formats

Formats and other features added by this plugin. General output options:

  * `template`: the style template to use. Currently, the following are built-in:
    * `apa` (default)
    * `vancouver`
    * `harvard1`
  * `lang`: the locale to use. Currently, the following are built-in:
    * `en-US` (default)
    * `es-ES`
    * `de-DE`
    * `fr-FR`
    * `nl-NL`
  * `format`: output (markup) format. Note: this doesn't support the output format dictionaries
  * `entry` (`String`, `Array[String]`): entry ID or list of entry IDs to identify the items to cite

### Bibliography

This plugin adds the output format `bibliography`, and accepts the following specific options:

  * `prepend` (`String`, `Function`): prepend static or dynamic text to each entry
  * `append` (`String`, `Function`): append static or dynamic text to each entry
  * `nosort` (`Boolean`, default: `false`): do not sort according to the style-defined rules
  * `asEntryArray` (`Boolean`, default: `false`): return an array of entries consisting of an id and the output for that individual entry

Here's an example for `prepend` and `append`:

```js
let cite = new Cite({ id: 'a', title: 'Item A' })

cite.format('bibliography', { append: ' [foobar]' })
// 'Item A. (n.d.). [foobar]\n'

cite.format('bibliography', { prepend (entry) { return `${entry.id}: ` } })
// 'a: Item A. (n.d.).\n'
```

And here's another example, possibly more realistic:

```js
let cite = new Cite('Q30000000')

let date = (new Date()).toLocaleDateString()

cite.format('bibliography', {
  format: 'html',
  template: 'apa',
  prepend (entry) {
    return `[${entry.id}]: `
  },
  append: ` [Retrieved on ${date}]`
})

// `<div class="csl-bib-body">
//   <div data-csl-entry-id="Q30000000" class="csl-entry">
//     [Q30000000]: Miccadei, S., De Leo, R., Zammarchi, E., Natali, P. G., &#38; Civitareale, D. (2002). The Synergistic Activity of Thyroid Transcription Factor 1 and Pax 8 Relies on the Promoter/Enhancer Interplay. <i>Molecular Endocrinology</i>, <i>16</i>(4), 837–846. https://doi.org/10.1210/MEND.16.4.0808 [Retrieved on 2018-7-10]
//   </div>
// </div>`
```

This prepends `[$ID]: ` to each entry, where `$ID` is the ID of that entry, and appends ` [Retrieved on $DATE]`, where `$DATE` is today (constant for all entries).

Here's an example for `asEntryArray`:

```js
const cite = new Cite([
  { id: 'a', title: 'Item A', issued: { literal: 2021 } },
  { id: 'b', title: 'Item B', issued: { literal: 2021 } }
])

cite.format('bibliography', { asEntryArray: true })
// [
//   [
//     "a"
//     "Item A. (2021).\n"
//   ],
//   [
//     "b"
//     "Item B. (2021).\n"
//   ]
// ]
```

### Citation

Here's an example for `entry`:

```js
let cite = new Cite([
  { id: 'a', title: 'Item A', issued: { 'date-parts': [[2016]] } },
  { id: 'b', title: 'Item B', issued: { 'date-parts': [[2017]] } },
  { id: 'c', title: 'Item C', issued: { 'date-parts': [[2018]] } }
])

cite.format('citation')
// '(“Item A,” 2016; “Item B,” 2017; “Item C,” 2018)'

cite.format('citation', { entry: ['a', 'b'] })
// '(“Item A,” 2016; “Item B,” 2017)'

cite.format('citation', { entry: 'a' })
// '(“Item A,” 2016)'
```

### Configuration

It is possible to add different styles and locales.

```js
const { Cite, plugins } = require('@citation-js/core')
```

#### Templates

Different [CSL Templates](https://github.com/citation-style-language/styles) can be registered like this:

```js
let templateName = 'custom'
let template = '<?xml version="1.0" encoding="utf-8"?><style ...>...</style>' // The actual XML file

let config = plugins.config.get('@csl')
config.templates.add(templateName, template)

let example = new Cite(...)
example.format('bibliography', {
  format: 'html',
  template: templateName,
  lang: 'en-US'
})
```

#### Locales

Different [CSL Locales](https://github.com/citation-style-language/locales) can be registered like this:

```js
let language = 'en-GB'
let locale = '<?xml version="1.0" encoding="utf-8"?><locale ...>...</locale>' // The actual XML file

let config = plugins.config.get('@csl')
config.locales.add(language, locale)

let example = new Cite(...)
example.format('bibliography', {
  format: 'html',
  template: 'apa',
  lang: language
})
```

#### Engine

The configuration object also exposes an internal method to prepare a Citeproc engine with given data and configuration:

```js
let config = plugins.config.get('@csl')

let citeproc = plugins.engine(
  /* data: */ [{ ... }],
  /* template: */ 'apa',
  /* locale: */ 'en-US',
  /* format: */ 'html'
)

let sortedIds = citeproc.updateItems(/* ids: */ [...])
let makeBibliography = citeproc.makeBibliography()
```
