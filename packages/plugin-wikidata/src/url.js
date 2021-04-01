/**
 * Get Wikidata ID from Wikidata URL
 *
 * @access protected
 * @memberof module:@citation-js/plugin-wikidata.parsers.url
 * @param {String} input - Wikidata URL
 * @return {String} Wikidata ID
 */
export const parse = input => input.match(/\/(Q\d+)(?:[#?/]|\s*$)/)[1]
