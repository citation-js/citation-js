import { util } from '@citation-js/core'
import types from './types'

// References to sections point to, unless stated otherwise, sections in
// version 3.13 of the biblatex package documentation, available at
// http://mirrors.ctan.org/macros/latex/contrib/biblatex/doc/biblatex.pdf

// const TYPE = Symbol('BibTeX type')
// const LABEL = Symbol('BibTeX label')
const TYPE = 'BibTeX type'
const LABEL = 'BibTeX label'

const MONTHS = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,

  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
}

// See section 4.9.2.13
const TYPE_KEYS = {
  bathesis: 'Bachelor\'s thesis',
  mathesis: 'Master\'s thesis',
  phdthesis: 'PhD thesis',
  candthesis: 'Candidate thesis',
  techreport: 'technical report',
  resreport: 'research report',
  software: 'computer software',
  datacd: 'data cd',
  audiocd: 'audio cd'
}

// isan: /^(?:ISAN )?(?:[0-9a-f]{4}-){4}[0-9a-z](?:-(?:[0-9a-f]{4}-){2}[0-9a-z])?$/i
// ismn: /^(?:979-?0-?|M-?)(?:\d{9}|(?=[\d-]{11}$)\d+-\d+-\d)$/i
// isrn: /^ISRN .{1,36}$/
// iswc: /^(?:ISWC )?T-?\d{9}-?\d$/
const STANDARD_NUMBERS_PATTERN = /(^(?:ISAN )?(?:[0-9a-f]{4}-){4}[0-9a-z](?:-(?:[0-9a-f]{4}-){2}[0-9a-z])?$)|(^(?:979-?0-?|M-?)(?:\d{9}|(?=[\d-]{11}$)\d+-\d+-\d)$)|(^ISRN .{1,36}$)|(^(?:ISWC )?T-?\d{9}-?\d$)/i

// Basic EDTF Level 1 parser, except seasons since season ranges are not supported
// in the version of CSL-JSON that Citation.js supports...
function parseDate (date) {
  const parts = date.split('T')[0].replace(/[?~%]$/, '').split('-')
  const year = +parts[0].replace(/^Y(?=-?\d{4}\d+)/, '').replace(/X/g, '0')

  // empty parts and 'XX' return NaN, which is falsy
  const month = +parts[1]
  const day = +parts[2]

  // filter out months > 20 (seasons)
  if (!month || month > 20) {
    return [year]
  } else if (!day) {
    return [year, month]
  } else {
    return [year, month, day]
  }
}

// Parse "April 1st", "24th December", "1 jan" since Oren Patashnik recommends
// people put the day number in the month field. To be fair, that *was* way back
// in February 8, 1988.
//
// See point 9 of section 4 of the BibTeX manual v0.99b
// http://mirrors.ctan.org/biblio/bibtex/base/btxdoc.pdf (accessed 2020-09-12)
function parseMonth (value) {
  if (value == null) {
    return []
  }

  if (parseInt(value, 10)) {
    return [parseInt(value, 10)]
  }

  value = value.trim().toLowerCase()
  if (value in MONTHS) {
    return [MONTHS[value]]
  }

  const parts = value.split(/\s+/)
  let month
  let day

  if (parts[0] in MONTHS) {
    month = MONTHS[parts[0]]
    day = parseInt(parts[1])
  } else if (parts[1] in MONTHS) {
    month = MONTHS[parts[1]]
    day = parseInt(parts[0])
  }

  return day ? [month, day] : month ? [month] : []
}

const name = new util.Translator([
  { source: 'given', target: 'given' },
  { source: 'family', target: 'family' },
  { source: 'suffix', target: 'suffix' },
  { source: 'prefix', target: 'non-dropping-particle' },
])

const Converters = {
  PICK: {
    toTarget (...args) {
      return args.find(Boolean)
    },
    toSource (value) {
      return [value]
    }
  },

  // See section 2.3.8
  DATE: {
    toTarget (date) {
      const parts = date
          .split('/')
          .map(part => part && part !== '..' ? parseDate(part) : undefined)
      return isNaN(parts[0][0]) ? { literal: date } : { 'date-parts': parts }
    },
    toSource (date) {
      if ('date-parts' in date) {
        return date['date-parts'].map(part => part.join('-')).join('/')
      }
    }
  },
  YEAR_MONTH: {
    toTarget (year, month) {
      if (isNaN(+year)) {
        return { literal: year }
      } else {
        return { 'date-parts': [[+year, ...parseMonth(month)]] }
      }
    }
  },
  // See section 3.13.7
  EPRINT: {
    toTarget (id, type) {
      if (type === 'pubmed') {
        return id
      }
    },
    toSource (id) {
      return [id, 'pubmed']
    }
  },
  // (Unconvential) convention of setting
  //     howpublished = {\url{https://example.org/some/page}}
  HOW_PUBLISHED: {
    toTarget (howPublished) {
      if (howPublished.startsWith('url')) {
        return howPublished.slice(3)
      }
    }
  },
  // Unfortunately, keywords lists are serialised the same in BibTeX and CSL-JSON,
  // meaning we deserialize them here again.
  KEYWORDS: {
    toTarget (list) { return list.join(',') },
    toSource (list) { return list.split(',') }
  },
  // Simply translating name parts; deserialisation happens in the parser.
  NAMES: {
    toTarget (list) { return list.map(name.convertToTarget) },
    toSource (list) { return list.map(name.convertToSource) }
  },
  // TODO: multiple ranges
  PAGES: {
    toTarget (text) { return text.replace(/[–—]/, '-') },
    toSource (text) { return text.replace('-', '--') }
  },
  RICH_TEXT: null, // Currently conversions take place in the parser.
  STANDARD_NUMBERS: {
    toTarget (...args) {
      return args.find(Boolean)
    },
    toSource (number) {
      const match = number.toString().match(STANDARD_NUMBERS_PATTERN)
      return match ? match.slice(1, 5) : undefined
    }
  },
  // See section 4.9.2.11
  STATUS: {
    toSource (state) {
      if (/^(inpreparation|submitted|forthcoming|inpress|prepublished)$/i.test(state)) {
        return state
      }
    }
  },
  TYPE: {
    toTarget (type, subtype, typeKey) {
      if (!typeKey) {
        if (type === 'masterthesis') {
          typeKey = 'mathesis'
        }
        if (type === 'phdthesis') {
          typeKey = 'phdthesis'
        }
        if (type === 'techreport') {
          typeKey = 'techreport'
        }
      }

      return [types.source[type] || 'book', typeKey || subtype]
    },
    toSource (type, genre) {
      const sourceType = types.target[type] || 'misc'
      return genre in TYPE_KEYS ? [sourceType, , genre] : [sourceType, genre]
    }
  }
}

const nonSpec = [
  {
    source: 'numpages',
    target: 'number-of-pages',
    when: {
      source: { pagetotal: false },
      target: false
    }
  },
  {
    source: 'pmid',
    target: 'PMID',
    when: {
      source: {
        eprinttype (type) { return type !== 'pmid' },
        archiveprefix (type) { return type !== 'pmid' }
      },
      target: false
    }
  },
  {
    source: 'pmcid',
    target: 'PMCID',
    when: {
      target: false
    }
  }
]

const aliases = [
  {
    source: 'annote',
    target: 'annote',
    convert: Converters.RICH_TEXT,
    when: {
      source: { annotation: false },
      target: false
    }
  },
  {
    source: 'address',
    target: 'publisher-place',
    convert: Converters.PICK,
    when: {
      source: { location: false },
      target: false
    }
  },
  {
    source: ['eprint', 'archiveprefix'],
    target: 'PMID',
    convert: Converters.EPRINT,
    when: {
      source: { eprinttype: false },
      target: false
    }
  },
  {
    source: 'journal',
    target: 'container-title',
    convert: Converters.RICH_TEXT,
    when: {
      source: {
        maintitle: false,
        booktitle: false,
        journaltitle: false
      },
      target: false
    }
  },
  {
    source: 'school',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: {
        institution: false,
        organization: false,
        publisher: false
      },
      target: false
    }
  }
]

const biblatex = new util.Translator([
  ...aliases,
  ...nonSpec,
  {
    source: 'abstract',
    target: 'abstract',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'urldate',
    target: 'accessed',
    convert: Converters.DATE
  },
  {
    source: 'annotation',
    target: 'annote',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'author',
    target: 'author',
    convert: Converters.NAMES
  },
  {
    source: 'library',
    target: 'call-number'
  },
  {
    source: 'chapter',
    target: 'chapter-number'
  },
  {
    source: 'bookauthor',
    target: 'container-author',
    convert: Converters.NAMES
  },

  // Regarding maintitle, booktitle & journaltitle:
  //     When importing, maintitle is preferred, since it represents the
  // larger container. When exporting, booktitle is preferred since
  // it is more common, unless number-of-volumes is present indicating a
  // multi-volume book.
  //     journaltitle is only used for articles.
  {
    source: 'maintitle',
    target: 'container-title',
    convert: Converters.RICH_TEXT,
    when: {
      source: true,
      target: { 'number-of-volumes': true }
    }
  },
  {
    source: 'booktitle',
    target: 'container-title',
    convert: Converters.RICH_TEXT,
    when: {
      source: { maintitle: false },
      target: { 'number-of-volumes': false }
    }
  },
  {
    source: 'journaltitle',
    target: 'container-title',
    convert: Converters.RICH_TEXT,
    when: {
      source: { [TYPE]: 'article' },
      target: {
        type: [
          'article',
          'article-newspaper',
          'article-journal',
          'article-magazine'
        ]
      }
    }
  },
  {
    source: 'shortjournal',
    target: 'container-title-short',
    convert: Converters.RICH_TEXT,
    when: {
      source: { [TYPE]: 'article' },
      target: {
        type: [
          'article',
          'article-newspaper',
          'article-journal',
          'article-magazine'
        ]
      }
    }
  },
  {
    source: 'number',
    target: 'collection-number',
    when: {
      source: {
        [TYPE]: [
          'book',
          'mvbook',
          'inbook',
          'collection',
          'mvcollection',
          'incollection',
          'suppcollection',
          'manual',
          'suppperiodical',
          'proceedings',
          'mvproceedings',
          'refererence'
        ]
      },
      target: {
        type: [
          'bill',
          'book',
          'broadcast',
          'chapter',
          'dataset',
          'entry',
          'entry-dictionary',
          'entry-encyclopedia',
          'figure',
          'graphic',
          'interview',
          'legislation',
          'legal_case',
          'manuscript',
          'map',
          'motion_picture',
          'musical_score',
          'pamphlet',
          'post',
          'post-weblog',
          'personal_communication',
          'review',
          'review-book',
          'song',
          'speech',
          'thesis',
          'treaty',
          'webpage'
        ]
      }
    }
  },
  {
    source: 'series',
    target: 'collection-title',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'shortseries',
    target: 'collection-title-short',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'doi',
    target: 'DOI'
  },
  {
    source: 'edition',
    target: 'edition'
  },
  {
    source: 'editor',
    target: 'editor',
    convert: Converters.NAMES
  },
  {
    source: [TYPE, 'entrysubtype', 'type'],
    target: ['type', 'genre'],
    convert: Converters.TYPE
  },
  {
    source: 'eventdate',
    target: 'event-date',
    convert: Converters.DATE
  },
  {
    source: 'venue',
    target: 'event-place'
  },
  {
    source: 'eventtitle',
    target: 'event'
  },
  {
    source: LABEL,
    target: ['id', 'citation-label'],
    convert: {
      toTarget (value) { return [value, value] },
      toSource (id, label) { return id || label }
    }
  },
  {
    source: 'isbn',
    target: 'ISBN'
  },
  {
    source: 'issn',
    target: 'ISSN'
  },
  {
    source: 'issue',
    target: 'issue',
    when: {
      source: {
        number: false,
        [TYPE]: ['article', 'periodical']
      },
      target: {
        issue (issue) { return typeof issue === 'string' && !issue.match(/\d+/) },
        type: ['article', 'article-journal', 'article-newspaper', 'article-magazine']
      }
    }
  },
  {
    source: 'number',
    target: 'issue',
    when: {
      source: {
        [TYPE]: ['article', 'periodical', 'inproceedings']
      },
      target: {
        issue (issue) { return typeof issue === 'number' || issue.match(/\d+/) },
        type: ['article', 'article-journal', 'article-newspaper', 'article-magazine', 'paper-conference']
      }
    }
  },
  {
    source: 'date',
    target: 'issued',
    convert: Converters.DATE
  },
  {
    source: ['year', 'month'],
    target: 'issued',
    convert: Converters.YEAR_MONTH,
    when: {
      source: { date: false },
      target: false
    }
  },
  {
    source: 'keywords',
    target: 'keyword',
    convert: Converters.KEYWORDS
  },
  {
    source: 'language',
    target: 'language',
    convert: Converters.PICK
  },
  {
    source: 'note',
    target: 'note'
  },
  {
    source: ['isan', 'ismn', 'isrn', 'iswc'],
    target: 'number',
    convert: Converters.STANDARD_NUMBERS,
    when: {
      source: {
        [TYPE] (type) { return type !== 'patent' }
      },
      target: {
        type (type) { return type !== 'patent' }
      }
    }
  },
  {
    source: 'number',
    target: 'number',
    when: {
      source: { [TYPE]: ['patent', 'report', 'techreport'] },
      target: { type: ['patent', 'report'] }
    }
  },
  {
    source: 'origlocation',
    target: 'original-publisher-place',
    convert: Converters.PICK
  },
  {
    source: 'origpublisher',
    target: 'original-publisher',
    convert: Converters.PICK
  },
  {
    source: 'origtitle',
    target: 'original-title',
    convert: Converters.RICH_TEXT
  },
  {
    source: ['pages', 'eid'],
    target: 'page',
    convert: Converters.PAGES
  },
  {
    source: 'pagetotal',
    target: 'number-of-pages'
  },
  // {
  //   source: 'part',
  //   target: 'part-number'
  // },
  {
    source: ['eprint', 'eprinttype'],
    target: 'PMID',
    convert: Converters.EPRINT
  },
  {
    source: 'location',
    target: 'publisher-place',
    convert: Converters.PICK
  },
  {
    source: 'publisher',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: true,
      target: {
        type (type) { return type !== 'webpage' }
      }
    }
  },
  {
    source: 'organization',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: {
        publisher: false
      },
      target: {
        type: 'webpage' // TODO paper-conference?
      }
    }
  },
  {
    source: 'institution',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: {
        publisher: false,
        organization: false
      },
      target: false
    }
  },
  {
    source: 'howpublished',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: {
        publisher: false,
        organization: false,
        institution: false
      },
      target: {
        type: 'manuscript'
      }
    }
  },
  {
    source: 'pubstate',
    target: 'status',
    convert: Converters.STATUS
  },
  {
    source: 'shorttitle',
    target: 'title-short',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'title',
    target: 'title',
    convert: Converters.RICH_TEXT
  },
  {
    source: 'translator',
    target: 'translator',
    convert: Converters.NAMES
  },
  {
    source: 'url',
    target: 'URL'
  },
  {
    source: 'howpublished',
    target: 'URL',
    convert: Converters.HOW_PUBLISHED,
    when: {
      source: {
        url: false
      },
      target: false
    }
  },
  {
    source: 'version',
    target: 'version'
  },
  {
    source: 'volume',
    target: 'volume'
  },
  {
    source: 'volumes',
    target: 'number-of-volumes'
  },
  // {
  //   source: 'issuetitle',
  //   target: 'volume-title',
  //   convert: Converters.RICH_TEXT
  // }
])

function crossref (entry, registry) {
  if (entry.crossref in registry) {
    const parent = registry[entry.crossref].properties
    if (parent === entry) {
      return entry
    }

    return Object.assign(crossref(parent, registry), entry)
  }

  return entry
}

export function parse (input) {
  const registry = {}

  for (const entry of input) {
    registry[entry.label] = entry
  }

  return input.map(({ type, label, properties }) => biblatex.convertToTarget({
    [TYPE]: type,
    [LABEL]: label,
    ...crossref(properties, registry)
  }))
}

export function format (input) {
  return input.map(entry => {
    const { [TYPE]: type, [LABEL]: label, ...properties } = biblatex.convertToSource(entry)
    return { type, label, properties }
  })
}
