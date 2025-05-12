const opts = {
  callback: ([data]) => data.replace(/[&?]origin=\*/, ''),
  link: true
}

module.exports = {
  '@wikidata/id': {
    simple: [
      'Q21972834',
      ['https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q21972834&format=json&languages=en%7Cmul'],
      opts
    ],
    'no linked authors': [
      'Q21972834',
      [
        {
          custom: { QID: 'Q21972834' },
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
          custom: { QID: 'Q27795847' },
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
              given: 'Emma L.',
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
              given: 'David',
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
          custom: { QID: 'Q1' },
          id: 'Q1',
          source: 'Wikidata',
          title: 'Universe',
          type: 'document'
        }
      ]
    ],
    'imprecise date': [
      'Q23571040',
      [
        {
          custom: { QID: 'Q23571040' },
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
          custom: { QID: 'Q7878315' },
          id: 'Q7878315',
          source: 'Wikidata',
          type: 'chapter',
          title: 'Ukifune',
          language: 'ja',
          'container-title': '源氏物語',
          'container-author': [{
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
          custom: { QID: 'Q50237325' },
          id: 'Q50237325',
          type: 'review',
          source: 'Wikidata',
          title: 'Deadly medicines and organised crime: How big pharma has corrupted healthcare.',
          'reviewed-title': 'Deadly Medicines and Organised Crime',
          'reviewed-author': [{
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
          language: 'en',
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
          custom: { QID: 'Q43361' },
          id: 'Q43361',
          type: 'book',
          source: 'Wikidata',
          title: 'Harry Potter and the Philosopher\'s Stone',
          author: [{
            given: 'J. K.',
            family: 'Rowling'
          }],
          illustrator: [{
            given: 'Thomas',
            family: 'Taylor'
          }],
          issued: {
            'date-parts': [[1997, 6, 26]]
          },
          'collection-title': 'Harry Potter',
          'collection-number': 1,
          keyword: 'magician,philosopher\'s stone',
          'number-of-volumes': 8,
          'number-of-pages': 240,
          language: 'en',
          publisher: 'Bloomsbury Publishing',
          'publisher-place': 'London, UK'
        }
      ]
    ],
    event: [
      'Q63862629',
      [
        {
          custom: { QID: 'Q63862629' },
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
          language: 'en',
          'number-of-pages': 12,
          page: '1567-1578',
          DOI: '10.1145/3308558.3313618',
          'container-title': 'Proceedings of the 2019 World Wide Web Conference on World Wide Web',
          'container-title-short': 'WWW 2019',
          journalAbbreviation: 'WWW 2019',
          'event-title': 'The Web Conference 2019',
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
          custom: { QID: 'Q7017193' },
          id: 'Q7017193',
          type: 'personal_communication',
          source: 'Wikidata',
          title: 'Newburgh letter',
          author: [{
            given: 'Lewis',
            family: 'Nicola'
          }],
          recipient: [{
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
          custom: { QID: 'Q61642258' },
          id: 'Q61642258',
          type: 'map',
          source: 'Wikidata',
          title: 'The Pattern of World Agriculture',
          author: [{
            given: 'Erwin',
            family: 'Raisz'
          }, {
            given: 'Derwent',
            family: 'Whittlesey'
          }],
          publisher: 'Harvard University',
          'publisher-place': 'Cambridge, USA',
          issued: { 'date-parts': [[1941]] },
          medium: 'paper',
          scale: 60000000
        }
      ]
    ],
    edition: [
      'Q51615345',
      [
        {
          custom: { QID: 'Q51615345' },
          id: 'Q51615345',
          type: 'book',
          source: 'Wikidata',
          title: 'Gitanjali',
          author: [{
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          translator: [{
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          keyword: 'Gitanjali',
          language: 'en',
          issued: { 'date-parts': [[1913]] },
          publisher: 'Macmillan Publishers',
          'publisher-place': 'London, UK',
          // 'original-title': 'গীতাঞ্জলি',
          'original-author': [{
            given: 'Rabindranath',
            family: 'Tagore'
          }],
          'original-date': { 'date-parts': [[1912]] }
        }
      ]
    ],
    software_developer: [
      'Q1659584',
      [{
        id: 'Q1659584',
        custom: {
          FramalibreID: 'imagej',
          QID: 'Q1659584',
          RRID: 'RRID:SCR_003070',
          SW_MATHID: '12531',
          versions: [
            {
              issued: { 'date-parts': [[2022, 8, 24]] },
              version: '1.53t'
            }
          ]
        },
        author: [{ family: 'Rasband', given: 'Wayne' }],
        issued: { 'date-parts': [[2022, 8, 24]] },
        source: 'Wikidata',
        type: 'software',
        version: '1.53t',
        URL: 'https://imagej.nih.gov/ij/',
        title: 'ImageJ'
      }]
    ],
    'no_value author': [
      'Q124174815',
      [{
        DOI: '10.1016/S0140-6736(02)96066-6',
        ISSN: '0140-6736',
        URL: 'https://ia800708.us.archive.org/view_archive.php?archive=/22/items/crossref-pre-1909-scholarly-works/10.1016%252Fs0140-6736%252802%252995607-2.zip&file=10.1016%252Fs0140-6736%252802%252996066-6.pdf',
        author: [
          { _ordinal: 1, family: 'D.' }
        ],
        'container-title': 'The Lancet',
        'container-title-short': 'Lancet',
        custom: {
          QID: 'Q124174815'
        },
        id: 'Q124174815',
        issue: '780',
        issued: { 'date-parts': [[1838, 8]] },
        journalAbbreviation: 'Lancet',
        language: 'en',
        page: '703',
        source: 'Wikidata',
        title: 'Dr. Clanny\'s case of diabetes',
        type: 'article-journal',
        volume: '30'
      }]
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
