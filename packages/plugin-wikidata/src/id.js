import wdk from 'wikidata-sdk'
import config from './config.json'

/**
 * Get Wikidata JSON from Wikidata IDs
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-wikidata.parsers.id
 *
 * @param {String|Array<String>} data - Wikidata IDs
 * @param {Array<String>} [langs]
 *
 * @return {Object} Wikidata JSON
 */
const parseWikidata = function (data, langs) {
  const list = [].concat(data)
  return [].concat(wdk.getManyEntities(list, langs || config.langs))
}

export {
  parseWikidata as parse,
  parseWikidata as default
}
