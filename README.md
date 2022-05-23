<p align="center"><img alt="Citation.js" src="https://citation.js.org/static/img/square_logo_medium.png" /></p>

Citation.js converts formats like BibTeX, Wikidata JSON and BibJSON to CSL-JSON to convert to other formats like APA, Vancouver, RIS and back to BibTeX.

Read the paper [*Citation.js: a format-independent, modular bibliography tool for the browser and command line*](https://peerj.com/articles/cs-214/?td=bl).
![DOI 10.7717/peerj-cs.214](https://img.shields.io/badge/DOI-10.7717%2Fpeerj--cs.214-blue)

---

<p align="center"><a href="https://citation.js.org">Site</a> • <a href="https://github.com/citation-js/citation-js">Repo</a> • <a href="https://citation.js.org/api/tutorial-getting_started.html">Getting Started</a> • <a href="https://citation.js.org/api">Documentation</a> • <a href="https://citation.js.org/demo">Demo</a></p>

---

[![NPM version](https://img.shields.io/npm/v/@citation-js/core.svg)](https://npmjs.org/package/@citation-js/core)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/core.svg)](https://npmcharts.com/compare/@citation-js%2Fcore?minimal=true)
[![Build Status](https://github.com/citation-js/citation-js/workflows/build/badge.svg)](https://github.com/citation-js/citation-js/actions?query=workflow%3Abuild)
![License](https://img.shields.io/npm/l/@citation-js/core.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Join the chat at https://gitter.im/citation-js/Lobby](https://badges.gitter.im/citation-js/Lobby.svg)](https://gitter.im/citation-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![DOI](https://zenodo.org/badge/doi/10.5281/zenodo.1005176.svg)](https://doi.org/10.5281/zenodo.1005176)

# Packages

| [citation-js/citation-js](https://github.com/citation-js/citation-js) | replaces | [larsgw/citation.js](https://github.com/larsgw/citation.js) |
|---|---|---|
| This repository contains the npm package `@citation-js/core` and several other components. || This repository contains the npm package `citation-js` that wraps the aforementioned components for backwards compatibility. |

## Core

[Core functionality](https://github.com/citation-js/citation-js/tree/master/packages/core):

  * `Cite`: reference manager
  * `plugins`: plugins manager
  * `util`: several utility functions and classes
  * `version`

## Plugins

| Plugin | Description |
|---|---|
| [`plugin-bibjson`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-bibjson) | Plugin for BibJSON formats for Citation.js |
| [`plugin-bibtex`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-bibtex) | Plugin for BibTeX formats for Citation.js |
| [`plugin-csl`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-csl) | Plugin for CSL output for Citation.js |
| [`plugin-doi`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-doi) | Plugin for DOI input for Citation.js |
| [`plugin-ris`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-ris) | Plugin for RIS formats for Citation.js |
| [`plugin-wikidata`](https://github.com/citation-js/citation-js/tree/master/packages/plugin-wikidata) | Plugin for Wikidata for Citation.js |

### Plugins in other repositories

| Plugin | Description |
|---|---|
| [`plugin-software-formats`](https://github.com/citation-js/plugin-software-formats) | Plugin for CFF, Zenodo JSON, input from GitHub and npm URLs |
| [`plugin-isbn`](https://github.com/citation-js/plugin-isbn) | Plugin for ISBNs (from Google Books, OpenLibrary) |
| [`plugin-orcid`](https://github.com/citation-js/plugin-orcid) | Plugin for ORCID profiles (metadata from DOIs and ISBNs) |
| [`plugin-pubmed`](https://github.com/citation-js/plugin-pubmed) | Plugin for PubMed and PubMed Central identifiers |
| [`plugin-quickstatements`](https://github.com/citation-js/plugin-quickstatements) | Plugin for output to Wikidata QuickStatements |
| [`plugin-zotero-translation-server`](https://github.com/citation-js/plugin-zotero-translation-server) | Plugin for Zotero JSON and interfacing with a Zotero translation server |
| [`plugin-refer`](https://github.com/citation-js/plugin-refer) | Plugin for the refer file format |
| [`plugin-refworks`](https://github.com/citation-js/plugin-refworks) | Plugin for the RefWorks tagged format |

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

# Acknowledgements

[![JS.ORG](https://logo.js.org/dark_tiny.png)](https://js.org)

* Thanks to the JS.ORG [DNS service](https://dns.js.org) for the site url!

[<img width="250" alt="BrowserStack" src="https://citation.js.org/static/img/browserstack-logo-600x315.png" />](https://browserstack.com)

* Thanks to [BrowserStack](https://browserstack.com) for the free Open Source plan, allowing me to automate testing browser support, and avoid issues like [this one](https://github.com/larsgw/citation.js/issues/87)!
