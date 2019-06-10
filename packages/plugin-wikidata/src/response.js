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

const FETCH_PLACE = {
  P17: null
}

const FETCH_PUBLISHER = {
  // publisher-place
  P740: FETCH_PLACE,
  P159: FETCH_PLACE
}

const FETCH_ADDITIONAL = {
  // name variables
  P50: null,
  P57: null,
  P86: null,
  P98: null,
  P110: null,
  P655: null,
  P1817: null,

  // keyword & reviewed-title
  P921: {
    // reviewed-author
    P50: null
  },

  // language
  P407: null,
  P364: null,

  // publisher
  P123: FETCH_PUBLISHER,

  // original
  P629: {
    P50: null,
    P123: FETCH_PUBLISHER
  },

  // medium
  P437: null,
  P186: null,

  // collection-title
  P179: {
    // collection-editor
    P98: null
  },

  // container-title
  P1433: {
    // event
    P4745: {
      // event-place
      P276: FETCH_PLACE
    }
  },

  // other container-title (has no event)
  P361: {
    P50: null
  }
}

function flat (array, part) {
  array.push(...part)
  return array
}

function collectAdditionalIds (entity, needed) {
  if (!needed) {
    return []
  }

  entity._needed = Object.assign(entity._needed || {}, needed)
  return Object.keys(entity.claims)
    .filter(prop => prop in needed)
    .map(prop => entity.claims[prop].map(({ value }) => value))
    .reduce(flat, [])
}

function completeResponse (entities, old) {
  if (!old) {
    let allIds = []
    for (let id in entities) {
      const ids = collectAdditionalIds(entities[id], FETCH_ADDITIONAL)
      for (let id of ids) {
        if (!allIds.includes(id)) {
          allIds.push(id)
        }
      }
    }
    return allIds
  }

  const ids = []

  for (var id of old) {
    var entity = entities[id]

    if (!entity._needed) {
      continue
    }

    for (var prop in entity.claims) {
      if (prop in entity._needed) {
        for (let claim of entity.claims[prop]) {
          claim.value = entities[claim.value]
          ids.push(...collectAdditionalIds(claim.value, entity._needed[prop]))
        }
      }
    }

    delete entity._needed
  }

  return ids
}

export function parse (entities) {
  const cache = simplify.entities(entities, SIMPLIFY_OPTS)

  let needed = completeResponse(cache)
  let incomplete = Object.keys(entities)

  while (needed.length) {
    const shouldFetch = needed.filter((id, i) => !(id in cache) && needed.indexOf(id) === i)
    Object.assign(cache, ...getUrls(shouldFetch).map(url => {
      const { entities } = JSON.parse(fetch(url))
      return simplify.entities(entities, SIMPLIFY_OPTS)
    }))

    ;[needed, incomplete] = [completeResponse(cache, incomplete), needed]
  }

  return Object.keys(entities).map(id => cache[id])
}

export async function fillCacheAsync (entities) {
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

  return cache
}

export async function parseAsync (entities) {
  const cache = await fillCacheAsync(entities)

  return Object.keys(entities).map(id => cache[id])
}
