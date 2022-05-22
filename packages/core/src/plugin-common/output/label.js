/**
 * @module output/label
 */

/**
 * Get a label from CSL data
 *
 * @access protected
 * @method getLabel
 * @todo flavors/formats
 *
 * @param {CSL} entry - Input CSL
 *
 * @return {String} The label
 */
function getLabel (entry) {
  if ('citation-label' in entry) {
    return entry['citation-label']
  }

  let res = ''

  if (entry.author) {
    res += entry.author[0].family || entry.author[0].literal
  }
  if (entry.issued && entry.issued['date-parts'] && entry.issued['date-parts'][0]) {
    res += entry.issued['date-parts'][0][0]
  }
  if (entry['year-suffix']) {
    res += entry['year-suffix']
  } else if (entry.title) {
    res += entry.title.replace(/<\/?.*?>/g, '').match(/^(?:(?:the|a|an)\s+)?(\S+)/i)[1]
  }

  return res
}

export { getLabel }
export default {
  label (data) {
    return data.reduce((object, entry) => { object[entry.id] = getLabel(entry); return object }, {})
  }
}
