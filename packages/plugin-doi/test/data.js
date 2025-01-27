const ja01577a030 = {
  publisher: 'American Chemical Society (ACS)',
  issue: '20',
  DOI: '10.1021/ja01577a030',
  type: 'article-journal',
  page: '5441-5444',
  source: 'Crossref',
  title: 'Correlation of the Base Strengths of Amines<sup>1</sup>',
  volume: '79',
  author: [
    {
      suffix: 'Jr.',
      given: 'H. K.',
      family: 'Hall',
      sequence: 'first',
      affiliation: []
    }
  ],
  'container-title': 'Journal of the American Chemical Society',
  language: 'en',
  issued: { 'date-parts': [[1957, 10]] },
  URL: 'http://dx.doi.org/10.1021/ja01577a030',
  ISSN: '0002-7863',
  'container-title-short': 'J. Am. Chem. Soc.'
}

const preprint = {
  publisher: 'Cold Spring Harbor Laboratory',
  abstract: '<jats:title>Abstract</jats:title><jats:p>High COVID-19 mortality among nursing home (NH) residents led to their prioritization for SARS-CoV-2 vaccination; most NH residents received BNT162b2 mRNA vaccination under the Emergency Use Authorization due to first to market and its availability. With NH residents’ poor initial vaccine response, the rise of NH breakthrough infections and outbreaks, characterization of the durability of immunity to inform public health policy on the need for boosting is needed. We report on humoral immunity from 2 weeks to 6-months post-vaccination in 120 NH residents and 92 ambulatory healthcare worker controls with and without pre-vaccination SARS-CoV-2 infection. Anti-spike and anti-receptor binding domain (RBD) IgG, and serum neutralization titers, were assessed using a bead-based ELISA method and pseudovirus neutralization assay. Anti-spike, anti-RBD and neutralization levels dropped more than 84% over 6 months’ time in all groups irrespective of prior SARS-CoV-2 infection. At 6 months post-vaccine, 70% of the infection-naive NH residents had neutralization titers at or below the lower limit of detection compared to 16% at 2 weeks after full vaccination. These data demonstrate a significant reduction in levels of antibody in all groups. In particular, those infection-naive NH residents had lower initial post-vaccination humoral immunity immediately and exhibited the greatest declines 6 months later. Healthcare workers, given their younger age and relative good-health, achieved higher initial antibody levels and better maintained them, yet also experienced significant declines in humoral immunity. Based on the rapid spread of the delta variant and reports of vaccine breakthrough in NH and among younger community populations, boosting NH residents may be warranted.</jats:p>',
  DOI: '10.1101/2021.08.15.21262067',
  type: 'article',
  'container-title': 'medRxiv',
  source: 'Crossref',
  title: 'Significant reduction in humoral immunity among healthcare workers and nursing home residents 6 months after COVID-19 BNT162b2 mRNA vaccination',
  author: [
    {
      _orcid: 'http://orcid.org/0000-0001-5503-7888',
      'authenticated-orcid': false,
      given: 'David H.',
      family: 'Canaday',
      sequence: 'first',
      affiliation: []
    },
    { given: 'Oladayo A.', family: 'Oyebanji', sequence: 'additional', affiliation: [] },
    { given: 'Debbie', family: 'Keresztesy', sequence: 'additional', affiliation: [] },
    { given: 'Michael', family: 'Payne', sequence: 'additional', affiliation: [] },
    { given: 'Dennis', family: 'Wilk', sequence: 'additional', affiliation: [] },
    { given: 'Lenore', family: 'Carias', sequence: 'additional', affiliation: [] },
    { given: 'Htin', family: 'Aung', sequence: 'additional', affiliation: [] },
    { given: 'Kerri St.', family: 'Denis', sequence: 'additional', affiliation: [] },
    { given: 'Evan C.', family: 'Lam', sequence: 'additional', affiliation: [] },
    { given: 'Christopher F.', family: 'Rowley', sequence: 'additional', affiliation: [] },
    { given: 'Sarah D.', family: 'Berry', sequence: 'additional', affiliation: [] },
    { given: 'Cheryl M.', family: 'Cameron', sequence: 'additional', affiliation: [] },
    { given: 'Mark J.', family: 'Cameron', sequence: 'additional', affiliation: [] },
    { given: 'Brigid', family: 'Wilson', sequence: 'additional', affiliation: [] },
    { given: 'Alejandro B.', family: 'Balazs', sequence: 'additional', affiliation: [] },
    { given: 'Christopher L.', family: 'King', sequence: 'additional', affiliation: [] },
    {
      _orcid: 'http://orcid.org/0000-0001-6000-6859',
      'authenticated-orcid': false,
      given: 'Stefan',
      family: 'Gravenstein',
      sequence: 'additional',
      affiliation: []
    }
  ],
  issued: { 'date-parts': [[2021, 8, 18]] },
  URL: 'http://dx.doi.org/10.1101/2021.08.15.21262067'
}

const zenodo8242099 = {
  type: 'article',
  language: 'en',
  author: [
    { family: 'Willighagen', given: 'Lars' },
    { family: 'Puchkov', given: 'Vasily Georgievich' }
  ],
  issued: { 'date-parts': [[2023, 8, 12]] },
  abstract: 'Translation of Puchkov, VG (1961). Shchytnyky. Fauna of Ukraine 21(1)',
  DOI: '10.5281/ZENODO.8242099',
  publisher: 'Zenodo',
  title: 'Shield bugs (nymphs)',
  URL: 'https://zenodo.org/record/8242099',
  version: 'v0.1.1'
}

const blogpost = {
  'container-title': 'chem-bla-ics',
  publisher: 'Front Matter',
  abstract: '<p>The Bioclipse Workshop is in progress, and Ola is now leading a discussion about future releases and functionality. Proceedings are live updated, and presentation sheets will be available shortly.</p>',
  DOI: '10.59350/hhtcn-zah03',
  type: 'post-weblog',
  source: 'Crossref',
  title: 'The Bioclipse Workshop is in progress',
  author: [
    {
      _orcid: 'http://orcid.org/0000-0001-7542-0286',
      'authenticated-orcid': false,
      given: 'Egon',
      family: 'Willighagen',
      sequence: 'first',
      affiliation: []
    }
  ],
  issued: { 'date-parts': [[2006, 11, 1]] },
  URL: 'http://dx.doi.org/10.59350/hhtcn-zah03'
}

module.exports = {
  'one url': [
    'https://doi.org/10.1021/ja01577a030',
    [ja01577a030]
  ],
  'one dx url': [
    'https://dx.doi.org/10.1021/ja01577a030',
    [ja01577a030]
  ],
  'one http url': [
    'http://doi.org/10.1021/ja01577a030',
    [ja01577a030]
  ],
  'one http dx url': [
    'http://dx.doi.org/10.1021/ja01577a030',
    [ja01577a030]
  ],
  'entry with normal type': [
    'https://doi.org/10.5281/zenodo.8242099',
    [zenodo8242099]
  ],
  preprint: [
    'https://dx.doi.org/10.1101/2021.08.15.21262067',
    [preprint]
  ],
  blogpost: [
    'https://dx.doi.org/10.59350/hhtcn-zah03',
    [blogpost]
  ]
}
