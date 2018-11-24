<p align="center"><img alt="Citation.js" src="https://citation.js.org/static/img/square_logo_medium.png" /></p>

Citation.js converts formats like BibTeX, Wikidata JSON and BibJSON to CSL-JSON to convert to other formats like APA, Vancouver, RIS and back to BibTeX.

---

<p align="center"><a href="https://citation.js.org">Site</a> • <a href="https://github.com/citation-js/citation-js">Repo</a> • <a href="https://citation.js.org/api/tutorial-getting_started.html">Getting Started</a> • <a href="https://citation.js.org/api">Documentation</a> • <a href="https://citation.js.org/demo">Demo</a></p>

---

[![NPM version](https://img.shields.io/npm/v/@citation-js/core.svg)](https://npmjs.org/package/@citation-js/core)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/core.svg)](https://npmcharts.com/compare/@citation-js%2Fcore?minimal=true)
[![Build Status](https://travis-ci.org/citation-js/citation-js.svg?branch=master)](https://travis-ci.org/citation-js/citation-js)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Join the chat at https://gitter.im/citation-js/Lobby](https://badges.gitter.im/citation-js/Lobby.svg)](https://gitter.im/citation-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![License](https://img.shields.io/npm/license/@citation-js/core.svg)

# Packages

## Core

[Core functionality](https://github.com/citation-js/citation-js/tree/master/packages/core):

  * `Cite`: reference manager
  * `plugins`: plugins manager
  * `util`: several utility functions and classes
  * `version`

## CLI

[CLI](https://github.com/citation-js/citation-js/tree/master/packages/cli):

    Usage: citation-js [options]

    Options:
      -V, --version                   output the version number
      -i, --input <path>              Input file. If all input options are omitted, it uses stdin
      -t, --text <string>             Input text. If all input options are omitted, it uses stdin
      -u, --url <string>              Deprecated in favor of -t, --text. If all input options are omitted, it uses stdin
      -o, --output <path>             Output file (omit file extension). If this option is omitted, the output is written to stdout
      -R, --output-non-real           Output as a text file
      -f, --output-type <option>      Output structure type: string, html, json (default: "json")
      -s, --output-style <option>     Output scheme. A combination of --output-format json and --output-style citation-* is considered invalid. Options: csl (Citation Style Lanugage JSON), bibtex, citation-* (where * is any formatting style) (default: "csl")
      -l, --output-language <option>  Output language. [RFC 5646](https://tools.ietf.org/html/rfc5646) codes (default: "en-US")
      -h, --help                      output usage information

## Plugins

| Plugin | Description |
|---|---|
| [`plugin-bibjson`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-bibjson) | Plugin for BibJSON formats for Citation.js |
| [`plugin-bibtex`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-bibtex) | Plugin for BibTeX formats for Citation.js |
| [`plugin-csl`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-csl) | Plugin for CSL output for Citation.js |
| [`plugin-doi`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-doi) | Plugin for DOI input for Citation.js |
| [`plugin-ris`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-ris) | Plugin for RIS formats for Citation.js |
| [`plugin-wikidata`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-wikidata) | Plugin for Wikidata for Citation.js |
