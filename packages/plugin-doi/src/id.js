/**
 * Get DOI API URLs from DOI ID.
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-doi.parsers.id
 *
 * @param {String} data - DOIs
 *
 * @return {Array<String>} DOI URLs
 */
function parseDoi (data) {
  const list = Array.isArray(data) ? data : data.trim().split(/(?:\s+)/g)
  return list.map(doi => `https://doi.org/${doi}`)
}

export {
  parseDoi as parse,
  parseDoi as default
}
