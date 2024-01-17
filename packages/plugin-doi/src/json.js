import fetchDoiType from './type.js'

/**
 * Format Crossref JSON
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-doi.parsers.json
 *
 * @param {Object} data - The input data
 *
 * @return {module:@citation-js/core~CSL} The formatted input data
 */
function parseDoiJson (data) {
  const res = {
    type: fetchDoiType(data.type, data)
  }

  const dateFields = ['submitted', 'issued', 'event-date', 'original-date', 'container', 'accessed']
  dateFields.forEach(field => {
    const value = data[field]
    /* istanbul ignore next: not likely to apply to any current DOI endpoints */
    if (value && value['date-parts'] && typeof value['date-parts'][0] === 'number') {
      value['date-parts'] = [value['date-parts']]
    }
  })

  if (data.type === 'dissertation' && !data.genre) {
    res.genre = 'Doctoral dissertation'
  }

  return Object.assign({}, data, res)
}

export {
  parseDoiJson as parse,
  parseDoiJson as default
}
