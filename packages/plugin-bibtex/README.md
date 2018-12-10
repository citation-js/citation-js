# @citation-js/plugin-bibtex
Plugin for BibTeX formats for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-bibtex.svg)](https://npmjs.org/package/@citation-js/plugin-bibtex)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-bibtex.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-bibtex?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/plugin-bibtex.svg)
![Dependency status](https://david-dm.org/citation-js/citation-js/status.svg?path=packages%2Fplugin-bibtex)
---

## Install

    npm install @citation-js/plugin-bibtex

## Usage

Register by importing the package:

```js
require('@citation-js/plugin-bibtex')
```

## Formats

Formats and other features added by this plugin.

### BibTeX

This plugin adds input and output support for [BibTeX](http://www.bibtex.org/), both in text form and as a JSON representation. Input types are called `@bibtex/text` and `@bibtex/object`, output format is `bibtex`. The output has format dictionary support.

### Bib.TXT

This plugin adds input and output support for [Bib.TXT](http://bibtxt.github.io/), a simplified and modernised version of BibTeX. Input types are called `@bibtxt/text` and `@bibtex/object`, output format is `bibtxt`. The output has format dictionary support.

### Internal

This plugin also exposes input parsing methods concerning individual properties and types, under the types `@bibtex/prop` and `@bibtex/type`.
