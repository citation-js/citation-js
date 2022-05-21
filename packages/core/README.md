# @citation-js/core
Convert different bibliographic metadata sources.

[![NPM version](https://img.shields.io/npm/v/@citation-js/core.svg)](https://npmjs.org/package/@citation-js/core)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/core.svg)](https://npmcharts.com/compare/@citation-js%2Fcore?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/core.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@citation-js/core)
---

## Install

    npm install @citation-js/core

## Usage

### Getting Started

You can read a guide on how to get started, together with some tutorials and examples, [here](https://citation.js.org/api/tutorial-getting_started.html).

### `Cite`

> [More info](https://citation.js.org/api/tutorial-cite_.html)

To use the [`Cite`](#cite) constructor, `require()` the module like this:

```js
const {Cite} = require('@citation-js/core')
```

For example, to get the bibliographical data of the Wikidata item [`wd:Q21972834`](https://wikidata.org/wiki/Q21972834), and then format it in HTML, English and APA:

```js
let example = new Cite('Q21972834')

let output = example.format('bibliography', {
  format: 'html',
  template: 'apa',
  lang: 'en-US'
})

console.log(output)
```

To test this code, go to [RunKit](https://runkit.com/larsgw/591b5651bd9b40001113931c).

### Async

Use the async API (recommended for Wikidata, URL, and DOI input) like this:

```js
let example = await Cite.async('Q21972834')

let output = example.format('bibliography', {
  format: 'html',
  template: 'apa',
  lang: 'en-US'
})

console.log(output)
```

> `Cite.async()` also supports options as the second argument, and a callback function as last argument.
