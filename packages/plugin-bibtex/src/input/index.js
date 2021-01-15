/**
 * @module input/bibtex
 */

import { parse as parseFile } from './file'
import { parse as parseBibtxt } from './bibtxt'
import { parse as parseEntries, parseBibtex } from './entries'

export const ref = '@bibtex'
export const formats = {
  '@biblatex/text': {
    parse: parseFile,
    parseType: {
      dataType: 'String',
      predicate: /@\s{0,5}[A-Za-z]{1,13}\s{0,5}\{\s{0,5}[^@{}"=,\\\s]{0,100}\s{0,5},[\s\S]*\}/
    }
  },
  '@biblatex/entry+object': {
    parse (input) { return parseEntries([input]) },
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: { props: ['type', 'label', 'properties'] }
    }
  },
  '@biblatex/entries+list': {
    parse: parseEntries,
    parseType: { elementConstraint: '@biblatex/entry+object' }
  },

  '@bibtex/text': {
    parse: parseFile,
    outputs: '@bibtex/entries+list'
  },
  '@bibtex/entry+object': {
    parse (input) { return parseBibtex([input]) },
  },
  '@bibtex/entries+list': {
    parse: parseBibtex
  },

  '@bibtxt/text': {
    parse: parseBibtxt,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(\[(?!\s*[{[]).*?\]\s*(\n\s*[^[]((?!:)\S)+\s*:\s*.+?\s*)*\s*)+$/
    }
  }
}
