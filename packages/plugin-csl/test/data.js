const bibliographyData = [
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

const citationData = [{
  id: '1',
  type: 'article-journal',
  title: 'a',
  issued: { 'date-parts': [[2011]] }
}, {
  id: '2',
  type: 'article-journal',
  title: 'b',
  author: [{
    family: 'd',
    given: 'c'
  }, {
    literal: 'h'
  }],
  issued: { 'date-parts': [[2012]] }
}, {
  id: '3',
  type: 'article-journal',
  title: 'e',
  author: [{
    family: 'f',
    given: 'g'
  }],
  issued: { 'date-parts': [[2013]] }
}]

module.exports = {
  bibliography: {
    'default built-in template': [
      bibliographyData,
      'Hall, H. K. (1957). Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society, 79(20), 5441–5444. https://doi.org/10.1021/ja01577a030',
      { template: 'apa' }
    ],
    'non-default built-in template': [
      bibliographyData,
      '1. Hall HK. Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society. 1957 Jan 1;79(20):5441–4.',
      { template: 'vancouver' }
    ],
    'non-existent template': [
      bibliographyData,
      'Hall, H. K. (1957). Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society, 79(20), 5441–5444. https://doi.org/10.1021/ja01577a030',
      { template: 'foo' }
    ],
    'non-existent locale': [
      bibliographyData,
      'Hall, H. K. (1957). Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society, 79(20), 5441–5444. https://doi.org/10.1021/ja01577a030',
      { lang: 'foo' }
    ],
    'custom template': [
      bibliographyData,
      'Correlation of the Base Strengths of Amines 1',
      { template: 'custom' }
    ],
    'custom locale': [
      [{}],
      '(Custom).',
      { lang: 'custom' }
    ],
    'custom underscore locale': [
      [{}],
      '(Custom).',
      { lang: 'zh_CN' }
    ],
    'static pre/append': [
      bibliographyData,
      'aHall, H. K. (1957). Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society, 79(20), 5441–5444. https://doi.org/10.1021/ja01577a030b',
      { prepend: 'a', append: 'b' }
    ],
    'dynamic pre/append': [
      bibliographyData,
      '20Hall, H. K. (1957). Correlation of the Base Strengths of Amines 1. Journal of the American Chemical Society, 79(20), 5441–5444. https://doi.org/10.1021/ja01577a03079',
      { prepend: ({ issue }) => issue, append: ({ volume }) => volume }
    ],
    'built-in format': [
      bibliographyData,
      '<div class="csl-bib-body">\n  <div data-csl-entry-id="Q23571040" class="csl-entry">Hall, H. K. (1957). Correlation of the Base Strengths of Amines 1. <i>Journal of the American Chemical Society</i>, <i>79</i>(20), 5441–5444. https://doi.org/10.1021/ja01577a030</div>\n</div>',
      { format: 'html' }
    ],
    'built-in format and pre/append': [
      bibliographyData,
      '<div class="csl-bib-body">\n  <div data-csl-entry-id="Q23571040" class="csl-entry">aHall, H. K. (1957). Correlation of the Base Strengths of Amines 1. <i>Journal of the American Chemical Society</i>, <i>79</i>(20), 5441–5444. https://doi.org/10.1021/ja01577a030b</div>\n</div>',
      { format: 'html', template: 'apa', prepend: 'a', append: 'b' }
    ],
    'specific entries': [
      citationData,
      'a\nb',
      { template: 'custom', entry: ['1', '2'] }
    ],
    'specific entry': [
      citationData,
      'e',
      { template: 'custom', entry: ['3'] }
    ],
    'as array': [
      citationData,
      [
        ['1', '  <div data-csl-entry-id="1" class="csl-entry"><i>a</i>. (2011).</div>\n'],
        ['2', '  <div data-csl-entry-id="2" class="csl-entry">d,  c &#38; h. (2012). <i>b</i>.</div>\n'],
        ['3', '  <div data-csl-entry-id="3" class="csl-entry">f,  g. (2013). <i>e</i>.</div>\n']
      ],
      { format: 'html', template: 'apa', asEntryArray: true }
    ]
  },
  citation: {
    simple: [citationData, '(A, 2011; d & h, 2012)', { entry: ['1', '2'] }],
    'single entry': [citationData, '(d & h, 2012)', { entry: '2' }],
    'no entry option': [citationData, '(A, 2011; d & h, 2012; f, 2013)'],
    'with locator': [citationData, '(A, 2011, p. 123)', { entry: { id: '1', locator: 123, label: 'page' } }],
    'with suffix': [citationData, '(A, 2011 [!])', { entry: { id: '1', suffix: '[!]' } }]
  }
}
