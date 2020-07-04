const opts = {
  callback: ([data]) => data.replace(/[&?]origin=\*/, ''),
  link: true
}

module.exports = {
  '@wikidata/id': {
    simple: [
      'Q21972834',
      ['https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q21972834&format=json&languages=en'],
      opts
    ],
    'no linked authors': [
      'Q21972834',
      [
        {
          _wikiId: 'Q21972834',
          id: 'Q21972834',
          source: 'Wikidata',
          type: 'article-journal',
          title: 'Assembling the 20 Gb white spruce (Picea glauca) genome from whole-genome shotgun sequencing data',
          volume: '29',
          issue: '12',
          issued: {
            'date-parts': [[2013, 6, 15]]
          },
          page: '1492-7',
          'container-title': 'Bioinformatics',
          'container-title-short': 'Bioinformatics',
          journalAbbreviation: 'Bioinformatics',
          keyword: 'Picea glauca,Shotgun sequencing',
          language: 'en',
          PMID: '23698863',
          PMCID: '3673215',
          DOI: '10.1093/BIOINFORMATICS/BTT178',
          ISSN: '1367-4803',
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
      'Q27795847',
      [
        {
          _wikiId: 'Q27795847',
          id: 'Q27795847',
          source: 'Wikidata',
          type: 'article-journal',
          issued: {
            'date-parts': [[2016, 11, 1]]
          },
          title: 'SPLASH, a hashed identifier for mass spectra',
          keyword: 'metabolomics',
          volume: '34',
          issue: '11',
          page: '1099-1101',
          'number-of-pages': 3,
          'container-title': 'Nature Biotechnology',
          URL: 'http://rdcu.be/msZj',
          PMID: '27824832',
          PMCID: '5515539',
          DOI: '10.1038/NBT.3689',
          ISSN: '1087-0156',
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
              given: 'Reza M.',
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
    ],
    'missing title': [
      'Q1',
      [
        {
          _wikiId: 'Q1',
          id: 'Q1',
          source: 'Wikidata',
          title: 'Universe',
          type: 'book'
        }
      ]
    ],
    'imprecise date': [
      'Q23571040',
      [
        {
          _wikiId: 'Q23571040',
          id: 'Q23571040',
          source: 'Wikidata',
          title: 'Correlation of the Base Strengths of Amines 1',
          author: [{
            _ordinal: 1,
            given: 'H. K.',
            family: 'Hall'
          }],
          issued: {
            'date-parts': [[1957, 10]]
          },
          volume: '79',
          issue: '20',
          page: '5441-5444',
          DOI: '10.1021/JA01577A030',
          ISSN: '0002-7863',
          'container-title': 'Journal of the American Chemical Society',
          'container-title-short': 'J Am Chem Soc',
          journalAbbreviation: 'J Am Chem Soc',
          keyword: 'catalysis',
          language: 'en',
          type: 'article-journal'
        }
      ]
    ],
    chapter: [
      'Q7878315',
      [
        {
          _wikiId: 'Q7878315',
          id: 'Q7878315',
          source: 'Wikidata',
          type: 'chapter',
          title: 'Ukifune',
          language: 'ja',
          'container-title': '源氏物語',
          'container-author': [{
            _ordinal: -1,
            given: 'Murasaki',
            family: 'Shikibu'
          }]
        }
      ]
    ],
    review: [
      'Q50237325',
      [
        {
          _wikiId: 'Q50237325',
          id: 'Q50237325',
          type: 'review',
          source: 'Wikidata',
          title: 'Deadly medicines and organised crime: How big pharma has corrupted healthcare.',
          'reviewed-title': 'Deadly Medicines and Organised Crime',
          'reviewed-author': [{
            _ordinal: -1,
            given: 'Peter C.',
            family: 'Gøtzsche'
          }],
          author: [{
            _ordinal: 1,
            // author name string is 'Dickinson J', the name parser expects
            // at least a comma if the name is reversed like that.
            given: 'Dickinson',
            family: 'J'
          }],
          issued: {
            'date-parts': [[2014, 4, 1]]
          },
          'container-title': 'Canadian Family Physician',
          'container-title-short': 'Can. Fam. Physician',
          journalAbbreviation: 'Can. Fam. Physician',
          ISSN: '0008-350X',
          volume: '60',
          page: '367-368',
          issue: '4',
          PMCID: '4046551'
        }
      ]
    ],
    'book in series': [
      'Q43361',
      [
        {
          _wikiId: 'Q43361',
          id: 'Q43361',
          type: 'book',
          source: 'Wikidata',
          title: 'Harry Potter and the Philosopher\'s Stone',
          author: [{
            _ordinal: -1,
            given: 'J. K.',
            family: 'Rowling'
          }],
          issued: {
            'date-parts': [[1997, 6, 30]]
          },
          'collection-title': 'Harry Potter',
          'collection-number': 1,
          'number-of-volumes': 7,
          language: 'en',
          publisher: 'Bloomsbury Publishing',
          'publisher-place': 'London, UK',
          ISBN: '978-0-7675-3830-5'
        }
      ]
    ],
    event: [
      'Q63862629',
      [
        {
          _wikiId: 'Q63862629',
          id: 'Q63862629',
          type: 'paper-conference',
          source: 'Wikidata',
          title: 'Citation Needed: A Taxonomy and Algorithmic Assessment of Wikipedia\'s Verifiability',
          author: [{
            _ordinal: 1,
            given: 'Miriam',
            family: 'Redi'
          }, {
            _ordinal: 2,
            given: 'Besnik',
            family: 'Fetahu'
          }, {
            _ordinal: 3,
            given: 'Jonathan',
            family: 'Morgan'
          }, {
            _ordinal: 4,
            given: 'Dario',
            family: 'Taraborelli'
          }],
          issued: {
            'date-parts': [[2019]]
          },
          keyword: 'Wikipedia',
          page: '1567-1578',
          DOI: '10.1145/3308558.3313618',
          'container-title': 'Proceedings of the 2019 World Wide Web Conference on World Wide Web',
          'container-title-short': 'WWW 2019',
          journalAbbreviation: 'WWW 2019',
          event: 'The Web Conference 2019',
          'event-date': {
            'date-parts': [
              [2019, 5, 13],
              [2019, 5, 18]
            ]
          },
          'event-place': 'Hyatt Regency San Francisco, USA'
        }
      ]
    ],
    letter: [
      'Q7017193',
      [
        {
          _wikiId: 'Q7017193',
          id: 'Q7017193',
          type: 'personal_communication',
          source: 'Wikidata',
          title: 'Newburgh letter',
          author: [{
            _ordinal: -1,
            given: 'Lewis',
            family: 'Nicola'
          }],
          recipient: [{
            _ordinal: -1,
            given: 'George',
            family: 'Washington'
          }]
        }
      ]
    ],
    map: [
      'Q61642258',
      [
        {
          _wikiId: 'Q61642258',
          id: 'Q61642258',
          type: 'map',
          source: 'Wikidata',
          title: 'The Pattern of World Agriculture',
          author: [{
            _ordinal: -1,
            given: 'Erwin',
            family: 'Raisz'
          }, {
            _ordinal: -1,
            given: 'Derwent',
            family: 'Whittlesey'
          }],
          publisher: 'Harvard University',
          'publisher-place': 'Cambridge, USA',
          issued: { 'date-parts': [[1941]] },
          medium: 'paper',
          scale: 60000000,
          URL: 'http://id.lib.harvard.edu/alma/990037196110203941/catalog'
        }
      ]
    ],
    edition: [
      'Q51615345',
      [
        {
          _wikiId: 'Q51615345',
          id: 'Q51615345',
          type: 'book',
          source: 'Wikidata',
          title: 'Gitanjali',
          author: [{
            _ordinal: -1,
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          translator: [{
            _ordinal: -1,
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          language: 'en',
          issued: { 'date-parts': [[1913]] },
          publisher: 'Macmillan Publishers',
          'publisher-place': 'London, UK',
          'original-title': 'গীতাঞ্জলি',
          'original-author': [{
            _ordinal: -1,
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          'original-date': { 'date-parts': [[1910]] },
          'original-publisher': 'Macmillan Publishers',
          'original-publisher-place': 'London, UK'
        }
      ]
    ]
  },
  '@wikidata/list+text': {
    spaces: [
      'Q21972834 Q27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ],
    newlines: [
      'Q21972834\nQ27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ],
    commas: [
      'Q21972834,Q27795847',
      ['Q21972834', 'Q27795847'],
      opts
    ]
  },
  '@wikidata/url': {
    simple: ['https://www.wikidata.org/wiki/Q21972834', 'Q21972834', { link: true }]
  }
}
