const BOOK = new Set(['book', 'inbook', 'bookinbook', 'suppbook'])
const BOOK_PART = new Set(['inbook', 'bookinbook', 'suppbook'])
const COLLECTION = new Set(['collection', 'reference', 'incollection', 'inreference', 'suppcollection'])
const COLLECTION_PART = new Set(['incollection', 'inreference', 'suppcollection'])
const PROCEEDINGS = new Set(['proceedings', 'inproceedings'])
const PROCEEDINGS_PART = new Set(['inproceedings'])
const PERIODICAL_PART = new Set(['article', 'suppperiodical'])

const TITLE_MAP = {
  mvbook: ['main', BOOK],
  mvcollection: ['main', COLLECTION],
  mvreference: ['main', COLLECTION],
  mvproceedings: ['main', PROCEEDINGS],
  book: ['book', BOOK_PART],
  collection: ['book', COLLECTION_PART],
  reference: ['book', COLLECTION_PART],
  proceedings: ['book', PROCEEDINGS_PART],
  periodical: ['journal', PERIODICAL_PART]
}

export function crossref (target, entry, registry) {
  if (entry.crossref in registry) {
    const parent = registry[entry.crossref]
    if (parent.properties === entry) {
      return entry
    }

    const data = { ...crossref(parent.type, parent.properties, registry) }

    delete data.ids
    delete data.crossref
    delete data.xref
    delete data.entryset
    delete data.entrysubtype
    delete data.execute
    delete data.label
    delete data.options
    delete data.presort
    delete data.related
    delete data.relatedoptions
    delete data.relatedstring
    delete data.relatedtype
    delete data.shortand
    delete data.shortandintro
    delete data.sortkey

    if ((parent.type === 'mvbook' || parent.type === 'book') && BOOK_PART.has(target)) {
      data.bookauthor = data.author
    }

    if (parent.type in TITLE_MAP) {
      const [prefix, targets] = TITLE_MAP[parent.type]
      if (targets.has(target)) {
        data[prefix + 'title'] = data.title
        data[prefix + 'subtitle'] = data.subtitle
        if (prefix !== 'journal') {
          data[prefix + 'titleaddon'] = data.titleaddon
        }
        delete data.title
        delete data.subtitle
        delete data.titleaddon
        delete data.shorttitle
        delete data.sorttitle
        delete data.indextitle
        delete data.indexsorttitle
      }
    }

    return Object.assign(data, entry)
  }

  return entry
}
