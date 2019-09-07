# [](https://github.com/citation-js/citation-js/compare/v0.4.10...v) (2019-09-07)


* chore!: drop Node 6 support ([f27d812](https://github.com/citation-js/citation-js/commit/f27d812)), closes [#55](https://github.com/citation-js/citation-js/issues/55)


### Bug Fixes

* **core:** do not return empty name lists when cleaning ([d31ca8a](https://github.com/citation-js/citation-js/commit/d31ca8a))
* **core:** fix Cite#sort handling of multi-value props ([3a7751c](https://github.com/citation-js/citation-js/commit/3a7751c))
* **core:** fix handling of generic best guesses ([c8e8c78](https://github.com/citation-js/citation-js/commit/c8e8c78))
* **core:** fix util.fetchId ([7850e75](https://github.com/citation-js/citation-js/commit/7850e75))
* **core:** improve date handling when cleaning ([08da3e7](https://github.com/citation-js/citation-js/commit/08da3e7))
* **core:** only overwrite individual headers in fetchFile ([8d47684](https://github.com/citation-js/citation-js/commit/8d47684))
* **core:** pass around bestGuessConversions ([50fa283](https://github.com/citation-js/citation-js/commit/50fa283))
* **core:** pass checkContentType in fetchFile ([e415f76](https://github.com/citation-js/citation-js/commit/e415f76))
* **core:** set userAgent properly in fetchFile ([a91fd7b](https://github.com/citation-js/citation-js/commit/a91fd7b))
* **plugin-bibtex:** fix label for incomplete author ([352ca4f](https://github.com/citation-js/citation-js/commit/352ca4f)), closes [#56](https://github.com/citation-js/citation-js/issues/56)


### Features

* **core:** complete input option validation ([d9be626](https://github.com/citation-js/citation-js/commit/d9be626))
* **core:** support has() & list() on plugins.config ([fe7f59f](https://github.com/citation-js/citation-js/commit/fe7f59f))


### BREAKING CHANGES

* drops Node 6 support



## [0.4.10](https://github.com/citation-js/citation-js/compare/v0.4.9...v0.4.10) (2019-08-27)


### Bug Fixes

* **plugin-csl:** use global symbol registry ([dd8e839](https://github.com/citation-js/citation-js/commit/dd8e839))



## [0.4.9](https://github.com/citation-js/citation-js/compare/v0.4.8...v0.4.9) (2019-08-27)


### Bug Fixes

* **core:** cap sync-rpc version ([2157335](https://github.com/citation-js/citation-js/commit/2157335)), closes [#54](https://github.com/citation-js/citation-js/issues/54)
* **core:** remove Object.entries call ([c38e3b9](https://github.com/citation-js/citation-js/commit/c38e3b9))
* **core:** remove use of object spread ([d82342a](https://github.com/citation-js/citation-js/commit/d82342a)), closes [#53](https://github.com/citation-js/citation-js/issues/53)
* **plugin-csl:** defer error to citeproc-js ([0f76fcb](https://github.com/citation-js/citation-js/commit/0f76fcb))
* **plugin-csl:** only proxy @bibliography/style once ([a372012](https://github.com/citation-js/citation-js/commit/a372012))
* **plugin-csl:** pass 'this' in getWrapperProxy ([c3e670a](https://github.com/citation-js/citation-js/commit/c3e670a))
* **plugin-csl:** return proxy in getWrapperProxy ([39e57a3](https://github.com/citation-js/citation-js/commit/39e57a3))
* **plugin-ris:** fix legacy EP tag ([d7c6ea5](https://github.com/citation-js/citation-js/commit/d7c6ea5))


### Features

* **core:** add match=none to propertyConstraint ([9bafb58](https://github.com/citation-js/citation-js/commit/9bafb58))
* **core:** add Translator to utils ([0dd4963](https://github.com/citation-js/citation-js/commit/0dd4963))
* **plugin-ris:** add RIS input support ([1c49bcb](https://github.com/citation-js/citation-js/commit/1c49bcb))



## [0.4.8](https://github.com/citation-js/citation-js/compare/v0.4.7...v0.4.8) (2019-07-06)


### Bug Fixes

* **core:** do not attempt to clone non-standard objects ([5309d08](https://github.com/citation-js/citation-js/commit/5309d08)), closes [#52](https://github.com/citation-js/citation-js/issues/52)
* **plugin-wikidata:** properly collect id from fetched items ([710a276](https://github.com/citation-js/citation-js/commit/710a276))


### Features

* **core:** use central User-Agent in fetchFile ([3fa8863](https://github.com/citation-js/citation-js/commit/3fa8863)), closes [#39](https://github.com/citation-js/citation-js/issues/39)



## [0.4.7](https://github.com/citation-js/citation-js/compare/v0.4.6...v0.4.7) (2019-06-29)


### Bug Fixes

* **core:** make fetchFile checkResponse optional ([a51a185](https://github.com/citation-js/citation-js/commit/a51a185))
* **plugin-doi:** use new checkContentType option ([92df863](https://github.com/citation-js/citation-js/commit/92df863))



## [0.4.6](https://github.com/citation-js/citation-js/compare/v0.4.5...v0.4.6) (2019-06-28)


### Bug Fixes

* **core:** check if fetchFile response matches request ([e9f9132](https://github.com/citation-js/citation-js/commit/e9f9132)), closes [#36](https://github.com/citation-js/citation-js/issues/36)
* **core:** fix getBody in fetchFile ([e4247da](https://github.com/citation-js/citation-js/commit/e4247da))
* **core:** remove console.log call ([e0b1790](https://github.com/citation-js/citation-js/commit/e0b1790))
* **plugin-wikidata:** fix typo ([8916446](https://github.com/citation-js/citation-js/commit/8916446))


### Features

* **core:** support POST in fetchFile ([ece8a2d](https://github.com/citation-js/citation-js/commit/ece8a2d))



## [0.4.5](https://github.com/citation-js/citation-js/compare/v0.4.4...v0.4.5) (2019-06-12)


### Bug Fixes

* **plugin-bibtex:** fix parsing of name lists ([11d7dd7](https://github.com/citation-js/citation-js/commit/11d7dd7))
* **plugin-bibtex:** fix safe labels for unicode names ([8167958](https://github.com/citation-js/citation-js/commit/8167958))
* **plugin-bibtex:** safe author name ([a232fe7](https://github.com/citation-js/citation-js/commit/a232fe7))
* **plugin-bibtex:** strip unknown commands in input ([5b3508e](https://github.com/citation-js/citation-js/commit/5b3508e))
* **plugin-wikidata:** exclude emoji flags as country names ([73b0e84](https://github.com/citation-js/citation-js/commit/73b0e84))
* **plugin-wikidata:** fix cache fetching ([63a4f0d](https://github.com/citation-js/citation-js/commit/63a4f0d)), closes [#41](https://github.com/citation-js/citation-js/issues/41)
* **plugin-wikidata:** fix country name check ([90d1c07](https://github.com/citation-js/citation-js/commit/90d1c07))


### Features

* **cli:** add --plugins option ([229c95c](https://github.com/citation-js/citation-js/commit/229c95c)), closes [#40](https://github.com/citation-js/citation-js/issues/40)
* **cli:** plugin config & format options ([8bd2a4a](https://github.com/citation-js/citation-js/commit/8bd2a4a))
* **cli:** support for input options ([87d8eb5](https://github.com/citation-js/citation-js/commit/87d8eb5))
* **plugin-bibtex:** add generateLabel option ([d10631c](https://github.com/citation-js/citation-js/commit/d10631c))


### BREAKING CHANGES

* **plugin-bibtex:** strips unkown commands entirely instead of replacing 
the braces with no-case tags



## [0.4.4](https://github.com/citation-js/citation-js/compare/v0.4.3...v0.4.4) (2019-05-24)


### Features

* **plugin-wikidata:** additional mappings ([01be936](https://github.com/citation-js/citation-js/commit/01be936)), closes [#18](https://github.com/citation-js/citation-js/issues/18)



## [0.4.3](https://github.com/citation-js/citation-js/compare/v0.4.3-alpha.0...v0.4.3) (2019-05-11)



## [0.4.3-alpha.0](https://github.com/citation-js/citation-js/compare/v0.4.2...v0.4.3-alpha.0) (2019-05-02)



## [0.4.2](https://github.com/citation-js/citation-js/compare/v0.4.1...v0.4.2) (2019-04-26)


### Bug Fixes

* **plugin-bibtex:** fix label creation ([c7cde40](https://github.com/citation-js/citation-js/commit/c7cde40)), closes [#35](https://github.com/citation-js/citation-js/issues/35)
* **plugin-wikidata:** support imprecise dates ([c898db7](https://github.com/citation-js/citation-js/commit/c898db7)), closes [#33](https://github.com/citation-js/citation-js/issues/33)


### Features

* **plugin-wikidata:** support more URL properties ([#34](https://github.com/citation-js/citation-js/issues/34)) ([d489843](https://github.com/citation-js/citation-js/commit/d489843))



## [0.4.1](https://github.com/citation-js/citation-js/compare/v0.4.0...v0.4.1) (2019-04-14)


### Bug Fixes

* **plugin-wikidata:** fix getting label if no title exists ([#32](https://github.com/citation-js/citation-js/issues/32)) ([69243c5](https://github.com/citation-js/citation-js/commit/69243c5))



# [0.4.0](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.4...v0.4.0) (2019-04-11)


### Bug Fixes

* **plugin-bibtex:** always output fields with braces ([c31e199](https://github.com/citation-js/citation-js/commit/c31e199)), closes [#27](https://github.com/citation-js/citation-js/issues/27)
* **plugin-bibtex:** use booktitle for inproceedings ([149a49c](https://github.com/citation-js/citation-js/commit/149a49c)), closes [#28](https://github.com/citation-js/citation-js/issues/28)


### Features

* **plugin-bibtex:** add date ranges ([042b4e0](https://github.com/citation-js/citation-js/commit/042b4e0))



# [0.4.0-rc.4](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.3...v0.4.0-rc.4) (2019-03-17)


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



