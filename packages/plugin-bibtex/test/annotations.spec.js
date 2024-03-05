/* eslint-env mocha */

const assert = require('assert')
const { plugins } = require('@citation-js/core')

const { parse: parseFile } = require('../src/input/file.js')
const { format: formatFile } = require('../src/output/bibtex.js')
const { parseAnnotation } = require('../src/input/value.js')
const { formatAnnotation } = require('../src/output/value.js')

const dict = plugins.dict.get('text')

describe('data annotations', function () {
  it('are deserialized correctly', function () {
    assert.deepStrictEqual(
      parseFile(`@misc{a,
        title = {Data annotations test},
        title+an = {=default},
        title+an:test = {={f,o} o, bar},
        title+an:literal = {="a\\begin{center}b"\\end{center}c{"}d="},

        author = {Doe, John and Doe, Jane},
        author+an = {=field; 1=item; 2:family=part}
      }`),
      [{
        type: 'misc',
        label: 'a',
        properties: {
          title: 'Data annotations test',
          author: 'Doe, John and Doe, Jane'
        },
        annotations: {
          title: {
            default: '=default',
            test: '={f,o} o, bar',
            literal: '="a\\begin{center}b"\\end{center}c{"}d="'
          },
          author: {
            default: '=field; 1=item; 2:family=part'
          }
        }
      }]
    )
  })

  it('are parsed correctly', function () {
    assert.deepStrictEqual(parseAnnotation('=default'), { field: ['default'] })
    assert.deepStrictEqual(parseAnnotation('={f,o} o, bar'), { field: ['f,o o', 'bar'] })
    assert.deepStrictEqual(parseAnnotation('="a\\begin{center}b"\\end{center}c{"}d="'), { field: 'ab"c"d=' })
    assert.deepStrictEqual(parseAnnotation('=field; 1=item; 2:family=part'), {
      field: ['field'],
      item: [['item']],
      part: [, { family: ['part'] }]
    })
    assert.deepStrictEqual(parseAnnotation('=field; 1=item; 2:family=part').part[1], { family: ['part'] })
    assert.deepStrictEqual(parseAnnotation('1:family="a"; 2:family="b"; 2:given="c"'), {
      part: [{ family: 'a' }, { family: 'b', given: 'c' }]
    })
  })

  it('are formatted correctly', function () {
    assert.deepStrictEqual(formatAnnotation({ field: ['f,o o', 'bar'] }), '=f{,}o o, bar')
    assert.deepStrictEqual(formatAnnotation({ part: { '1': { family: ['part'] } } }), '2:family=part')
    assert.deepStrictEqual(formatAnnotation({ item: [null], part: [null, { family: null }] }), '')
  })

  it('are serialized correctly', function () {
    assert.deepStrictEqual(
      formatFile([{
        type: 'misc',
        label: 'a',
        properties: {
          title: 'Data annotations test',
          author: 'Doe, John and Doe, Jane'
        },
        annotations: {
          title: {
            default: '=default',
            test: '={f,o} o, bar',
            literal: '="a\\begin{center}b"\\end{center}c{"}d="'
          },
          author: {
            default: '=field; 1=item; 2:family=part'
          }
        }
      }], dict),
      `@misc{a,
\ttitle = {Data annotations test},
\ttitle+an = {=default},
\ttitle+an:test = {={f,o} o, bar},
\ttitle+an:literal = {="a\\begin{center}b"\\end{center}c{"}d="},
\tauthor = {Doe, John and Doe, Jane},
\tauthor+an = {=field; 1=item; 2:family=part},
}

`
    )
  })
})
