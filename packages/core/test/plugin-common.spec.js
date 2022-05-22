/* eslint-env mocha */

const assert = require('assert')
const { plugins } = require('../src/index.js')

const simple = [{
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
  issued: {
    'date-parts': [[
      '1957',
      '1',
      '1'
    ]]
  },
  'container-title': 'Journal of the American Chemical Society',
  volume: '79',
  issue: '20',
  page: '5441-5444'
}]

const string = '[\n  {\n    id: "Q23571040",\n    type: "article-journal",\n    title: "Correlation of the Base Strengths of Amines 1",\n    DOI: "10.1021/ja01577a030",\n    author: [\n      {\n\tgiven: "H. K.",\n\tfamily: "Hall"\n      }\n    ],\n    issued: {\n      date-parts: [\n\t[ "1957", "1", "1" ]\n      ]\n    },\n    container-title: "Journal of the American Chemical Society",\n    volume: "79",\n    issue: "20",\n    page: "5441-5444"\n  }\n]'
const htmlString = `<div class="csl-bib-body">[
  <div class="csl-entry">{<ul style="list-style-type:none">
  <li>"id": "Q23571040",</li>
  <li>"type": "article-journal",</li>
  <li>"title": "Correlation of the Base Strengths of Amines 1",</li>
  <li>"DOI": "10.1021/ja01577a030",</li>
  <li>"author": [<ul style="list-style-type:none">
    <li>{<ul style="list-style-type:none">
      <li>"given": "H. K.",</li>
      <li>"family": "Hall"</li>
    </ul>}</li>
  </ul>],</li>
  <li>"issued": {<ul style="list-style-type:none">
    <li>"date-parts": [<ul style="list-style-type:none">
      <li>[<ul style="list-style-type:none">
        <li>"1957",</li>
        <li>"1",</li>
        <li>"1"</li>
      </ul>]</li>
    </ul>]</li>
  </ul>},</li>
  <li>"container-title": "Journal of the American Chemical Society",</li>
  <li>"volume": "79",</li>
  <li>"issue": "20",</li>
  <li>"page": "5441-5444"</li>
  </ul>}</div>
]</div>`.replace(/\n */g, '')

const yearSuffix = [{ id: 'a', author: [{ literal: 'foo' }], issued: { 'date-parts': [[2018]] }, 'year-suffix': 'a' }]
const label = [{ id: 'b', 'citation-label': 'foo', type: 'book' }]

const inputData = {
  '@else/json': {
    'as JSON string': [JSON.stringify(simple), simple],
    'as JS Object string': [string, simple]
  },
  '@empty/text': {
    simple: ['', []]
  },
  '@empty/whitespace+text': {
    'tabs, spaces and newlines': ['   \t\n \r  ', []]
  },
  '@empty': {
    '(null)': [null, []],
    '(undefined)': [undefined, []]
  }
}

describe('input', function () {
  for (const type in inputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (const name of Object.keys(inputData[type])) {
        const [input, expected] = inputData[type][name]
        describe(name, function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses data', function () {
            assert.deepStrictEqual(
              plugins.input.chain(input, { generateGraph: false }),
              expected
            )
          })
        })
      }
    })
  }
})

const outputData = {
  data: {
    'plain text': [simple, JSON.stringify(simple, null, 2)],
    html: [simple, htmlString, { format: 'html' }],
    'weird html': [
      [{ author: [], editor: {} }],
      '<div class="csl-bib-body">[<div class="csl-entry">{<ul style="list-style-type:none"><li>"author": [],</li><li>"editor": {}</li></ul>}</div>]</div>',
      { format: 'html' }
    ],
    object: [simple, simple, { format: 'object' }],
    'downgrade csl': [
      {
        type: 'software',
        version: '1.0.2',
        title: 'Citation Style Language',
        'event-title': 'RFC'
      },
      {
        type: 'book',
        version: '1.0.2',
        title: 'Citation Style Language',
        event: 'RFC'
      },
      { format: 'object', version: '1.0.1' }
    ],
    'upgraded csl': [
      {
        type: 'software',
        version: '1.0.2',
        title: 'Citation Style Language',
        'event-title': 'RFC'
      },
      {
        type: 'software',
        version: '1.0.2',
        title: 'Citation Style Language',
        'event-title': 'RFC'
      },
      { format: 'object' }
    ]
  },
  ndjson: {
    normal: [simple, simple.map(entry => JSON.stringify(entry)).join('\n')],
    'downgrade csl': [
      [{ type: 'software', version: '1.0.2', title: 'Citation Style Language', 'event-title': 'RFC' }],
      JSON.stringify({ type: 'book', version: '1.0.2', title: 'Citation Style Language', event: 'RFC' }),
      { version: '1.0.1' }
    ],
    'upgraded csl': [
      [{ type: 'software', version: '1.0.2', title: 'Citation Style Language', 'event-title': 'RFC' }],
      JSON.stringify({ type: 'software', version: '1.0.2', title: 'Citation Style Language', 'event-title': 'RFC' })
    ]
  },
  label: {
    normal: [simple, { [simple[0].id]: 'Hall1957Correlation' }],
    'with year-suffix': [yearSuffix, { [yearSuffix[0].id]: 'foo2018a' }],
    'with own label': [label, { [label[0].id]: 'foo' }]
  }
}

describe('output', function () {
  for (const type in outputData) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.output.has(type))
      })

      for (const name of Object.keys(outputData[type])) {
        const [input, expected, ...opts] = outputData[type][name]
        it(`with ${name} works`, function () {
          const actual = plugins.output.format(type, input, ...opts)
          assert.deepStrictEqual(
            typeof actual === 'string' ? actual.trim() : actual,
            expected
          )
        })
      }
    })
  }
})
