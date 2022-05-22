import { util } from '@citation-js/core'
import { format as formatDate } from '@citation-js/date'
import types from './biblatexTypes.json'
import {
  TYPE,
  LABEL,
  TYPE_KEYS,
  Converters
} from './shared.js'

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
  },
  {
    source: 's2id',
    target: 'custom',
    convert: {
      toTarget (S2ID) {
        return { S2ID }
      },
      toSource ({ S2ID }) {
        return [S2ID]
      }
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
    source: ['maintitle', 'mainsubtitle', 'maintitleaddon'],
    target: 'container-title',
    when: {
      source: true,
      target: { 'number-of-volumes': true }
    },
    convert: Converters.TITLE
  },
  {
    source: ['booktitle', 'booksubtitle', 'booktitleaddon'],
    target: 'container-title',
    when: {
      source: { maintitle: false },
      target: {
        'number-of-volumes': false,
        type (type) { return !type || !type.startsWith('article') }
      }
    },
    convert: Converters.TITLE
  },
  {
    source: ['journaltitle', 'journalsubtitle', 'journaltitleaddon'],
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
    },
    convert: Converters.TITLE
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
    source: 'shortjournal',
    target: 'journalAbbreviation',
    when: {
      source: false,
      target: {
        'container-title-short': false
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
          'bookinbook',
          'suppbook',
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
          if (type === 'mastersthesis') {
            typeKey = 'mathesis'
          }
          if (type === 'phdthesis') {
            typeKey = 'phdthesis'
          }
          if (type === 'techreport') {
            typeKey = 'techreport'
          }
        }

        return [types.source[type] || 'document', typeKey || subtype]
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
    source: ['eventtitle', 'eventtitleaddon'],
    target: 'event-title',
    convert: Converters.EVENT_TITLE
  },
  {
    source: ['eventtitle', 'eventtitleaddon'],
    target: 'event',
    convert: Converters.EVENT_TITLE,
    when: { source: false, target: { 'event-title': false } }
  },
  {
    source: LABEL,
    target: ['id', 'citation-key', 'author', 'issued', 'year-suffix', 'title'],
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
          return typeof issue === 'string' && !issue.match(/\d+/)
        },
        type: [
          'article',
          'article-journal',
          'article-newspaper',
          'article-magazine',
          'periodical'
        ]
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
        issue (issue) { return issue && (typeof issue === 'number' || issue.match(/\d+/)) },
        type: [
          'article',
          'article-journal',
          'article-newspaper',
          'article-magazine',
          'paper-conference',
          'periodical'
        ]
      }
    }
  },
  {
    source: 'date',
    target: 'issued',
    convert: Converters.DATE
  },
  {
    source: ['year', 'month', 'day'],
    target: 'issued',
    convert: Converters.YEAR_MONTH,
    when: {
      source: { date: false },
      target: false
    }
  },
  {
    source: 'location',
    target: 'jurisdiction',
    when: {
      source: { type: 'patent' },
      target: { type: 'patent' }
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
    source: 'eid',
    target: 'number',
    when: { target: { type: ['article-journal'] } }
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
      source: { [TYPE]: ['patent', 'report', 'techreport', 'legislation'] },
      target: { type: ['patent', 'report', 'legislation'] }
    }
  },
  {
    source: 'origdate',
    target: 'original-date',
    convert: Converters.DATE
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
    source: 'pages',
    target: 'page',
    when: { source: { bookpagination: [undefined, 'page'] } },
    convert: Converters.PAGES
  },
  {
    source: 'pagetotal',
    target: 'number-of-pages'
  },
  {
    source: 'part',
    target: 'part-number'
  },
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
        // All except:
        //   - thesis, report: institution
        //   - webpage: organization
        type: [
          'article',
          'article-journal',
          'article-magazine',
          'article-newspaper',
          'bill',
          'book',
          'broadcast',
          'chapter',
          'classic',
          'collection',
          'dataset',
          'document',
          'entry',
          'entry-dictionary',
          'entry-encyclopedia',
          'event',
          'figure',
          'graphic',
          'hearing',
          'interview',
          'legal_case',
          'legislation',
          'manuscript',
          'map',
          'motion_picture',
          'musical_score',
          'pamphlet',
          'paper-conference',
          'patent',
          'performance',
          'periodical',
          'personal_communication',
          'post',
          'post-weblog',
          'regulation',
          'review',
          'review-book',
          'software',
          'song',
          'speech',
          'standard',
          'treaty'
        ]
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
      target: {
        type: ['report', 'thesis']
      }
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
    source: ['pages', 'bookpagination'],
    target: 'section',
    when: {
      source: { bookpagination: 'section' },
      target: { page: false }
    },
    convert: {
      toTarget (section) { return section },
      toSource (section) { return [section, 'section'] }
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
    source: 'shorttitle',
    target: 'shortTitle',
    when: { source: false, target: { 'title-short': false } }
  },
  {
    source: ['title', 'subtitle', 'titleaddon'],
    target: 'title',
    convert: Converters.TITLE
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
  {
    source: ['issuetitle', 'issuesubtitle', 'issuetitleaddon'],
    target: 'volume-title',
    convert: Converters.TITLE
  }
])
