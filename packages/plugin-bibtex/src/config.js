import biblatex from './mapping/biblatexTypes.json'
import bibtex from './mapping/bibtexTypes.json'
import * as constants from './input/constants.js'

/**
 * @memberof module:@citation-js/plugin-bibtex
 * @namespace config
 */
export default {
  /**
   * Contains various constants used while parsing, mapping and formatting BibTeX-
   * related file formats.
   *
   * ### Required types
   *
   * The list of required fields for each type for BibLaTeX and BibTeX is available
   * under `config.constants.required.biblatex` and `config.constants.required.bibtex`
   * respectively. In both cases, the list consists of strings for required fields
   * and arrays for sets of fields where at least one should be present
   * (year OR date for BibLaTeX for example).
   *
   * ```js
   * config.constants.required.biblatex.book = [
   *   'title',
   *   ['author', 'editor'],
   *   'publisher',
   *   ['year', 'date']
   * ]
   * ```
   *
   * ### Field types
   *
   * Field types (used for both BibLaTeX and BibTeX) are available through `config.constants.fieldTypes`.
   * This returns an object mapping Bib(La)TeX field names to an array containing a
   * field type and a value type. The former is either `field`, `list` (`" and "`-delimited),
   * or `separated` (comma-delimited). As for the latter:
   *
   * | Value type | Description |
   * |------------|-------------|
   * | `literal` | Normal text or numeric content |
   * | `title` | Like `literal` but can be affected by `config.parse.sentenceCase` |
   * | `name` | A personal or organizational name |
   * | `date` | An EDTF Level 1 date |
   * | `verbatim` | Unaltered text (no expansion of commands, etc.) |
   * | `uri` | Same as `verbatim` but if needed the URL is encoded |
   * | other | No special behaviour, treated like `literal` |
   *
   * ```js
   * // Add `daturl` for dat:// URLs
   * config.constants.fieldTypes.daturl = ['field', 'uri']
   * // Do not treat `publisher` as a list
   * config.constants.fieldTypes.publisher = ['field', 'literal']
   * ```
   *
   * ### Unicode
   *
   *   - `config.constants.diacritics` maps commands (`\"`) to diacritics
   *   - `config.constants.commands` maps commands (`\textinterrobangdown`) to general unicode characters (`⸘`)
   *   - `config.constants.ligatures` maps non-command character sequences (`---`, `~`, etc.) to their replacements (emdash, no-breaking space, etc.)
   *   - `config.constants.ligaturePattern` is a RegExp that recognizes the ligatures mapped above
   *   - `config.constants.mathScripts` maps superscript and subscript (in properties `^` and `_` respectively)
   *
   * ```js
   * config.constants.diacritics['"'] = '\u0308'
   * config.constants.commands.textinterrobangdown = '⸘'
   * config.constants.ligatures = {
   *   '---': '\u2014',
   *   '~': '\u00A0'
   * }
   * config.constants.ligaturePattern = /---|~/g // Don't forget the (g)lobal flag
   * config.constants.mathScripts = {
   *   '^': { '1': '¹' },
   *   '_': { '1': '₁' }
   * }
   * ```
   *
   * ### Formatting
   *
   *   - `config.constants.formattingEnvs` maps environment commands to formatting
   *   - `config.constants.formattingCommands` maps regular commands to formatting
   *   - `config.constants.mathScriptFormatting` maps `^` and `_` to resp. super- and subscript
   *   - `config.constants.formatting` maps formatting to HTML (though RTF or Markdown could be substituted)
   *
   * ```js
   * config.constants.formattingEnvs.bf = 'bold'
   * config.constants.formattingCommands.textbf = 'bold'
   * config.constants.mathScriptFormatting['^'] = 'superscript'
   * config.constants.formatting = {
   *   bold: ['<b>', '</b>'],
   *   superscript: ['<sup>', '</sup>']
   * }
   * ```
   *
   * ### Other commands
   *
   * The object `config.constants.argumentCommands` maps command names to functions
   * handling them. This does not include commands used above. Braced arguments are
   * parsed automatically based on how many arguments the function takes. It does not
   * support optional arguments (i.e. those in square braces) yet.
   *
   * ```js
   * config.constants.argumentCommands.href = function (url, displayText) {
   *   // Note: <a> tags are not supported by CSL so watch out if you use this
   *   return `<a href="${url}">${displayText}</a>`
   * }
   *
   * // You can also use it to replace commands that produce text
   * config.constants.argumentCommands.LaTeX = () => 'LaTeX'
   * ```
   *
   * ### English languages
   *
   * The array `config.constants.sentenceCaseLanguages` affects which languages are
   * eligible for sentence-casing when `config.parse.sentenceCase` is set to `'english'`.
   * All entries should be lowercase.
   *
   * ```js
   * config.constants.sentenceCaseLanguages = [
   *   'english',
   *   'en-us',
   *   'en-gb'
   * ]
   * ```
   *
   * ### Replacement strings
   *
   * The object `config.constants.defaultStrings` determines which strings are defined
   * by default.
   *
   * ```js
   * config.constants.defaultStrings.larsgw = "Willighagen, Lars G"
   * ```
   *
   * @memberof module:@citation-js/plugin-bibtex.config
   * @var {Object} constants
   * @property {Object} required
   * @property {Object<String, Array<String|Array<String>>>} required.biblatex
   * @property {Object<String, Array<String|Array<String>>>} required.bibtex
   * @property {Object<String, Array<String>>} fieldTypes
   * @property {Object<String, String>} diacritics
   * @property {Object<String, String>} commands
   * @property {Object<String, String>} ligatures
   * @property {RegExp} ligaturePattern
   * @property {Object} mathScripts
   * @property {Object<String, String>} mathScripts.^ - Superscript
   * @property {Object<String, String>} mathScripts._ - Subscript
   * @property {Object<String, String>} formattingEnvs
   * @property {Object<String, String>} formattingCommands
   * @property {Object<String, String>} mathScriptFormatting
   * @property {Object<String, String>} formatting
   * @property {Object<String, Function>} argumentCommands
   * @property {Array<String>} sentenceCaseLanguages
   * @property {Object<String, String>} defaultStrings
   */
  constants,

  /**
   * Entry type mappings between BibLaTeX or BibTeX and CSL-JSON are available through
   * `config.types.biblatex` and `config.types.bibtex`. In both cases, the Bib(La)TeX
   * mappings are in the `source` field and the reverse mappings in the `target` field.
   *
   * ```js
   * config.types.biblatex.source.inproceedings = 'paper-conference'
   * config.types.biblatex.target['paper-conference'] = 'inproceedings'
   * ```
   *
   * @memberof module:@citation-js/plugin-bibtex.config
   * @var {Object} types
   * @property {Object} biblatex
   * @property {Object<String, String>} biblatex.source - BibLaTeX to CSL
   * @property {Object<String, String>} biblatex.target - CSL to BibLaTeX
   * @property {Object} bibtex
   * @property {Object<String, String>} bibtex.source - BibTeX to CSL
   * @property {Object<String, String>} bibtex.target - CSL to BibTeX
   */
  types: { biblatex, bibtex },

  /**
   * @memberof module:@citation-js/plugin-bibtex.config
   * @var {Object} parse
   * @property {Boolean} [strict=false] - When true, entries are checked for required fields.
   * @property {String} [sentenceCase='never'] - Convert titles to sentence case when parsing.
   */
  parse: {
    biblatex: true,
    strict: false,
    sentenceCase: 'never'
  },

  /**
   * @memberof module:@citation-js/plugin-bibtex.config
   * @var {Object} format
   * @property {Boolean} [format.useIdAsLabel=false] - Use the entry ID as the label instead of generating one.
   */
  format: {
    useIdAsLabel: false
  }
}
