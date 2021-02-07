import { parse as parseFile } from './file'
import { parse as parseBibtxt } from './bibtxt'
import { parse as parseEntries, parseBibtex } from './entries'

/**
 * @constant {module:@citation-js/core.plugins~pluginRef} ref
 * @memberof module:@citation-js/plugin-bibtex
 * @default '@bibtex'
 */
export const ref = '@bibtex'

/**
 * @namespace input
 * @type Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parsers>
 * @memberof module:@citation-js/plugin-bibtex
 */
export const formats = {
  /**
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
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
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
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
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@biblatex/entries+list': {
    parse: parseEntries,
    parseType: { elementConstraint: '@biblatex/entry+object' }
  },

  /**
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@bibtex/text': {
    parse: parseFile,
    outputs: '@bibtex/entries+list'
  },

  /**
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@bibtex/entry+object': {
    parse (input) { return parseBibtex([input]) }
  },

  /**
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@bibtex/entries+list': {
    parse: parseBibtex
  },

  /**
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-bibtex.input
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
