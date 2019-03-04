/**
 * @module input/wikidata
 */

import {simplify} from 'wikidata-sdk'
import {
  parseProp,
  parsePropAsync,
  parsePropName
} from './prop'

const SIMPLIFY_OPTS = {
  keepQualifiers: true
}

function preProcess (data, {id}) {
  data._wikiId = id
  data.id = id
  return data
}

function addValues (data, prop, value) {
  if (Array.isArray(data[prop])) {
    data[prop] = data[prop].concat(value)
  } else if (!data.hasOwnProperty(prop)) {
    data[prop] = value
  }
}

function postProcess (data, {labels}, lang) {
  for (let prop in data) {
    if (Array.isArray(data[prop])) {
      data[prop].sort(({_ordinal: a}, {_ordinal: b}) => a - b)
    }
  }

  if (!data.title) {
    data.title = labels[lang]
  }

  return data
}

export async function parseEntityAsync (entity, lang) {
  const csl = preProcess({}, entity)

  await Promise.all(Object.keys(entity.claims).map(async prop => {
    const cslProp = parsePropName(prop)
    if (cslProp) {
      addValues(csl, cslProp, await parsePropAsync(prop, entity.claims[prop], lang))
    }
  }))

  return postProcess(csl, entity, lang)
}

export function parseEntity (entity, lang) {
  const csl = preProcess({}, entity)

  Object.keys(entity.claims).map(prop => {
    const cslProp = parsePropName(prop)
    if (cslProp) {
      addValues(csl, cslProp, parseProp(prop, entity.claims[prop], lang))
    }
  })

  return postProcess(csl, entity, lang)
}

/**
 * Format Wikidata data (async)
 *
 * @access protected
 * @param {Object} data - The input data
 *
 * @return {Promise<Array<CSL>>} The formatted input data
 */
export async function parseEntitiesAsync ({entities}) {
  return Promise.all(Object.values(simplify.entities(entities, SIMPLIFY_OPTS))
    .map(async entity => parseEntityAsync(entity, 'en'))
  )
}

/**
 * Format Wikidata data
 *
 * @access protected
 * @param {Object} data - The input data
 *
 * @return {Array<CSL>} The formatted input data
 */
export function parseEntities ({entities}) {
  return Object.values(simplify.entities(entities, SIMPLIFY_OPTS))
    .map(entity => parseEntity(entity, 'en'))
}

export {
  parseEntities as parse,
  parseEntitiesAsync as parseAsync,
  parseEntities as default
}
