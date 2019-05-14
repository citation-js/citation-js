/**
 * @module input/wikidata
 */

import * as response from './response'
import config from './config'
import {
  parseProp,
  parsePropName,
  getLabel
} from './prop'

export function parseEntity (entity, langs) {
  const data = {
    id: entity.id,
    _wikiId: entity.id
  }

  Object.keys(entity.claims).map(prop => {
    const cslProp = parsePropName(prop)
    if (cslProp) {
      const value = parseProp(prop, entity.claims[prop], langs)

      if (Array.isArray(data[cslProp])) {
        data[cslProp] = data[cslProp].concat(value)
      } else if (!data.hasOwnProperty(cslProp)) {
        data[cslProp] = value
      }
    }
  })

  for (let prop in data) {
    if (Array.isArray(data[prop])) {
      data[prop].sort(({ _ordinal: a }, { _ordinal: b }) => a - b)
    }
  }

  if (!data.title) {
    data.title = getLabel(entity, langs)
  }

  return data
}

/**
 * Format Wikidata data (async)
 *
 * @access protected
 * @param {Object} data - The input data
 *
 * @return {Promise<Array<CSL>>} The formatted input data
 */
export async function parseEntitiesAsync ({ entities }) {
  return (await response.parseAsync(entities))
    .map(entity => parseEntity(entity, config.langs))
}

/**
 * Format Wikidata data
 *
 * @access protected
 * @param {Object} data - The input data
 *
 * @return {Array<CSL>} The formatted input data
 */
export function parseEntities ({ entities }) {
  return response.parse(entities)
    .map(entity => parseEntity(entity, config.langs))
}

export {
  parseEntities as parse,
  parseEntitiesAsync as parseAsync,
  parseEntities as default
}
