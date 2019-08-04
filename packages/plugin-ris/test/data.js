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
    ]
  }
}
