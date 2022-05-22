/**
 * @module input/other
 */

import logger from '../../logger.js'

/**
 *
 * @access private
 * @constant substituters
 * @default
 */
const substituters = [
  [
    /((?:\[|:|,)\s*)'((?:\\'|[^'])*?[^\\])?'(?=\s*(?:\]|}|,))/g,
    '$1"$2"'
  ],
  [
    /((?:(?:"|]|}|\/[gmiuys]|\.|(?:\d|\.|-)*\d)\s*,|{)\s*)(?:"([^":\n]+?)"|'([^":\n]+?)'|([^":\n]+?))(\s*):/g,
    '$1"$2$3$4"$5:'
  ]
]

/**
 * Parse (in)valid JSON
 *
 * @access protected
 * @method parseJSON
 *
 * @param {String} str - The input string
 *
 * @return {Object|Array<Object>|Array<String>} The parsed object
 */
function parseJSON (str) {
  if (typeof str !== 'string') {
    return JSON.parse(str)
  }

  try {
    return JSON.parse(str)
  } catch (e) {
    logger.debug('[plugin-common]', 'Invalid JSON, switching to experimental parser')
    substituters.forEach(([regex, subst]) => { str = str.replace(regex, subst) })
    return JSON.parse(str)
  }
}

export {
  parseJSON as parse,
  parseJSON as default
}
