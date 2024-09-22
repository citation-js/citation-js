import { parse as parseDate } from '@citation-js/date'
import TYPES from './spec/types.json'

const ISSN_REGEX = /^\d{4}-\d{3}[0-9Xx]$/
const DOI_REGEX = /10(?:\.[0-9]{4,})?\/[^\s]*[^\s.,]/
const CONVERTERS = {
  ANY: {
    toTarget (...values) { return values.find(Boolean) },
    toSource (value) { return [value] }
  },

  PAGE: {
    keepAll: true,
    toTarget (start, end) { return [start, end].filter(Boolean).join('-') },
    toSource (pages) { return pages.replace(/[-–—]/g, '-') }
  },

  ISBN: {
    toTarget (id) { return ISSN_REGEX.test(id) ? [id] : [undefined, id] },
    toSource (...ids) { return ids.find(Boolean) }
  },

  DATE: {
    toTarget (date) {
      return date && parseDate(date.split('/').slice(0, 3).filter(Boolean).join('/'))
    },
    toSource (date) {
      if (!date['date-parts'] || !date['date-parts'][0]) {
        return undefined
      }

      const parts = Array(4).fill('')
      date['date-parts'][0].forEach((part, index) => { parts[index] = part })
      if (date.season) { parts[3] = date.season }
      return parts.join('/')
    }
  },

  YEAR: {
    toTarget (year) {
      return isNaN(+year) ? { raw: year } : { 'date-parts': [[+year]] }
    },
    toSource (date) {
      return date['date-parts']?.[0]?.[0]?.toString()
    }
  },

  DATE_YEAR: {
    keepAll: true,
    toTarget (...dates) {
      return CONVERTERS.DATE.toTarget(CONVERTERS.ANY.toTarget(...dates))
    },
    toSource (date) {
      return [CONVERTERS.DATE.toSource(date), CONVERTERS.YEAR.toSource(date)]
    }
  },

  NAME: {
    toTarget (names) {
      return names && [].concat(names).map(name => {
        const parts = name.split(/, ?/)
        const [family, given, suffix] = parts
        switch (parts.length) {
          case 3:
            return { family, given, suffix }
          case 2:
            return { family, given }
          case 1:
            if (family.indexOf(' ') === -1) { return { family } }
            // fall through
          default:
            return { literal: name }
        }
      })
    },
    toSource (names) {
      return names.map(({ family, given, suffix, literal }) => {
        const parts = [family, given, suffix].filter(Boolean)
        return parts.length ? parts.join(', ') : literal
      })
    }
  },

  KEYWORD: {
    toTarget (words) { words = [].concat(words); return words.join(',') },
    toSource (words) { return words.split(',') }
  },

  ID: {
    toSource (id) { return id.toString().slice(0, 20) }
  },

  TYPE: {
    toTarget (type) { return TYPES.RIS[type] },
    toSource (type) { return TYPES.CSL[type] }
  },

  DOI: {
    toTarget (doi) { return doi.match(DOI_REGEX)[0] },
    toSource (doi) { return doi.match(DOI_REGEX)[0] }
  }
}

export default CONVERTERS
