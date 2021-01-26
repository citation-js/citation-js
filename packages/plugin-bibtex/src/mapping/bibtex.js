import { util } from '@citation-js/core'
import { format as formatDate } from '@citation-js/date'
import types from './bibtexTypes'
import {
  TYPE,
  LABEL,
  Converters
} from './shared'

export default new util.Translator([
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
    source: 'annote',
    target: 'annote'
  },
  {
    source: 'address',
    target: 'publisher-place',
    convert: Converters.PICK
  },
  {
    source: 'author',
    target: 'author',
    convert: Converters.NAMES
  },
  {
    source: 'chapter',
    target: 'chapter-number'
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
    source: 'booktitle',
    target: 'container-title',
    when: {
      target: {
        type: ['chapter', 'paper-conference']
      }
    }
  },
  {
    source: 'journal',
    target: 'container-title',
    when: {
      source: {
        [TYPE]: 'article'
      },
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
    source: 'edition',
    target: 'edition'
  },
  {
    source: 'editor',
    target: 'editor',
    convert: Converters.NAMES
  },
  {
    source: LABEL,
    target: ['id', 'citation-label', 'author', 'issued', 'year-suffix', 'title'],
    convert: Converters.LABEL
  },
  {
    source: 'number',
    target: 'issue',
    when: {
      source: {
        [TYPE]: ['article', 'periodical', 'inproceedings']
      },
      target: {
        issue (issue) {
          return typeof issue === 'number' ||
            (typeof issue === 'string' && issue.match(/\d+/))
        },
        type: [
          'article',
          'article-journal',
          'article-newspaper',
          'article-magazine',
          'paper-conference'
        ]
      }
    }
  },
  {
    source: ['year', 'month'],
    target: 'issued',
    convert: Converters.YEAR_MONTH
  },
  {
    source: 'note',
    target: 'note'
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
    source: 'pages',
    target: 'page',
    convert: {
      // TODO: multiple ranges
      toTarget (text) { return text.replace(/[–—]/, '-') },
      toSource (text) { return text.replace('-', '--') }
    }
  },
  {
    source: 'publisher',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      target: {
        // All except manuscript, paper-conference, techreport and thesis
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
          'map',
          'motion_picture',
          'musical_score',
          'pamphlet',
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
          'treaty',
          'webpage'
        ]
      }
    }
  },
  {
    source: 'organization',
    target: 'publisher',
    convert: Converters.PICK,
    when: {
      source: { publisher: false },
      target: { type: 'paper-conference' }
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
      target: { type: 'report' }
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
      target: { type: 'thesis' }
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
        institution: false,
        school: false
      },
      target: {
        type: 'manuscript'
      }
    }
  },
  {
    source: 'title',
    target: 'title'
  },
  {
    source: [TYPE, 'type'],
    target: ['type', 'genre'],
    convert: {
      toTarget (sourceType, subType) {
        const type = types.source[sourceType] || 'book'

        if (type === 'mastersthesis') {
          return [type, 'Master\'s thesis']
        } else if (type === 'phdthesis') {
          return [type, 'PhD thesis']
        } else {
          return [type, subType]
        }
      },
      toSource (targetType, genre) {
        const type = types.target[targetType] || 'misc'

        if (/^(master'?s|diploma) thesis$/i.test(genre)) {
          return ['mastersthesis']
        } else if (/^(phd|doctoral) thesis$/i.test(genre)) {
          return ['phdthesis']
        } else {
          return [type, genre]
        }
      }
    }
  },
  {
    source: TYPE,
    when: {
      target: { type: false }
    },
    convert: {
      toSource () { return 'misc' }
    }
  },
  {
    source: 'howpublished',
    target: 'URL',
    convert: Converters.HOW_PUBLISHED,
    when: { target: false }
  },
  {
    source: 'volume',
    target: 'volume'
  }
])
