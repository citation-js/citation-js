import CONVERTERS from '../converters.js'

export default [
  // Title and Reference Type Tags
  { source: 'TY', target: 'type' },
  { source: 'ID', target: 'id' },
  { source: ['T1', 'TI', 'CT'], target: 'title' },
  {
    source: 'BT',
    target: 'title',
    when: {
      source: {
        type: ['BOOK', 'UNPB'],
        T1: false,
        TI: false,
        CT: false
      },
      target: false
    }
  },
  {
    source: 'T2',
    target: 'container-title',
    when: {
      target: {
        type: ['bill', 'book', 'broadcast', 'chapter', 'dataset', 'entry',
          'entry-dictionary', 'entry-encyclopedia', 'figure', 'graphic',
          'interview', 'legal_case', 'legislation', 'manuscript', 'map',
          'motion_picture', 'musical_score', 'pamphlet', 'paper-conference',
          'patent', 'personal_communication', 'post', 'post-weblog', 'report',
          'review', 'review-book', 'song', 'speech', 'thesis', 'treaty', 'webpage']
      }
    }
  },
  {
    source: 'BT',
    target: 'container-title',
    when: {
      source: {
        type: ['ABST', 'ADVS', 'ART', 'BILL', 'CASE', 'CHAP', 'COMP', 'CONF',
          'CTLG', 'DATA', 'ELEC', 'GEN', 'HEAR', 'ICOMM', 'INPR', 'JFULL', 'JOUR',
          'MAP', 'MGZN', 'MPCT', 'MUSIC', 'NEWS', 'PAMP', 'PAT', 'PCOMM', 'RPRT',
          'SER', 'SLIDE', 'SOUND', 'STAT', 'THES', 'UNBILL', 'VIDEO'],
        T2: false
      },
      target: false
    }
  },
  { source: 'T3', target: 'collection-title' },

  // Authors
  { source: ['A1', 'AU'], target: 'author' },
  { source: ['A2', 'ED'], target: 'editor' },
  { source: 'A3', target: 'collection-editor' },

  // Year and Free Text Fields
  { source: ['Y1', 'PY'], target: 'issued' },
  {
    source: 'Y2',
    target: 'event-date',
    convert: CONVERTERS.DATE,
    when: { source: { type: ['CONF', 'CPAPER'] }, target: { type: ['paper-conference'] } }
  },
  {
    source: 'Y2',
    target: 'submitted',
    convert: CONVERTERS.DATE,
    when: { source: { type: ['PAT'] }, target: { type: 'patent' } }
  },
  { source: ['AB', 'N1'], target: 'note' },
  { source: 'N2', target: 'abstract' },

  // Keywords and Reprint Status
  { source: 'KW', target: 'keyword' },
  // RP - reprint edition

  // Periodical Tags
  {
    source: ['JF', 'JO'],
    target: 'container-title',
    convert: CONVERTERS.ANY,
    when: { target: { type: ['article', 'article-journal', 'article-magazine', 'article-newspaper'] } }
  },
  { source: ['JA', 'J1', 'J2'], target: 'container-title-short' },

  // Periodical and Publisher Tags
  { source: 'VL', target: 'volume' },
  { source: ['IS', 'CP'], target: 'issue' },
  { source: 'SP', target: 'page-first' },
  {
    source: ['SP', 'EP'],
    target: 'page',
    convert: CONVERTERS.PAGE,
    when: { source: { SP: true, EP: true } }
  },
  // Technically place of publication, not location of publisher
  { source: 'CY', target: 'publisher-place' },
  { source: 'PB', target: 'publisher' },
  { source: 'SN', target: ['ISSN', 'ISBN'] },

  // Misc. Tags
  { source: 'AV', target: 'archive_location' },
  // M1-3, U1-6
  { source: 'UR', target: 'URL' }
  // L1-4
]
