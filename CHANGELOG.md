# [](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.3...v) (2019-03-17)


### Bug Fixes

* **plugin-wikidata:** await promise ([3cde76f](https://github.com/citation-js/citation-js/commit/3cde76f)), closes [#25](https://github.com/citation-js/citation-js/issues/25)
* **plugin-wikidata:** fix fetchApiAsync ([def471d](https://github.com/citation-js/citation-js/commit/def471d))
* **plugin-wikidata:** label first value ([45087ee](https://github.com/citation-js/citation-js/commit/45087ee)), closes [#23](https://github.com/citation-js/citation-js/issues/23)
* **plugin-wikidata:** pass all values ([a5acb75](https://github.com/citation-js/citation-js/commit/a5acb75)), closes [#22](https://github.com/citation-js/citation-js/issues/22)
* **plugin-wikidata:** support novalue & somevalue ([3ff9039](https://github.com/citation-js/citation-js/commit/3ff9039))


### Features

* **core:** clearer parsing error message ([d296909](https://github.com/citation-js/citation-js/commit/d296909))



# [0.4.0-rc.3](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.2...v0.4.0-rc.3) (2019-03-16)


### Bug Fixes

* **core:** fix 'generateGraph' ([60106db](https://github.com/citation-js/citation-js/commit/60106db))
* **core:** fix html dict ([8a06ce1](https://github.com/citation-js/citation-js/commit/8a06ce1))
* **core:** fix post-processing with 'target' set ([ec3100b](https://github.com/citation-js/citation-js/commit/ec3100b))
* **core:** remove Object.entries for Node 6 ([47b3d9f](https://github.com/citation-js/citation-js/commit/47b3d9f))
* **core:** remove overwritten input formats ([4f52124](https://github.com/citation-js/citation-js/commit/4f52124))
* **core:** set default input options ([4843b40](https://github.com/citation-js/citation-js/commit/4843b40))
* **plugin-bibtex:** fix invalid output labels ([5624eaf](https://github.com/citation-js/citation-js/commit/5624eaf))
* **plugin-bibtex:** in-field whitespace ([3f081bc](https://github.com/citation-js/citation-js/commit/3f081bc)), closes [larsgw/citation-js#158](https://github.com/larsgw/citation-js/issues/158)
* **plugin-bibtex:** preserve nbsp ([e1974c3](https://github.com/citation-js/citation-js/commit/e1974c3))
* **plugin-common:** handle non-JSON ([539bb6c](https://github.com/citation-js/citation-js/commit/539bb6c))
* **plugin-common:** improve output json ([49e0d45](https://github.com/citation-js/citation-js/commit/49e0d45))
* **plugin-wikidata:** fallback for no labels ([9dc3640](https://github.com/citation-js/citation-js/commit/9dc3640))
* **plugin-wikidata:** fix langs support ([aec2e72](https://github.com/citation-js/citation-js/commit/aec2e72))
* **plugin-wikidata:** node 6 support ([fdf4127](https://github.com/citation-js/citation-js/commit/fdf4127))
* **plugin-wikidata:** update type index ([d74dc21](https://github.com/citation-js/citation-js/commit/d74dc21)), closes [/github.com/larsgw/citation.js/issues/166#issuecomment-472323555](https://github.com//github.com/larsgw/citation.js/issues/166/issues/issuecomment-472323555)


### Features

* actually throw errors ([f025426](https://github.com/citation-js/citation-js/commit/f025426)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* **cli:** add --log-level option ([bdd718b](https://github.com/citation-js/citation-js/commit/bdd718b))
* **core:** add 'strict' option ([ad158b3](https://github.com/citation-js/citation-js/commit/ad158b3)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* **core:** add 'target' option ([89b9e8b](https://github.com/citation-js/citation-js/commit/89b9e8b))
* **core:** add method to get input format info ([3d9493c](https://github.com/citation-js/citation-js/commit/3d9493c))
* **core:** input format 'outputs' option ([57645a2](https://github.com/citation-js/citation-js/commit/57645a2))
* **logger:** add log level support ([83bdb4b](https://github.com/citation-js/citation-js/commit/83bdb4b)), closes [#10](https://github.com/citation-js/citation-js/issues/10)
* **plugin-common:** throw errors ([3a67db4](https://github.com/citation-js/citation-js/commit/3a67db4))
* **plugin-wikidata:** langs option ([aaeb28d](https://github.com/citation-js/citation-js/commit/aaeb28d)), closes [#7](https://github.com/citation-js/citation-js/issues/7)


### BREAKING CHANGES

* **core:** Aformentioned functions might throw errors



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



# [0.4.0-rc.0](https://github.com/citation-js/citation-js/compare/88aabc9...v0.4.0-rc.0) (2018-12-06)


### Bug Fixes

* **plugin-ris:** output year always string ([88aabc9](https://github.com/citation-js/citation-js/commit/88aabc9))



