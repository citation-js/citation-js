/**
 * ## Formats
 *
 * For a full list, check out {@link module:@citation-js/plugin-ris.formats}.
 *
 * ## Configuration
 *
 * Check out {@link module:@citation-js/plugin-ris.config}.
 *
 * @module module:@citation-js/plugin-ris
 */

import { plugins } from '@citation-js/core'
import config from './config.json'
import { parse, parseNew, parseOld, parseMixed, format } from './ris.js'

const oldProps = ['A1', 'AV', 'BT', 'CP', 'ED', 'EP', 'ID', 'J1', 'JA', 'JF', 'JO', 'L2', 'L3', 'N2', 'T1', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'Y1']
const newProps = ['A4', 'AD', 'AN', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'CA', 'CN', 'DA', 'DB', 'DO', 'DP', 'ET', 'LA', 'LB', 'NV', 'OP', 'PY', 'RI', 'RN', 'SE', 'ST', 'SV', 'TA', 'TT']

plugins.add('@ris', {
  /**
   * @namespace formats
   * @type Object<module:@citation-js/core.plugins.input~format,module:@citation-js/core.plugins.input~parsers>
   * @memberof module:@citation-js/plugin-ris
   */
  input: {
    /**
     * RIS file.
     *
     * @type module:@citation-js/core.plugins.input~parsers
     * @memberof module:@citation-js/plugin-ris.formats
     * @property {module:@citation-js/core.plugins.input~dataParser} parse
     * @property {module:@citation-js/core.plugins.input~typeParser} parseType
     */
    '@ris/file': {
      parse,
      parseType: {
        dataType: 'String',
        predicate: /^TY {2}- /m
      }
    },

    /**
     * A single RIS record.
     *
     * @type module:@citation-js/core.plugins.input~parsers
     * @memberof module:@citation-js/plugin-ris.formats
     * @property {module:@citation-js/core.plugins.input~dataParser} parse
     * @property {module:@citation-js/core.plugins.input~typeParser} parseType
     */
    '@ris/record': {
      parse: parseMixed,
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: ['TY']
        }
      }
    },

    /**
     * A single RIS record, specifically in the new format.
     *
     * @type module:@citation-js/core.plugins.input~parsers
     * @memberof module:@citation-js/plugin-ris.formats
     * @property {module:@citation-js/core.plugins.input~dataParser} parse
     * @property {module:@citation-js/core.plugins.input~typeParser} parseType
     */
    '@ris/new+record': {
      parse: parseNew,
      parseType: {
        extends: '@ris/record',
        propertyConstraint: [
          { props: newProps, match: 'some' },
          { props: oldProps, match: 'none' }
        ]
      }
    },

    /**
     * A single RIS record, specifically in the old format.
     *
     * @type module:@citation-js/core.plugins.input~parsers
     * @memberof module:@citation-js/plugin-ris.formats
     * @property {module:@citation-js/core.plugins.input~dataParser} parse
     * @property {module:@citation-js/core.plugins.input~typeParser} parseType
     */
    '@ris/old+record': {
      parse: parseOld,
      parseType: {
        extends: '@ris/record',
        propertyConstraint: [
          { props: oldProps, match: 'some' },
          { props: newProps, match: 'none' }
        ]
      }
    }
  },

  /**
   * Which specification to use when producing output.
   *
   * @deprecated Use the `spec` option of {@link module:@citation-js/plugin-ris.output.ris} instead.
   * @var {String} [outputSpec="mixed"]
   * @memberof module:@citation-js/plugin-ris.config
   */

  /**
   * @namespace config
   * @memberof module:@citation-js/plugin-ris
   */
  config,

  /**
   * @namespace output
   * @memberof module:@citation-js/plugin-ris
   */
  output: {
    /**
     * @function
     * @implements module:@citation-js/core.plugins.output~formatter
     * @memberof module:@citation-js/plugin-ris.output
     * @param {Array<module:@citation-js/core~CSL>} data
     * @param {Object} [opts]
     * @param {String} [opts.spec='mixed'] - RIS specification (`mixed`, `new` or `old`)
     * @param {module:@citation-js/core.plugins.dict~dictName|String} [opts.format='text'] - Output dict name or `'object'` for a representation
     * @return {String|Array<Object>}
     */
    ris: format
  }
})
