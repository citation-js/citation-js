/**
 * Object containing a Crossref-specific types and their corresponding values in the CSL specification.
 *
 * Partially from deep-review: https://github.com/greenelab/deep-review/blob/b2f21a8cf0f5657e464871a985b1b2889ea48ce9/build/citations.py#L128-L147
 *   Licensed CC BY 4.0 + CC0 1.0
 *
 * @access private
 * @constant doiTypes
 * @default
 */
const doiTypes = {
  'journal-article': 'article-journal',
  'book-chapter': 'chapter',
  'posted-content': 'manuscript',
  'proceedings-article': 'paper-conference',
  // https://github.com/citation-js/citation-js/issues/220
  dissertation: 'thesis'
}

/**
 * Get a valid CSL type from Crossref type
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-doi.parsers.type
 *
 * @param {String} value - Input Crossref type
 * @param {Object} data - Full Crossref record
 *
 * @return {String} Output CSL type
 */
function fetchDoiType (value, data) {
  // https://github.com/citation-js/citation-js/issues/136
  if (value === 'posted-content' && data.subtype === 'preprint') {
    return 'article'
  }

  // https://github.com/citation-js/citation-js/issues/243
  if (value === 'posted-content' && data.subtype === 'other' && data.member === '31795') {
    return 'post-weblog'
  }

  return doiTypes[value] || value
}

export {
  fetchDoiType as parse,
  fetchDoiType as default
}
