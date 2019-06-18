/**
 * @module input/wikidata
 */

import { plugins } from '@citation-js/core'

import * as id from './id'
import * as entity from './entity'
import * as prop from './prop'
import * as url from './url'
import * as api from './api'
import config from './config'

const ref = '@wikidata'
const parsers = { id, entity, prop, url, api }
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
  '@wikidata/array+api': {
    parse: api.parse,
    parseAsync: api.parseAsync,
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/api'
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
      propertyConstraint: { props: 'entities' }
    }
  },
  '@wikidata/array+object': {
    parse (responses) {
      // merge results
      return responses.reduce((combined, { success, entities }) => {
        combined.success &= success
        Object.assign(combined.entities, entities)
        return combined
      }, {})
    },
    parseType: {
      dataType: 'Array',
      elementConstraint: '@wikidata/object'
    },
    outputs: '@wikidata/object'
  },
  '@wikidata/prop': {
    parse: prop.parseProp
  },
  '@wikidata/type': {
    parse: prop.parseType
  }
}

plugins.add(ref, {
  input: formats,
  config
})

export { ref, parsers, formats }
