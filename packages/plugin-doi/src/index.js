/**
 * ## Formats
 *
 * For a list of supported formats, check out {@link module:@citation-js/plugin-doi.formats}.
 *
 * @module @citation-js/plugin-doi
 */

import { plugins } from '@citation-js/core'

import * as id from './id.js'
import * as api from './api.js'
import * as json from './json.js'
import * as type from './type.js'

/**
 * @constant {module:@citation-js/core.plugins~pluginRef} ref
 * @memberof module:@citation-js/plugin-doi
 * @default '@doi'
 */
const ref = '@doi'

/**
 * @access protected
 * @namespace parsers
 * @memberof module:@citation-js/plugin-doi
 */
const parsers = {
  /**
   * @access protected
   * @namespace id
   * @memberof module:@citation-js/plugin-doi.parsers
   */
  id,

  /**
   * @access protected
   * @namespace api
   * @memberof module:@citation-js/plugin-doi.parsers
   */
  api,

  /**
   * @access protected
   * @namespace json
   * @memberof module:@citation-js/plugin-doi.parsers
   */
  json,

  /**
   * @access protected
   * @namespace type
   * @memberof module:@citation-js/plugin-doi.parsers
   */
  type
}

/**
 * @namespace formats
 * @type Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parsers>
 * @memberof module:@citation-js/plugin-doi
 */
const formats = {
  /**
   * DOI URL (dx.doi.org, doi.org).
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-doi.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@doi/api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(https?:\/\/(?:dx\.)?doi\.org\/(10.\d{4,9}\/[-._;()/:A-Z0-9]+))\s*$/i,
      extends: '@else/url'
    }
  },

  /**
   * Actual DOI. Uses the pattern presented by [Crossef](https://www.crossref.org/blog/dois-and-matching-regular-expressions/).
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-doi.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@doi/id': {
    parse: id.parse,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(10.\d{4,9}\/[-._;()/:A-Z0-9]+)\s*$/i
    }
  },

  /**
   * Whitespace-separated list of {@link module:@citation-js/plugin-doi.formats."@doi/id"|DOIs}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-doi.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@doi/list+text': {
    parse: id.parse,
    parseType: {
      dataType: 'String',
      tokenList: /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i
    }
  },

  /**
   * Array of {@link module:@citation-js/plugin-doi.formats."@doi/id"|DOIs}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-doi.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@doi/list+object': {
    parse: id.parse,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@doi/id'
    }
  },

  /**
   * Entry type returned by DOI APIs such as Crossef. Might be incorrect, hence
   * the parser.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-doi.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   */
  '@doi/type': {
    parse: type.parse
  }
}

plugins.add(ref, {
  input: formats
})

export { ref, parsers, formats }
