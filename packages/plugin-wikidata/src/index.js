/**
 * @module input/wikidata
 */

import {plugins} from '@citation-js/core'

import * as id from './id'
import * as entity from './entity'
import * as prop from './prop'
import * as url from './url'
import * as api from './api'
import config from './config'

const ref = '@wikidata'
const parsers = {id, entity, prop, url, api}
const formats = {
  '@wikidata/id': {
    parse: id.parse,
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
    parse: id.parse,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/id'
    }
  },
  '@wikidata/object': {
    parse: entity.parse,
    parseAsync: entity.parseAsync,
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
  input: formats,
  config
})

export {ref, parsers, formats}
