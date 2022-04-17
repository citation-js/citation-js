# [](https://github.com/citation-js/citation-js/compare/v0.5.6...v) (2022-04-17)


### Bug Fixes

* **core:** do not use process variable in browser ([d779267](https://github.com/citation-js/citation-js/commit/d779267d8579e0e50390834b447c6b83cd446645)), closes [#156](https://github.com/citation-js/citation-js/issues/156)



## [0.5.6](https://github.com/citation-js/citation-js/compare/v0.5.5...v0.5.6) (2022-02-12)


### Bug Fixes

* **plugin-bibtex:** fix handling of literal dates ([701526d](https://github.com/citation-js/citation-js/commit/701526d6c46a5c5dc9783a686ac04c09d9448b8b))



## [0.5.5](https://github.com/citation-js/citation-js/compare/v0.5.4...v0.5.5) (2021-12-31)


### Bug Fixes

* **plugin-bibtex:** ignore empty fields ([6badc93](https://github.com/citation-js/citation-js/commit/6badc9361df2bc35a6b804821e5196b0783e5147))
* **plugin-csl:** error for unknown output format ([b9a2b7d](https://github.com/citation-js/citation-js/commit/b9a2b7dce4204d45e4c742596a45b21452db739e))
* **plugin-ris:** add non-standard issue mapping ([fb6ae32](https://github.com/citation-js/citation-js/commit/fb6ae3257bee7e3a721d2631592195f706fce39f))
* **plugin-ris:** map publisher-place ([89cb3f2](https://github.com/citation-js/citation-js/commit/89cb3f25c4e12e10d65adf101dba2af9beb0e92d))



## [0.5.4](https://github.com/citation-js/citation-js/compare/v0.5.3...v0.5.4) (2021-12-11)


### Bug Fixes

* **core:** do not convert string id to numbers ([6490200](https://github.com/citation-js/citation-js/commit/6490200d256c047cabbfaff899c158ad5a017427))
* **plugin-bibtex:** fix numeric id in bibtex label ([6291843](https://github.com/citation-js/citation-js/commit/62918432f1ad9cf9a0f7a1a243689506c3511e4b))
* **plugin-bibtex:** replace use of moo.keywords ([efb9586](https://github.com/citation-js/citation-js/commit/efb958674bba4f39abc848053b88e1c7d16ce1ac))



## [0.5.3](https://github.com/citation-js/citation-js/compare/v0.5.2...v0.5.3) (2021-11-24)


### Bug Fixes

* **plugin-csl:** handle missing entries ([93400d6](https://github.com/citation-js/citation-js/commit/93400d62d6fa38ce1f6a18f1728b07091f5643d1))
* **plugin-doi:** handle crossref preprints ([0927f43](https://github.com/citation-js/citation-js/commit/0927f43deb07e512d828e5415a7d649d2d9b966a))
* remove named imports of JSON files ([9b8315b](https://github.com/citation-js/citation-js/commit/9b8315bd8352dc9a4bf1866ac71bb65a9df994d0))


* chore!: drop Node 8, add Node 14 ([a5ceb07](https://github.com/citation-js/citation-js/commit/a5ceb07496900e66de30e405523ec315cfbc0a89))


### Features

* **core:** throw more descriptive errors in Translator ([c35b40f](https://github.com/citation-js/citation-js/commit/c35b40f3badf81ed9b475979673be284b1407ab4))
* **plugin-csl:** allow citation context options ([c5c3e8c](https://github.com/citation-js/citation-js/commit/c5c3e8c6de1a562ec7128e74cc6560d7c5ed2347))
* **plugin-csl:** allow cite-items ([48fb79c](https://github.com/citation-js/citation-js/commit/48fb79c9b81e93ec6e44186e064eaca0fac57f1c))


### BREAKING CHANGES

* drops Node 8 support



## [0.5.2](https://github.com/citation-js/citation-js/compare/v0.5.1...v0.5.2) (2021-09-21)


### Bug Fixes

* **plugin-csl:** check for non-normalised language codes ([3928f70](https://github.com/citation-js/citation-js/commit/3928f70065f3a802270182d1f0251deb317d4416))


### Features

* **plugin-bibtex:** allow non-standard day field ([96f8d43](https://github.com/citation-js/citation-js/commit/96f8d43a261efb1ceeffe0f4d8e346e958d867f7)), closes [#134](https://github.com/citation-js/citation-js/issues/134)



## [0.5.1](https://github.com/citation-js/citation-js/compare/v0.5.0...v0.5.1) (2021-05-11)



# [0.5.0](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.10...v0.5.0) (2021-04-01)


### Bug Fixes

* **plugin-bibtex:** remove CSL 1.0.2 types ([365fe1c](https://github.com/citation-js/citation-js/commit/365fe1c0a950de5f333ed8fc7e70ba17c59b7c21))
* **plugin-bibtex:** remove lookbehind regex ([fe20199](https://github.com/citation-js/citation-js/commit/fe2019901f60bbfa89c2676c4eebae24e8dbfb79))


### Features

* **plugin-bibtex:** allow URL in howpublished ([3884e08](https://github.com/citation-js/citation-js/commit/3884e0807c9509b585b8e0ce82ec746915886c63))
* **plugin-ris:** add formatting 'spec' option ([ec0bbad](https://github.com/citation-js/citation-js/commit/ec0bbada4019be7f92e33c82d1870b7a4052f089))



# [0.5.0-alpha.10](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.9...v0.5.0-alpha.10) (2021-01-28)


### Bug Fixes

* **core:** clean `type` as regular string ([6982ae6](https://github.com/citation-js/citation-js/commit/6982ae627b8ceb0f1fb3ac59ff5351b27912769f))
* **core:** do not snapshot initial Cite() state ([19afac7](https://github.com/citation-js/citation-js/commit/19afac7ff22f5a5ea23852374a33aaf879317a1d))
* **core:** reset Grammar log on each run ([68d8a2a](https://github.com/citation-js/citation-js/commit/68d8a2a61a4f745d0acf38ec590ba7643d3a8f61))
* **core:** reset Grammar state on each run ([834f679](https://github.com/citation-js/citation-js/commit/834f679dfbd0ddd2dcb7d2e0e0488fc4c9aba3da))
* **plugin-bibtex:** apply upstream changes ([f5a1514](https://github.com/citation-js/citation-js/commit/f5a15144a78af2c8538eef9465f50a904d55ee17))
* **plugin-bibtex:** apply various fixes ([861cb36](https://github.com/citation-js/citation-js/commit/861cb36504cb6f20ae859d220d437dc58c53a086))
* **plugin-bibtex:** apply various fixes ([86e55df](https://github.com/citation-js/citation-js/commit/86e55df2261170efba4ff2106569d8cd5e8fcc02))
* **plugin-bibtex:** do not escape verbatim value ([a90f4a5](https://github.com/citation-js/citation-js/commit/a90f4a50a99a27bd61469487e003054ea5181e75))
* **plugin-bibtex:** do not ignore month after day ([4914797](https://github.com/citation-js/citation-js/commit/4914797c3333f0fe898c538080bf3c98e0b79fcb))
* **plugin-bibtex:** escape more unicode in output ([1647734](https://github.com/citation-js/citation-js/commit/1647734903430d483db9b47349dcecb01a70c88e))
* **plugin-bibtex:** fix howpublished/url mapping ([b655bec](https://github.com/citation-js/citation-js/commit/b655becf004825fc12d174cc8c2625d57d020804))
* **plugin-bibtex:** fix mapping bugs ([a644b3a](https://github.com/citation-js/citation-js/commit/a644b3af3f7dc280875f1ac7efcadaccfa9bb3b6))
* **plugin-bibtex:** output w/ case protection ([07f99b5](https://github.com/citation-js/citation-js/commit/07f99b5ba15b672f059f0384dbc75354c40bcc66))
* **plugin-bibtex:** remove unicode from label ([81d657d](https://github.com/citation-js/citation-js/commit/81d657d2eb73b3eb022bb58133923f8824181835))
* **plugin-bibtex:** update BibTeX mappings ([db79896](https://github.com/citation-js/citation-js/commit/db7989659742cc5473e236cae3bde78d9ba1a1b2))


### Features

* **core:** add mainRule param to Grammar ([e8679d5](https://github.com/citation-js/citation-js/commit/e8679d5c33edd7251de1d1779293219754b4b2da))
* **core:** move DOI corrections to core ([03b804b](https://github.com/citation-js/citation-js/commit/03b804b5d07841cfab4234dac648bb67c0c18e45))
* **plugin-bibtex:** add -subtitle, -titleaddon ([eef0e6c](https://github.com/citation-js/citation-js/commit/eef0e6cf5c01b00a46c4f46b206f667a713bb3b2)), closes [#116](https://github.com/citation-js/citation-js/issues/116)
* **plugin-bibtex:** add 'strict' parser option ([64f0c38](https://github.com/citation-js/citation-js/commit/64f0c38605eb9119c9344e8e1296fc3add4d8378))
* **plugin-bibtex:** add BibLaTex mappings ([84655a4](https://github.com/citation-js/citation-js/commit/84655a4aa14ae4f4ad9f70ff8541d6f3da1052c4))
* **plugin-bibtex:** rename sentenceCase option ([35943d2](https://github.com/citation-js/citation-js/commit/35943d21aad0458010ccb3c33ec51b6a624a0d38))
* **plugin-bibtex:** update BibTeX mappings ([987b75c](https://github.com/citation-js/citation-js/commit/987b75c80e6bd6d5ff35afe3a3a8100de45b88d4))
* **plugin-bibtex:** update BibTeX parser ([9df7558](https://github.com/citation-js/citation-js/commit/9df75585579560332b7d495c695c72f6e553ae1f))
* **plugin-csl:** add 'asEntryArray' option to bibliography ([8039967](https://github.com/citation-js/citation-js/commit/8039967e65565d8b3fd49b91deaef82a0cf1d39d))
* **plugin-csl:** add 'entry' option to bibliography ([298819b](https://github.com/citation-js/citation-js/commit/298819bd6b37ad8e622e3d6f7a2b5c5ee6a3e52f))


### BREAKING CHANGES

* **core:** Constructing a Cite instance no longer automatically creates a snapshot. 
You can do this manually instead.
* **plugin-bibtex:**   - The @bibtex input type prefix has been
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
* **plugin-bibtex:** Although the file parsing has been tested extensively,
the mapping has not. In addition, since the mapping has been created
from scratch according to the BibLaTeX documentation behaviour might
change. Please report any problems at
https://github.com/citation-js/citation-js/issues



# [0.5.0-alpha.9](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.8...v0.5.0-alpha.9) (2020-10-20)



# [0.5.0-alpha.8](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.7...v0.5.0-alpha.8) (2020-10-20)


### Bug Fixes

* **plugin-bibtex:** fix closing tag behavior ([466d5b1](https://github.com/citation-js/citation-js/commit/466d5b1d234c8e327cfabb6528f8e72b065e2469))
* **plugin-csl:** fix disambig error ([35ec98d](https://github.com/citation-js/citation-js/commit/35ec98de69ce8b24f45a37139a989cd6754b2200))



# [0.5.0-alpha.7](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.6...v0.5.0-alpha.7) (2020-08-29)


### Bug Fixes

* **cli:** fix check for prefixed options ([4b7fe6b](https://github.com/citation-js/citation-js/commit/4b7fe6b1f6b908b3304929b1c1f05a09d137cf34))
* **plugin-bibtex:** avoid error on non-utf-8 webpages ([c09a9e4](https://github.com/citation-js/citation-js/commit/c09a9e467e85f6a8c52eb78c36a98734e32ee14c))
* **plugin-csl:** remove entry caching ([efa648b](https://github.com/citation-js/citation-js/commit/efa648ba570de7dabf0651442ca8ffdf52fcd5fe))



# [0.5.0-alpha.6](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.5...v0.5.0-alpha.6) (2020-07-04)


### Bug Fixes

* **plugin-bibtex:** fix combining tilde ([cc9fd8b](https://github.com/citation-js/citation-js/commit/cc9fd8bf12cb1f62b6a631d18ebc7eba0e05abfe))
* **plugin-bibtex:** normalize strings ([447b0b4](https://github.com/citation-js/citation-js/commit/447b0b419abe0719e89bd16e189fe58f4f62cc01))
* **plugin-bibtex:** support all 10 escaped characters ([#75](https://github.com/citation-js/citation-js/issues/75)) ([da016b4](https://github.com/citation-js/citation-js/commit/da016b41ac67793f3613e263658551817d7a2e70))
* **plugin-ris:** format literal names ([893d144](https://github.com/citation-js/citation-js/commit/893d144d21d665a3a70b5412fdfa44a5514d722c)), closes [#87](https://github.com/citation-js/citation-js/issues/87)


### Features

* **plugin-bibtex:** improve BibTeX mappings ([#76](https://github.com/citation-js/citation-js/issues/76)) ([214e77b](https://github.com/citation-js/citation-js/commit/214e77b6eda586e519ddc774dbf7054466472216))
* **plugin-csl:** update apa to 7th edition ([#89](https://github.com/citation-js/citation-js/issues/89)) ([2b5f2c5](https://github.com/citation-js/citation-js/commit/2b5f2c59ddefadd1e8c6ad78efde8f331a8e5332))


### BREAKING CHANGES

* **plugin-csl:** default APA style is now 7th edition



# [0.5.0-alpha.5](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.4...v0.5.0-alpha.5) (2019-10-28)


### Bug Fixes

* **core:** do not use User-Agent in CORS ([047847d](https://github.com/citation-js/citation-js/commit/047847d31b9959d39cedd298016358f77a10b342))
* **plugin-bibtex:** ignore braces for grouping command ([#64](https://github.com/citation-js/citation-js/issues/64)) ([20763dc](https://github.com/citation-js/citation-js/commit/20763dce0459eec1f79d4e7e5e802e6515b7697a))
* **plugin-ris:** allow string for keyword component ([#70](https://github.com/citation-js/citation-js/issues/70)) ([0294999](https://github.com/citation-js/citation-js/commit/02949994c9b50dbfb54e6d04e64c3aa153753076)), closes [#67](https://github.com/citation-js/citation-js/issues/67)
* **plugin-ris:** normalize DOIs ([#68](https://github.com/citation-js/citation-js/issues/68)) ([eb97fa5](https://github.com/citation-js/citation-js/commit/eb97fa5edfdb2ee62842cd7d108367116f80b7d9))
* **plugin-ris:** trim lines in parse function ([#71](https://github.com/citation-js/citation-js/issues/71)) ([f81b845](https://github.com/citation-js/citation-js/commit/f81b845783fe05375a5eaa01ae772cc3679dbd42)), closes [#66](https://github.com/citation-js/citation-js/issues/66)



# [0.5.0-alpha.4](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.3...v0.5.0-alpha.4) (2019-10-15)


### Bug Fixes

* **core:** fix normalising headers code for the browser ([d4693a7](https://github.com/citation-js/citation-js/commit/d4693a7ff3e756ff9d03fd5bd9ba63aafbeb522b))
* **plugin-bibtex:** do not try to format raw dates ([b28eca8](https://github.com/citation-js/citation-js/commit/b28eca8e536e2e391cf92defb31eadb57d4792c4))
* **plugin-bibtex:** warn for umatched entry braces ([7905667](https://github.com/citation-js/citation-js/commit/7905667bd42e3d0528ab18b866443cc36f9f64f1))



# [0.5.0-alpha.3](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.2...v0.5.0-alpha.3) (2019-10-07)


### Bug Fixes

* **plugin-bibtex:** remove nocase from diacritics ([7f7e52f](https://github.com/citation-js/citation-js/commit/7f7e52fefed1c4e58aed8a648fd27254e6d831d9))
* **plugin-bibtex:** replace trimEnd() with trim() ([b59da57](https://github.com/citation-js/citation-js/commit/b59da5734a9ac2d19009c5d05b6e760c9a68e155))
* **plugin-ris:** fix handling of multiline values ([eba2bfe](https://github.com/citation-js/citation-js/commit/eba2bfe67f312424146091fd9d1eeede4c8f7265))
* **plugin-ris:** handle \r\n line endings ([f0a3b29](https://github.com/citation-js/citation-js/commit/f0a3b292d47cfdc85dd8ddebf6bbdcb558ff5822))


### Features

* **bibtex:** add new BibTeX parser ([3c3588e](https://github.com/citation-js/citation-js/commit/3c3588ea16c3e7ef999b87722c49023b6c2f5e0d))
* **core:** add Grammar class to utils ([052754f](https://github.com/citation-js/citation-js/commit/052754fd4a0a13baadfab456bf78b611195d09cc))



# [0.5.0-alpha.2](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.1...v0.5.0-alpha.2) (2019-09-10)


### Bug Fixes

* **core:** fix date value null check ([f6a3ab2](https://github.com/citation-js/citation-js/commit/f6a3ab256f46a6814380705aad99b201725337d7))



# [0.5.0-alpha.1](https://github.com/citation-js/citation-js/compare/v0.5.0-alpha.0...v0.5.0-alpha.1) (2019-09-10)


### Bug Fixes

* **core:** fix cleaning 'null' date values ([c927f81](https://github.com/citation-js/citation-js/commit/c927f81da7c06c0373eb1c66ba24de64da98b263)), closes [/github.com/larsgw/citation.js/issues/190#issuecomment-529917382](https://github.com//github.com/larsgw/citation.js/issues/190/issues/issuecomment-529917382)
* **core:** fix cleaning 'null' name values ([2d59a32](https://github.com/citation-js/citation-js/commit/2d59a32d96d8bdb1c59998a72b52d9898029cd2a))



# [0.5.0-alpha.0](https://github.com/citation-js/citation-js/compare/v0.4.10...v0.5.0-alpha.0) (2019-09-07)


### Bug Fixes

* **core:** do not return empty name lists when cleaning ([d31ca8a](https://github.com/citation-js/citation-js/commit/d31ca8aa75a1be4fbd1fb51dd9facedc06b06c0d))
* **core:** fix Cite#sort handling of multi-value props ([3a7751c](https://github.com/citation-js/citation-js/commit/3a7751c262862c9c221b645261c5fac057f06564))
* **core:** fix handling of generic best guesses ([c8e8c78](https://github.com/citation-js/citation-js/commit/c8e8c7810754887e6c24bf69c5ceb310e273b27c))
* **core:** fix util.fetchId ([7850e75](https://github.com/citation-js/citation-js/commit/7850e7596cfa4f5233e7a07bbbd3d37c4700a32a))
* **core:** improve date handling when cleaning ([08da3e7](https://github.com/citation-js/citation-js/commit/08da3e7f7f4772a2646272d7c31f42289e0d5164))
* **core:** only overwrite individual headers in fetchFile ([8d47684](https://github.com/citation-js/citation-js/commit/8d476844f0186eb506b177ad49b254657cd7fe28))
* **core:** pass around bestGuessConversions ([50fa283](https://github.com/citation-js/citation-js/commit/50fa2830cb70dc81c9e770b8125eb87728313a8e))
* **core:** pass checkContentType in fetchFile ([e415f76](https://github.com/citation-js/citation-js/commit/e415f7606cd74137e88fa940f636846170e9f9c1))
* **core:** set userAgent properly in fetchFile ([a91fd7b](https://github.com/citation-js/citation-js/commit/a91fd7bc20891ede9f7decf4dcf9d8e2463af55b))
* **plugin-bibtex:** fix label for incomplete author ([352ca4f](https://github.com/citation-js/citation-js/commit/352ca4f0d6453d9aca0ca03f2b5826abbe068551)), closes [#56](https://github.com/citation-js/citation-js/issues/56)


* chore!: drop Node 6 support ([f27d812](https://github.com/citation-js/citation-js/commit/f27d812726650c1dc9c14378d9ddd3b7420ce80d)), closes [#55](https://github.com/citation-js/citation-js/issues/55)


### Features

* **core:** complete input option validation ([d9be626](https://github.com/citation-js/citation-js/commit/d9be626775242e2111e6de80acc9e772cc027a8b))
* **core:** support has() & list() on plugins.config ([fe7f59f](https://github.com/citation-js/citation-js/commit/fe7f59f7d00cbdbd80890ba24b33a15fdad93443))


### BREAKING CHANGES

* drops Node 6 support



## [0.4.10](https://github.com/citation-js/citation-js/compare/v0.4.9...v0.4.10) (2019-08-27)


### Bug Fixes

* **plugin-csl:** use global symbol registry ([dd8e839](https://github.com/citation-js/citation-js/commit/dd8e839bc6bd74ed41f1edbede426b3b5a415a72))



## [0.4.9](https://github.com/citation-js/citation-js/compare/v0.4.8...v0.4.9) (2019-08-27)


### Bug Fixes

* **core:** cap sync-rpc version ([2157335](https://github.com/citation-js/citation-js/commit/21573350cc9eebdd9eb04a545fc57fea13f78ba8)), closes [#54](https://github.com/citation-js/citation-js/issues/54)
* **core:** remove Object.entries call ([c38e3b9](https://github.com/citation-js/citation-js/commit/c38e3b9c82f34b677b403db7bde1d22418af2073))
* **core:** remove use of object spread ([d82342a](https://github.com/citation-js/citation-js/commit/d82342a86be6abd681c16747196f178a3d53f7d3)), closes [#53](https://github.com/citation-js/citation-js/issues/53)
* **plugin-csl:** defer error to citeproc-js ([0f76fcb](https://github.com/citation-js/citation-js/commit/0f76fcb2b666af67dba07a8f8b0a05188b34dc3a))
* **plugin-csl:** only proxy @bibliography/style once ([a372012](https://github.com/citation-js/citation-js/commit/a372012995b47a9479572a8138273ccc3356dce5))
* **plugin-csl:** pass 'this' in getWrapperProxy ([c3e670a](https://github.com/citation-js/citation-js/commit/c3e670af510426b94b7e4b408fa6732b73613ed7))
* **plugin-csl:** return proxy in getWrapperProxy ([39e57a3](https://github.com/citation-js/citation-js/commit/39e57a3a9f8d2caa37917f9e61752bebb87155fe))
* **plugin-ris:** fix legacy EP tag ([d7c6ea5](https://github.com/citation-js/citation-js/commit/d7c6ea5f540e1ca4e0aa0d6595cbdbe6ba9ed82f))


### Features

* **core:** add match=none to propertyConstraint ([9bafb58](https://github.com/citation-js/citation-js/commit/9bafb58627fb1b6c746bca64e410dcf2ad284407))
* **core:** add Translator to utils ([0dd4963](https://github.com/citation-js/citation-js/commit/0dd4963d42f9bdad2854878de006e89e72231e31))
* **plugin-ris:** add RIS input support ([1c49bcb](https://github.com/citation-js/citation-js/commit/1c49bcbeb633380a8c4a30e7d575ee204f9b7ba7))



## [0.4.8](https://github.com/citation-js/citation-js/compare/v0.4.7...v0.4.8) (2019-07-06)


### Bug Fixes

* **core:** do not attempt to clone non-standard objects ([5309d08](https://github.com/citation-js/citation-js/commit/5309d08c43031b37a2714d768f24ceae637c6138)), closes [#52](https://github.com/citation-js/citation-js/issues/52)
* **plugin-wikidata:** properly collect id from fetched items ([710a276](https://github.com/citation-js/citation-js/commit/710a276d27892fa4ecf18b63f447df5109ae5754))


### Features

* **core:** use central User-Agent in fetchFile ([3fa8863](https://github.com/citation-js/citation-js/commit/3fa886353e43dcce7639e2c316335b81af65f90f)), closes [#39](https://github.com/citation-js/citation-js/issues/39)



## [0.4.7](https://github.com/citation-js/citation-js/compare/v0.4.6...v0.4.7) (2019-06-29)


### Bug Fixes

* **core:** make fetchFile checkResponse optional ([a51a185](https://github.com/citation-js/citation-js/commit/a51a1856e800a5b4cdc3be73058f2c2ebdc52e4d))
* **plugin-doi:** use new checkContentType option ([92df863](https://github.com/citation-js/citation-js/commit/92df8637dceadeb8a30c9685a9749c47500c8d28))



## [0.4.6](https://github.com/citation-js/citation-js/compare/v0.4.5...v0.4.6) (2019-06-28)


### Bug Fixes

* **core:** check if fetchFile response matches request ([e9f9132](https://github.com/citation-js/citation-js/commit/e9f9132957675ebc19f7f2e87170e2ab5fdcbc46)), closes [#36](https://github.com/citation-js/citation-js/issues/36)
* **core:** fix getBody in fetchFile ([e4247da](https://github.com/citation-js/citation-js/commit/e4247da563a6c5ca2c6d81e6380ee1162f30be25))
* **core:** remove console.log call ([e0b1790](https://github.com/citation-js/citation-js/commit/e0b17900fe5cf38e83543eda106219b6fc8bd961))
* **plugin-wikidata:** fix typo ([8916446](https://github.com/citation-js/citation-js/commit/89164461e5a0cf73a1a78f2be9a9026474748dd8))


### Features

* **core:** support POST in fetchFile ([ece8a2d](https://github.com/citation-js/citation-js/commit/ece8a2d3e47dad5c6d3eed6347e00606a41564ca))



## [0.4.5](https://github.com/citation-js/citation-js/compare/v0.4.4...v0.4.5) (2019-06-12)


### Bug Fixes

* **plugin-bibtex:** fix parsing of name lists ([11d7dd7](https://github.com/citation-js/citation-js/commit/11d7dd7e75611396048269818dfd3076f2642369))
* **plugin-bibtex:** fix safe labels for unicode names ([8167958](https://github.com/citation-js/citation-js/commit/8167958ad61d90a30903ce7844614a3c6c056f67))
* **plugin-bibtex:** safe author name ([a232fe7](https://github.com/citation-js/citation-js/commit/a232fe7cd244f8403ac59b957c80335ec98d9428))
* **plugin-bibtex:** strip unknown commands in input ([5b3508e](https://github.com/citation-js/citation-js/commit/5b3508eb6d61f4bc008900442a1adf7fe24ad249))
* **plugin-wikidata:** exclude emoji flags as country names ([73b0e84](https://github.com/citation-js/citation-js/commit/73b0e8454427e2526e357355383a52c56d25489f))
* **plugin-wikidata:** fix cache fetching ([63a4f0d](https://github.com/citation-js/citation-js/commit/63a4f0d9b1c512c58735491e550754ce3302b1fc)), closes [#41](https://github.com/citation-js/citation-js/issues/41)
* **plugin-wikidata:** fix country name check ([90d1c07](https://github.com/citation-js/citation-js/commit/90d1c0782402108cb59630e01a7ce5d884da6e5a))


### Features

* **cli:** add --plugins option ([229c95c](https://github.com/citation-js/citation-js/commit/229c95c64f0fcdb558d3216bc31d78a179a62885)), closes [#40](https://github.com/citation-js/citation-js/issues/40)
* **cli:** plugin config & format options ([8bd2a4a](https://github.com/citation-js/citation-js/commit/8bd2a4aa94cbeaffc66dcc0e5482a874dda82aba))
* **cli:** support for input options ([87d8eb5](https://github.com/citation-js/citation-js/commit/87d8eb5dfbd69e0214c6691fc24a3761c6cce1bd))
* **plugin-bibtex:** add generateLabel option ([d10631c](https://github.com/citation-js/citation-js/commit/d10631c85e55c09359c7a4c7b452ada358f1c7dc))


### BREAKING CHANGES

* **plugin-bibtex:** strips unkown commands entirely instead of replacing 
the braces with no-case tags



## [0.4.4](https://github.com/citation-js/citation-js/compare/v0.4.3...v0.4.4) (2019-05-24)


### Features

* **plugin-wikidata:** additional mappings ([01be936](https://github.com/citation-js/citation-js/commit/01be9362a9106b886fc6d8f37d8a4d53ecc49d22)), closes [#18](https://github.com/citation-js/citation-js/issues/18)



## [0.4.3](https://github.com/citation-js/citation-js/compare/v0.4.3-alpha.0...v0.4.3) (2019-05-11)



## [0.4.3-alpha.0](https://github.com/citation-js/citation-js/compare/v0.4.2...v0.4.3-alpha.0) (2019-05-02)



## [0.4.2](https://github.com/citation-js/citation-js/compare/v0.4.1...v0.4.2) (2019-04-26)


### Bug Fixes

* **plugin-bibtex:** fix label creation ([c7cde40](https://github.com/citation-js/citation-js/commit/c7cde4015ccd3ec15782dae454f81e169d274df8)), closes [#35](https://github.com/citation-js/citation-js/issues/35)
* **plugin-wikidata:** support imprecise dates ([c898db7](https://github.com/citation-js/citation-js/commit/c898db77fe4bbbc65fe471638ed79f2e6d226281)), closes [#33](https://github.com/citation-js/citation-js/issues/33)


### Features

* **plugin-wikidata:** support more URL properties ([#34](https://github.com/citation-js/citation-js/issues/34)) ([d489843](https://github.com/citation-js/citation-js/commit/d4898431dca8236cf8232e26a2db980d5f4fdb39))



## [0.4.1](https://github.com/citation-js/citation-js/compare/v0.4.0...v0.4.1) (2019-04-14)


### Bug Fixes

* **plugin-wikidata:** fix getting label if no title exists ([#32](https://github.com/citation-js/citation-js/issues/32)) ([69243c5](https://github.com/citation-js/citation-js/commit/69243c500f2bc03952dded04a4665f02c85d6477))



# [0.4.0](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.4...v0.4.0) (2019-04-11)


### Bug Fixes

* **plugin-bibtex:** always output fields with braces ([c31e199](https://github.com/citation-js/citation-js/commit/c31e199927a2812bd7296b75518e65253e3f3d8b)), closes [#27](https://github.com/citation-js/citation-js/issues/27)
* **plugin-bibtex:** use booktitle for inproceedings ([149a49c](https://github.com/citation-js/citation-js/commit/149a49c50f9cbe7961bbfdd3c9574d04d5f97109)), closes [#28](https://github.com/citation-js/citation-js/issues/28)


### Features

* **plugin-bibtex:** add date ranges ([042b4e0](https://github.com/citation-js/citation-js/commit/042b4e03f475266bd13a110cb9c5949b002cb153))



# [0.4.0-rc.4](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.3...v0.4.0-rc.4) (2019-03-17)


### Bug Fixes

* **plugin-wikidata:** await promise ([3cde76f](https://github.com/citation-js/citation-js/commit/3cde76fb3f5d4257b8467fade3078027c5c5d08c)), closes [#25](https://github.com/citation-js/citation-js/issues/25)
* **plugin-wikidata:** fix fetchApiAsync ([def471d](https://github.com/citation-js/citation-js/commit/def471d74216a3d71d61d7faeaf89df3828df8ee))
* **plugin-wikidata:** label first value ([45087ee](https://github.com/citation-js/citation-js/commit/45087eede9686d8cd76639eb1bdb7033a682681a)), closes [#23](https://github.com/citation-js/citation-js/issues/23)
* **plugin-wikidata:** pass all values ([a5acb75](https://github.com/citation-js/citation-js/commit/a5acb75b5003d008654b1911c68ee5c047de7694)), closes [#22](https://github.com/citation-js/citation-js/issues/22)
* **plugin-wikidata:** support novalue & somevalue ([3ff9039](https://github.com/citation-js/citation-js/commit/3ff9039547569826b78142cdb1474b678b2fa094))


### Features

* **core:** clearer parsing error message ([d296909](https://github.com/citation-js/citation-js/commit/d296909d3f52b4a99c06a4b300c5a561623c445a))


### Reverts

* Revert "test(core): fix incorrect match" ([499e5ab](https://github.com/citation-js/citation-js/commit/499e5ab3179fab669ec92d50b98d7ed216456574))



# [0.4.0-rc.3](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.2...v0.4.0-rc.3) (2019-03-16)


### Bug Fixes

* **core:** fix 'generateGraph' ([60106db](https://github.com/citation-js/citation-js/commit/60106dbef21f5fcf8eaaf2fdef0ee8f6e4561f9d))
* **core:** fix html dict ([8a06ce1](https://github.com/citation-js/citation-js/commit/8a06ce18dc1450dc446fd4402e9cbacdf6d1df54))
* **core:** fix post-processing with 'target' set ([ec3100b](https://github.com/citation-js/citation-js/commit/ec3100b94bda8cc8d953bf81aaac15eaef0990f0))
* **core:** remove Object.entries for Node 6 ([47b3d9f](https://github.com/citation-js/citation-js/commit/47b3d9f2f643581b31c2a540e2e00e58f614893a))
* **core:** remove overwritten input formats ([4f52124](https://github.com/citation-js/citation-js/commit/4f52124620b59ed19dbf3c385c7f78a91afe751f))
* **core:** set default input options ([4843b40](https://github.com/citation-js/citation-js/commit/4843b40ff25d164507f38c08648aca6000901832))
* **plugin-bibtex:** fix invalid output labels ([5624eaf](https://github.com/citation-js/citation-js/commit/5624eaf133c6d2f65c40ab21fee7b97fcbc5adde))
* **plugin-bibtex:** in-field whitespace ([3f081bc](https://github.com/citation-js/citation-js/commit/3f081bc5c1d930f966187466ae02a52c6b77a42a)), closes [larsgw/citation-js#158](https://github.com/larsgw/citation-js/issues/158)
* **plugin-bibtex:** preserve nbsp ([e1974c3](https://github.com/citation-js/citation-js/commit/e1974c33e2a92045a6f4a642e132f1e5498bdb74))
* **plugin-common:** handle non-JSON ([539bb6c](https://github.com/citation-js/citation-js/commit/539bb6cddeacedcd5ea2592095b2d3ab4f1274ad))
* **plugin-common:** improve output json ([49e0d45](https://github.com/citation-js/citation-js/commit/49e0d45c9a8ea3b56bce9edc052ad41c723ff555))
* **plugin-wikidata:** fallback for no labels ([9dc3640](https://github.com/citation-js/citation-js/commit/9dc3640aa233d6c35f6778abaae4bbe15ee8a6a1))
* **plugin-wikidata:** fix langs support ([aec2e72](https://github.com/citation-js/citation-js/commit/aec2e72e211b4f8574876ef0cf8ca78b1e93c6bf))
* **plugin-wikidata:** node 6 support ([fdf4127](https://github.com/citation-js/citation-js/commit/fdf41270c8d929e76d546786f1e5c1d0f42c27a7))
* **plugin-wikidata:** update type index ([d74dc21](https://github.com/citation-js/citation-js/commit/d74dc21f918cec90bfeab6e070f9f150c53950e4)), closes [/github.com/larsgw/citation.js/issues/166#issuecomment-472323555](https://github.com//github.com/larsgw/citation.js/issues/166/issues/issuecomment-472323555)


### Features

* actually throw errors ([f025426](https://github.com/citation-js/citation-js/commit/f02542601f034ea086d36759b77b642cb866e792)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* **cli:** add --log-level option ([bdd718b](https://github.com/citation-js/citation-js/commit/bdd718b107b4f3980e83dfde4190bbcf90c8ceaa))
* **core:** add 'strict' option ([ad158b3](https://github.com/citation-js/citation-js/commit/ad158b31259d79bfb5345a297aff8440d94a48df)), closes [#14](https://github.com/citation-js/citation-js/issues/14)
* **core:** add 'target' option ([89b9e8b](https://github.com/citation-js/citation-js/commit/89b9e8b0e8051415b5688887fc5719949a45f8f9))
* **core:** add method to get input format info ([3d9493c](https://github.com/citation-js/citation-js/commit/3d9493c13c41cef3674fbe3b6d4eb217f361fca5))
* **core:** input format 'outputs' option ([57645a2](https://github.com/citation-js/citation-js/commit/57645a2943b96d9ef16f4b00754fd2f5a9b20f85))
* **logger:** add log level support ([83bdb4b](https://github.com/citation-js/citation-js/commit/83bdb4b77039171d4506ca2ae4ed5427f132719b)), closes [#10](https://github.com/citation-js/citation-js/issues/10)
* **plugin-common:** throw errors ([3a67db4](https://github.com/citation-js/citation-js/commit/3a67db4d19d345d90f5f724006298212557729c5))
* **plugin-wikidata:** langs option ([aaeb28d](https://github.com/citation-js/citation-js/commit/aaeb28d45cb2e8118f9de0b362590e4bbaae8c17)), closes [#7](https://github.com/citation-js/citation-js/issues/7)


### BREAKING CHANGES

* **core:** Aformentioned functions might throw errors



# [0.4.0-rc.2](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.1...v0.4.0-rc.2) (2019-02-26)


### Bug Fixes

* **core:** keep custom props when normalizing ([7b33982](https://github.com/citation-js/citation-js/commit/7b33982258d9ccbe8ff29af536b8c03b5b19d2a0)), closes [#8](https://github.com/citation-js/citation-js/issues/8)
* **core:** pass options from Cite.async ([663c6c1](https://github.com/citation-js/citation-js/commit/663c6c17062278f3b940f203803a377a58949466))
* **core:** support node 6 ([a1ebf08](https://github.com/citation-js/citation-js/commit/a1ebf08096ebb02ae8e837a13835a2d1d18bb387))
* **plugin-bibtex:** support node 6 ([8f6839b](https://github.com/citation-js/citation-js/commit/8f6839b83e6022e4d61e6efec14a7d2dab3ae9b4))
* **plugin-wikidata:** support more than 50 WD IDs ([#11](https://github.com/citation-js/citation-js/issues/11)) ([79ae40c](https://github.com/citation-js/citation-js/commit/79ae40cf646ae9fe12e179394c2ae6a8b411f315))


### Features

* **cli:** add --pipe option ([a2993cc](https://github.com/citation-js/citation-js/commit/a2993ccff91f81dc9fcfb8d2a87625030d033017))
* **cli:** error on invalid options for pipe ([0f6839d](https://github.com/citation-js/citation-js/commit/0f6839da5e25a7109b9d42c3bcf89565b1a6bdcc))
* **core:** include complete graph ([2c82e48](https://github.com/citation-js/citation-js/commit/2c82e485c0b32d02ab410a026396a6656ce7f0bd)), closes [larsgw/citation.js#165](https://github.com/larsgw/citation.js/issues/165)
* **plugin-common:** support NDJSON ([e68afe1](https://github.com/citation-js/citation-js/commit/e68afe1106b2529f1982468f100433c532fa26ae)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)
* **plugin-wikidata:** allow subclass types ([#5](https://github.com/citation-js/citation-js/issues/5)) ([fc8aa7d](https://github.com/citation-js/citation-js/commit/fc8aa7d795bdb27f6b56a9d040a24234eba9a1cb)), closes [larsgw/citation.js#166](https://github.com/larsgw/citation.js/issues/166)
* **plugin-wikidata:** support namedAs qualifier ([664644b](https://github.com/citation-js/citation-js/commit/664644b39b078010b272ebd25c3f423d3be98868)), closes [larsgw/citation.js#163](https://github.com/larsgw/citation.js/issues/163)



# [0.4.0-rc.1](https://github.com/citation-js/citation-js/compare/v0.4.0-rc.0...v0.4.0-rc.1) (2018-12-27)



# [0.4.0-rc.0](https://github.com/citation-js/citation-js/compare/88aabc9202d7d4f5553dd3c21e5ff1fc64d6541a...v0.4.0-rc.0) (2018-12-06)


### Bug Fixes

* **plugin-ris:** output year always string ([88aabc9](https://github.com/citation-js/citation-js/commit/88aabc9202d7d4f5553dd3c21e5ff1fc64d6541a))



