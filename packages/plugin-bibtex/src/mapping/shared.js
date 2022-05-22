import { util } from '@citation-js/core'
import config from '../config.js'

const stopWords = new Set([
  'the',
  'a',
  'an'
])

// exclude HTML tags and all punctuation
const unsafeChars = /(?:<\/?.*?>|[\u0020-\u002F\u003A-\u0040\u005B-\u005E\u0060\u007B-\u007F])+/g
const unicode = /[^\u0020-\u007F]+/g

function firstWord (text) {
  if (!text) {
    return ''
  } else {
    return text
      .normalize('NFKD')
      .replace(unicode, '')
      .split(unsafeChars)
      // find the first non-stopword
      .find(word => word.length && !stopWords.has(word.toLowerCase()))
  }
}

const name = new util.Translator([
  { source: 'given', target: 'given' },
  { source: 'family', target: 'family' },
  { source: 'suffix', target: 'suffix' },
  { source: 'prefix', target: 'non-dropping-particle' },
  {
    source: 'family',
    target: 'literal',
    when: { source: false, target: { family: false, given: false } }
  }
])

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]

// References to sections point to, unless stated otherwise, sections in
// version 3.13 of the biblatex package documentation, available at
// http://mirrors.ctan.org/macros/latex/contrib/biblatex/doc/biblatex.pdf

// export const TYPE = Symbol('BibTeX type')
// export const LABEL = Symbol('BibTeX label')
export const TYPE = 'BibTeX type'
export const LABEL = 'BibTeX label'

export const MONTHS = {
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
  may: 5, /* eslint-disable-line no-dupe-keys */
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
}

export const TYPE_KEYS = {
  // See section 4.9.2.13
  bathesis: 'Bachelor\'s thesis',
  mathesis: 'Master\'s thesis',
  phdthesis: 'PhD thesis',
  candthesis: 'Candidate thesis',
  techreport: 'technical report',
  resreport: 'research report',
  software: 'computer software',
  datacd: 'data cd',
  audiocd: 'audio cd',

  // See section 4.9.2.20
  patent: 'patent',
  patentde: 'German patent',
  patenteu: 'European patent',
  patentfr: 'French patent',
  patentuk: 'British patent',
  patentus: 'U.S. patent',
  patreq: 'patent request',
  patreqde: 'German patent request',
  patreqeu: 'European patent request',
  patreqfr: 'French patent request',
  patrequk: 'British patent request',
  patrequs: 'U.S. patent request'
}

// isan: /^(?:ISAN )?(?:[0-9a-f]{4}-){4}[0-9a-z](?:-(?:[0-9a-f]{4}-){2}[0-9a-z])?$/i
// ismn: /^(?:979-?0-?|M-?)(?:\d{9}|(?=[\d-]{11}$)\d+-\d+-\d)$/i
// isrn: /^ISRN .{1,36}$/
// iswc: /^(?:ISWC )?T-?\d{9}-?\d$/
export const STANDARD_NUMBERS_PATTERN = /(^(?:ISAN )?(?:[0-9a-f]{4}-){4}[0-9a-z](?:-(?:[0-9a-f]{4}-){2}[0-9a-z])?$)|(^(?:979-?0-?|M-?)(?:\d{9}|(?=[\d-]{11}$)\d+-\d+-\d)$)|(^ISRN .{1,36}$)|(^(?:ISWC )?T-?\d{9}-?\d$)/i

// Basic EDTF Level 1 parser, except seasons since season ranges are not supported
// in the version of CSL-JSON that Citation.js supports...
export function parseDate (date) {
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
export function parseMonth (value) {
  if (value == null) {
    return []
  }

  if (+value) {
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

export function formatLabel (author, issued, suffix, title) {
  let label = ''

  if (author && author[0]) {
    label += firstWord(author[0].family || author[0].literal)
  }
  if (issued && issued['date-parts'] && issued['date-parts'][0]) {
    label += issued['date-parts'][0][0]
  }
  if (suffix) {
    label += suffix
  } else if (title) {
    label += firstWord(title)
  }

  return label
}

export const Converters = {
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
        return date['date-parts']
          .map(datePart => datePart
            .map(datePart => datePart.toString().padStart(2, '0'))
            .join('-')
          )
          .join('/')
      }
    }
  },
  YEAR_MONTH: {
    toTarget (year, month, day) {
      if (isNaN(+year)) {
        return { literal: year }
      } else if (!isNaN(+day) && !isNaN(+month)) {
        return { 'date-parts': [[+year, +month, +day]] }
      } else {
        return { 'date-parts': [[+year, ...parseMonth(month)]] }
      }
    },
    toSource (date) {
      if ('date-parts' in date) {
        const [year, month, day] = date['date-parts'][0]
        return [
          year.toString(),
          month
            ? day ? `${months[month - 1]} ${day}` : month
            : undefined
        ]
      } else {
        return []
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
  EVENT_TITLE: {
    toTarget (title, addon) {
      if (addon) { title += ' (' + addon + ')' }
      return title
    },
    toSource (title) {
      return title.match(/^(.+)(?: \((.+)\))?$/).slice(1, 3)
    }
  },
  // (Unconvential) convention of setting
  //     howpublished = {\url{https://example.org/some/page}}
  HOW_PUBLISHED: {
    toTarget (howPublished) {
      if (howPublished.startsWith('http')) {
        return howPublished
      }
    }
  },
  // Unfortunately, keywords lists are serialised the same in BibTeX and CSL-JSON,
  // meaning we deserialize them here again.
  KEYWORDS: {
    toTarget (list) { return list.join(',') },
    toSource (list) { return list.split(',') }
  },
  LABEL: {
    toTarget (label) {
      return [label, label]
    },
    toSource (id, label, author, issued, suffix, title) {
      let safeId
      if (id === null) {
        safeId = 'null'
      } else if (id === undefined) {
        safeId = 'undefined'
      } else {
        safeId = id.toString().replace(unsafeChars, '')
      }
      if (config.format.useIdAsLabel) {
        return safeId
      }

      if (label && !unsafeChars.test(label)) {
        return label
      } else {
        return formatLabel(author, issued, suffix, title) || safeId
      }
    }
  },
  // Simply translating name parts; deserialisation happens in the parser.
  NAMES: {
    toTarget (list) { return list.map(name.convertToTarget) },
    toSource (list) { return list.map(name.convertToSource) }
  },
  // TODO multiple page ranges
  PAGES: {
    toTarget (pages) { return pages.replace(/[–—]/, '-') },
    toSource (pages) { return pages.replace('-', '--') }
  },
  STANDARD_NUMBERS: {
    toTarget (...args) {
      return args.find(Boolean)
    },
    toSource (number) {
      const match = number.toString().match(STANDARD_NUMBERS_PATTERN)
      return match ? match.slice(1, 5) : []
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
  TITLE: {
    toTarget (title, subtitle, addon) {
      if (subtitle) { title += ': ' + subtitle }
      return title
    },
    toSource (title) {
      return [title]
    }
  }
}
