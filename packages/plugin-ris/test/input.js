module.exports = {
  '@ris/record': {
    'BMC 001': [
      {
        TY: 'JOUR',
        AU: [
          'Trentini, Filippo',
          'Poletti, Piero',
          'Melegaro, Alessia',
          'Merler, Stefano'
        ],
        PY: '2019',
        DA: '2019/05/17',
        TI:
         'The introduction of ‘No jab, No school’ policy and the refinement of measles immunisation strategies in high-income countries',
        JO: 'BMC Medicine',
        SP: '86',
        VL: '17',
        IS: '1',
        AB:
         'In recent years, we witnessed a resurgence of measles even in countries where, according to WHO guidelines, elimination should have already been achieved. In high-income countries, the raise of anti-vaccination movements and parental vaccine hesitancy are posing major challenges for the achievement and maintenance of high coverage during routine programmes. Italy and France approved new regulations, respectively in 2017 and 2018, aimed at raising immunisation rates among children by introducing mandatory vaccination at school entry.',
        SN: '1741-7015',
        UR: 'https://doi.org/10.1186/s12916-019-1318-5',
        DO: '10.1186/s12916-019-1318-5',
        ID: 'Trentini2019'
      },
      [
        {
          type: 'article-journal',
          author: [
            { family: 'Trentini', given: 'Filippo' },
            { family: 'Poletti', given: 'Piero' },
            { family: 'Melegaro', given: 'Alessia' },
            { family: 'Merler', given: 'Stefano' }
          ],
          issued: { 'date-parts': [[2019, 5, 17]] },
          title: 'The introduction of ‘No jab, No school’ policy and the refinement of measles immunisation strategies in high-income countries',
          'container-title': 'BMC Medicine',
          page: '86',
          volume: '17',
          issue: '1',
          abstract: 'In recent years, we witnessed a resurgence of measles even in countries where, according to WHO guidelines, elimination should have already been achieved. In high-income countries, the raise of anti-vaccination movements and parental vaccine hesitancy are posing major challenges for the achievement and maintenance of high coverage during routine programmes. Italy and France approved new regulations, respectively in 2017 and 2018, aimed at raising immunisation rates among children by introducing mandatory vaccination at school entry.',
          ISSN: '1741-7015',
          URL: 'https://doi.org/10.1186/s12916-019-1318-5',
          DOI: '10.1186/s12916-019-1318-5',
          id: 'Trentini2019'
        }
      ]
    ],
    'BMC 002': [
      {
        TY: 'JOUR',
        AU: [
          'Trentini, Filippo',
          'Poletti, Piero',
          'Melegaro, Alessia',
          'Merler, Stefano'
        ],
        PY: '2019',
        DA: '2019/05/17',
        TI:
         'The introduction of ‘No jab, No school’ policy and the refinement of measles immunisation strategies in high-income countries',
        JO: 'BMC Medicine',
        SP: '86',
        VL: '17',
        IS: '1',
        AB:
         'In recent years, we witnessed a resurgence of measles even in countries where, according to WHO guidelines, elimination should have already been achieved. In high-income countries, the raise of anti-vaccination movements and parental vaccine hesitancy are posing major challenges for the achievement and maintenance of high coverage during routine programmes. Italy and France approved new regulations, respectively in 2017 and 2018, aimed at raising immunisation rates among children by introducing mandatory vaccination at school entry.',
        SN: '1741-7015',
        UR: 'https://doi.org/10.1186/s12916-019-1318-5',
        DO: 'doi: 10.1186/s12916-019-1318-5',
        ID: 'Trentini2019'
      },
      [
        {
          type: 'article-journal',
          author: [
            { family: 'Trentini', given: 'Filippo' },
            { family: 'Poletti', given: 'Piero' },
            { family: 'Melegaro', given: 'Alessia' },
            { family: 'Merler', given: 'Stefano' }
          ],
          issued: { 'date-parts': [[2019, 5, 17]] },
          title: 'The introduction of ‘No jab, No school’ policy and the refinement of measles immunisation strategies in high-income countries',
          'container-title': 'BMC Medicine',
          page: '86',
          volume: '17',
          issue: '1',
          abstract: 'In recent years, we witnessed a resurgence of measles even in countries where, according to WHO guidelines, elimination should have already been achieved. In high-income countries, the raise of anti-vaccination movements and parental vaccine hesitancy are posing major challenges for the achievement and maintenance of high coverage during routine programmes. Italy and France approved new regulations, respectively in 2017 and 2018, aimed at raising immunisation rates among children by introducing mandatory vaccination at school entry.',
          ISSN: '1741-7015',
          URL: 'https://doi.org/10.1186/s12916-019-1318-5',
          DOI: '10.1186/s12916-019-1318-5',
          id: 'Trentini2019'
        }
      ]
    ]
  },
  '@ris/file': {
    'EndNote-style delimiters': [
      `TY  - JOUR
AU  - Willighagen, Lars
TI  - RIS Plugin
AB  - This is a
multiline abstract
ER  -



TY  - EBOOK
DA  - 2019/09/18/
TI  - IDK
ER  -
`,
      [
        {
          type: 'article-journal',
          title: 'RIS Plugin',
          abstract: 'This is a multiline abstract',
          author: [{ family: 'Willighagen', given: 'Lars' }]
        },
        {
          type: 'book',
          title: 'IDK',
          accessed: { 'date-parts': [[2019, 9, 18]] }
        }
      ]
    ],
    '3+ values': [
      `TY  - JOUR
AU  - Doe, John
AU  - Doe, Jane
AU  - Doe, Robin
ER  -
`,
      [{
        type: 'article-journal',
        author: [
          { family: 'Doe', given: 'John' },
          { family: 'Doe', given: 'Jane' },
          { family: 'Doe', given: 'Robin' }
        ]
      }]
    ],
    'old spec': [
      `TY  - JOUR
A1  - Doe, John
ER  -
`,
      [{
        type: 'article-journal',
        author: [{ family: 'Doe', given: 'John' }]
      }]
    ],
    'ISSN/ISBN: ISSN': [
      `TY  - AGGR
SN  - 1234-567X
ER  -
`,
      [{
        type: 'dataset',
        ISSN: '1234-567X'
      }]
    ],
    'ISSN/ISBN: ISBN': [
      `TY  - AGGR
SN  - 978-1234567890
ER  -
`,
      [{
        type: 'dataset',
        ISBN: '978-1234567890'
      }]
    ],
    'name with suffix': [
      `TY  - JOUR
AU  - Doe, John, Jr.
ER  -
`,
      [{
        type: 'article-journal',
        author: [{ family: 'Doe', given: 'John', suffix: 'Jr.' }]
      }]
    ],
    'only family name': [
      `TY  - JOUR
AU  - Homerus
ER  -
`,
      [{
        type: 'article-journal',
        author: [{ family: 'Homerus' }]
      }]
    ],
    'literal name': [
      `TY  - JOUR
AU  - De Vlinderstichting
ER  -
`,
      [{
        type: 'article-journal',
        author: [{ literal: 'De Vlinderstichting' }]
      }]
    ],
    'https://github.com/larsgw/citation.js/issues/215': [
      `TY  - MGZN
TI  - New Health Center Targets County's Uninsured Patients
AU  - Brubaker, Bill
T2  - Washington Post
DA  - 2019/03//
PY  - 2019
VL  - 5
IS  - 2
SP  - 10
EP  - 12
UR  - washingtonpost.com`,
      [
        {
          author: [
            { family: 'Brubaker', given: 'Bill' }
          ],
          issued: { 'date-parts': [[2019, 3]] },
          page: '10-12',
          'container-title': 'Washington Post',
          title: "New Health Center Targets County's Uninsured Patients",
          type: 'article-magazine',
          URL: 'washingtonpost.com',
          volume: '5',
          issue: '2'
        }
      ]
    ],
    'https://github.com/larsgw/citation.js/issues/214': [
      `TY  - BOOK
TI  - The boy, the mole, the fox and the horse
AU  - Mackesy, Charlie
CN  - PN6737.M35 B69 2019
CY  - New York, NY
DA  - 2019
PY  - 2019
DP  - Library of Congress ISBN
ET  - First HarperOne hardcover
PB  - HarperOne
SN  - 978-0-06-297658-1
N1  - <p>"First published in 2019 by Ebury."</p>
KW  - Animals `,
      [
        {
          author: [{ family: 'Mackesy', given: 'Charlie' }],
          'call-number': 'PN6737.M35 B69 2019',
          issued: { 'date-parts': [[2019]] },
          edition: 'First HarperOne hardcover',
          keyword: 'Animals',
          note: '<p>"First published in 2019 by Ebury."</p>',
          publisher: 'HarperOne',
          'publisher-place': 'New York, NY',
          ISBN: '978-0-06-297658-1',
          title: 'The boy, the mole, the fox and the horse',
          type: 'book'
        }
      ]
    ]
  }
}
