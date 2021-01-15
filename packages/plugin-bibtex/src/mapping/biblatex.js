import { util } from '@citation-js/core'
import { format as formatDate } from '@citation-js/date'
import types from './biblatexTypes'
import {
  TYPE,
  LABEL,
  TYPE_KEYS,
  Converters
} from './shared'

const nonSpec = [
  {
    source: 'note',
    target: 'accessed',
    when: {
      source: false,
      target: { note: false }
    },
    convert: {
      toSource (accessed) {
        return `[Online; accessed ${formatDate(accessed)}]`
      }
    }
  },
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

export default new util.Translator([
  ...aliases,
  ...nonSpec,
  {
    source: 'abstract',
    target: 'abstract'
  },
  {
    source: 'urldate',
    target: 'accessed',
    convert: Converters.DATE
  },
  {
    source: 'annotation',
    target: 'annote'
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
    when: {
      source: true,
      target: { 'number-of-volumes': true }
    }
  },
  {
    source: 'booktitle',
    target: 'container-title',
    when: {
      source: { maintitle: false },
      target: { 'number-of-volumes': false }
    }
  },
  {
    source: 'journaltitle',
    target: 'container-title',
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
    target: 'collection-title'
  },
  {
    source: 'shortseries',
    target: 'collection-title-short'
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
    convert: {
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
        return genre in TYPE_KEYS ? [sourceType, undefined, genre] : [sourceType, genre]
      }
    }
  },
  {
    source: TYPE,
    when: { target: { type: false } },
    convert: { toSource () { return 'misc' } }
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
    target: ['id', 'citation-label', 'author', 'issued', 'year-suffix', 'title'],
    convert: Converters.LABEL
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
        issue (issue) {
          return typeof issue === 'number' ||
            (typeof issue === 'string' && issue.match(/\d+/))
        },
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
    target: 'original-title'
  },
  {
    source: ['pages', 'eid'],
    target: 'page',
    // TODO multiple page ranges
    convert: {
      toTarget (pages, eid) {
        return eid ? eid.replace(/^e?/i, 'e') : pages.replace(/[–—]/, '-')
      },
      toSource (page) {
        return /^e?/i.test(page) ? [page, page] : page.replace('-', '--')
      }
    }
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
    target: 'title-short'
  },
  {
    source: 'title',
    target: 'title'
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
  }
  // {
  //   source: 'issuetitle',
  //   target: 'volume-title',
  //   convert: Converters.RICH_TEXT
  // }
])
