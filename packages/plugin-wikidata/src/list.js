/**
 * @module input/wikidata
 */

import wdk from 'wikidata-sdk'

/**
 * Get Wikidata JSON from Wikidata IDs
 *
 * @access protected
 * @method parseWikidata
 *
 * @param {String} data - Wikidata IDs
 *
 * @return {Object} Wikidata JSON
 */
const parseWikidata = function (data) {
  const list = [].concat(data)
  return [].concat(wdk.getEntities(list, ['en']))
}

export {
  parseWikidata as parse,
  parseWikidata as default
}
