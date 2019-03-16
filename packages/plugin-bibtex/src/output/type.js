/**
 * @module output/bibtex
 */

import { logger } from '@citation-js/core'

/**
 * @access private
 */
const bibtexTypes = {
  article: 'article',
  'article-journal': 'article',
  'article-magazine': 'article',
  'article-newspaper': 'article',
  book: 'book',
  chapter: 'incollection',
  graphic: 'misc',
  interview: 'misc',
  manuscript: 'unpublished',
  motion_picture: 'misc',
  'paper-conference': 'inproceedings',
  patent: 'patent',
  personal_communication: 'misc',
  report: 'techreport',
  thesis: 'phdthesis',
  webpage: 'misc'
}

/**
 * CSL pub type to BibTeX pub type
 *
 * @access protected
 * @method fetchBibTeXType
 *
 * @param {String} pubType - CSL type
 *
 * @return {String} BibTeX type
 */
const fetchBibTeXType = function (pubType) {
  if (pubType in bibtexTypes) {
    return bibtexTypes[pubType]
  } else {
    logger.unmapped('[plugin-bibtex]', 'publication type', pubType)
    return 'misc'
  }
}

export default fetchBibTeXType
