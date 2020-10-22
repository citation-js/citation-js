/**
 * @module input/bibtex
 */

import { parse as parseFile } from './file'
import { parse as parseBibtxt } from './bibtxt'
import { parse as parseEntries, parseEntry } from './entries'

export const ref = '@bibtex'
export const formats = {
  '@bibtex/text': {
    parse: parseFile,
    parseType: {
      dataType: 'String',
      predicate: /@\s{0,5}[A-Za-z]{1,13}\s{0,5}\{\s{0,5}[^@{}"=,\\\s]{0,100}\s{0,5},[\s\S]*\}/
    }
  },
  '@bibtxt/text': {
    parse: parseBibtxt,
    parseType: {
      dataType: 'String',
      predicate: /^\s*(\[(?!\s*[{[]).*?\]\s*(\n\s*[^[]((?!:)\S)+\s*:\s*.+?\s*)*\s*)+$/
    }
  },
  '@bibtex/entry+object': {
    parse: parseEntry,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: { props: ['type', 'label', 'properties'] }
    }
  },
  '@bibtex/entries+list': {
    parse: parseEntries,
    parseType: { elementConstraint: '@bibtex/entry+object' }
  }
}
