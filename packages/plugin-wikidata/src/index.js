/**
 * @module input/wikidata
 */

import {plugins} from '@citation-js/core'

import * as list from './list'
import * as json from './json'
import * as prop from './prop'
import * as url from './url'
import * as api from './api'

const ref = '@wikidata'
const parsers = {list, json, prop, url, api}
const formats = {
  '@wikidata/id': {
    parse: list.parse,
    parseType: {
      dataType: 'String',
      predicate: /^Q\d+$/
    }
  },
  '@wikidata/list+text': {
    parse (data) {
      return data.trim().split(/(?:[\s,]\s*)/g)
    },
    parseType: {
      dataType: 'String',
      predicate: /^\s*((?:Q\d+(?:[\s,]\s*))*Q\d+)\s*$/
    }
  },
  '@wikidata/api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'String',
      predicate: /^(https?:\/\/(?:www\.)?wikidata.org\/w\/api\.php(?:\?.*)?)$/,
      extends: '@else/url'
    }
  },
  '@wikidata/url': {
    parse: url.parse,
    parseType: {
      dataType: 'String',
      predicate: /\/(Q\d+)(?:[#?/]|\s*$)/,
      extends: '@else/url'
    }
  },
  '@wikidata/list+object': {
    parse: list.parse,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/id'
    }
  },
  '@wikidata/object': {
    parse: json.parse,
    parseAsync: json.parseAsync,
    parseType: {
      dataType: 'SimpleObject',
      propertyConstraint: {props: 'entities'}
    }
  },
  '@wikidata/prop': {
    parse: prop.parseProp,
    parseAsync: prop.parsePropAsync
  },
  '@wikidata/type': {
    parse: prop.parsePropType
  }
}

plugins.add(ref, {
  input: formats
})

export {ref, parsers, formats}
