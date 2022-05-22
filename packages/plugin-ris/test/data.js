const simple = [
  {
    id: 'Q23571040',
    type: 'article-journal',
    title: 'Correlation of the Base Strengths of Amines 1',
    DOI: '10.1021/ja01577a030',
    author: [
      {
        given: 'H. K.',
        family: 'Hall'
      }
    ],
    issued: { 'date-parts': [[1957, 1, 1]] },
    'container-title': 'Journal of the American Chemical Society',
    volume: '79',
    issue: '20',
    page: '5441-5444'
  }
]

const editor = [
  {
    id: 'Q37108228',
    'year-suffix': 'a',
    DOI: '10.1109/MIS.2013.119',
    type: 'article-journal',
    title: 'The Rise of Wikidata',
    issue: '4',
    page: '90-95',
    volume: '28',
    issued: {
      'date-parts': [
        [
          2013,
          1,
          1
        ]
      ]
    },
    accessed: {
      'date-parts': [
        [
          2018,
          7,
          21
        ]
      ]
    },
    'number-of-pages': '6',
    editor: [
      {
        given: 'James',
        family: 'Hendler',
        _ordinal: -1
      },
      {
        given: 'Elena',
        family: 'Simperl',
        _ordinal: -1
      }
    ],
    'container-title': 'IEEE Intelligent Systems',
    author: [
      {
        given: 'Denny',
        family: 'Vrandečić',
        _ordinal: 1
      }
    ]
  }
]

module.exports = {
  ris: {
    simple: [
      simple,
      `TY  - JOUR
AU  - Hall, H. K.
DA  - 1957/1/1/
DO  - 10.1021/ja01577a030
ID  - Q23571040
IS  - 20
SP  - 5441-5444
T2  - Journal of the American Chemical Society
TI  - Correlation of the Base Strengths of Amines 1
VL  - 79
ER  -`
    ],
    editor: [
      editor,
      [{
        TY: 'JOUR',
        AU: [
          'Vrandečić, Denny'
        ],
        DA: '2013/1/1/',
        Y2: '2018/7/21/',
        DO: '10.1109/MIS.2013.119',
        IS: '4',
        SP: '90-95',
        T2: 'IEEE Intelligent Systems',
        TI: 'The Rise of Wikidata',
        VL: '28',
        ID: 'Q37108228'
      }],
      { format: 'object' }
    ],
    object: [
      simple,
      [{
        TY: 'JOUR',
        AU: ['Hall, H. K.'],
        DA: '1957/1/1/',
        DO: '10.1021/ja01577a030',
        IS: '20',
        SP: '5441-5444',
        T2: 'Journal of the American Chemical Society',
        TI: 'Correlation of the Base Strengths of Amines 1',
        VL: '79',
        ID: 'Q23571040'
      }],
      { format: 'object' }
    ],
    literal: [
      [{
        type: 'webpage',
        title: 'CDLI Lexical 000002, ex. 065 artifact entry',
        author: [
          { literal: 'Cuneiform Digital Library Iniative (CDLI)' }
        ],
        issued: { 'date-parts': [[2017, 9, 4]] },
        accessed: { 'date-parts': [[2020, 6, 27]] },
        abstract: ' 1N01 , ... \n 1N01 , ABGAL \n 1N01 , KINGAL \n 1N01 , ... \n 1N01 , GAL~a UMUN2 \n 1N01 , GAL~a UMUN2 KU3~a \n 1N01 , DUB~a SANGA~a \n 1N01 , SUG5 SAG \n 1N01 , UB SAG \n N , ... ',
        id: 'P000001',
        number: 'P000001',
        URL: 'https://cdli.ucla.edu/P000001',
        language: 'undetermined'
      }],
      [{
        AB: ' 1N01 , ... \n 1N01 , ABGAL \n 1N01 , KINGAL \n 1N01 , ... \n 1N01 , GAL~a UMUN2 \n 1N01 , GAL~a UMUN2 KU3~a \n 1N01 , DUB~a SANGA~a \n 1N01 , SUG5 SAG \n 1N01 , UB SAG \n N , ... ',
        AU: ['Cuneiform Digital Library Iniative (CDLI)'],
        DA: '2017/9/4/',
        ID: 'P000001',
        LA: 'undetermined',
        M1: '2020/6/27/',
        TI: 'CDLI Lexical 000002, ex. 065 artifact entry',
        TY: 'ELEC',
        UR: 'https://cdli.ucla.edu/P000001'
      }],
      { format: 'object' }
    ],
    'old specification': [
      [{
        type: 'webpage',
        title: 'CDLI Lexical 000002, ex. 065 artifact entry',
        author: [
          { literal: 'Cuneiform Digital Library Iniative (CDLI)' }
        ],
        issued: { 'date-parts': [[2017, 9, 4]] },
        accessed: { 'date-parts': [[2020, 6, 27]] },
        abstract: ' 1N01 , ... \n 1N01 , ABGAL \n 1N01 , KINGAL \n 1N01 , ... \n 1N01 , GAL~a UMUN2 \n 1N01 , GAL~a UMUN2 KU3~a \n 1N01 , DUB~a SANGA~a \n 1N01 , SUG5 SAG \n 1N01 , UB SAG \n N , ... ',
        id: 'P000001',
        number: 'P000001',
        URL: 'https://cdli.ucla.edu/P000001',
        language: 'undetermined'
      }],
      [{
        A1: ['Cuneiform Digital Library Iniative (CDLI)'],
        ID: 'P000001',
        N2: ' 1N01 , ... \n 1N01 , ABGAL \n 1N01 , KINGAL \n 1N01 , ... \n 1N01 , GAL~a UMUN2 \n 1N01 , GAL~a UMUN2 KU3~a \n 1N01 , DUB~a SANGA~a \n 1N01 , SUG5 SAG \n 1N01 , UB SAG \n N , ... ',
        T1: 'CDLI Lexical 000002, ex. 065 artifact entry',
        TY: 'ELEC',
        UR: 'https://cdli.ucla.edu/P000001',
        Y1: '2017/9/4/'
      }],
      { format: 'object', spec: 'old' }
    ],
    'ISSN/ISBN': [
      [{
        type: 'treaty',
        ISBN: '978-1234567890'
      }],
      [{
        TY: 'GEN',
        SN: '978-1234567890'
      }],
      { format: 'object' }
    ],
    keywords: [
      [{
        type: 'article-journal',
        keyword: 'red,blue'
      }],
      [{
        TY: 'JOUR',
        KW: ['red', 'blue']
      }],
      { format: 'object' }
    ],
    'date with season': [
      [{
        type: 'article-journal',
        issued: { 'date-parts': [[2022]], season: 'Summer' }
      }],
      [{
        TY: 'JOUR',
        DA: '2022///Summer'
      }],
      { format: 'object' }
    ]
  }
}
