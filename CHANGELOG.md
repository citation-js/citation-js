# [0.4.0-rc.2](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.1...v0.4.0-rc.2) (2019-02-26)


### Bug Fixes

* **core:** keep custom props when normalizing ([7b33982](https://github.com/citation-js/citation-js/commit/7b33982)), closes [#8](https://github.com/citation-js/citation-js/issues/8)
* **core:** pass options from Cite.async ([663c6c1](https://github.com/citation-js/citation-js/commit/663c6c1))
* **core:** support node 6 ([a1ebf08](https://github.com/citation-js/citation-js/commit/a1ebf08))
* **plugin-bibtex:** support node 6 ([8f6839b](https://github.com/citation-js/citation-js/commit/8f6839b))
* **plugin-wikidata:** support more than 50 WD IDs ([#11](https://github.com/citation-js/citation-js/issues/11)) ([79ae40c](https://github.com/citation-js/citation-js/commit/79ae40c))


### Features

* **cli:** add --pipe option ([a2993cc](https://github.com/citation-js/citation-js/commit/a2993cc))
* **cli:** error on invalid options for pipe ([0f6839d](https://github.com/citation-js/citation-js/commit/0f6839d))
* **core:** include complete graph ([2c82e48](https://github.com/citation-js/citation-js/commit/2c82e48)), closes [larsgw/citation.js#165](https://github.com/larsgw/citation.js/issues/165)
* **plugin-common:** support NDJSON ([e68afe1](https://github.com/citation-js/citation-js/commit/e68afe1)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)
* **plugin-wikidata:** allow subclass types ([#5](https://github.com/citation-js/citation-js/issues/5)) ([fc8aa7d](https://github.com/citation-js/citation-js/commit/fc8aa7d)), closes [larsgw/citation.js#166](https://github.com/larsgw/citation.js/issues/166)
* **plugin-wikidata:** support namedAs qualifier ([664644b](https://github.com/citation-js/citation-js/commit/664644b)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)



# [0.4.0-rc.1](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.0...v0.4.0-rc.1) (2018-12-27)

Some documentation and npm configuration changes.

# [0.4.0-rc.0](https://github.com/citation-js/citation-js/compare/88aabc9...v0.4.0-rc.0) (2018-12-06)


### Bug Fixes

* **plugin-ris:** output year always string ([88aabc9](https://github.com/citation-js/citation-js/commit/88aabc9))

### BREAKING CHANGES

* **core:** exports are now structured like the following:
```js
const {Cite, plugins, util, logger, version} = require('@citation-js/core')
```
