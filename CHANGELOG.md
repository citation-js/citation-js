##  (2026-07-05)

* feat(plugin-csl): default to CSL 1.0.2 ([c57c3e8](https://github.com/citation-js/citation-js/commit/c57c3e8)), closes [#276](https://github.com/citation-js/citation-js/issues/276)
* feat(plugin-csl): rename `template` option to `style` ([0c9bc83](https://github.com/citation-js/citation-js/commit/0c9bc83)), closes [#169](https://github.com/citation-js/citation-js/issues/169)
* feat(plugin-csl): throw error for unknown style names ([68e1d53](https://github.com/citation-js/citation-js/commit/68e1d53)), closes [#219](https://github.com/citation-js/citation-js/issues/219)
* feat(plugin-ris): error for invalid RIS specifications ([914d211](https://github.com/citation-js/citation-js/commit/914d211))
* chore(cli)!: remove deprecated "-u, --url" option ([98ad239](https://github.com/citation-js/citation-js/commit/98ad239))
* chore(plugin-ris)!: remove deprecated config object ([6af5f66](https://github.com/citation-js/citation-js/commit/6af5f66))
* chore(plugin-wikidata)!: remove deprecated input parsers ([d31a9e5](https://github.com/citation-js/citation-js/commit/d31a9e5))
* feat(plugin-csl)!: update bundled CSL styles and locales ([a149dd8](https://github.com/citation-js/citation-js/commit/a149dd8))
* chore: drop Node.js v16, v18 ([02792df](https://github.com/citation-js/citation-js/commit/02792df))
* chore(*): specify engine requirements ([98796b9](https://github.com/citation-js/citation-js/commit/98796b9))
* chore(ci): add NODE_EXTRA_CA_CERTS variable, update actions ([1edc080](https://github.com/citation-js/citation-js/commit/1edc080))
* chore(core): remove deprecated internal exports ([6e76038](https://github.com/citation-js/citation-js/commit/6e76038))
* chore(deps-dev): override serialize-javascript ([bfea290](https://github.com/citation-js/citation-js/commit/bfea290))
* chore(deps-dev): update dev dependencies ([54cf749](https://github.com/citation-js/citation-js/commit/54cf749))
* chore(deps-dev): update node-fetch to v3; update flatted ([d70cb6f](https://github.com/citation-js/citation-js/commit/d70cb6f))
* chore(deps-dev): upgrade to Lerna 9 ([6e87376](https://github.com/citation-js/citation-js/commit/6e87376))
* chore(deps): bump lodash from 4.17.21 to 4.17.23 ([9b784a3](https://github.com/citation-js/citation-js/commit/9b784a3))
* chore(deps): update dependencies ([efbad1a](https://github.com/citation-js/citation-js/commit/efbad1a))
* chore(plugin-csl): remove deprecated fetchLocale() internal export ([c569b74](https://github.com/citation-js/citation-js/commit/c569b74))
* chore(plugin-csl): remove deprecated fetchStyle() internal export ([207970a](https://github.com/citation-js/citation-js/commit/207970a))
* chore(plugin-csl): remove unused internal export 'affix' ([15fac2d](https://github.com/citation-js/citation-js/commit/15fac2d))
* docs: update year, version numbers ([05b5847](https://github.com/citation-js/citation-js/commit/05b5847))
* docs(core): fix line on dict plugin type ([d78796c](https://github.com/citation-js/citation-js/commit/d78796c))
* docs(plugin-csl): clarify `format` output option ([6931ae0](https://github.com/citation-js/citation-js/commit/6931ae0))
* docs(plugin-csl): fix some outdated JSDocs ([d1b0810](https://github.com/citation-js/citation-js/commit/d1b0810))
* style(core): fix import of node-fetch ([c576b39](https://github.com/citation-js/citation-js/commit/c576b39))
* test(cli): remove placeholder test script ([1d5d21b](https://github.com/citation-js/citation-js/commit/1d5d21b))
* refactor(core): replace fetch-ponyfill with node-fetch ([254ecde](https://github.com/citation-js/citation-js/commit/254ecde))

### BREAKING CHANGE

* CSL styles and locales are updated to their versions
as per d506f4c and bc0a222 in their respective repositories. To use
earlier versions of the styles and locales, please download them
personally and add them to the plugin as documented.
* minimum Node version now 20
* Remove "@wikidata/prop" and "@wikidata/type" input
parsers.
* specifying unknown template/style values now throws an
error. Check if styles exist with plugins.config.get('@csl').styles.has()
* The @ris plugin no longer registers a config object.
For the `outputSpec` option, use the `spec` option of the `ris` format
instead.
* The `ris` output format now throws an error if an
unknown, non-null value is passed to the `spec` option.
* The deprecated "-u, --url" option is removed, please
use "-t, --text" instead.
* user-supplied styles requiring CSL 1.0.1 should use the
option `downgradeCsl` in the 'bibliography' and 'citation' formats.
Bundled styles are patched to support CSL 1.0.2.

## <small>0.7.22 (2025-12-31)</small>

* v0.7.22 ([ca801be](https://github.com/citation-js/citation-js/commit/ca801be))
* feat(plugin-wikidata): map P13046 to 'genre' ([ab4760e](https://github.com/citation-js/citation-js/commit/ab4760e))
* docs(plugin-csl): add ESM options to examples ([3cfb3f8](https://github.com/citation-js/citation-js/commit/3cfb3f8))

## <small>0.7.21 (2025-10-20)</small>

* v0.7.21 ([3b8f3dc](https://github.com/citation-js/citation-js/commit/3b8f3dc))
* fix(core): handle empty type values when cleaning CSL ([cc70c09](https://github.com/citation-js/citation-js/commit/cc70c09)), closes [#247](https://github.com/citation-js/citation-js/issues/247)
* fix(plugin-ris): handle empty lines, convert non-standard type (#248) ([2b8a18f](https://github.com/citation-js/citation-js/commit/2b8a18f)), closes [#248](https://github.com/citation-js/citation-js/issues/248)
* chore(deps-dev): bump axios from 1.7.7 to 1.9.0 ([a5609ae](https://github.com/citation-js/citation-js/commit/a5609ae))
* chore(deps-dev): bump form-data from 4.0.0 to 4.0.4 ([bd80b8c](https://github.com/citation-js/citation-js/commit/bd80b8c))

## <small>0.7.20 (2025-07-05)</small>

* v0.7.20 ([7cc1a89](https://github.com/citation-js/citation-js/commit/7cc1a89))
* fix(plugin-wikidata): account for missing data on countries ([c95d47d](https://github.com/citation-js/citation-js/commit/c95d47d))

## <small>0.7.19 (2025-05-12)</small>

* v0.7.19 ([95d9274](https://github.com/citation-js/citation-js/commit/95d9274))
* test(plugin-wikidata): update tests for new config ([a4c04a9](https://github.com/citation-js/citation-js/commit/a4c04a9))
* fix(plugin-wikidata): omit keywords without labels ([a121afd](https://github.com/citation-js/citation-js/commit/a121afd))
* fix(plugin-wikidata): use 'mul' labels as fallback ([7699ec5](https://github.com/citation-js/citation-js/commit/7699ec5))

## <small>0.7.18 (2025-01-28)</small>

* v0.7.18 ([c4ac806](https://github.com/citation-js/citation-js/commit/c4ac806))
* fix(plugin-doi): improve handling of Crossref data ([91c1741](https://github.com/citation-js/citation-js/commit/91c1741)), closes [#243](https://github.com/citation-js/citation-js/issues/243)
* fix(plugin-wikidata): fix parser for multiple API responses ([1233bf7](https://github.com/citation-js/citation-js/commit/1233bf7))
* fix(plugin-wikidata): update wikibase-sdk ([2f84aa6](https://github.com/citation-js/citation-js/commit/2f84aa6)), closes [#242](https://github.com/citation-js/citation-js/issues/242)
* refactor(core): change parsing behavior of @else/list+object ([6670df9](https://github.com/citation-js/citation-js/commit/6670df9)), closes [#203](https://github.com/citation-js/citation-js/issues/203)
* style: fix code style issues ([68cdca9](https://github.com/citation-js/citation-js/commit/68cdca9))
* test(plugin-doi): fix data tests ([052e567](https://github.com/citation-js/citation-js/commit/052e567))
* test(plugin-doi): refactor tests ([78d8bc3](https://github.com/citation-js/citation-js/commit/78d8bc3))
* chore(cli): remove extraneous package ([19aa736](https://github.com/citation-js/citation-js/commit/19aa736))

## <small>0.7.17 (2024-12-31)</small>

* v0.7.17 ([3e38a68](https://github.com/citation-js/citation-js/commit/3e38a68))
* fix(plugin-bibtex): use 'organization' for conferences ([1202ee2](https://github.com/citation-js/citation-js/commit/1202ee2)), closes [#236](https://github.com/citation-js/citation-js/issues/236)
* chore(ci): include codecov token ([165a236](https://github.com/citation-js/citation-js/commit/165a236))

## <small>0.7.16 (2024-09-23)</small>

* v0.7.16 ([b0076f7](https://github.com/citation-js/citation-js/commit/b0076f7))
* fix(plugin-bibtex): correctly escape syntax in output ([ef9aaff](https://github.com/citation-js/citation-js/commit/ef9aaff)), closes [#232](https://github.com/citation-js/citation-js/issues/232)
* fix(plugin-ris): account for CSL with numeric ids ([43267df](https://github.com/citation-js/citation-js/commit/43267df)), closes [#238](https://github.com/citation-js/citation-js/issues/238)
* test(plugin-bibtex): add test for label with unbalanced brackets ([358a90d](https://github.com/citation-js/citation-js/commit/358a90d))
* chore(deps): update dev dependencies ([f43b539](https://github.com/citation-js/citation-js/commit/f43b539))
* docs(plugin-doi): add docs on setting user agents ([75f64f8](https://github.com/citation-js/citation-js/commit/75f64f8)), closes [#228](https://github.com/citation-js/citation-js/issues/228)

## <small>0.7.15 (2024-08-11)</small>

* v0.7.15 ([479dc2e](https://github.com/citation-js/citation-js/commit/479dc2e))
* chore: replace deprecated wikidata-sdk ([8b09c5e](https://github.com/citation-js/citation-js/commit/8b09c5e))
* chore(deps): update dev dependencies ([3fb2371](https://github.com/citation-js/citation-js/commit/3fb2371))
* fix(plugin-wikidata): replace deprecated wikidata-sdk ([32d1527](https://github.com/citation-js/citation-js/commit/32d1527))

## <small>0.7.14 (2024-06-12)</small>

* v0.7.14 ([1e5f612](https://github.com/citation-js/citation-js/commit/1e5f612))
* fix(core): fix regression in 4ae7fbc ([c2dcb6a](https://github.com/citation-js/citation-js/commit/c2dcb6a)), closes [#229](https://github.com/citation-js/citation-js/issues/229)

## <small>0.7.13 (2024-06-06)</small>

* v0.7.13 ([9259e28](https://github.com/citation-js/citation-js/commit/9259e28))
* fix(core): handle errors in user agent determination ([4ae7fbc](https://github.com/citation-js/citation-js/commit/4ae7fbc)), closes [#227](https://github.com/citation-js/citation-js/issues/227)
* fix(core): only use node-fetch until node 16 is dropped ([4b29a5d](https://github.com/citation-js/citation-js/commit/4b29a5d))

## <small>0.7.12 (2024-05-07)</small>

* v0.7.12 ([1fe938d](https://github.com/citation-js/citation-js/commit/1fe938d))
* docs(readme): update 'getting started' link ([55f1fbd](https://github.com/citation-js/citation-js/commit/55f1fbd))
* docs(readme): update download stats badges ([b636e76](https://github.com/citation-js/citation-js/commit/b636e76))
* feat(plugin-bibtex): add option to force use of label ([d5631e2](https://github.com/citation-js/citation-js/commit/d5631e2))

## <small>0.7.11 (2024-04-17)</small>

* v0.7.11 ([a92f6b3](https://github.com/citation-js/citation-js/commit/a92f6b3))
* fix(plugin-ris): fall back to default type ([a3d0391](https://github.com/citation-js/citation-js/commit/a3d0391)), closes [#225](https://github.com/citation-js/citation-js/issues/225)
* feat(core): normalize non-lowercase type values ([1ab0d2f](https://github.com/citation-js/citation-js/commit/1ab0d2f)), closes [#225](https://github.com/citation-js/citation-js/issues/225)
* feat(plugin-csl): add option to hyperlink URLs and DOIs ([4c15804](https://github.com/citation-js/citation-js/commit/4c15804))
* chore(npm): update package-lock.json files ([29907aa](https://github.com/citation-js/citation-js/commit/29907aa))

## <small>0.7.10 (2024-03-27)</small>

* v0.7.10 ([bc2a122](https://github.com/citation-js/citation-js/commit/bc2a122))
* feat(plugin-wikidata): update type mappings ([e9493d1](https://github.com/citation-js/citation-js/commit/e9493d1))
* docs: update year, version numbers ([3396d52](https://github.com/citation-js/citation-js/commit/3396d52))
* docs(jsdoc): update template ([7c28a7e](https://github.com/citation-js/citation-js/commit/7c28a7e))
* fix(plugin-ris): handle output of literal dates ([6f6b85a](https://github.com/citation-js/citation-js/commit/6f6b85a))

## <small>0.7.9 (2024-03-05)</small>

* v0.7.9 ([8fa1b9d](https://github.com/citation-js/citation-js/commit/8fa1b9d))
* style(plugin-bibtex): fix linting issues ([f273454](https://github.com/citation-js/citation-js/commit/f273454))
* test(core): add tests for ORCID normalization ([56ddc6a](https://github.com/citation-js/citation-js/commit/56ddc6a))
* test(plugin-bibtex): add tests for data annotations ([2983ae5](https://github.com/citation-js/citation-js/commit/2983ae5))
* feat(core): normalize ORCIDs on authors ([e91b580](https://github.com/citation-js/citation-js/commit/e91b580))
* feat(plugin-bibtex): implement data annotations ([68a8ec6](https://github.com/citation-js/citation-js/commit/68a8ec6))
* feat(plugin-bibtex): map ORCIDs to data annotations ([5c3951a](https://github.com/citation-js/citation-js/commit/5c3951a))
* fix(plugin-bibtex): allow list delimiters in text in environments ([da0c64b](https://github.com/citation-js/citation-js/commit/da0c64b))

## <small>0.7.8 (2024-01-22)</small>

* v0.7.8 ([5582398](https://github.com/citation-js/citation-js/commit/5582398))
* feat(plugin-bibtex): add config to keep all unicode ([cd018f9](https://github.com/citation-js/citation-js/commit/cd018f9)), closes [#177](https://github.com/citation-js/citation-js/issues/177)
* feat(plugin-doi): parse DOIs with square, angle brackets ([5434d5a](https://github.com/citation-js/citation-js/commit/5434d5a)), closes [#182](https://github.com/citation-js/citation-js/issues/182)
* fix(plugin-bibtex): do not case-protect commands in output ([50333d1](https://github.com/citation-js/citation-js/commit/50333d1))
* fix(plugin-bibtex): fix math-mode unicode escapes ([f05e45c](https://github.com/citation-js/citation-js/commit/f05e45c)), closes [#192](https://github.com/citation-js/citation-js/issues/192)
* fix(plugin-bibtex): remove lone diacritics ([49e9100](https://github.com/citation-js/citation-js/commit/49e9100))
* fix(plugin-wikidata): handle no/unkown value claims ([673e35c](https://github.com/citation-js/citation-js/commit/673e35c)), closes [#217](https://github.com/citation-js/citation-js/issues/217)
* test(plugin-doi): update test data ([e44b3d4](https://github.com/citation-js/citation-js/commit/e44b3d4))

## <small>0.7.7 (2024-01-20)</small>

* v0.7.7 ([3194082](https://github.com/citation-js/citation-js/commit/3194082))
* test(plugin-doi): test for 404 error ([d5d0e9e](https://github.com/citation-js/citation-js/commit/d5d0e9e))
* feat(plugin-wikidata): meaningful errors for 404s ([280274a](https://github.com/citation-js/citation-js/commit/280274a)), closes [#221](https://github.com/citation-js/citation-js/issues/221)

## <small>0.7.6 (2024-01-17)</small>

* v0.7.6 ([c88a4c1](https://github.com/citation-js/citation-js/commit/c88a4c1))
* fix(plugin-doi): map non-standard dissertation type ([5f75243](https://github.com/citation-js/citation-js/commit/5f75243)), closes [#220](https://github.com/citation-js/citation-js/issues/220)

## <small>0.7.5 (2023-12-31)</small>

* v0.7.5 ([e3993cb](https://github.com/citation-js/citation-js/commit/e3993cb))
* chore(deps): update dev dependencies ([325184c](https://github.com/citation-js/citation-js/commit/325184c))
* feat(plugin-bibtex): add mappings for plainnat fields ([208bd96](https://github.com/citation-js/citation-js/commit/208bd96)), closes [#204](https://github.com/citation-js/citation-js/issues/204)

## <small>0.7.4 (2023-11-01)</small>

* v0.7.4 ([22a9a4a](https://github.com/citation-js/citation-js/commit/22a9a4a))
* fix(plugin-ris): fix output of certain date fields ([796dce3](https://github.com/citation-js/citation-js/commit/796dce3))
* fix(plugin-ris): parse year numbers on certain items ([d300c33](https://github.com/citation-js/citation-js/commit/d300c33))
* test(plugin-ris): improve test coverage ([f722f71](https://github.com/citation-js/citation-js/commit/f722f71))

## <small>0.7.3 (2023-11-01)</small>

* v0.7.3 ([e74e15d](https://github.com/citation-js/citation-js/commit/e74e15d))
* style(plugin-ris): remove trailing comma ([c03e8ea](https://github.com/citation-js/citation-js/commit/c03e8ea))
* chore(deps-dev): bump @babel/traverse from 7.22.20 to 7.23.2 ([ed77bb6](https://github.com/citation-js/citation-js/commit/ed77bb6))
* chore(npm): update package-lock.json files ([46479ef](https://github.com/citation-js/citation-js/commit/46479ef))
* fix(plugin-ris): always set PY in RIS output ([2979ae2](https://github.com/citation-js/citation-js/commit/2979ae2)), closes [#213](https://github.com/citation-js/citation-js/issues/213)

## <small>0.7.2 (2023-10-14)</small>

* v0.7.2 ([2520576](https://github.com/citation-js/citation-js/commit/2520576))
* fix(plugin-bibtex): do not map "howpublished" url to publisher ([d4e3296](https://github.com/citation-js/citation-js/commit/d4e3296))
* chore(npm): fix package-lock.json files ([8596313](https://github.com/citation-js/citation-js/commit/8596313))

## <small>0.7.1 (2023-09-23)</small>

* v0.7.1 ([771fade](https://github.com/citation-js/citation-js/commit/771fade))
* fix: update peer dependency statements ([95ea6bb](https://github.com/citation-js/citation-js/commit/95ea6bb))

## 0.7.0 (2023-09-23)

* chore!: drop Node 14 support ([f13ac95](https://github.com/citation-js/citation-js/commit/f13ac95))
* fix(core)!: do not automatically fetch generic URLs ([0ee548d](https://github.com/citation-js/citation-js/commit/0ee548d))
* v0.7.0 ([763c634](https://github.com/citation-js/citation-js/commit/763c634))
* test(core): update test for Node 20 ([ba4a693](https://github.com/citation-js/citation-js/commit/ba4a693))
* test(plugin-bibjson): improve test coverage ([22ead35](https://github.com/citation-js/citation-js/commit/22ead35))
* test(plugin-csl): improve test coverage ([00de9e7](https://github.com/citation-js/citation-js/commit/00de9e7))
* test(plugin-doi): improve test coverage ([5aaa022](https://github.com/citation-js/citation-js/commit/5aaa022))
* fix(plugin-bibjson): expand recognition of bibjson ([c80b9b9](https://github.com/citation-js/citation-js/commit/c80b9b9))
* fix(plugin-bibjson): make parsing more resilient ([4f615f4](https://github.com/citation-js/citation-js/commit/4f615f4))
* fix(plugin-csl): fix citation data object in `entry` ([6527db6](https://github.com/citation-js/citation-js/commit/6527db6))
* refactor(plugin-csl): reset wrapBibliographyEntry ([4992382](https://github.com/citation-js/citation-js/commit/4992382))
* refactor(plugin-doi): simplify HTTP requests ([ebbe42a](https://github.com/citation-js/citation-js/commit/ebbe42a))
* chore: update conventional-changelog-cli ([ee3655a](https://github.com/citation-js/citation-js/commit/ee3655a))

## <small>0.6.9 (2023-09-20)</small>

* v0.6.9 ([59f9671](https://github.com/citation-js/citation-js/commit/59f9671))
* chore(deps): update dev dependencies ([d7b9c62](https://github.com/citation-js/citation-js/commit/d7b9c62))
* refactor(core): remove circular imports in Cite ([6bcfff7](https://github.com/citation-js/citation-js/commit/6bcfff7)), closes [#203](https://github.com/citation-js/citation-js/issues/203)
* refactor(plugin-bibtex): revert use of moo.keywords ([b3f276c](https://github.com/citation-js/citation-js/commit/b3f276c)), closes [#186](https://github.com/citation-js/citation-js/issues/186)
* docs(core): fix jsdoc comment ([2d821d3](https://github.com/citation-js/citation-js/commit/2d821d3))
* docs(readme): update with new default branch (#200) ([9899ff5](https://github.com/citation-js/citation-js/commit/9899ff5)), closes [#200](https://github.com/citation-js/citation-js/issues/200)
* feat(plugin-wikidata): use Q5 to recognize literal names ([541d54c](https://github.com/citation-js/citation-js/commit/541d54c)), closes [#199](https://github.com/citation-js/citation-js/issues/199)
* fix(plugin-wikidata): do not use 'subject named as' for authors ([b6efe22](https://github.com/citation-js/citation-js/commit/b6efe22))

## <small>0.6.8 (2023-05-10)</small>

* v0.6.8 ([e37ca5f](https://github.com/citation-js/citation-js/commit/e37ca5f))
* test(plugin-csl): update test case ([f40823f](https://github.com/citation-js/citation-js/commit/f40823f))
* chore(deps): bump http-cache-semantics from 4.1.0 to 4.1.1 (#193) ([c718e6b](https://github.com/citation-js/citation-js/commit/c718e6b)), closes [#193](https://github.com/citation-js/citation-js/issues/193)
* chore(deps): update dependencies ([ae1c3b8](https://github.com/citation-js/citation-js/commit/ae1c3b8))
* chore(npm): fix repository field in package.json ([545e022](https://github.com/citation-js/citation-js/commit/545e022))
* fix(plugin-bibtex): map addendum field to note ([e6d19c5](https://github.com/citation-js/citation-js/commit/e6d19c5)), closes [#198](https://github.com/citation-js/citation-js/issues/198)
* fix(plugin-bibtex): map langid field to language ([ff00ea2](https://github.com/citation-js/citation-js/commit/ff00ea2)), closes [#197](https://github.com/citation-js/citation-js/issues/197)

## <small>0.6.7 (2023-02-14)</small>

* v0.6.7 ([e9a62cf](https://github.com/citation-js/citation-js/commit/e9a62cf))
* fix(plugin-csl): fix citationsPre, citationsPost ([bfb9db8](https://github.com/citation-js/citation-js/commit/bfb9db8)), closes [#141](https://github.com/citation-js/citation-js/issues/141) [#190](https://github.com/citation-js/citation-js/issues/190)

## <small>0.6.6 (2023-01-31)</small>

* v0.6.6 ([024f633](https://github.com/citation-js/citation-js/commit/024f633))
* style(plugin-doi): remove trailing comma ([da01454](https://github.com/citation-js/citation-js/commit/da01454))
* feat(plugin-doi): support URLs without scheme ([e84f7d8](https://github.com/citation-js/citation-js/commit/e84f7d8))
* fix(plugin-bibtex): support mixed case "and" in lists ([8e262db](https://github.com/citation-js/citation-js/commit/8e262db)), closes [#188](https://github.com/citation-js/citation-js/issues/188)

## <small>0.6.5 (2022-12-31)</small>

* v0.6.5 ([f68c6f6](https://github.com/citation-js/citation-js/commit/f68c6f6))
* fix(plugin-ris): update priority of fields ([636b8e2](https://github.com/citation-js/citation-js/commit/636b8e2)), closes [#185](https://github.com/citation-js/citation-js/issues/185)
* chore: update dependencies ([58fc3c3](https://github.com/citation-js/citation-js/commit/58fc3c3))
* docs(contributing): add toc, fix typo ([857524c](https://github.com/citation-js/citation-js/commit/857524c))
* docs(readme): fix build badge ([3e3d2c3](https://github.com/citation-js/citation-js/commit/3e3d2c3))
* docs(readme): fix link to API docs ([5f5fde5](https://github.com/citation-js/citation-js/commit/5f5fde5)), closes [#184](https://github.com/citation-js/citation-js/issues/184)

## <small>0.6.4 (2022-07-19)</small>

* v0.6.4 ([cb7d479](https://github.com/citation-js/citation-js/commit/cb7d479))
* fix(plugin-csl): fix typo ([dc92fb5](https://github.com/citation-js/citation-js/commit/dc92fb5))
* fix(plugin-csl): handle unknown cs:style default-locale ([974ea05](https://github.com/citation-js/citation-js/commit/974ea05)), closes [#166](https://github.com/citation-js/citation-js/issues/166)
* fix(plugin-wikidata): add missing mappings ([abdc0f3](https://github.com/citation-js/citation-js/commit/abdc0f3))
* fix(plugin-wikidata): fix mappings ([3f33e5b](https://github.com/citation-js/citation-js/commit/3f33e5b))
* test(plugin-wikidata): add tests, test data ([427d3ca](https://github.com/citation-js/citation-js/commit/427d3ca))
* feat(plugin-wikidata): add software fields ([beb5dd9](https://github.com/citation-js/citation-js/commit/beb5dd9))
* chore: update lerna dependencies ([07f9fb5](https://github.com/citation-js/citation-js/commit/07f9fb5))
* refactor(plugin-csl): use proper terminology ([fd2f59b](https://github.com/citation-js/citation-js/commit/fd2f59b))

## <small>0.6.3 (2022-06-23)</small>

* v0.6.3 ([41bca03](https://github.com/citation-js/citation-js/commit/41bca03))
* fix(plugin-csl): respect cs:style attribute default-locale ([8189854](https://github.com/citation-js/citation-js/commit/8189854)), closes [#166](https://github.com/citation-js/citation-js/issues/166)

## <small>0.6.2 (2022-06-02)</small>

* v0.6.2 ([f8dcd57](https://github.com/citation-js/citation-js/commit/f8dcd57))
* fix(plugin-ris): fix type constraints of mappings ([9be8f3b](https://github.com/citation-js/citation-js/commit/9be8f3b))

## <small>0.6.1 (2022-06-02)</small>

* v0.6.1 ([1ea0268](https://github.com/citation-js/citation-js/commit/1ea0268))
* feat(plugin-wikidata): include additional version information ([7b870b8](https://github.com/citation-js/citation-js/commit/7b870b8))
* fix(plugin-bibtex): do not output empty s2id field ([ca58949](https://github.com/citation-js/citation-js/commit/ca58949))
* chore: update package-lock.json ([3c12c27](https://github.com/citation-js/citation-js/commit/3c12c27))

## 0.6.0 (2022-05-30)

* chore!: drop Node 10, 12 support ([37ea76b](https://github.com/citation-js/citation-js/commit/37ea76b))
* v0.6.0 ([204c129](https://github.com/citation-js/citation-js/commit/204c129))
* chore: replace babel-eslint with @babel/eslint-parser ([f18dd67](https://github.com/citation-js/citation-js/commit/f18dd67))
* chore: replace isomorphic-fetch ([69b61b1](https://github.com/citation-js/citation-js/commit/69b61b1))
* chore: update dependencies ([e1964f6](https://github.com/citation-js/citation-js/commit/e1964f6))
* chore: update peer dependencies ([7ff2998](https://github.com/citation-js/citation-js/commit/7ff2998))
* chore(core): update sync-fetch ([9a0abdc](https://github.com/citation-js/citation-js/commit/9a0abdc))
* style: update to standard 17 ([d056075](https://github.com/citation-js/citation-js/commit/d056075))
* style(core): use function instead of const ([c0b0573](https://github.com/citation-js/citation-js/commit/c0b0573))
* style(plugin-wikidata): fix 'unkown' typo ([4ef9dd3](https://github.com/citation-js/citation-js/commit/4ef9dd3))
* style(plugin-wikidata): remove empty line ([605ede4](https://github.com/citation-js/citation-js/commit/605ede4))
* style(plugin-wikidata): use function instead of const ([4664d61](https://github.com/citation-js/citation-js/commit/4664d61))
* feat(core): output CSL 1.0.2 by default ([5acec19](https://github.com/citation-js/citation-js/commit/5acec19))
* feat(core): remove custom _ fields when cleaning ([c974ebc](https://github.com/citation-js/citation-js/commit/c974ebc))
* feat(core): update internal format to CSL 1.0.2 ([7249425](https://github.com/citation-js/citation-js/commit/7249425))
* feat(plugin-bibjson): update mapping to CSL 1.0.2 ([d04aacf](https://github.com/citation-js/citation-js/commit/d04aacf))
* feat(plugin-bibtex): add Semantic Scholar s2id mapping (#159) ([f116cde](https://github.com/citation-js/citation-js/commit/f116cde)), closes [#159](https://github.com/citation-js/citation-js/issues/159)
* feat(plugin-bibtex): implement crossref properly ([f9cdf5b](https://github.com/citation-js/citation-js/commit/f9cdf5b)), closes [#115](https://github.com/citation-js/citation-js/issues/115)
* feat(plugin-bibtex): update mapping to CSL 1.0.2 ([6c68aff](https://github.com/citation-js/citation-js/commit/6c68aff))
* feat(plugin-csl): adapt to CSL 1.0.2 input ([4090164](https://github.com/citation-js/citation-js/commit/4090164))
* feat(plugin-csl): update styles and locales ([1ede64b](https://github.com/citation-js/citation-js/commit/1ede64b))
* feat(plugin-ris): update mapping to CSL 1.0.2 ([b59bd12](https://github.com/citation-js/citation-js/commit/b59bd12))
* feat(plugin-wikidata): import issue/vol/etc. from qualifiers ([dc7e270](https://github.com/citation-js/citation-js/commit/dc7e270))
* feat(plugin-wikidata): update mapping to CSL 1.0.2 ([09f2e2d](https://github.com/citation-js/citation-js/commit/09f2e2d)), closes [#142](https://github.com/citation-js/citation-js/issues/142)
* refactor(plugin-wikidata): add qualifier support to resolveProp() ([42a7199](https://github.com/citation-js/citation-js/commit/42a7199))
* refactor(plugin-wikidata): use flatMap ([fc1097f](https://github.com/citation-js/citation-js/commit/fc1097f))
* fix(core): avoid flatMap for Node 10 support ([8a65094](https://github.com/citation-js/citation-js/commit/8a65094))
* fix(plugin-bibjson): set correct generic type ([ec7de7f](https://github.com/citation-js/citation-js/commit/ec7de7f))
* fix(plugin-bibtex): consider entries with no type ([a55fe60](https://github.com/citation-js/citation-js/commit/a55fe60))
* fix(plugin-bibtex): fix biblatex handling of mastersthesis ([6196adf](https://github.com/citation-js/citation-js/commit/6196adf))
* fix(plugin-bibtex): fix handling of bookpagination ([7f41e30](https://github.com/citation-js/citation-js/commit/7f41e30))
* fix(plugin-bibtex): fix typo in crossref code ([3c377e4](https://github.com/citation-js/citation-js/commit/3c377e4))
* fix(plugin-bibtex): map biblatex eid to number ([0eb15af](https://github.com/citation-js/citation-js/commit/0eb15af)), closes [#140](https://github.com/citation-js/citation-js/issues/140)
* fix(plugin-bibtex): set default CSL type correctly ([94a402e](https://github.com/citation-js/citation-js/commit/94a402e))
* fix(plugin-bibtex): set default CSL type correctly ([bcd11b3](https://github.com/citation-js/citation-js/commit/bcd11b3))
* fix(plugin-bibtex): use CSL 1.0.2 'custom' field ([986f80b](https://github.com/citation-js/citation-js/commit/986f80b))
* fix(plugin-ris): fix ISSN regex ([76402c1](https://github.com/citation-js/citation-js/commit/76402c1))
* fix(plugin-ris): fix name parsing ([4382f31](https://github.com/citation-js/citation-js/commit/4382f31))
* fix(plugin-wikidata): fall back to original-author ([1af1249](https://github.com/citation-js/citation-js/commit/1af1249)), closes [#106](https://github.com/citation-js/citation-js/issues/106)
* docs: update list of plugins ([d58e738](https://github.com/citation-js/citation-js/commit/d58e738))
* docs(citation): update CITATION.cff ([b843c2f](https://github.com/citation-js/citation-js/commit/b843c2f))
* docs(contributing): add release guide ([666d932](https://github.com/citation-js/citation-js/commit/666d932))
* docs(jsdoc): update template to match site style ([c15a8d8](https://github.com/citation-js/citation-js/commit/c15a8d8))
* docs(plugin-csl): fix config guidance ([977aeb1](https://github.com/citation-js/citation-js/commit/977aeb1)), closes [#157](https://github.com/citation-js/citation-js/issues/157)
* docs(readme): add clarification about repositories ([0659f6d](https://github.com/citation-js/citation-js/commit/0659f6d)), closes [#129](https://github.com/citation-js/citation-js/issues/129)
* docs(readme): add DOI, acknowledgements ([260cc5b](https://github.com/citation-js/citation-js/commit/260cc5b))
* docs(readme): link article better ([70af5d7](https://github.com/citation-js/citation-js/commit/70af5d7))
* docs(readme): update build status badge ([6377bba](https://github.com/citation-js/citation-js/commit/6377bba))
* docs(readme): update dependency status badges ([51ffc55](https://github.com/citation-js/citation-js/commit/51ffc55))
* test(core): update fetchFile tests for Node 18 ([f7a902d](https://github.com/citation-js/citation-js/commit/f7a902d))
* test(core): update internal format to CSL 1.0.2 ([59b5017](https://github.com/citation-js/citation-js/commit/59b5017))
* test(core): update test for custom fields ([6af7f4a](https://github.com/citation-js/citation-js/commit/6af7f4a))
* test(core): update tests for 5acec192b ([73806a2](https://github.com/citation-js/citation-js/commit/73806a2))
* test(plugin-bibtex): increase coverage ([680daea](https://github.com/citation-js/citation-js/commit/680daea))
* test(plugin-bibtex): update tests ([f06e51b](https://github.com/citation-js/citation-js/commit/f06e51b))
* test(plugin-ris): increase coverage ([158bbdd](https://github.com/citation-js/citation-js/commit/158bbdd))
* test(plugin-wikidata): update mapping to CSL 1.0.2 ([6155ccc](https://github.com/citation-js/citation-js/commit/6155ccc))

### BREAKING CHANGE

* output of updated styles and locales may differ
* to get CSL 1.0.1 output, use the 'version' option
* use Node.js 14 or above
* use the 'custom' object instead of fields starting with 
an underscore.

## <small>0.5.7 (2022-04-17)</small>

* v0.5.7 ([e253e74](https://github.com/citation-js/citation-js/commit/e253e74))
* chore: update dependencies ([3e587fb](https://github.com/citation-js/citation-js/commit/3e587fb))
* chore: update dependencies ([0d974fa](https://github.com/citation-js/citation-js/commit/0d974fa))
* chore(deps): bump minimist from 1.2.5 to 1.2.6 ([754db6a](https://github.com/citation-js/citation-js/commit/754db6a))
* chore(deps): bump minimist from 1.2.5 to 1.2.6 in /packages/core ([0b7a397](https://github.com/citation-js/citation-js/commit/0b7a397))
* fix(core): do not use process variable in browser ([d779267](https://github.com/citation-js/citation-js/commit/d779267)), closes [#156](https://github.com/citation-js/citation-js/issues/156)

## <small>0.5.6 (2022-02-12)</small>

* v0.5.6 ([7d14eeb](https://github.com/citation-js/citation-js/commit/7d14eeb))
* fix(plugin-bibtex): fix handling of literal dates ([701526d](https://github.com/citation-js/citation-js/commit/701526d))

## <small>0.5.5 (2021-12-31)</small>

* v0.5.5 ([564a9a2](https://github.com/citation-js/citation-js/commit/564a9a2))
* fix(plugin-bibtex): ignore empty fields ([6badc93](https://github.com/citation-js/citation-js/commit/6badc93))
* fix(plugin-csl): error for unknown output format ([b9a2b7d](https://github.com/citation-js/citation-js/commit/b9a2b7d))
* fix(plugin-ris): add non-standard issue mapping ([fb6ae32](https://github.com/citation-js/citation-js/commit/fb6ae32))
* fix(plugin-ris): map publisher-place ([89cb3f2](https://github.com/citation-js/citation-js/commit/89cb3f2))

## <small>0.5.4 (2021-12-11)</small>

* v0.5.4 ([bd67972](https://github.com/citation-js/citation-js/commit/bd67972))
* chore: update dependencies ([33b8923](https://github.com/citation-js/citation-js/commit/33b8923))
* fix(core): do not convert string id to numbers ([6490200](https://github.com/citation-js/citation-js/commit/6490200))
* fix(plugin-bibtex): fix numeric id in bibtex label ([6291843](https://github.com/citation-js/citation-js/commit/6291843))
* fix(plugin-bibtex): replace use of moo.keywords ([efb9586](https://github.com/citation-js/citation-js/commit/efb9586))

## <small>0.5.3 (2021-11-24)</small>

* chore!: drop Node 8, add Node 14 ([a5ceb07](https://github.com/citation-js/citation-js/commit/a5ceb07))
* v0.5.3 ([665d4cd](https://github.com/citation-js/citation-js/commit/665d4cd))
* feat(core): throw more descriptive errors in Translator ([c35b40f](https://github.com/citation-js/citation-js/commit/c35b40f))
* feat(plugin-csl): allow citation context options ([c5c3e8c](https://github.com/citation-js/citation-js/commit/c5c3e8c))
* feat(plugin-csl): allow cite-items ([48fb79c](https://github.com/citation-js/citation-js/commit/48fb79c))
* fix: remove named imports of JSON files ([9b8315b](https://github.com/citation-js/citation-js/commit/9b8315b))
* fix(plugin-csl): handle missing entries ([93400d6](https://github.com/citation-js/citation-js/commit/93400d6))
* fix(plugin-doi): handle crossref preprints ([0927f43](https://github.com/citation-js/citation-js/commit/0927f43))
* style: add file extensions to imports ([52d5e1b](https://github.com/citation-js/citation-js/commit/52d5e1b))
* style(plugin-doi): declare functions properly ([784994c](https://github.com/citation-js/citation-js/commit/784994c))
* style(plugin-doi): fix lint errors ([c3bde28](https://github.com/citation-js/citation-js/commit/c3bde28))
* docs(citation): fix CITATION.cff (#133) ([a814b2f](https://github.com/citation-js/citation-js/commit/a814b2f)), closes [#133](https://github.com/citation-js/citation-js/issues/133)
* docs(contributing): specify use of command ([f25c68a](https://github.com/citation-js/citation-js/commit/f25c68a))
* chore: fix package lock files ([167a268](https://github.com/citation-js/citation-js/commit/167a268))
* test(plugin-csl): account for change in citeproc-js ([6756530](https://github.com/citation-js/citation-js/commit/6756530))

### BREAKING CHANGE

* drops Node 8 support

## <small>0.5.2 (2021-09-21)</small>

* v0.5.2 ([a902e87](https://github.com/citation-js/citation-js/commit/a902e87))
* style: update standard@16 ([51dcbf3](https://github.com/citation-js/citation-js/commit/51dcbf3))
* chore: update devDependencies ([a215d7a](https://github.com/citation-js/citation-js/commit/a215d7a))
* feat(plugin-bibtex): allow non-standard day field ([96f8d43](https://github.com/citation-js/citation-js/commit/96f8d43)), closes [#134](https://github.com/citation-js/citation-js/issues/134)
* test(plugin-csl): add tests for 3928f70 ([53b35c5](https://github.com/citation-js/citation-js/commit/53b35c5))
* fix(plugin-csl): check for non-normalised language codes ([3928f70](https://github.com/citation-js/citation-js/commit/3928f70))
* docs(citation): update CITATION.cff ([2a51bc1](https://github.com/citation-js/citation-js/commit/2a51bc1))

## <small>0.5.1 (2021-05-11)</small>

* v0.5.1 ([3f3eee0](https://github.com/citation-js/citation-js/commit/3f3eee0))
* chore(*): update dependencies ([5901223](https://github.com/citation-js/citation-js/commit/5901223))

## 0.5.0 (2021-04-01)

* v0.5.0 ([c05e595](https://github.com/citation-js/citation-js/commit/c05e595))
* chore(*): update dependencies ([7d8d53a](https://github.com/citation-js/citation-js/commit/7d8d53a))
* docs(*): update jsdoc docs ([29ed750](https://github.com/citation-js/citation-js/commit/29ed750))
* docs(core): fix two @typedef s for plugins ([4a3951e](https://github.com/citation-js/citation-js/commit/4a3951e))
* docs(plugin-bibtex): partly update jsdoc ([3e3ff95](https://github.com/citation-js/citation-js/commit/3e3ff95))
* feat(plugin-bibtex): allow URL in howpublished ([3884e08](https://github.com/citation-js/citation-js/commit/3884e08))
* feat(plugin-ris): add formatting 'spec' option ([ec0bbad](https://github.com/citation-js/citation-js/commit/ec0bbad))
* fix(plugin-bibtex): remove CSL 1.0.2 types ([365fe1c](https://github.com/citation-js/citation-js/commit/365fe1c))
* fix(plugin-bibtex): remove lookbehind regex ([fe20199](https://github.com/citation-js/citation-js/commit/fe20199))

## 0.5.0-alpha.10 (2021-01-28)

* v0.5.0-alpha.10 ([d6879a3](https://github.com/citation-js/citation-js/commit/d6879a3))
* style(core): change let to const in test ([aadda43](https://github.com/citation-js/citation-js/commit/aadda43))
* style(plugin-bibtex): fix code style ([f667b62](https://github.com/citation-js/citation-js/commit/f667b62))
* style(plugin-bibtex): fix code style ([1e38b7a](https://github.com/citation-js/citation-js/commit/1e38b7a))
* style(plugin-bibtex): fix indentation ([6946a3e](https://github.com/citation-js/citation-js/commit/6946a3e))
* style(plugin-csl): change some whitespace etc. ([b025f87](https://github.com/citation-js/citation-js/commit/b025f87))
* test(core): add tests for type correction ([d5043c2](https://github.com/citation-js/citation-js/commit/d5043c2))
* test(core): update tests to account for 18208cf ([9b7c7c3](https://github.com/citation-js/citation-js/commit/9b7c7c3))
* test(plugin-bibtex): add biblatex mapping tests ([f7cd5f0](https://github.com/citation-js/citation-js/commit/f7cd5f0))
* test(plugin-bibtex): add tests from #78, #79 ([d2f52ba](https://github.com/citation-js/citation-js/commit/d2f52ba)), closes [#78](https://github.com/citation-js/citation-js/issues/78) [#79](https://github.com/citation-js/citation-js/issues/79) [#78](https://github.com/citation-js/citation-js/issues/78) [#79](https://github.com/citation-js/citation-js/issues/79)
* test(plugin-bibtex): fix node 8 tests ([2220fd2](https://github.com/citation-js/citation-js/commit/2220fd2))
* test(plugin-bibtex): improve test coverage ([20e523f](https://github.com/citation-js/citation-js/commit/20e523f))
* test(plugin-bibtex): improve test coverage ([65ad91d](https://github.com/citation-js/citation-js/commit/65ad91d))
* test(plugin-bibtex): improve test coverage ([66ada3c](https://github.com/citation-js/citation-js/commit/66ada3c))
* test(plugin-bibtex): move output bib files ([6efda6b](https://github.com/citation-js/citation-js/commit/6efda6b))
* test(plugin-bibtex): update existing tests ([17b24d6](https://github.com/citation-js/citation-js/commit/17b24d6))
* test(plugin-bibtex): update regular tests ([0117ea0](https://github.com/citation-js/citation-js/commit/0117ea0))
* feat(core): add mainRule param to Grammar ([e8679d5](https://github.com/citation-js/citation-js/commit/e8679d5))
* feat(core): move DOI corrections to core ([03b804b](https://github.com/citation-js/citation-js/commit/03b804b))
* feat(plugin-bibtex): add -subtitle, -titleaddon ([eef0e6c](https://github.com/citation-js/citation-js/commit/eef0e6c)), closes [#116](https://github.com/citation-js/citation-js/issues/116)
* feat(plugin-bibtex): add 'strict' parser option ([64f0c38](https://github.com/citation-js/citation-js/commit/64f0c38))
* feat(plugin-bibtex): add BibLaTex mappings ([84655a4](https://github.com/citation-js/citation-js/commit/84655a4))
* feat(plugin-bibtex): rename sentenceCase option ([35943d2](https://github.com/citation-js/citation-js/commit/35943d2))
* feat(plugin-bibtex): update BibTeX mappings ([987b75c](https://github.com/citation-js/citation-js/commit/987b75c))
* feat(plugin-bibtex): update BibTeX parser ([9df7558](https://github.com/citation-js/citation-js/commit/9df7558))
* feat(plugin-csl): add 'asEntryArray' option to bibliography ([8039967](https://github.com/citation-js/citation-js/commit/8039967))
* feat(plugin-csl): add 'entry' option to bibliography ([298819b](https://github.com/citation-js/citation-js/commit/298819b))
* docs(plugin-bibtex): add sample BibLaTeX ([6fe3ae9](https://github.com/citation-js/citation-js/commit/6fe3ae9))
* docs(plugin-bibtex): document argument commands ([9564b34](https://github.com/citation-js/citation-js/commit/9564b34))
* docs(plugin-bibtex): update documentation ([c8e3674](https://github.com/citation-js/citation-js/commit/c8e3674))
* fix(core): clean `type` as regular string ([6982ae6](https://github.com/citation-js/citation-js/commit/6982ae6))
* fix(core): do not snapshot initial Cite() state ([19afac7](https://github.com/citation-js/citation-js/commit/19afac7))
* fix(core): reset Grammar log on each run ([68d8a2a](https://github.com/citation-js/citation-js/commit/68d8a2a))
* fix(core): reset Grammar state on each run ([834f679](https://github.com/citation-js/citation-js/commit/834f679))
* fix(plugin-bibtex): apply upstream changes ([f5a1514](https://github.com/citation-js/citation-js/commit/f5a1514))
* fix(plugin-bibtex): apply various fixes ([861cb36](https://github.com/citation-js/citation-js/commit/861cb36))
* fix(plugin-bibtex): apply various fixes ([86e55df](https://github.com/citation-js/citation-js/commit/86e55df))
* fix(plugin-bibtex): do not escape verbatim value ([a90f4a5](https://github.com/citation-js/citation-js/commit/a90f4a5))
* fix(plugin-bibtex): do not ignore month after day ([4914797](https://github.com/citation-js/citation-js/commit/4914797))
* fix(plugin-bibtex): escape more unicode in output ([1647734](https://github.com/citation-js/citation-js/commit/1647734))
* fix(plugin-bibtex): fix howpublished/url mapping ([b655bec](https://github.com/citation-js/citation-js/commit/b655bec))
* fix(plugin-bibtex): fix mapping bugs ([a644b3a](https://github.com/citation-js/citation-js/commit/a644b3a))
* fix(plugin-bibtex): output w/ case protection ([07f99b5](https://github.com/citation-js/citation-js/commit/07f99b5))
* fix(plugin-bibtex): remove unicode from label ([81d657d](https://github.com/citation-js/citation-js/commit/81d657d))
* fix(plugin-bibtex): update BibTeX mappings ([db79896](https://github.com/citation-js/citation-js/commit/db79896))
* chore: ignore dev/test files ([d7ad325](https://github.com/citation-js/citation-js/commit/d7ad325))
* chore: update package locks ([1381ea2](https://github.com/citation-js/citation-js/commit/1381ea2))
* chore(ci): replace Travis CI (#113) ([c4c587a](https://github.com/citation-js/citation-js/commit/c4c587a)), closes [#113](https://github.com/citation-js/citation-js/issues/113)
* chore(test): fix test script args handling ([02065d3](https://github.com/citation-js/citation-js/commit/02065d3))

### BREAKING CHANGE

*   - The @bibtex input type prefix has been
    changed to @biblatex
  - The @bibtex input type prefix is now used for
    parsing as pure @bibtex. These types have no
    type parser so are not automatically used.
  - The `bibtex` output format now outputs valid
    BibTeX, use the `biblatex` output format for
    BibLaTeX output.
  - The output option `generateLabel` has been
    replaced by the config option
    `format.useIdAsLabel`
* Although the file parsing has been tested extensively,
the mapping has not. In addition, since the mapping has been created
from scratch according to the BibLaTeX documentation behaviour might
change. Please report any problems at
https://github.com/citation-js/citation-js/issues
* Constructing a Cite instance no longer automatically creates a snapshot. 
You can do this manually instead.

## 0.5.0-alpha.9 (2020-10-20)

* chore!: update deps ([997b7ed](https://github.com/citation-js/citation-js/commit/997b7ed))
* v0.5.0-alpha.9 ([ebcf91e](https://github.com/citation-js/citation-js/commit/ebcf91e))

## 0.5.0-alpha.8 (2020-10-20)

* v0.5.0-alpha.8 ([8e4b774](https://github.com/citation-js/citation-js/commit/8e4b774))
* style(plugin-csl): fix test indentation ([ff9eb70](https://github.com/citation-js/citation-js/commit/ff9eb70))
* test(plugin-csl): add test for disambig error ([9287586](https://github.com/citation-js/citation-js/commit/9287586))
* fix(plugin-bibtex): fix closing tag behavior ([466d5b1](https://github.com/citation-js/citation-js/commit/466d5b1))
* fix(plugin-csl): fix disambig error ([35ec98d](https://github.com/citation-js/citation-js/commit/35ec98d))

## 0.5.0-alpha.7 (2020-08-29)

* v0.5.0-alpha.7 ([a12d31a](https://github.com/citation-js/citation-js/commit/a12d31a))
* style(plugin-csl): fix indentation ([520ced4](https://github.com/citation-js/citation-js/commit/520ced4))
* test(plugin-csl): add test for entry caching ([bb46440](https://github.com/citation-js/citation-js/commit/bb46440))
* fix(cli): fix check for prefixed options ([4b7fe6b](https://github.com/citation-js/citation-js/commit/4b7fe6b))
* fix(plugin-bibtex): avoid error on non-utf-8 webpages ([c09a9e4](https://github.com/citation-js/citation-js/commit/c09a9e4))
* fix(plugin-csl): remove entry caching ([efa648b](https://github.com/citation-js/citation-js/commit/efa648b))
* docs(api): update JSDoc generation (#97) ([046914d](https://github.com/citation-js/citation-js/commit/046914d)), closes [#97](https://github.com/citation-js/citation-js/issues/97)
* chore: fix test prep timeout for nyc ([ec9ff6a](https://github.com/citation-js/citation-js/commit/ec9ff6a))

## 0.5.0-alpha.6 (2020-07-04)

* v0.5.0-alpha.6 ([7c8ac5c](https://github.com/citation-js/citation-js/commit/7c8ac5c))
* style: update for standard@14 ([7104024](https://github.com/citation-js/citation-js/commit/7104024))
* chore: update packages ([1ec323c](https://github.com/citation-js/citation-js/commit/1ec323c))
* chore(plugin-bibtex): add test for math ([2676d49](https://github.com/citation-js/citation-js/commit/2676d49))
* fix(plugin-bibtex): fix combining tilde ([cc9fd8b](https://github.com/citation-js/citation-js/commit/cc9fd8b))
* fix(plugin-bibtex): normalize strings ([447b0b4](https://github.com/citation-js/citation-js/commit/447b0b4))
* fix(plugin-bibtex): support all 10 escaped characters (#75) ([da016b4](https://github.com/citation-js/citation-js/commit/da016b4)), closes [#75](https://github.com/citation-js/citation-js/issues/75)
* fix(plugin-ris): format literal names ([893d144](https://github.com/citation-js/citation-js/commit/893d144)), closes [#87](https://github.com/citation-js/citation-js/issues/87)
* feat(plugin-bibtex): improve BibTeX mappings (#76) ([214e77b](https://github.com/citation-js/citation-js/commit/214e77b)), closes [#76](https://github.com/citation-js/citation-js/issues/76)
* feat(plugin-csl): update apa to 7th edition (#89) ([2b5f2c5](https://github.com/citation-js/citation-js/commit/2b5f2c5)), closes [#89](https://github.com/citation-js/citation-js/issues/89)

### BREAKING CHANGE

* default APA style is now 7th edition

## 0.5.0-alpha.5 (2019-10-28)

* v0.5.0-alpha.5 ([0b7bcc5](https://github.com/citation-js/citation-js/commit/0b7bcc5))
* style(plugin-ris): remove unnecessary escape character ([7bf543e](https://github.com/citation-js/citation-js/commit/7bf543e))
* fix(core): do not use User-Agent in CORS ([047847d](https://github.com/citation-js/citation-js/commit/047847d))
* fix(plugin-bibtex): ignore braces for grouping command (#64) ([20763dc](https://github.com/citation-js/citation-js/commit/20763dc)), closes [#64](https://github.com/citation-js/citation-js/issues/64)
* fix(plugin-ris): allow string for keyword component (#70) ([0294999](https://github.com/citation-js/citation-js/commit/0294999)), closes [#70](https://github.com/citation-js/citation-js/issues/70) [#67](https://github.com/citation-js/citation-js/issues/67)
* fix(plugin-ris): normalize DOIs (#68) ([eb97fa5](https://github.com/citation-js/citation-js/commit/eb97fa5)), closes [#68](https://github.com/citation-js/citation-js/issues/68)
* fix(plugin-ris): trim lines in parse function (#71) ([f81b845](https://github.com/citation-js/citation-js/commit/f81b845)), closes [#71](https://github.com/citation-js/citation-js/issues/71) [#66](https://github.com/citation-js/citation-js/issues/66)
* docs(contributing): add a contributing guide ([8914e9b](https://github.com/citation-js/citation-js/commit/8914e9b))
* docs(contributing): update scripts ([e7a56ae](https://github.com/citation-js/citation-js/commit/e7a56ae))
* chore(test): make testing script ([40b2816](https://github.com/citation-js/citation-js/commit/40b2816))
* chore(test): unify test script naming ([24d4d41](https://github.com/citation-js/citation-js/commit/24d4d41))

## 0.5.0-alpha.4 (2019-10-15)

* v0.5.0-alpha.4 ([3a1b202](https://github.com/citation-js/citation-js/commit/3a1b202))
* fix(core): fix normalising headers code for the browser ([d4693a7](https://github.com/citation-js/citation-js/commit/d4693a7))
* fix(plugin-bibtex): do not try to format raw dates ([b28eca8](https://github.com/citation-js/citation-js/commit/b28eca8))
* fix(plugin-bibtex): warn for umatched entry braces ([7905667](https://github.com/citation-js/citation-js/commit/7905667))

## 0.5.0-alpha.3 (2019-10-07)

* v0.5.0-alpha.3 ([dacc48b](https://github.com/citation-js/citation-js/commit/dacc48b))
* style(plugin-bibtex): fix style issues ([d63ebe6](https://github.com/citation-js/citation-js/commit/d63ebe6))
* chore: add back package locks ([5e18baa](https://github.com/citation-js/citation-js/commit/5e18baa))
* chore: remove package locks ([424ebc7](https://github.com/citation-js/citation-js/commit/424ebc7))
* chore: update packages ([de3c392](https://github.com/citation-js/citation-js/commit/de3c392))
* chore: update peer dependency versions ([319c39c](https://github.com/citation-js/citation-js/commit/319c39c))
* fix(plugin-bibtex): remove nocase from diacritics ([7f7e52f](https://github.com/citation-js/citation-js/commit/7f7e52f))
* fix(plugin-bibtex): replace trimEnd() with trim() ([b59da57](https://github.com/citation-js/citation-js/commit/b59da57))
* fix(plugin-ris): fix handling of multiline values ([eba2bfe](https://github.com/citation-js/citation-js/commit/eba2bfe))
* fix(plugin-ris): handle \r\n line endings ([f0a3b29](https://github.com/citation-js/citation-js/commit/f0a3b29))
* docs: add information on the paper ([49655ee](https://github.com/citation-js/citation-js/commit/49655ee))
* feat(bibtex): add new BibTeX parser ([3c3588e](https://github.com/citation-js/citation-js/commit/3c3588e))
* feat(core): add Grammar class to utils ([052754f](https://github.com/citation-js/citation-js/commit/052754f))

## 0.5.0-alpha.2 (2019-09-10)

* v0.5.0-alpha.2 ([669be81](https://github.com/citation-js/citation-js/commit/669be81))
* fix(core): fix date value null check ([f6a3ab2](https://github.com/citation-js/citation-js/commit/f6a3ab2))

## 0.5.0-alpha.1 (2019-09-10)

* v0.5.0-alpha.1 ([83b1452](https://github.com/citation-js/citation-js/commit/83b1452))
* fix(core): fix cleaning 'null' date values ([c927f81](https://github.com/citation-js/citation-js/commit/c927f81))
* fix(core): fix cleaning 'null' name values ([2d59a32](https://github.com/citation-js/citation-js/commit/2d59a32))

## 0.5.0-alpha.0 (2019-09-07)

* chore!: drop Node 6 support ([f27d812](https://github.com/citation-js/citation-js/commit/f27d812)), closes [#55](https://github.com/citation-js/citation-js/issues/55)
* v0.5.0-alpha.0 ([68a6984](https://github.com/citation-js/citation-js/commit/68a6984))
* style: fix for standard@14 ([683ac33](https://github.com/citation-js/citation-js/commit/683ac33))
* style(core): list 'Headers' global ([d639f33](https://github.com/citation-js/citation-js/commit/d639f33))
* chore: always send coverage data ([677ff9e](https://github.com/citation-js/citation-js/commit/677ff9e))
* chore: fix coverage setup ([15ba6dc](https://github.com/citation-js/citation-js/commit/15ba6dc))
* chore: fix coverage setup for CI ([a0ebbde](https://github.com/citation-js/citation-js/commit/a0ebbde))
* chore: update devDependencies ([b33a70d](https://github.com/citation-js/citation-js/commit/b33a70d))
* refactor: replace sync-request with sync-fetch ([4a960fc](https://github.com/citation-js/citation-js/commit/4a960fc))
* refactor(core): improve handling of plugin configs ([b7944b2](https://github.com/citation-js/citation-js/commit/b7944b2))
* refactor(core): remove duplicate check ([d111e70](https://github.com/citation-js/citation-js/commit/d111e70))
* refactor(plugin-common): remove duplicate check ([18b9534](https://github.com/citation-js/citation-js/commit/18b9534))
* test(core): fix Cite#sort test case ([9943b73](https://github.com/citation-js/citation-js/commit/9943b73)), closes [Cite#sort](https://github.com/Cite/issues/sort)
* test(core): improve Cite#format coverage ([b6fae14](https://github.com/citation-js/citation-js/commit/b6fae14)), closes [Cite#format](https://github.com/Cite/issues/format)
* test(core): improve Cite#sort, Cite#validate coverage ([af3e319](https://github.com/citation-js/citation-js/commit/af3e319)), closes [Cite#sort](https://github.com/Cite/issues/sort) [Cite#validate](https://github.com/Cite/issues/validate)
* test(core): improve coverage ([ad600f9](https://github.com/citation-js/citation-js/commit/ad600f9))
* test(core): improve plugins.input.util.clean coverage ([2309f96](https://github.com/citation-js/citation-js/commit/2309f96))
* test(core): support Node 6 in util tests ([5145a0c](https://github.com/citation-js/citation-js/commit/5145a0c))
* test(core): test util.deepCopy ([7d7e2b2](https://github.com/citation-js/citation-js/commit/7d7e2b2))
* test(core): test util.fetchFile(Async) ([e90316f](https://github.com/citation-js/citation-js/commit/e90316f))
* test(core): test util.fetchId ([6475bef](https://github.com/citation-js/citation-js/commit/6475bef))
* test(core): test util.Register ([b39c62c](https://github.com/citation-js/citation-js/commit/b39c62c))
* test(plugin-bibtex): test label for incomplete author ([9be3e6d](https://github.com/citation-js/citation-js/commit/9be3e6d)), closes [#56](https://github.com/citation-js/citation-js/issues/56)
* test(plugin-common): improve coverage ([d49d556](https://github.com/citation-js/citation-js/commit/d49d556))
* fix(core): do not return empty name lists when cleaning ([d31ca8a](https://github.com/citation-js/citation-js/commit/d31ca8a))
* fix(core): fix Cite#sort handling of multi-value props ([3a7751c](https://github.com/citation-js/citation-js/commit/3a7751c)), closes [Cite#sort](https://github.com/Cite/issues/sort)
* fix(core): fix handling of generic best guesses ([c8e8c78](https://github.com/citation-js/citation-js/commit/c8e8c78))
* fix(core): fix util.fetchId ([7850e75](https://github.com/citation-js/citation-js/commit/7850e75))
* fix(core): improve date handling when cleaning ([08da3e7](https://github.com/citation-js/citation-js/commit/08da3e7))
* fix(core): only overwrite individual headers in fetchFile ([8d47684](https://github.com/citation-js/citation-js/commit/8d47684))
* fix(core): pass around bestGuessConversions ([50fa283](https://github.com/citation-js/citation-js/commit/50fa283))
* fix(core): pass checkContentType in fetchFile ([e415f76](https://github.com/citation-js/citation-js/commit/e415f76))
* fix(core): set userAgent properly in fetchFile ([a91fd7b](https://github.com/citation-js/citation-js/commit/a91fd7b))
* fix(plugin-bibtex): fix label for incomplete author ([352ca4f](https://github.com/citation-js/citation-js/commit/352ca4f)), closes [#56](https://github.com/citation-js/citation-js/issues/56)
* feat(core): complete input option validation ([d9be626](https://github.com/citation-js/citation-js/commit/d9be626))
* feat(core): support has() & list() on plugins.config ([fe7f59f](https://github.com/citation-js/citation-js/commit/fe7f59f))

### BREAKING CHANGE

* drops Node 6 support

## <small>0.4.10 (2019-08-27)</small>

* v0.4.10 ([c8cb30f](https://github.com/citation-js/citation-js/commit/c8cb30f))
* fix(plugin-csl): use global symbol registry ([dd8e839](https://github.com/citation-js/citation-js/commit/dd8e839))

## <small>0.4.9 (2019-08-27)</small>

* v0.4.9 ([5e9b903](https://github.com/citation-js/citation-js/commit/5e9b903))
* style(plugin-csl): fix style issues ([0ab0f8b](https://github.com/citation-js/citation-js/commit/0ab0f8b))
* fix(core): cap sync-rpc version ([2157335](https://github.com/citation-js/citation-js/commit/2157335)), closes [#54](https://github.com/citation-js/citation-js/issues/54)
* fix(core): remove Object.entries call ([c38e3b9](https://github.com/citation-js/citation-js/commit/c38e3b9))
* fix(core): remove use of object spread ([d82342a](https://github.com/citation-js/citation-js/commit/d82342a)), closes [#53](https://github.com/citation-js/citation-js/issues/53)
* fix(plugin-csl): defer error to citeproc-js ([0f76fcb](https://github.com/citation-js/citation-js/commit/0f76fcb))
* fix(plugin-csl): only proxy @bibliography/style once ([a372012](https://github.com/citation-js/citation-js/commit/a372012))
* fix(plugin-csl): pass 'this' in getWrapperProxy ([c3e670a](https://github.com/citation-js/citation-js/commit/c3e670a))
* fix(plugin-csl): return proxy in getWrapperProxy ([39e57a3](https://github.com/citation-js/citation-js/commit/39e57a3))
* fix(plugin-ris): fix legacy EP tag ([d7c6ea5](https://github.com/citation-js/citation-js/commit/d7c6ea5))
* chore(npm): npm audit fix ([2f2e48e](https://github.com/citation-js/citation-js/commit/2f2e48e))
* chore(npm): npm audit fix ([111a47f](https://github.com/citation-js/citation-js/commit/111a47f))
* docs(cli): update CLI option docs ([44f316e](https://github.com/citation-js/citation-js/commit/44f316e))
* feat(core): add match=none to propertyConstraint ([9bafb58](https://github.com/citation-js/citation-js/commit/9bafb58))
* feat(core): add Translator to utils ([0dd4963](https://github.com/citation-js/citation-js/commit/0dd4963))
* feat(plugin-ris): add RIS input support ([1c49bcb](https://github.com/citation-js/citation-js/commit/1c49bcb))

## <small>0.4.8 (2019-07-06)</small>

* v0.4.8 ([0be8501](https://github.com/citation-js/citation-js/commit/0be8501))
* fix(core): do not attempt to clone non-standard objects ([5309d08](https://github.com/citation-js/citation-js/commit/5309d08)), closes [#52](https://github.com/citation-js/citation-js/issues/52)
* fix(plugin-wikidata): properly collect id from fetched items ([710a276](https://github.com/citation-js/citation-js/commit/710a276))
* docs: fix broken tutorial links ([055b4c3](https://github.com/citation-js/citation-js/commit/055b4c3))
* chore(babel): fix MJS build ([37834cf](https://github.com/citation-js/citation-js/commit/37834cf))
* feat(core): use central User-Agent in fetchFile ([3fa8863](https://github.com/citation-js/citation-js/commit/3fa8863)), closes [#39](https://github.com/citation-js/citation-js/issues/39)

## <small>0.4.7 (2019-06-29)</small>

* v0.4.7 ([96d42cc](https://github.com/citation-js/citation-js/commit/96d42cc))
* fix(core): make fetchFile checkResponse optional ([a51a185](https://github.com/citation-js/citation-js/commit/a51a185))
* fix(plugin-doi): use new checkContentType option ([92df863](https://github.com/citation-js/citation-js/commit/92df863))

## <small>0.4.6 (2019-06-28)</small>

* v0.4.6 ([01169a9](https://github.com/citation-js/citation-js/commit/01169a9))
* style(core): fix weird indentation ([aa2180f](https://github.com/citation-js/citation-js/commit/aa2180f))
* docs(changelog): fix changelog ([caa7ad7](https://github.com/citation-js/citation-js/commit/caa7ad7))
* fix(core): check if fetchFile response matches request ([e9f9132](https://github.com/citation-js/citation-js/commit/e9f9132)), closes [#36](https://github.com/citation-js/citation-js/issues/36)
* fix(core): fix getBody in fetchFile ([e4247da](https://github.com/citation-js/citation-js/commit/e4247da))
* fix(core): remove console.log call ([e0b1790](https://github.com/citation-js/citation-js/commit/e0b1790))
* fix(plugin-wikidata): fix typo ([8916446](https://github.com/citation-js/citation-js/commit/8916446))
* refactor(core): dedupe fetchFile error handling ([9250844](https://github.com/citation-js/citation-js/commit/9250844))
* refactor(core): simplify fetchFile methods ([e66df63](https://github.com/citation-js/citation-js/commit/e66df63))
* feat(core): support POST in fetchFile ([ece8a2d](https://github.com/citation-js/citation-js/commit/ece8a2d))

## <small>0.4.5 (2019-06-12)</small>

* v0.4.5 ([9c42766](https://github.com/citation-js/citation-js/commit/9c42766))
* fix(plugin-bibtex): fix parsing of name lists ([11d7dd7](https://github.com/citation-js/citation-js/commit/11d7dd7))
* fix(plugin-bibtex): fix safe labels for unicode names ([8167958](https://github.com/citation-js/citation-js/commit/8167958))
* fix(plugin-bibtex): safe author name ([a232fe7](https://github.com/citation-js/citation-js/commit/a232fe7))
* fix(plugin-bibtex): strip unknown commands in input ([5b3508e](https://github.com/citation-js/citation-js/commit/5b3508e))
* fix(plugin-wikidata): exclude emoji flags as country names ([73b0e84](https://github.com/citation-js/citation-js/commit/73b0e84))
* fix(plugin-wikidata): fix cache fetching ([63a4f0d](https://github.com/citation-js/citation-js/commit/63a4f0d)), closes [#41](https://github.com/citation-js/citation-js/issues/41)
* fix(plugin-wikidata): fix country name check ([90d1c07](https://github.com/citation-js/citation-js/commit/90d1c07))
* docs(changelog): fix ([e3fc5c8](https://github.com/citation-js/citation-js/commit/e3fc5c8))
* docs(changelog): fix version number ([fd4ec43](https://github.com/citation-js/citation-js/commit/fd4ec43))
* style(*): fix some style problems ([69ea93a](https://github.com/citation-js/citation-js/commit/69ea93a))
* refactor(core): backdoor new format options ([fb198e3](https://github.com/citation-js/citation-js/commit/fb198e3))
* refactor(plugin-bibtex): dedupe getNames ([655939e](https://github.com/citation-js/citation-js/commit/655939e))
* refactor(plugin-wikidata): dedupe response code ([778a4a3](https://github.com/citation-js/citation-js/commit/778a4a3))
* chore(npm): update deps ([23d720b](https://github.com/citation-js/citation-js/commit/23d720b))
* feat(cli): add --plugins option ([229c95c](https://github.com/citation-js/citation-js/commit/229c95c)), closes [#40](https://github.com/citation-js/citation-js/issues/40)
* feat(cli): plugin config & format options ([8bd2a4a](https://github.com/citation-js/citation-js/commit/8bd2a4a))
* feat(cli): support for input options ([87d8eb5](https://github.com/citation-js/citation-js/commit/87d8eb5))
* feat(plugin-bibtex): add generateLabel option ([d10631c](https://github.com/citation-js/citation-js/commit/d10631c))

### BREAKING CHANGE

* strips unkown commands entirely instead of replacing 
the braces with no-case tags

## <small>0.4.4 (2019-05-24)</small>

* v0.4.4 ([c871d6b](https://github.com/citation-js/citation-js/commit/c871d6b))
* feat(plugin-wikidata): additional mappings ([01be936](https://github.com/citation-js/citation-js/commit/01be936)), closes [#18](https://github.com/citation-js/citation-js/issues/18)
* refactor(plugin-wikidata): minimise requests ([fe72fb3](https://github.com/citation-js/citation-js/commit/fe72fb3))
* refactor(plugin-wikidata): swap props table ([95a6b79](https://github.com/citation-js/citation-js/commit/95a6b79))

## <small>0.4.3 (2019-05-11)</small>

* v0.4.3 ([a82ca50](https://github.com/citation-js/citation-js/commit/a82ca50))
* chore(npm): update dev packages ([0cbb778](https://github.com/citation-js/citation-js/commit/0cbb778))
* chore(npm): updates ([cc5fd9f](https://github.com/citation-js/citation-js/commit/cc5fd9f))

## <small>0.4.3-alpha.0 (2019-05-02)</small>

* v0.4.3-alpha.0 ([d70e7d3](https://github.com/citation-js/citation-js/commit/d70e7d3))
* chore(npm): add hook for MJS build ([d931299](https://github.com/citation-js/citation-js/commit/d931299))
* chore(npm): setup MJS build ([502a5b5](https://github.com/citation-js/citation-js/commit/502a5b5)), closes [#38](https://github.com/citation-js/citation-js/issues/38)

## <small>0.4.2 (2019-04-26)</small>

* v0.4.2 ([aa5cf99](https://github.com/citation-js/citation-js/commit/aa5cf99))
* fix(plugin-bibtex): fix label creation ([c7cde40](https://github.com/citation-js/citation-js/commit/c7cde40)), closes [#35](https://github.com/citation-js/citation-js/issues/35)
* fix(plugin-wikidata): support imprecise dates ([c898db7](https://github.com/citation-js/citation-js/commit/c898db7)), closes [#33](https://github.com/citation-js/citation-js/issues/33)
* chore(npm): @citation-js/date@0.4.4 ([0fbfe87](https://github.com/citation-js/citation-js/commit/0fbfe87))
* feat(plugin-wikidata): support more URL properties (#34) ([d489843](https://github.com/citation-js/citation-js/commit/d489843)), closes [#34](https://github.com/citation-js/citation-js/issues/34)

## <small>0.4.1 (2019-04-14)</small>

* v0.4.1 ([3ecde35](https://github.com/citation-js/citation-js/commit/3ecde35))
* test(plugin-wikidata): add no-title test case ([dfc858a](https://github.com/citation-js/citation-js/commit/dfc858a))
* chore(lerna): configure git signing ([feb00c4](https://github.com/citation-js/citation-js/commit/feb00c4))
* chore(npm): update dependencies ([4d75f2c](https://github.com/citation-js/citation-js/commit/4d75f2c))
* doc(changelog): fix changelog ([103494f](https://github.com/citation-js/citation-js/commit/103494f))
* fix(plugin-wikidata): fix getting label if no title exists (#32) ([69243c5](https://github.com/citation-js/citation-js/commit/69243c5)), closes [#32](https://github.com/citation-js/citation-js/issues/32)

## 0.4.0 (2019-04-11)

* v0.4.0 ([0567ece](https://github.com/citation-js/citation-js/commit/0567ece))
* style(plugin-bibtex): fix indentation ([5a8c526](https://github.com/citation-js/citation-js/commit/5a8c526))
* chore(npm): support ES6 tree-shaking (#29) ([112157a](https://github.com/citation-js/citation-js/commit/112157a)), closes [#29](https://github.com/citation-js/citation-js/issues/29)
* doc(changelog): fix changelog ([99a375c](https://github.com/citation-js/citation-js/commit/99a375c))
* feat(plugin-bibtex): add date ranges ([042b4e0](https://github.com/citation-js/citation-js/commit/042b4e0))
* fix(plugin-bibtex): always output fields with braces ([c31e199](https://github.com/citation-js/citation-js/commit/c31e199)), closes [#27](https://github.com/citation-js/citation-js/issues/27)
* fix(plugin-bibtex): use booktitle for inproceedings ([149a49c](https://github.com/citation-js/citation-js/commit/149a49c)), closes [#28](https://github.com/citation-js/citation-js/issues/28)

## 0.4.0-rc.4 (2019-03-17)

* v0.4.0-rc.4 ([22b125b](https://github.com/citation-js/citation-js/commit/22b125b))
* test(core): fix incorrect match ([feab9b2](https://github.com/citation-js/citation-js/commit/feab9b2))
* test(plugin-wikidata): add async tests ([b5de22b](https://github.com/citation-js/citation-js/commit/b5de22b))
* fix(plugin-wikidata): await promise ([3cde76f](https://github.com/citation-js/citation-js/commit/3cde76f)), closes [#25](https://github.com/citation-js/citation-js/issues/25)
* fix(plugin-wikidata): fix fetchApiAsync ([def471d](https://github.com/citation-js/citation-js/commit/def471d))
* fix(plugin-wikidata): label first value ([45087ee](https://github.com/citation-js/citation-js/commit/45087ee)), closes [#23](https://github.com/citation-js/citation-js/issues/23)
* fix(plugin-wikidata): pass all values ([a5acb75](https://github.com/citation-js/citation-js/commit/a5acb75)), closes [#22](https://github.com/citation-js/citation-js/issues/22)
* fix(plugin-wikidata): support novalue & somevalue ([3ff9039](https://github.com/citation-js/citation-js/commit/3ff9039))
* chore(npm): wikidata-sdk@6 ([632c7ba](https://github.com/citation-js/citation-js/commit/632c7ba))
* docs(changelog): fix changelog ([42226b7](https://github.com/citation-js/citation-js/commit/42226b7))
* feat(core): clearer parsing error message ([d296909](https://github.com/citation-js/citation-js/commit/d296909))

## 0.4.0-rc.3 (2019-03-16)

* v0.4.0-rc.3 ([0bcc23d](https://github.com/citation-js/citation-js/commit/0bcc23d))
* chore(changelog): setup automatic changelog ([13cadde](https://github.com/citation-js/citation-js/commit/13cadde))
* chore(npm): update packages ([5a1baef](https://github.com/citation-js/citation-js/commit/5a1baef))
* style(*): update to Standard 12 ([436153f](https://github.com/citation-js/citation-js/commit/436153f))
* fix(core): fix 'generateGraph' ([60106db](https://github.com/citation-js/citation-js/commit/60106db))
* fix(core): fix html dict ([8a06ce1](https://github.com/citation-js/citation-js/commit/8a06ce1))
* fix(core): fix post-processing with 'target' set ([ec3100b](https://github.com/citation-js/citation-js/commit/ec3100b))
* fix(core): remove Object.entries for Node 6 ([47b3d9f](https://github.com/citation-js/citation-js/commit/47b3d9f))
* fix(core): remove overwritten input formats ([4f52124](https://github.com/citation-js/citation-js/commit/4f52124))
* fix(core): set default input options ([4843b40](https://github.com/citation-js/citation-js/commit/4843b40))
* fix(plugin-bibtex): fix invalid output labels ([5624eaf](https://github.com/citation-js/citation-js/commit/5624eaf))
* fix(plugin-bibtex): in-field whitespace ([3f081bc](https://github.com/citation-js/citation-js/commit/3f081bc)), closes [larsgw/citation-js#158](https://github.com/larsgw/citation-js/issues/158)
* fix(plugin-bibtex): preserve nbsp ([e1974c3](https://github.com/citation-js/citation-js/commit/e1974c3))
* fix(plugin-common): handle non-JSON ([539bb6c](https://github.com/citation-js/citation-js/commit/539bb6c))
* fix(plugin-common): improve output json ([49e0d45](https://github.com/citation-js/citation-js/commit/49e0d45))
* fix(plugin-wikidata): fallback for no labels ([9dc3640](https://github.com/citation-js/citation-js/commit/9dc3640))
* fix(plugin-wikidata): fix langs support ([aec2e72](https://github.com/citation-js/citation-js/commit/aec2e72))
* fix(plugin-wikidata): node 6 support ([fdf4127](https://github.com/citation-js/citation-js/commit/fdf4127))
* fix(plugin-wikidata): update type index ([d74dc21](https://github.com/citation-js/citation-js/commit/d74dc21))
* feat(*): actually throw errors ([f025426](https://github.com/citation-js/citation-js/commit/f025426)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* feat(cli): add --log-level option ([bdd718b](https://github.com/citation-js/citation-js/commit/bdd718b))
* feat(core): add 'strict' option ([ad158b3](https://github.com/citation-js/citation-js/commit/ad158b3)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* feat(core): add 'target' option ([89b9e8b](https://github.com/citation-js/citation-js/commit/89b9e8b))
* feat(core): add method to get input format info ([3d9493c](https://github.com/citation-js/citation-js/commit/3d9493c))
* feat(core): input format 'outputs' option ([57645a2](https://github.com/citation-js/citation-js/commit/57645a2))
* feat(logger): add log level support ([83bdb4b](https://github.com/citation-js/citation-js/commit/83bdb4b)), closes [#10](https://github.com/citation-js/citation-js/issues/10)
* feat(plugin-common): throw errors ([3a67db4](https://github.com/citation-js/citation-js/commit/3a67db4))
* feat(plugin-wikidata): langs option ([aaeb28d](https://github.com/citation-js/citation-js/commit/aaeb28d)), closes [#7](https://github.com/citation-js/citation-js/issues/7)
* test(core): test 'strict' & 'target' ([afef39d](https://github.com/citation-js/citation-js/commit/afef39d))
* test(core): update tests for errors ([24bf121](https://github.com/citation-js/citation-js/commit/24bf121))
* test(plugin-wikidata): test 'langs' option ([e5489db](https://github.com/citation-js/citation-js/commit/e5489db))
* test(plugin-wikidata): use updated type index ([20fd5d0](https://github.com/citation-js/citation-js/commit/20fd5d0))
* refactor(core): add 'unmapped' log level ([f7bcaf2](https://github.com/citation-js/citation-js/commit/f7bcaf2)), closes [#13](https://github.com/citation-js/citation-js/issues/13)
* refactor(plugin-wikidata): dedupe code ([973c105](https://github.com/citation-js/citation-js/commit/973c105))
* refactor(plugin-wikidata): rename files ([49c10b9](https://github.com/citation-js/citation-js/commit/49c10b9))
* docs(changelog): add changelog ([66ec9aa](https://github.com/citation-js/citation-js/commit/66ec9aa)), closes [#13](https://github.com/citation-js/citation-js/issues/13)
* doc(plugin-wikidata): document 'langs' option ([af757a5](https://github.com/citation-js/citation-js/commit/af757a5))

### BREAKING CHANGE

* Aformentioned functions might throw errors

## 0.4.0-rc.2 (2019-02-26)

* v0.4.0-rc.2 ([deccdd8](https://github.com/citation-js/citation-js/commit/deccdd8))
* style(scripts): declare global, move assign ([162841b](https://github.com/citation-js/citation-js/commit/162841b))
* fix(core): keep custom props when normalizing ([7b33982](https://github.com/citation-js/citation-js/commit/7b33982)), closes [#8](https://github.com/citation-js/citation-js/issues/8)
* fix(core): pass options from Cite.async ([663c6c1](https://github.com/citation-js/citation-js/commit/663c6c1))
* fix(core): support node 6 ([a1ebf08](https://github.com/citation-js/citation-js/commit/a1ebf08))
* fix(plugin-bibtex): support node 6 ([8f6839b](https://github.com/citation-js/citation-js/commit/8f6839b))
* fix(plugin-wikidata): support more than 50 WD IDs (#11) ([79ae40c](https://github.com/citation-js/citation-js/commit/79ae40c)), closes [#11](https://github.com/citation-js/citation-js/issues/11)
* refactor(cli): complete refactor ([de0685f](https://github.com/citation-js/citation-js/commit/de0685f))
* refactor(cli): move files ([8121c91](https://github.com/citation-js/citation-js/commit/8121c91))
* refactor(core): common chain/Async code ([e4c83ff](https://github.com/citation-js/citation-js/commit/e4c83ff))
* refactor(plugin-wikidata): change parse flow for caching ([86baf38](https://github.com/citation-js/citation-js/commit/86baf38))
* feat(cli): add --pipe option ([a2993cc](https://github.com/citation-js/citation-js/commit/a2993cc))
* feat(cli): error on invalid options for pipe ([0f6839d](https://github.com/citation-js/citation-js/commit/0f6839d))
* feat(core): include complete graph ([2c82e48](https://github.com/citation-js/citation-js/commit/2c82e48)), closes [larsgw/citation.js#165](https://github.com/larsgw/citation.js/issues/165)
* feat(plugin-common): support NDJSON ([e68afe1](https://github.com/citation-js/citation-js/commit/e68afe1)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)
* feat(plugin-wikidata): allow subclass types (#5) ([fc8aa7d](https://github.com/citation-js/citation-js/commit/fc8aa7d)), closes [#5](https://github.com/citation-js/citation-js/issues/5) [larsgw/citation.js#166](https://github.com/larsgw/citation.js/issues/166)
* feat(plugin-wikidata): support namedAs qualifier ([664644b](https://github.com/citation-js/citation-js/commit/664644b)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)
* test: fix tests on Node 6 ([734aba4](https://github.com/citation-js/citation-js/commit/734aba4))
* test(plugin-bibjson): support node 6 ([347d607](https://github.com/citation-js/citation-js/commit/347d607))
* test(plugin-ris): support node 6 ([8c3ed59](https://github.com/citation-js/citation-js/commit/8c3ed59))
* chore(npm): @citation-js/date@0.4.3 ([eb1dc1d](https://github.com/citation-js/citation-js/commit/eb1dc1d))
* chore(npm): update packages ([c93136b](https://github.com/citation-js/citation-js/commit/c93136b))

## 0.4.0-rc.1 (2018-12-27)

* v0.4.0-rc.1 ([09ff472](https://github.com/citation-js/citation-js/commit/09ff472))
* chore(npm): exclude lib files in cli ([57915c5](https://github.com/citation-js/citation-js/commit/57915c5))
* chore(npm): fix core dep for plugins ([830c381](https://github.com/citation-js/citation-js/commit/830c381))
* chore(npm): include bin files ([b686b88](https://github.com/citation-js/citation-js/commit/b686b88)), closes [#1](https://github.com/citation-js/citation-js/issues/1)
* chore(npm): update lock ([a3c7e26](https://github.com/citation-js/citation-js/commit/a3c7e26)), closes [#3](https://github.com/citation-js/citation-js/issues/3)
* chore(npm): update lock ([282f174](https://github.com/citation-js/citation-js/commit/282f174)), closes [#3](https://github.com/citation-js/citation-js/issues/3)
* docs(*): fix readme badges ([9b6e465](https://github.com/citation-js/citation-js/commit/9b6e465))

## 0.4.0-rc.0 (2018-12-06)

* [Cite:async] Fix behaviour of Cite.async w/ callback & no options ([0aeeb8c](https://github.com/citation-js/citation-js/commit/0aeeb8c)), closes [#122](https://github.com/citation-js/citation-js/issues/122)
* [Cite:get] Add pre/append functionality ([8792841](https://github.com/citation-js/citation-js/commit/8792841)), closes [#40](https://github.com/citation-js/citation-js/issues/40) [#40](https://github.com/citation-js/citation-js/issues/40)
* [Cite:get] Create Cite#format and deprecate Cite#get ([f43a78a](https://github.com/citation-js/citation-js/commit/f43a78a)), closes [Cite#format](https://github.com/Cite/issues/format) [Cite#get](https://github.com/Cite/issues/get)
* [Cite:log] retrieveVersion() now returns null on all invalid versions ([90b93f7](https://github.com/citation-js/citation-js/commit/90b93f7))
* [Cite:options] Fix option validation ([4d0435b](https://github.com/citation-js/citation-js/commit/4d0435b))
* [Cite:options] Fixed output options validation issue ([0ee40a8](https://github.com/citation-js/citation-js/commit/0ee40a8)), closes [#120](https://github.com/citation-js/citation-js/issues/120)
* [Cite:options] Validate options in Cite#options() and Cite#get() ([138b916](https://github.com/citation-js/citation-js/commit/138b916)), closes [#59](https://github.com/citation-js/citation-js/issues/59)
* [Cite:output] Fix reference bugs in Cite#get() ([5841e5b](https://github.com/citation-js/citation-js/commit/5841e5b)), closes [#50](https://github.com/citation-js/citation-js/issues/50)
* [Cite:output] Small fix and refactoring ([e9ebc5e](https://github.com/citation-js/citation-js/commit/e9ebc5e))
* [Cite:set] Add async versions of Cite#add and Cite#set ([64a3f51](https://github.com/citation-js/citation-js/commit/64a3f51)), closes [Cite#add](https://github.com/Cite/issues/add) [Cite#set](https://github.com/Cite/issues/set) [#46](https://github.com/citation-js/citation-js/issues/46)
* [Cite:sort] Added sorting by callback and by custom props ([21b9b78](https://github.com/citation-js/citation-js/commit/21b9b78))
* [Cite:sort] Added sorting by callback and by custom props ([39e438e](https://github.com/citation-js/citation-js/commit/39e438e))
* [Cite:sort] Update date format in sort function ([0c190ad](https://github.com/citation-js/citation-js/commit/0c190ad))
* [Cite] Add Iterator functioning to Cite instances ([2949632](https://github.com/citation-js/citation-js/commit/2949632))
* [Cite] Use tool-agnostic file for logging ([b0c5975](https://github.com/citation-js/citation-js/commit/b0c5975)), closes [#151](https://github.com/citation-js/citation-js/issues/151)
* [CLI:input] Add default input from stdin ([46a9099](https://github.com/citation-js/citation-js/commit/46a9099))
* [CLI:input] Fix input error ([b4ee1f0](https://github.com/citation-js/citation-js/commit/b4ee1f0))
* [CLI] Append newline to output ([24993c3](https://github.com/citation-js/citation-js/commit/24993c3))
* [CLI] Change options format to 0.3.1 ([3553d30](https://github.com/citation-js/citation-js/commit/3553d30)), closes [#71](https://github.com/citation-js/citation-js/issues/71) [#79](https://github.com/citation-js/citation-js/issues/79)
* [CLI] Fix file extension handling ([df1a61f](https://github.com/citation-js/citation-js/commit/df1a61f)), closes [#121](https://github.com/citation-js/citation-js/issues/121)
* [CLI] Move all logging to STDERR ([31e6922](https://github.com/citation-js/citation-js/commit/31e6922))
* [CLI] Run with only stdin and stdout ([bc3a941](https://github.com/citation-js/citation-js/commit/bc3a941)), closes [#70](https://github.com/citation-js/citation-js/issues/70)
* [docs:jsdoc] Fix jsdoc types in lists ([1bcc9cd](https://github.com/citation-js/citation-js/commit/1bcc9cd))
* [docs:tokenstack] Update matching callback params ([4f4fb1d](https://github.com/citation-js/citation-js/commit/4f4fb1d))
* [docs] Update docs ([3151c3b](https://github.com/citation-js/citation-js/commit/3151c3b))
* [docs] Update docs ([ac5f7ad](https://github.com/citation-js/citation-js/commit/ac5f7ad))
* [docs] Update versions in code file comments ([36c2503](https://github.com/citation-js/citation-js/commit/36c2503))
* [input:bibjson] Update BibJSON support ([d424aa7](https://github.com/citation-js/citation-js/commit/d424aa7)), closes [#32](https://github.com/citation-js/citation-js/issues/32)
* [input:bibtex] Add explanation to non-obvious code ([6a95aa1](https://github.com/citation-js/citation-js/commit/6a95aa1))
* [input:bibtex] Add support for BibTeX in JSON representation ([94077c1](https://github.com/citation-js/citation-js/commit/94077c1))
* [input:bibtex] Add support for styled title text ([acb5c42](https://github.com/citation-js/citation-js/commit/acb5c42)), closes [#150](https://github.com/citation-js/citation-js/issues/150)
* [input:bibtex] BibTeX pub type now uses a type map ([54ce4f9](https://github.com/citation-js/citation-js/commit/54ce4f9))
* [input:bibtex] Fix LaTeX command substituting issue ([b27e2b4](https://github.com/citation-js/citation-js/commit/b27e2b4))
* [input:bibtex] Fix typo ([6dfa0ff](https://github.com/citation-js/citation-js/commit/6dfa0ff))
* [input:bibtex] Fix unwrapping title values ([7c05afc](https://github.com/citation-js/citation-js/commit/7c05afc))
* [input:bibtex] Fix unwrapping title values again ([2bd87aa](https://github.com/citation-js/citation-js/commit/2bd87aa)), closes [#155](https://github.com/citation-js/citation-js/issues/155) [#155](https://github.com/citation-js/citation-js/issues/155)
* [input:bibtex] Improve BibTeX mapping ([e9f6fc7](https://github.com/citation-js/citation-js/commit/e9f6fc7))
* [input:bibtex] Refactor BibTeX parser ([9dc99d3](https://github.com/citation-js/citation-js/commit/9dc99d3))
* [input:bibtex] Support literals in date and author values ([cdebbbc](https://github.com/citation-js/citation-js/commit/cdebbbc)), closes [#54](https://github.com/citation-js/citation-js/issues/54)
* [input:bibtex] Support names as months ([b3660b7](https://github.com/citation-js/citation-js/commit/b3660b7))
* [input:date] Improve fallback in case of invalid date ([123b8c9](https://github.com/citation-js/citation-js/commit/123b8c9))
* [input:date] Rework Date parser (#139) ([82db2f4](https://github.com/citation-js/citation-js/commit/82db2f4)), closes [#139](https://github.com/citation-js/citation-js/issues/139) [#138](https://github.com/citation-js/citation-js/issues/138) [#127](https://github.com/citation-js/citation-js/issues/127)
* [input:doi] Add better DOI request error handling ([e4e9189](https://github.com/citation-js/citation-js/commit/e4e9189))
* [input:doi] Fix horrendous DOI bug ([5666209](https://github.com/citation-js/citation-js/commit/5666209))
* [input:doi] Make check when parsing API data safe ([64386a2](https://github.com/citation-js/citation-js/commit/64386a2)), closes [#147](https://github.com/citation-js/citation-js/issues/147)
* [input:else] Improve URL pattern ([d379481](https://github.com/citation-js/citation-js/commit/d379481)), closes [#156](https://github.com/citation-js/citation-js/issues/156)
* [input:file] Add better request error handling ([f0d6095](https://github.com/citation-js/citation-js/commit/f0d6095))
* [input:file] Generalise request methods ([035bb40](https://github.com/citation-js/citation-js/commit/035bb40))
* [input:file] Improve file request error handling ([dc9e8ab](https://github.com/citation-js/citation-js/commit/dc9e8ab))
* [input:json] Fix type predicate for empty objects ([183fa6e](https://github.com/citation-js/citation-js/commit/183fa6e))
* [input:name] Fix parsing of names with lowercase particles ([f7d307b](https://github.com/citation-js/citation-js/commit/f7d307b))
* [input:name] Improve name parsing ([9432d7b](https://github.com/citation-js/citation-js/commit/9432d7b)), closes [#66](https://github.com/citation-js/citation-js/issues/66)
* [input:tokenstack] Add TokenStack pattern sequence support ([6f85e90](https://github.com/citation-js/citation-js/commit/6f85e90))
* [input:tokenstack] Refactor whitespace handling ([675e924](https://github.com/citation-js/citation-js/commit/675e924))
* [input:type] Add missing parameter to type parser ([a7a992a](https://github.com/citation-js/citation-js/commit/a7a992a))
* [input:type] Fix false positives when checking for Bib.TXT ([19b8cd7](https://github.com/citation-js/citation-js/commit/19b8cd7)), closes [#58](https://github.com/citation-js/citation-js/issues/58)
* [input:type] Use extends option in input modules ([10853be](https://github.com/citation-js/citation-js/commit/10853be)), closes [#104](https://github.com/citation-js/citation-js/issues/104)
* [input:wikidata] Add labeled field mappings ([681fc78](https://github.com/citation-js/citation-js/commit/681fc78))
* [input:wikidata] Add more entry type mappings ([f3688ad](https://github.com/citation-js/citation-js/commit/f3688ad))
* [input:wikidata] Add Wikidata entry type mappings ([7571742](https://github.com/citation-js/citation-js/commit/7571742)), closes [#78](https://github.com/citation-js/citation-js/issues/78)
* [input:wikidata] Added guard for empty values ([3e96dfc](https://github.com/citation-js/citation-js/commit/3e96dfc)), closes [#50](https://github.com/citation-js/citation-js/issues/50)
* [input:wikidata] Change some field mappings ([cb678c2](https://github.com/citation-js/citation-js/commit/cb678c2))
* [input:wikidata] Fix async prop parsing ([12a7c44](https://github.com/citation-js/citation-js/commit/12a7c44))
* [input:wikidata] Fix async wikidata prop refs ([fd8817b](https://github.com/citation-js/citation-js/commit/fd8817b))
* [input:wikidata] Improve handling of author ordinals ([32f3a77](https://github.com/citation-js/citation-js/commit/32f3a77))
* [input:wikidata] Rework Wikidata JSON parsing system ([a6a5889](https://github.com/citation-js/citation-js/commit/a6a5889)), closes [#45](https://github.com/citation-js/citation-js/issues/45)
* [input:wikidata] Support P1932:statedAs qualifier ([ebca088](https://github.com/citation-js/citation-js/commit/ebca088)), closes [#131](https://github.com/citation-js/citation-js/issues/131)
* [input] Add input format register ([017db14](https://github.com/citation-js/citation-js/commit/017db14))
* [input] Add input plugin registering method ([2ca7632](https://github.com/citation-js/citation-js/commit/2ca7632)), closes [#88](https://github.com/citation-js/citation-js/issues/88)
* [input] Add option for max parsing chain length ([0a03e0f](https://github.com/citation-js/citation-js/commit/0a03e0f)), closes [#63](https://github.com/citation-js/citation-js/issues/63)
* [input] Add option to force type, change option params in Cite ([d37b247](https://github.com/citation-js/citation-js/commit/d37b247)), closes [#61](https://github.com/citation-js/citation-js/issues/61) [#64](https://github.com/citation-js/citation-js/issues/64)
* [input] Add option to generate parsing chain graph ([1885bea](https://github.com/citation-js/citation-js/commit/1885bea))
* [input] Add shortcut to parsing functions ([db84cc5](https://github.com/citation-js/citation-js/commit/db84cc5)), closes [#60](https://github.com/citation-js/citation-js/issues/60)
* [input] Add typeParser option tokenList ([440228c](https://github.com/citation-js/citation-js/commit/440228c))
* [input] Add underscore to custom properties ([11bf594](https://github.com/citation-js/citation-js/commit/11bf594)), closes [#48](https://github.com/citation-js/citation-js/issues/48)
* [input] Clean up code ([eee5fea](https://github.com/citation-js/citation-js/commit/eee5fea))
* [input] Export format metadata from parsers ([14eb339](https://github.com/citation-js/citation-js/commit/14eb339))
* [input] Export more info from parsers ([4bc58ff](https://github.com/citation-js/citation-js/commit/4bc58ff))
* [input] Fix flagged REDOS regexes ([351379f](https://github.com/citation-js/citation-js/commit/351379f)), closes [#107](https://github.com/citation-js/citation-js/issues/107)
* [input] Improve @invalid handling ([050b220](https://github.com/citation-js/citation-js/commit/050b220))
* [input] Improve CSL-JSON normalising code ([d70e86d](https://github.com/citation-js/citation-js/commit/d70e86d))
* [input] Move cache retrieval code ([6680edd](https://github.com/citation-js/citation-js/commit/6680edd))
* [input] Move format checkers to src/parse/modules/ ([ad988de](https://github.com/citation-js/citation-js/commit/ad988de))
* [input] Move specialised parsers to src/parse/modules/ ([5dc7494](https://github.com/citation-js/citation-js/commit/5dc7494))
* [input] Rename main parsing function shortcuts ([85035f7](https://github.com/citation-js/citation-js/commit/85035f7))
* [input] Rename types to new syntax ([076c1ee](https://github.com/citation-js/citation-js/commit/076c1ee))
* [input] Rework input system again ([07c595d](https://github.com/citation-js/citation-js/commit/07c595d)), closes [#104](https://github.com/citation-js/citation-js/issues/104) [#104](https://github.com/citation-js/citation-js/issues/104) [#106](https://github.com/citation-js/citation-js/issues/106) [#88](https://github.com/citation-js/citation-js/issues/88)
* [input] Several small fixes ([8be8fb8](https://github.com/citation-js/citation-js/commit/8be8fb8)), closes [#103](https://github.com/citation-js/citation-js/issues/103)
* [input] Use plugin API for internal plugins ([6063205](https://github.com/citation-js/citation-js/commit/6063205)), closes [#106](https://github.com/citation-js/citation-js/issues/106)
* [input] Use register for all native parsers ([019d56c](https://github.com/citation-js/citation-js/commit/019d56c))
* [input] Use register for all native types ([351af97](https://github.com/citation-js/citation-js/commit/351af97))
* [log] Don't use stream.Writable ([9726067](https://github.com/citation-js/citation-js/commit/9726067)), closes [#124](https://github.com/citation-js/citation-js/issues/124)
* [log] Fix logging for browser and init code ([a23d44d](https://github.com/citation-js/citation-js/commit/a23d44d))
* [output:bibtex] Fix handling of rich text ([0fb2df8](https://github.com/citation-js/citation-js/commit/0fb2df8)), closes [#150](https://github.com/citation-js/citation-js/issues/150)
* [output:bibtex] Fix logging typo ([5943ce4](https://github.com/citation-js/citation-js/commit/5943ce4))
* [output:bibtex] Improve BibTeX mapping ([f7d8315](https://github.com/citation-js/citation-js/commit/f7d8315))
* [output:bibtex] Increase coverage ([7c5e064](https://github.com/citation-js/citation-js/commit/7c5e064))
* [output:bibtex] Stop double-wrapping title fields ([a5408cb](https://github.com/citation-js/citation-js/commit/a5408cb)), closes [#155](https://github.com/citation-js/citation-js/issues/155)
* [output:bibtex] Use CSL 'URL' instead of 'url' ([2757234](https://github.com/citation-js/citation-js/commit/2757234)), closes [#153](https://github.com/citation-js/citation-js/issues/153)
* [output:csl] Add bibliography 'nosort' option ([767558d](https://github.com/citation-js/citation-js/commit/767558d)), closes [#85](https://github.com/citation-js/citation-js/issues/85)
* [output:CSL] Add registers for custom locales and templates ([2717a71](https://github.com/citation-js/citation-js/commit/2717a71))
* [output:csl] Add support for citations ([20aa399](https://github.com/citation-js/citation-js/commit/20aa399))
* [output:csl] Deprecate wrapper methods ([d1edecf](https://github.com/citation-js/citation-js/commit/d1edecf))
* [output:csl] Fix CSL affix behaviour ([2f4208d](https://github.com/citation-js/citation-js/commit/2f4208d)), closes [#84](https://github.com/citation-js/citation-js/issues/84)
* [output:CSL] Fix incorrect date format ([f8de9c4](https://github.com/citation-js/citation-js/commit/f8de9c4))
* [output:csl] Keep affix.js for compat ([bf0ffe7](https://github.com/citation-js/citation-js/commit/bf0ffe7))
* [output:csl] Use General Plugins for CSL config ([1601697](https://github.com/citation-js/citation-js/commit/1601697))
* [output:date] Fix handling of incomplete dates ([5d6931a](https://github.com/citation-js/citation-js/commit/5d6931a)), closes [#127](https://github.com/citation-js/citation-js/issues/127) [#138](https://github.com/citation-js/citation-js/issues/138) [#139](https://github.com/citation-js/citation-js/issues/139)
* [output:json] Fix comma in output ([ca623f2](https://github.com/citation-js/citation-js/commit/ca623f2)), closes [#143](https://github.com/citation-js/citation-js/issues/143) [#144](https://github.com/citation-js/citation-js/issues/144)
* [output:json] Make a CSL-JSON normalizer ([02cec93](https://github.com/citation-js/citation-js/commit/02cec93)), closes [#50](https://github.com/citation-js/citation-js/issues/50)
* [output:json] Make JSON output valid JSON ([e5acaef](https://github.com/citation-js/citation-js/commit/e5acaef))
* [output:name] Fix suffix handling in reverse mode ([b3c0b09](https://github.com/citation-js/citation-js/commit/b3c0b09))
* [output:name] Option to get name in reverse ([5be7724](https://github.com/citation-js/citation-js/commit/5be7724)), closes [#72](https://github.com/citation-js/citation-js/issues/72)
* [output:ris] Add type checker to type checker ([ec9c62e](https://github.com/citation-js/citation-js/commit/ec9c62e)), closes [#128](https://github.com/citation-js/citation-js/issues/128)
* [output:ris] Create RIS output module ([be5ce9c](https://github.com/citation-js/citation-js/commit/be5ce9c)), closes [#125](https://github.com/citation-js/citation-js/issues/125)
* [output] Add output format & formatting registers ([8878595](https://github.com/citation-js/citation-js/commit/8878595))
* [output] Alias 'format' option to 'type' ([111e127](https://github.com/citation-js/citation-js/commit/111e127))
* [output] Fix flagged REDOS regex ([5e99b27](https://github.com/citation-js/citation-js/commit/5e99b27)), closes [#107](https://github.com/citation-js/citation-js/issues/107)
* [output] Fix legacy property names ([0997615](https://github.com/citation-js/citation-js/commit/0997615)), closes [#119](https://github.com/citation-js/citation-js/issues/119)
* [output] Move CSL ouptut to module ([a2d4c8d](https://github.com/citation-js/citation-js/commit/a2d4c8d))
* [output] Support dynamic output types ([c322750](https://github.com/citation-js/citation-js/commit/c322750))
* [package:coverage] Relocate ignore commands ([cb1ab9a](https://github.com/citation-js/citation-js/commit/cb1ab9a))
* [package:dist] Fix dist browser support ([1a8a2a8](https://github.com/citation-js/citation-js/commit/1a8a2a8))
* [package:lint] Fix code styling ([b99e138](https://github.com/citation-js/citation-js/commit/b99e138))
* [package:test] Fix case for codecov tools ([fb76d82](https://github.com/citation-js/citation-js/commit/fb76d82))
* [package] Change Cite static method location ([3edf0e9](https://github.com/citation-js/citation-js/commit/3edf0e9))
* [package] Extract name and date code ([bed4008](https://github.com/citation-js/citation-js/commit/bed4008))
* [package] Fix code style issues ([1c3535f](https://github.com/citation-js/citation-js/commit/1c3535f))
* [package] Fix small code style issues ([3e1f5fa](https://github.com/citation-js/citation-js/commit/3e1f5fa))
* [package] Fix style issues ([4c3a1f8](https://github.com/citation-js/citation-js/commit/4c3a1f8))
* [package] Update babel dependencies ([4796ccf](https://github.com/citation-js/citation-js/commit/4796ccf))
* [package] Update npm scripts ([4873fed](https://github.com/citation-js/citation-js/commit/4873fed))
* [plugins] Add dict and config as plugin types ([ac9a48a](https://github.com/citation-js/citation-js/commit/ac9a48a))
* [plugins] Allow empty plugin add method call ([ca0d483](https://github.com/citation-js/citation-js/commit/ca0d483))
* [plugins] Create general plugin system ([e835ad8](https://github.com/citation-js/citation-js/commit/e835ad8))
* [site:docs] Add deprecation notes & fix 'get' namespace ([44adcf8](https://github.com/citation-js/citation-js/commit/44adcf8)), closes [#112](https://github.com/citation-js/citation-js/issues/112)
* [site:docs] Improved namespacing; use Cite.util.Register ([a863540](https://github.com/citation-js/citation-js/commit/a863540)), closes [#115](https://github.com/citation-js/citation-js/issues/115)
* [site:docs] Map and deprecate certain namespaces ([116b2ef](https://github.com/citation-js/citation-js/commit/116b2ef)), closes [#113](https://github.com/citation-js/citation-js/issues/113) [#117](https://github.com/citation-js/citation-js/issues/117)
* [site:docs] Update inline docs, map namespaces ([1bec213](https://github.com/citation-js/citation-js/commit/1bec213)), closes [#100](https://github.com/citation-js/citation-js/issues/100)
* [test:input] Add test cases for BibTeX literal fields and year/month merging ([3c7d692](https://github.com/citation-js/citation-js/commit/3c7d692))
* [test:input] Add tests for parsing methods ([7ea2d3b](https://github.com/citation-js/citation-js/commit/7ea2d3b))
* [test:input] Set up HTTP request mocking (#136) ([2b81604](https://github.com/citation-js/citation-js/commit/2b81604)), closes [#136](https://github.com/citation-js/citation-js/issues/136) [#68](https://github.com/citation-js/citation-js/issues/68) [#134](https://github.com/citation-js/citation-js/issues/134) [#123](https://github.com/citation-js/citation-js/issues/123)
* [test:output] Update RIS test cases ([f85bd1d](https://github.com/citation-js/citation-js/commit/f85bd1d))
* [test:plugins] Reorder tests for general plugins ([9dff2a9](https://github.com/citation-js/citation-js/commit/9dff2a9))
* [test] Change test file placement; Fix test case ([f4beab0](https://github.com/citation-js/citation-js/commit/f4beab0))
* [test] Input tests can run on their own ([ddc83aa](https://github.com/citation-js/citation-js/commit/ddc83aa)), closes [#114](https://github.com/citation-js/citation-js/issues/114)
* [test] Switch to mocha ([0f868cd](https://github.com/citation-js/citation-js/commit/0f868cd)), closes [#55](https://github.com/citation-js/citation-js/issues/55)
* [util:register] Alias 'delete' method to 'remove' ([32fabe5](https://github.com/citation-js/citation-js/commit/32fabe5))
* Added async docs ([55f5f21](https://github.com/citation-js/citation-js/commit/55f5f21))
* Fix of import comma separated records in bibtex ([7730417](https://github.com/citation-js/citation-js/commit/7730417))
* Fixed #25 ([1b61dba](https://github.com/citation-js/citation-js/commit/1b61dba)), closes [#25](https://github.com/citation-js/citation-js/issues/25)
* Fixed #29 ([b774b38](https://github.com/citation-js/citation-js/commit/b774b38)), closes [#29](https://github.com/citation-js/citation-js/issues/29)
* Fixed #31, #39 ([ad018ce](https://github.com/citation-js/citation-js/commit/ad018ce)), closes [#31](https://github.com/citation-js/citation-js/issues/31) [#39](https://github.com/citation-js/citation-js/issues/39)
* Fixed #38 ([a07892e](https://github.com/citation-js/citation-js/commit/a07892e)), closes [#38](https://github.com/citation-js/citation-js/issues/38)
* Fixed #47 ([2c6c051](https://github.com/citation-js/citation-js/commit/2c6c051)), closes [#47](https://github.com/citation-js/citation-js/issues/47)
* Fixed dependency issue; removed _input ([ddd0bbf](https://github.com/citation-js/citation-js/commit/ddd0bbf))
* Made Cite internal change log non-standard ([b5bc064](https://github.com/citation-js/citation-js/commit/b5bc064))
* Move line, remove semicolon ([e01f7b9](https://github.com/citation-js/citation-js/commit/e01f7b9))
* Output typo fix ([775000b](https://github.com/citation-js/citation-js/commit/775000b))
* Split up main file in several files ([250bf84](https://github.com/citation-js/citation-js/commit/250bf84))
* test(core, plugin-ris): fix data ([bae45b9](https://github.com/citation-js/citation-js/commit/bae45b9))
* Updated cmd to Cite 0.3.0-7 ([1c18f6b](https://github.com/citation-js/citation-js/commit/1c18f6b))
* v0.4.0-rc.0 ([113776d](https://github.com/citation-js/citation-js/commit/113776d))
* chore(babel): add babel config ([8d60072](https://github.com/citation-js/citation-js/commit/8d60072))
* chore(babel): fix babel config ([390df34](https://github.com/citation-js/citation-js/commit/390df34))
* chore(codecov): add codecov support ([ede950e](https://github.com/citation-js/citation-js/commit/ede950e))
* chore(codecov): fix report command ([a0114fc](https://github.com/citation-js/citation-js/commit/a0114fc))
* chore(codecov): update babel usage ([dca4869](https://github.com/citation-js/citation-js/commit/dca4869))
* chore(git): add .gitignore ([8a0642f](https://github.com/citation-js/citation-js/commit/8a0642f))
* chore(git): remove index files ([a953644](https://github.com/citation-js/citation-js/commit/a953644))
* chore(git): setup index for git am ([b0e6103](https://github.com/citation-js/citation-js/commit/b0e6103))
* chore(git): update gitignore for lerna dev ([69520e5](https://github.com/citation-js/citation-js/commit/69520e5))
* chore(lerna): move files ([0390d00](https://github.com/citation-js/citation-js/commit/0390d00))
* chore(lerna): move plugin-common module ([025a99f](https://github.com/citation-js/citation-js/commit/025a99f))
* chore(lerna): setup lerna ([a0c60e0](https://github.com/citation-js/citation-js/commit/a0c60e0))
* chore(lerna): update index files, file refs ([08af591](https://github.com/citation-js/citation-js/commit/08af591))
* chore(lint): add lint config ([03597ec](https://github.com/citation-js/citation-js/commit/03597ec))
* chore(npm): add dependencies ([31e222c](https://github.com/citation-js/citation-js/commit/31e222c))
* chore(npm): add executable info ([417cad1](https://github.com/citation-js/citation-js/commit/417cad1))
* chore(npm): setup package.json ([958a46e](https://github.com/citation-js/citation-js/commit/958a46e))
* chore(npm): update repo refs ([a8ba239](https://github.com/citation-js/citation-js/commit/a8ba239))
* chore(npm): update scripts ([2b167f1](https://github.com/citation-js/citation-js/commit/2b167f1))
* chore(travis): add missing install step ([131942e](https://github.com/citation-js/citation-js/commit/131942e))
* chore(travis): add removed install step ([6048ba1](https://github.com/citation-js/citation-js/commit/6048ba1))
* chore(travis): fix install step ([e8c65ce](https://github.com/citation-js/citation-js/commit/e8c65ce))
* chore(travis): setup travis ([8f5a5bd](https://github.com/citation-js/citation-js/commit/8f5a5bd))
* fix(plugin-ris): output year always string ([88aabc9](https://github.com/citation-js/citation-js/commit/88aabc9))
* test(*): setup tests ([57ba9ff](https://github.com/citation-js/citation-js/commit/57ba9ff))
* test(core): fix core testing data ([12ca4ed](https://github.com/citation-js/citation-js/commit/12ca4ed))
* docs(*): add READMEs, distribute docs ([dc5c8cb](https://github.com/citation-js/citation-js/commit/dc5c8cb))
