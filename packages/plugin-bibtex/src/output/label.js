/**
 * @module output/bibtex
 */

const stopWords = [
  'the',
  'a',
  'an'
]

const safeSlug = text => {
  return !text ? '' : text
    .replace(/<\/?.*?>/g, '')
    // exclude all non-alphanumerical ASCII (and include underscore)
    .split(/[\u0020-\u002F\u003A-\u0040\u005B-\u005E\u0060\u007B-\u007F]+/)
    .find(word => word.length && !stopWords.includes(word.toLowerCase()))
}

/**
 * Get a BibTeX label from CSL data
 *
 * @access protected
 * @method getBibTeXLabel
 *
 * @param {CSL} src - Input CSL
 *
 * @return {String} The label
 */
const getBibTeXLabel = function (entry = {}, opts = {}) {
  const {
    generateLabel = true
  } = opts

  if (entry['citation-label']) {
    return entry['citation-label']
  } else if (!generateLabel) {
    return entry.id
  }

  let res = ''

  if (entry.author) {
    res += safeSlug(entry.author[0].family || entry.author[0].literal)
  }
  if (entry.issued && entry.issued['date-parts'] && entry.issued['date-parts'][0]) {
    res += entry.issued['date-parts'][0][0]
  }
  if (entry['year-suffix']) {
    res += entry['year-suffix']
  } else if (entry.title) {
    res += safeSlug(entry.title)
  }

  return res || entry.id
}

export default getBibTeXLabel
