const simple = require('./Q21972834.json')
const author = require('./Q27795847.json')

let opts = {
  callback: ([data]) => data.replace(/[&?]origin=\*/, ''),
  link: true
}

module.exports = {
  '@wikidata/id': {
    'simple': [
      'Q21972834',
      ['https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q21972834&format=json&languages=en'],
      opts
    ]
  },
  '@wikidata/list+text': {
    'spaces': [
      'Q21972834 Q27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ],
    'newlines': [
      'Q21972834\nQ27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ],
    'commas': [
      'Q21972834,Q27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ]
  },
  '@wikidata/url': {
    simple: ['https://www.wikidata.org/wiki/Q21972834', 'Q21972834', {link: true}]
  },
  '@wikidata/object': {
    'no linked authors': [
      simple,
      [
        {
          _wikiId: 'Q21972834',
          id: 'Q21972834',
          type: 'article-journal',
          title: 'Assembling the 20 Gb white spruce (Picea glauca) genome from whole-genome shotgun sequencing data',
          volume: '29',
          issue: '12',
          issued: {
            'date-parts': [
              [
                2013,
                6,
                15
              ]
            ]
          },
          page: '1492-7',
          'container-title': 'Bioinformatics',
          PMID: '23698863',
          PMCID: '3673215',
          DOI: '10.1093/BIOINFORMATICS/BTT178',
          author: [
            {
              given: 'Inanc',
              family: 'Birol',
              _ordinal: 1
            },
            {
              given: 'Anthony',
              family: 'Raymond',
              _ordinal: 2
            },
            {
              given: 'Shaun D',
              family: 'Jackman',
              _ordinal: 3
            },
            {
              given: 'Stephen',
              family: 'Pleasance',
              _ordinal: 4
            },
            {
              given: 'Robin',
              family: 'Coope',
              _ordinal: 5
            },
            {
              given: 'Greg A',
              family: 'Taylor',
              _ordinal: 6
            },
            {
              given: 'Macaire Man Saint',
              family: 'Yuen',
              _ordinal: 7
            },
            {
              given: 'Christopher I',
              family: 'Keeling',
              _ordinal: 8
            },
            {
              given: 'Dana',
              family: 'Brand',
              _ordinal: 9
            },
            {
              given: 'Benjamin P',
              family: 'Vandervalk',
              _ordinal: 10
            },
            {
              given: 'Heather',
              family: 'Kirk',
              _ordinal: 11
            },
            {
              given: 'Pawan',
              family: 'Pandoh',
              _ordinal: 12
            },
            {
              given: 'Richard A',
              family: 'Moore',
              _ordinal: 13
            },
            {
              given: 'Yongjun',
              family: 'Zhao',
              _ordinal: 14
            },
            {
              given: 'Andrew J',
              family: 'Mungall',
              _ordinal: 15
            },
            {
              given: 'Barry',
              family: 'Jaquish',
              _ordinal: 16
            },
            {
              given: 'Alvin',
              family: 'Yanchuk',
              _ordinal: 17
            },
            {
              given: 'Carol',
              family: 'Ritland',
              _ordinal: 18
            },
            {
              given: 'Brian',
              family: 'Boyle',
              _ordinal: 19
            },
            {
              given: 'Jean',
              family: 'Bousquet',
              _ordinal: 20
            },
            {
              given: 'Kermit',
              family: 'Ritland',
              _ordinal: 21
            },
            {
              given: 'John',
              family: 'Mackay',
              _ordinal: 22
            },
            {
              given: 'Jörg',
              family: 'Bohlmann',
              _ordinal: 23
            },
            {
              given: 'Steven J M',
              family: 'Jones',
              _ordinal: 24
            }
          ]
        }
      ]
    ],
    'linked authors': [
      author,
      [
        {
          _wikiId: 'Q27795847',
          id: 'Q27795847',
          type: 'article-journal',
          issued: {
            'date-parts': [
              [
                2016,
                11,
                8
              ]
            ]
          },
          title: 'SPLASH, a hashed identifier for mass spectra',
          volume: '34',
          page: '1099–1101',
          'number-of-pages': 3,
          'container-title': 'Nature Biotechnology',
          URL: 'http://rdcu.be/msZj',
          PMID: '27824832',
          DOI: '10.1038/NBT.3689',
          author: [
            {
              given: 'Gert',
              family: 'Wohlgemuth',
              _ordinal: 1
            },
            {
              given: 'Sajjan S',
              family: 'Mehta',
              _ordinal: 2
            },
            {
              given: 'Ramon F',
              family: 'Mejia',
              _ordinal: 3
            },
            {
              given: 'Steffen',
              family: 'Neumann',
              _ordinal: 4
            },
            {
              given: 'Diego',
              family: 'Pedrosa',
              _ordinal: 5
            },
            {
              given: 'Tomáš',
              family: 'Pluskal',
              _ordinal: 6
            },
            {
              given: 'Emma',
              family: 'Schymanski',
              _ordinal: 7
            },
            {
              given: 'Egon L',
              family: 'Willighagen',
              _ordinal: 8
            },
            {
              given: 'Michael',
              family: 'Wilson',
              _ordinal: 9
            },
            {
              given: 'David S',
              family: 'Wishart',
              _ordinal: 10
            },
            {
              given: 'Masanori',
              family: 'Arita',
              _ordinal: 11
            },
            {
              given: 'Pieter C',
              family: 'Dorrestein',
              _ordinal: 12
            },
            {
              given: 'Nuno',
              family: 'Bandeira',
              _ordinal: 13
            },
            {
              given: 'Mingxun',
              family: 'Wang',
              _ordinal: 14
            },
            {
              given: 'Tobias',
              family: 'Schulze',
              _ordinal: 15
            },
            {
              given: 'Reza M',
              family: 'Salek',
              _ordinal: 16
            },
            {
              given: 'Christoph',
              family: 'Steinbeck',
              _ordinal: 17
            },
            {
              given: 'Venkata Chandrasekhar',
              family: 'Nainala',
              _ordinal: 18
            },
            {
              given: 'Robert',
              family: 'Mistrik',
              _ordinal: 19
            },
            {
              given: 'Takaaki',
              family: 'Nishioka',
              _ordinal: 20
            },
            {
              given: 'Oliver',
              family: 'Fiehn',
              _ordinal: 21
            }
          ]
        }
      ]
    ]
  }
}
