/**
 * @module input/wikidata
 */

import { logger } from '@citation-js/core'
import * as response from './response'
import { parseProp, getLabel } from './prop'

/**
 * CSL mappings for Wikidata fields.
 * @constant propMap
 * @property {Object} props
 * @property {Object} ignoredProps - known common props without CSL mapping
 */
import { props, ignoredProps } from './props'

function prepareValue (statement, { claims }, unkown) {
  if (typeof statement !== 'object') {
    unkown.delete(statement)
    return claims[statement] && claims[statement][0].value
  }

  const values = [].concat(...statement.props
    .map(prop => {
      unkown.delete(prop)
      return claims[prop]
    })
    .filter(Boolean)
  )

  if (statement.values === 'all') {
    return values[0] && values
  } else {
    return values[0] && values[0].value
  }
}

export function parseEntity (entity) {
  const data = {
    id: entity.id,
    _wikiId: entity.id
  }

  const unkown = new Set(Object.keys(entity.claims))

  for (let prop in props) {
    const value = prepareValue(props[prop], entity, unkown)
    if (value) {
      data[prop] = parseProp(prop, value, entity)
    }
  }

  for (let prop of unkown) {
    if (prop in ignoredProps) {
      continue
    }

    logger.unmapped('[plugin-wikidata]', 'property', prop)
  }

  if (!data.title) {
    data.title = getLabel(entity)
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
  return (await response.parseAsync(entities)).map(parseEntity)
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
  return response.parse(entities).map(parseEntity)
}

export {
  parseEntities as parse,
  parseEntitiesAsync as parseAsync,
  parseEntities as default
}
