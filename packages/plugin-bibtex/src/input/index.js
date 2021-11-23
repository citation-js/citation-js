import { parse as parseFile } from './file.js'
import { parse as parseBibtxt } from './bibtxt.js'
import { parse as parseEntries, parseBibtex } from './entries.js'

/**
 * @constant {module:@citation-js/core.plugins~pluginRef} ref
 * @memberof module:@citation-js/plugin-bibtex
 * @default '@bibtex'
 */
export const ref = '@bibtex'

/**
 * @namespace formats
 * @type Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parsers>
 * @memberof module:@citation-js/plugin-bibtex
 */
export const formats = {
  /**
   * BibLaTeX file.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@biblatex/text': {
    parse: parseFile,
    parseType: {
      dataType: 'String',
      predicate: /@\s{0,5}[A-Za-z]{1,13}\s{0,5}\{\s{0,5}[^@{}"=,\\\s]{0,100}\s{0,5},[\s\S]*\}/
    }
  },

  /**
   * BibLaTeX object.
   *
   * ```js
   * {
   *   type: '...',
   *   label: '...',
   *   properties: {...}
   * }
   * ```
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@biblatex/entry+object': {
    parse (input) { return parseEntries([input]) },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: { props: ['type', 'label', 'properties'] }
    }
  },

  /**
   * Array of {@link module:@citation-js/plugin-bibtex.formats."@biblatex/entries+list"|BibLaTeX objects}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@biblatex/entries+list': {
    parse: parseEntries,
    parseType: { elementConstraint: '@biblatex/entry+object' }
  },

  /**
   * BibTeX file.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~format} outputs
   */
  '@bibtex/text': {
    parse: parseFile,
    outputs: '@bibtex/entries+list'
  },

  /**
   * BibTeX object.
   *
   * ```js
   * {
   *   type: '...',
   *   label: '...',
   *   properties: {...}
   * }
   * ```
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   */
  '@bibtex/entry+object': {
    parse (input) { return parseBibtex([input]) }
  },

  /**
   * Array of {@link module:@citation-js/plugin-bibtex.formats."@bibtex/entries+list"|BibTeX objects}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   */
  '@bibtex/entries+list': {
    parse: parseBibtex
  },

  /**
   * Bib.TXT file.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@bibtxt/text': {
    parse: parseBibtxt,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(\[(?!\s*[{[]).*?\]\s*(\n\s*[^[]((?!:)\S)+\s*:\s*.+?\s*)*\s*)+$/
    }
  }
}
