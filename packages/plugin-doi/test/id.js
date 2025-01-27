module.exports = {
  '@doi/id': {
    'one id': [
      '10.1021/ja01577a030',
      ['https://doi.org/10.1021/ja01577a030']
    ],
    'id with []': [
      '10.1641/0006-3568(2002)052[0044:PTLBTR]2.0.CO;2',
      ['https://doi.org/10.1641/0006-3568(2002)052[0044:PTLBTR]2.0.CO;2']
    ],
    'id with <>': [
      '10.1002/1520-6394(2000)12:3<118::AID-DA2>3.0.CO;2-G',
      ['https://doi.org/10.1002/1520-6394(2000)12:3<118::AID-DA2>3.0.CO;2-G']
    ]
  },
  '@doi/short-url': {
    'one scheme-less url': [
      'doi.org/10.1021/ja01577a030',
      'https://doi.org/10.1021/ja01577a030'
    ],
    'one scheme-less dx url': [
      'dx.doi.org/10.1021/ja01577a030',
      'https://dx.doi.org/10.1021/ja01577a030'
    ]
  },
  '@doi/list+text': {
    spaces: [
      '10.1021/ja01577a030 10.1021/ci025584y',
      ['https://doi.org/10.1021/ja01577a030', 'https://doi.org/10.1021/ci025584y']
    ],
    newlines: [
      '10.1021/ja01577a030\n10.1021/ci025584y',
      ['https://doi.org/10.1021/ja01577a030', 'https://doi.org/10.1021/ci025584y']
    ]
  },
  '@doi/list+object': {
    array: [
      ['10.1021/ja01577a030', '10.1101/2021.08.15.21262067'],
      ['https://doi.org/10.1021/ja01577a030', 'https://doi.org/10.1101/2021.08.15.21262067']
    ],
    'unusual id': [
      [
        '10.1641/0006-3568(2002)052[0044:PTLBTR]2.0.CO;2',
        '10.1002/1520-6394(2000)12:3<118::AID-DA2>3.0.CO;2-G'
      ],
      [
        'https://doi.org/10.1641/0006-3568(2002)052[0044:PTLBTR]2.0.CO;2',
        'https://doi.org/10.1002/1520-6394(2000)12:3<118::AID-DA2>3.0.CO;2-G'
      ]
    ]
  }
}
