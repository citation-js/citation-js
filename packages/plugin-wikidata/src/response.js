/**
 * @module input/wikidata
 */

import { simplify } from 'wikidata-sdk'
import { parse as fetch, parseAsync as fetchAsync } from './api'
import { parse as getUrls } from './id'

const SIMPLIFY_OPTS = {
  keepQualifiers: true,
  timeConverter: 'simple-day'
}

const FETCH_ADDITIONAL = {
  // name variables
  P50: null,
  P57: null,
  P86: null,
  P98: null,
  P110: null,
  P655: null,

  // publisher
  P123: null,

  // genre
  P136: null,

  // publisher-place
  P291: null,

  // container-title
  P1433: null
}

function flatUnique (set, array) {
  for (let element of array) {
    if (!set.includes(element)) {
      set.push(element)
    }
  }

  return set
}

function flat (array, part) {
  array.push(...part)
  return array
}

function collectAdditionalIds (entity, needed) {
  if (!needed) {
    return []
  }

  entity._needed = needed
  return Object.keys(entity.claims)
    .filter(prop => prop in needed)
    .map(prop => entity.claims[prop].map(({ value }) => value))
    .reduce(flat, [])
}

function completeResponse (entities, old) {
  if (!old) {
    return Object.keys(entities)
      .map(id => collectAdditionalIds(entities[id], FETCH_ADDITIONAL))
      .reduce(flatUnique, [])
  }

  const ids = []

  for (var id of old) {
    var entity = entities[id]

    for (var prop in entity.claims) {
      if (prop in entity._needed) {
        entity.claims[prop].forEach(claim => {
          claim.value = { ...entities[claim.value] }
          ids.push(...collectAdditionalIds(claim.value, entity._needed[prop]))
        })
      }
    }

    delete entity._needed
  }

  return [...new Set(ids)]
}

export function parse (entities) {
  const cache = simplify.entities(entities, SIMPLIFY_OPTS)

  let needed = completeResponse(cache)
  let incomplete = Object.keys(entities)

  while (needed.length) {
    Object.assign(cache, ...getUrls(needed).map(url => {
      const { entities } = JSON.parse(fetch(url))
      return simplify.entities(entities, SIMPLIFY_OPTS)
    }))

    ;[needed, incomplete] = [completeResponse(cache, incomplete), needed]
  }

  return Object.keys(entities).map(id => cache[id])
}

export async function parseAsync (entities) {
  const cache = simplify.entities(entities, SIMPLIFY_OPTS)

  let needed = completeResponse(cache)
  let incomplete = Object.keys(entities)

  while (needed.length) {
    Object.assign(cache, ...await Promise.all(getUrls(needed).map(async url => {
      const { entities } = JSON.parse(await fetchAsync(url))
      return simplify.entities(entities, SIMPLIFY_OPTS)
    })))

    ;[needed, incomplete] = [completeResponse(cache, incomplete), needed]
  }

  return Object.keys(entities).map(id => cache[id])
}
