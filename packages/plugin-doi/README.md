# @citation-js/plugin-doi
Plugin for DOI input for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-doi.svg)](https://npmjs.org/package/@citation-js/plugin-doi)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-doi.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-doi?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/plugin-doi.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@citation-js/plugin-doi)
---

## Install

    npm install @citation-js/plugin-doi

## Usage

Register by importing the package:

```js
require('@citation-js/plugin-doi')
```

### 'Polite' API access

The plugin fetches data from DOIs using [DOI Content Negotiation](https://citation.crosscite.org/docs),
which means the Crossref, DataCite, and mEDRA APIs are indirectly used.

[Crossref strongly encourages](https://api.crossref.org/swagger-ui/index.html)
adding a `mailto:` link to the `User-Agent` header or URL parameters
to get higher rate limits. Because the Crossref API is only used indirectly,
the URL parameter method cannot be used consistently. Additionally, the `User-Agent`
header cannot be set in the browser. For non-browser usage however,
the user agent can be set like this:

```js
const { util, version } = require('@citation-js/core')

util.setUserAgent(`Example Foo (mailto:foo@example.org) Citation.js/${version} Node.js/${process.versions.node}`)
```

## Formats

Formats and other features added by this plugin.

### Input

Supports DOIs inputted in the following ways:

  * `@doi/api`: a `doi.org` URL
  * `@doi/id`: a single DOI
  * `@doi/list+text`: whitespace-separated list of DOIs
  * `@doi/list+object`: array of DOIs

Additionally, the following internal type is exposed:

  * `@doi/type`: fix the `type` value in certain API responses
