# @citation-js/plugin-bibtex
Plugin for BibTeX formats for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@citation-js/plugin-bibtex.svg)](https://npmjs.org/package/@citation-js/plugin-bibtex)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/plugin-bibtex.svg)](https://npmcharts.com/compare/@citation-js%2Fplugin-bibtex?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/plugin-bibtex.svg)
![Dependency status](https://img.shields.io/librariesio/release/npm/@citation-js/plugin-bibtex)
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

This plugin adds input and output support for [BibTeX](http://www.bibtex.org/),
both in text form and as a JSON representation. Input types are called `@bibtex/text`
and `@bibtex/entry+object`, output format is `bibtex`. The output has format
dictionary support.

### BibLaTeX

This plugin adds input and output support for [BibLaTeX](https://www.ctan.org/pkg/biblatex),
both in text form and as a JSON representation. Input types are called `@biblatex/text`
and `@biblatex/entry+object`, output format is `biblatex`. The output has format
dictionary support.

### Bib.TXT

This plugin adds input and output support for [Bib.TXT](http://bibtxt.github.io/),
a simplified and modernised version of BibTeX. Input types are called `@bibtxt/text`
and `@biblatex/entry+object`, output format is `bibtxt`. The output has format
dictionary support.

## Configuration

Configuration can be accessed like the following:

```js
const { plugins } = require('@citation-js/core')
const config = plugins.config.get('@bibtex')
```

| Property | Values [default] | Description |
|----------|------------------|-------------|
| `config.parse.strict` | `true`, [`false`] | When true, entries are checked for required fields. |
| `config.parse.sentenceCase` | `'always'`, `'english'`, [`'never'`] | Convert titles to sentence case when parsing. |
| `config.format.useIdAsLabel` | `true`, [`false`] | Use the entry ID as the label instead of generating one. |
| `config.format.checkLabel` | [`true`], `false` | Remove unsafe characters from the provided label (or ID). |
| `config.format.asciiOnly` | [`true`], `false` | Escape or remove non-ASCII characters. |

### Type mappings

Entry type mappings between BibLaTeX or BibTeX and CSL-JSON are available through
`config.types.biblatex` and `config.types.bibtex`. In both cases, the Bib(La)TeX
mappings are in the `source` field and the reverse mappings in the `target` field.

```js
config.types.biblatex.source.inproceedings = 'paper-conference'
config.types.biblatex.target['paper-conference'] = 'inproceedings'
```

### Required types

The list of required fields for each type for BibLaTeX and BibTeX is available
under `config.required.biblatex` and `config.required.bibtex` respectively. In
both cases, the list consists of strings for required fields and arrays for sets
of fields where at least one should be present (year OR date for BibLaTeX for
example).

```js
config.required.biblatex.book = [
  'title',
  ['author', 'editor'],
  'publisher',
  ['year', 'date']
]
```

### Field types

Field types (used for both BibLaTeX and BibTeX) are available through `config.constants.fieldTypes`.
This returns an object mapping Bib(La)TeX field names to an array containing a
field type and a value type. The former is either `field`, `list` (`" and "`-delimited),
or `separated` (comma-delimited). As for the latter:

| Value type | Description |
|------------|-------------|
| `literal` | Normal text or numeric content |
| `title` | Like `literal` but can be affected by `config.parse.sentenceCase` |
| `name` | A personal or organizational name |
| `date` | An EDTF Level 1 date |
| `verbatim` | Unaltered text (no expansion of commands, etc.) |
| `uri` | Same as `verbatim` but if needed the URL is encoded |
| other | No special behaviour, treated like `literal` |

```js
// Add `daturl` for dat:// URLs
config.constants.fieldTypes.daturl = ['field', 'uri']
// Do not treat `publisher` as a list
config.constants.fieldTypes.publisher = ['field', 'literal']
```

### Unicode

  - `config.constants.diacritics` maps commands (`\"`) to diacritics
  - `config.constants.commands` maps commands (`\textinterrobangdown`) to general unicode characters (`⸘`)
  - `config.constants.ligatures` maps non-command character sequences (`---`, `~`, etc.) to their replacements (emdash, no-breaking space, etc.)
  - `config.constants.ligaturePattern` is a RegExp that recognizes the ligatures mapped above
  - `config.constants.mathScripts` maps superscript and subscript (in properties `^` and `_` respectively)

```js
config.constants.diacritics['"'] = '\u0308'
config.constants.commands.textinterrobangdown = '⸘'
config.constants.ligatures = {
  '---': '\u2014',
  '~': '\u00A0'
}
config.constants.ligaturePattern = /---|~/g // Don't forget the (g)lobal flag
config.constants.mathScripts = {
  '^': { '1': '¹' },
  '_': { '1': '₁' }
}
```

### Formatting

  - `config.constants.formattingEnvs` maps environment commands to formatting
  - `config.constants.formattingCommands` maps regular commands to formatting
  - `config.constants.mathScriptFormatting` maps `^` and `_` to resp. super- and subscript
  - `config.constants.formatting` maps formatting to HTML (though RTF or Markdown could be substituted)

```js
config.constants.formattingEnvs.bf = 'bold'
config.constants.formattingCommands.textbf = 'bold'
config.constants.mathScriptFormatting['^'] = 'superscript'
config.constants.formatting = {
  bold: ['<b>', '</b>'],
  superscript: ['<sup>', '</sup>']
}
```

### Other commands

The object `config.constants.argumentCommands` maps command names to functions
handling them. This does not include commands used above. Braced arguments are
parsed automatically based on how many arguments the function takes. It does not
support optional arguments (i.e. those in square braces) yet.

```js
config.constants.argumentCommands.href = function (url, displayText) {
  // Note: <a> tags are not supported by CSL so watch out if you use this
  return `<a href="${url}">${displayText}</a>`
}

// You can also use it to replace commands that produce text
config.constants.argumentCommands.LaTeX = () => 'LaTeX'
```

### English languages

The array `config.constants.sentenceCaseLanguages` affects which languages are
eligible for sentence-casing when `config.parse.sentenceCase` is set to `'english'`.
All entries should be lowercase.

```js
config.constants.sentenceCaseLanguages = [
  'english',
  'en-us',
  'en-gb'
]
```

### Replacement strings

The object `config.constants.defaultStrings` determines which strings are defined
by default.

```js
config.constants.defaultStrings.larsgw = "Willighagen, Lars G"
```
