import { parse as parseDate } from '@citation-js/date'
import { parse as parseName } from '@citation-js/name'

function nameProps (person) {
  const {
    firstname,
    lastname,
    firstName: given = firstname,
    lastName: family = lastname
  } = person

  if (given && family) {
    return { given, family }
  } else if (person.name) {
    return parseName(person.name)
  }
}

const identifiers = [
  'PMID',
  'PMCID',
  'DOI',
  'ISBN'
  // 'URL' is actually the URL of the record collection, if I understand it correctly,
  // and not of the record. Otherwise, it should be included.
]

const journalIdentifiers = [
  'ISSN'
]

function idProps (input, identifiers) {
  const output = {}

  for (const prop in input) {
    const upperCaseProp = prop.toUpperCase()

    if (identifiers.includes(upperCaseProp)) {
      output[upperCaseProp] = input[prop]
    }
  }

  if (input.identifier) {
    for (let { id, type = '' } of input.identifier) {
      type = type.toUpperCase()
      if (identifiers.includes(type)) {
        output[type] = id
      }
    }
  }

  return output
}

// copied from BibTeX, as BibJSON is based on BibTeX
const typeMap = {
  article: 'article',
  book: 'book',
  booklet: 'book',
  proceedings: 'book',
  mastersthesis: 'thesis',
  inbook: 'chapter',
  incollection: 'chapter',
  conference: 'paper-conference',
  inproceedings: 'paper-conference',
  manual: 'report',
  misc: 'document',
  online: 'website',
  patent: 'patent',
  phdthesis: 'thesis',
  techreport: 'report',
  unpublished: 'manuscript'
}

function quickscrapeSpecificProps () {
  return { type: 'article-journal' }
}

function generalProps (input) {
  const output = {
    type: typeMap[input.type] || 'document'
  }

  if (input.title) { output.title = input.title }
  if (input.author) { output.author = input.author.map(nameProps).filter(Boolean) }
  if (input.editor) { output.editor = input.editor.map(nameProps).filter(Boolean) }
  if (input.reviewer) {
    if (input.author) { output['reviewed-author'] = output.author }
    output.author = input.reviewer.map(nameProps).filter(Boolean)
  }

  if (Array.isArray(input.keywords)) {
    output.keyword = input.keywords.join()
  } else if (input.keywords) {
    output.keyword = input.keywords
  }

  if (input.publisher) { output.publisher = input.publisher.name || input.publisher }

  if (input.date && Object.keys(input.date).length > 0) {
    const dates = input.date
    if (dates.submitted) { output.submitted = parseDate(dates.submitted) }
    if (dates.published) { output.issued = parseDate(dates.published) }
  } else if (input.year) {
    output.issued = { 'date-parts': [[+input.year]] }
  }
  if (input.journal) {
    const journal = input.journal
    if (journal.name) { output['container-title'] = journal.name }
    if (journal.volume) { output.volume = +journal.volume }
    if (journal.issue) { output.issue = +journal.issue }

    Object.assign(output, idProps(journal, journalIdentifiers))

    if (journal.firstpage) { output['page-first'] = journal.firstpage }
    if (journal.pages) {
      output.page = journal.pages.replace('--', '-')
    } else if (journal.firstpage && journal.lastpage) {
      output.page = journal.firstpage + '-' + journal.lastpage
    }
  }

  if (input.link && typeof input.link[0] === 'object') {
    output.URL = input.link[0].url
  }

  Object.assign(output, idProps(input, identifiers))

  if (input.cid) {
    output.id = input.cid
  } else if (output.DOI) {
    output.id = output.DOI
  }

  return output
}

/**
 * Parse ContentMine quickscrape data
 *
 * @access protected
 * @memberof module:@citation-js/plugin-bibjson.parsers.json
 * @param {Object} data - The input data
 * @return {Array<CSL>} The formatted input data
 */
const parseContentMine = function (data) {
  return Object.assign(generalProps(data), quickscrapeSpecificProps(data))
}

/**
 * Parse BibJSON data
 *
 * @access protected
 * @memberof module:@citation-js/plugin-bibjson.parsers.json
 * @param {Object} data - The input data
 * @return {Array<CSL>} The formatted input data
 */
const parseBibJson = function (data) {
  return generalProps(data)
}

export {
  parseContentMine as quickscrapeRecord,
  parseBibJson as record
}
