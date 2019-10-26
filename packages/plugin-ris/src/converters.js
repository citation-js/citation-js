import { parse as parseDate } from '@citation-js/date'
import TYPES from './spec/types'

const ISSN_REGEX = /^\d{4}-\d{4}$/
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
      const parts = Array(4).fill('')
      date['date-parts'][0].forEach((part, index) => { parts[index] = part })
      if (date.season) { parts[3] = date.season }
      return parts.join('/')
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
            if (family.indexOf(' ') > -1) { return { family } }
            // fall through
          default:
            return { literal: name }
        }
      })
    },
    toSource (names) {
      return names.map(({ family, given, suffix }) => [family, given, suffix].filter(Boolean).join(', '))
    }
  },

  KEYWORD: {
    toTarget (words) { words = [].concat(words); return words.join(',') },
    toSource (words) { return words.split(',') }
  },

  ID: {
    toSource (id) { return id.slice(0, 20) }
  },

  TYPE: {
    toTarget (type) { return TYPES.RIS[type] },
    toSource (type) { return TYPES.CSL[type] }
  }
}

export default CONVERTERS
