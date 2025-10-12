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
    ],
    'https://github.com/citation-js/citation-js/issues/213': [
      `TY  - JOUR
AU  - Greco, Angela
PY  - 2021
ID  - cdlj-2021-2
IS  - 2
J2  - CDLJ
SN  - 1540-8779
T2  - Cuneiform Digital Library Journal
TI  - An Archive of Pasture Plots from Ur-III Ĝirsu
UR  - https://cdli.mpiwg-berlin.mpg.de/articles/cdlj/2021-2
VL  - 2021
Y2  - 2023/11/1/
ER  - `,
      [
        {
          accessed: { 'date-parts': [[2023, 11, 1]] },
          author: [{ family: 'Greco', given: 'Angela' }],
          'container-title': 'Cuneiform Digital Library Journal',
          'container-title-short': 'CDLJ',
          id: 'cdlj-2021-2',
          ISSN: '1540-8779',
          issue: '2',
          issued: { 'date-parts': [[2021]] },
          title: 'An Archive of Pasture Plots from Ur-III Ĝirsu',
          type: 'article-journal',
          URL: 'https://cdli.mpiwg-berlin.mpg.de/articles/cdlj/2021-2',
          volume: '2021'
        }
      ]
    ],
    'https://github.com/citation-js/citation-js/issues/213-2': [
      `TY  - COMP
AU  - Willighagen, Lars
DO  - 10.5281/zenodo.10037162
ET  - 0.5.0
PY  - 2023
TI  - Formica
UR  - https://github.com/identification-resources/formica/tree/v0.5.0
ER  - `,
      [
        {
          author: [{ family: 'Willighagen', given: 'Lars' }],
          DOI: '10.5281/zenodo.10037162',
          issued: { 'date-parts': [[2023]] },
          title: 'Formica',
          type: 'software',
          URL: 'https://github.com/identification-resources/formica/tree/v0.5.0',
          version: '0.5.0'
        }
      ]
    ],
    'https://github.com/citation-js/citation-js/issues/213-3': [
      `TY  - COMP
AU  - Willighagen, Lars
DO  - 10.5281/zenodo.10037162
ET  - 0.5.0
PY  - 2023-10-24
TI  - Formica
UR  - https://github.com/identification-resources/formica/tree/v0.5.0
ER  - `,
      [
        {
          author: [{ family: 'Willighagen', given: 'Lars' }],
          DOI: '10.5281/zenodo.10037162',
          issued: { raw: '2023-10-24' },
          title: 'Formica',
          type: 'software',
          URL: 'https://github.com/identification-resources/formica/tree/v0.5.0',
          version: '0.5.0'
        }
      ]
    ],
    'https://github.com/citation-js/citation-js/pull/248-1': [
      `MIME type 'application/xresearch-info-systems'


Provider:   OEB

TY  - Chap
DB  - OEB
TI  - Like cats and cows.
TT  -
ID  - OEB 205629
N1  - OEB 205629
DO  -
ET  -
IS  -
PB  -
PP  -
CY  -
PY  - 2013
SP  - 3-5
UR  -
VL  -
AU  - Allen, James P.
T2  - Decorum and experience: essays in ancient culture for John Baines
PB  - Griffith Institute
PP  - Oxford
CY  - Oxford
SN  - 9780900416927
ET  -
IS  -
A2  - McDonald, Angela
A2  - Roberts, R. Gareth
A2  - Frood, Elizabeth
ER  -
`,
      [
        {
          type: 'chapter',
          source: 'OEB',
          title: 'Like cats and cows.',
          id: 'OEB 205629',
          note: 'OEB 205629',
          issued: { 'date-parts': [[2013]] },
          page: '3-5',
          author: [{ given: 'James P.', family: 'Allen' }],
          'container-title': 'Decorum and experience: essays in ancient culture for John Baines',
          publisher: 'Griffith Institute',
          'publisher-place': 'Oxford',
          ISBN: '9780900416927',
          editor: [
            { family: 'McDonald', given: 'Angela' },
            { family: 'Roberts', given: 'R. Gareth' },
            { family: 'Frood', given: 'Elizabeth' }
          ]
        }
      ]
    ],
    'https://github.com/citation-js/citation-js/pull/248-2': [
      ` MIME type 'application/xresearch-info-systems'


Provider:   OEB

TY  - Journ
TI  - The gneiss sphinx of Sesostris III: counterpart and provenance
ST  - The gneiss sphinx of Sesostris III
TT  -
ID  - OEB 30135
N1  - OEB 30135
DO  -
ET  -
NV  -
PB  -
PP  -
CY  -
PY  - 1984 - 1985
SP  - 11-16
UR  - http://www.jstor.org/stable/pdfplus/1512808.pdf
VL  -
AU  - Habachi, Labib
PB  -
PP  -
CY  -
IS  -
VL  - 19-20
JO  - Metropolitan Museum Journal
T2  - Metropolitan Museum Journal
KW  - Karnak
KW  - Karnak Magazine
KW  - New York, Metropolitan Museum of Art
KW  - New York, Metropolitan Museum of Art 17.9.2
KW  - royal sculpture MK
KW  - Senwosret III
KW  - sphinx
KW  - text
ER  -
`,
      [
        {
          type: 'article-journal',
          title: 'The gneiss sphinx of Sesostris III: counterpart and provenance',
          'title-short': 'The gneiss sphinx of Sesostris III',
          id: 'OEB 30135',
          note: 'OEB 30135',
          issued: { 'date-parts': [[1984], [1985]] },
          page: '11-16',
          URL: 'http://www.jstor.org/stable/pdfplus/1512808.pdf',
          author: [{ family: 'Habachi', given: 'Labib' }],
          volume: '19-20',
          'container-title': 'Metropolitan Museum Journal',
          keyword: 'Karnak,Karnak Magazine,New York, Metropolitan Museum of Art,New York, Metropolitan Museum of Art 17.9.2,royal sculpture MK,Senwosret III,sphinx,text'
        }
      ]
    ]
  }
}
