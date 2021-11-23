/**
 * ## Formats
 *
 * For a full list, check out {@link module:@citation-js/plugin-wikidata.formats}.
 *
 * ## Configuration
 *
 * Check out {@link module:@citation-js/plugin-wikidata.config}.
 *
 * @module @citation-js/plugin-wikidata
 */

import { plugins } from '@citation-js/core'

import * as id from './id.js'
import * as entity from './entity.js'
import * as prop from './prop.js'
import * as url from './url.js'
import * as api from './api.js'
import config from './config.json'

/**
 * @constant {module:@citation-js/core.plugins~pluginRef} ref
 * @memberof module:@citation-js/plugin-wikidata
 * @default '@wikidata'
 */
const ref = '@wikidata'

/**
 * @access protected
 * @namespace parsers
 * @memberof module:@citation-js/plugin-wikidata
 */
const parsers = {
  /**
   * @access protected
   * @namespace id
   * @memberof module:@citation-js/plugin-wikidata.parsers
   */
  id,

  /**
   * @access protected
   * @namespace entity
   * @memberof module:@citation-js/plugin-wikidata.parsers
   */
  entity,

  /**
   * @access protected
   * @namespace prop
   * @memberof module:@citation-js/plugin-wikidata.parsers
   */
  prop,

  /**
   * @access protected
   * @namespace url
   * @memberof module:@citation-js/plugin-wikidata.parsers
   */
  url,

  /**
   * @access protected
   * @namespace api
   * @memberof module:@citation-js/plugin-wikidata.parsers
   */
  api
}

/**
 * @namespace formats
 * @type Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parsers>
 * @memberof module:@citation-js/plugin-wikidata
 */
const formats = {
  /**
   * Wikidata ID/Q-number.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/id': {
    parse: id.parse,
    parseType: {
      dataType: 'String',
      predicate: /^Q\d+$/
    }
  },

  /**
   * List of {@link module:@citation-js/plugin-wikidata.formats."@wikidata/id"|Wikidata IDs}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/list+text': {
    parse (data) {
      return data.trim().split(/(?:[\s,]\s*)/g)
    },
    parseType: {
      dataType: 'String',
      predicate: /^\s*((?:Q\d+(?:[\s,]\s*))*Q\d+)\s*$/
    }
  },

  /**
   * Wikidata API URL.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'String',
      predicate: /^(https?:\/\/(?:www\.)?wikidata.org\/w\/api\.php(?:\?.*)?)$/,
      extends: '@else/url'
    }
  },

  /**
   * Array of {@link module:@citation-js/plugin-wikidata.formats."@wikidata/api"|Wikidata API URLs}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/array+api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/api'
    }
  },

  /**
   * URL to {@link module:@citation-js/plugin-wikidata.formats."@wikidata/id"|Wikidata ID}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/url': {
    parse: url.parse,
    parseType: {
      dataType: 'String',
      predicate: /\/(Q\d+)(?:[#?/]|\s*$)/,
      extends: '@else/url'
    }
  },

  /**
   * Comma or whitespace-separated list of
   * {@link module:@citation-js/plugin-wikidata.formats."@wikidata/id"|Wikidata IDs}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   * @property {module:@citation-js/core.plugins.input~format} outputs
   */
  '@wikidata/list+object': {
    parse: id.parse,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/id'
    }
  },

  /**
   * Wikidata API response.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~asyncDataParser} parseAsync
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   */
  '@wikidata/object': {
    parse: entity.parse,
    parseAsync: entity.parseAsync,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: { props: 'entities' }
    }
  },

  /**
   * Array of {@link module:@citation-js/plugin-wikidata.formats."@wikidata/object"|Wikidata API responses}.
   *
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   * @property {module:@citation-js/core.plugins.input~typeParser} parseType
   * @property {module:@citation-js/core.plugins.input~format} outputs
   */
  '@wikidata/array+object': {
    parse (responses) {
      // merge results
      return responses.reduce((combined, { success, entities }) => {
        combined.success &= success
        Object.assign(combined.entities, entities)
        return combined
      }, {})
    },
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/object'
    },
    outputs: '@wikidata/object'
  },

  /**
   * Convert a Wikidata prop+value+entity tuple to CSL.
   *
   * @deprecated
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   */
  '@wikidata/prop': {
    parse: prop.parseProp
  },

  /**
   * Convert a Wikidata ID to a CSL type.
   *
   * @deprecated
   * @type module:@citation-js/core.plugins.input~parsers
   * @memberof module:@citation-js/plugin-wikidata.formats
   * @property {module:@citation-js/core.plugins.input~dataParser} parse
   */
  '@wikidata/type': {
    parse: prop.parseType
  }
}

plugins.add(ref, {
  input: formats,

  /**
   * Input languages can be specified:
   *
   * ```js
   * const { plugins } = require('@citation-js/core')
   *
   * const config = plugins.config.get('@wikidata')
   *
   * config.langs // ['en']
   * config.langs = ['fr', 'de', 'en'] // searches for French, then German then English labels
   * ```
   *
   * @namespace config
   * @memberof module:@citation-js/plugin-wikidata
   */
  config
})

export { ref, parsers, formats }
