# @citation-js/plugin-wikidata
Plugin for Wikidata for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-wikidata.svg)](https://npmjs.org/package/@citation-js/plugin-wikidata)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-wikidata.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-wikidata?minimal=true)
![License](https://img.shields.io/npm/license/@citation-js/plugin-wikidata.svg)
---

## Install

    npm install @citation-js/plugin-wikidata

## Usage

Register by importing the package:

```js
require('@citation-js/plugin-wikidata')
```

## Formats

Formats and other features added by this plugin.

### Input

This plugin accepts [Wikidata](https://wikidata.org) IDs in the following formats:

  * `@wikidata/id`: single ID
  * `@wikidata/list+text`: whitespace- or comma-delimited list of IDs
  * `@wikidata/api`: API URL
  * `@wikidata/url`: entity URL
  * `@wikidata/list+object`: array of IDs

API responses (`@wikidata/object`) are also supported. Additionally, this plugin exposes input parsing methods concerning individual properties and types, under the types `@wikidata/prop` and `@wikidata/type`.
