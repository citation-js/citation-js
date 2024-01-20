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
function parseWikidata (data, langs) {
  const ids = Array.isArray(data) ? data : [data]

  for (const id of ids) {
    if (!/^Q[1-9][0-9]*$/.test(id)) {
      throw new Error(`Entity "${id}" not found`)
    }
  }

  const urls = wdk.getManyEntities(ids, langs || config.langs)
  return Array.isArray(urls) ? urls : [urls]
}

export {
  parseWikidata as parse,
  parseWikidata as default
}
