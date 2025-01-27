import wdk from '@larsgw/wikibase-sdk/commonjs/wikidata.org'
import { parse as fetch, parseAsync as fetchAsync } from './api.js'
import { parse as getUrls } from './id.js'

/**
 * @access private
 * @namespace response
 * @memberof module:@citation-js/plugin-wikidata.parsers
 */

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
  P58: null,
  P86: null,
  P98: null,
  P110: null,
  P162: null,
  P170: null,
  P175: null,
  P178: null,
  P371: null,
  P488: null,
  P655: null,
  P664: null,
  P1431: null,
  P1640: null,
  P1817: null,
  P2438: null,
  P5030: null,

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

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entity
 * @param {Object} needed
 * @return {Array<String>}
 */
function collectAdditionalIds (entity, needed) {
  const additionalIds = []

  if (!needed) {
    return additionalIds
  }

  entity._needed = Object.assign(entity._needed || {}, needed)

  for (const prop in entity.claims) {
    if (prop in needed) {
      for (const claim of entity.claims[prop]) {
        if (claim.value) {
          additionalIds.push(claim.value.id ?? claim.value)
        }
      }
    }
  }

  return additionalIds
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @param {Array<String>} old
 * @return {Array<String>} needed
 */
function completeResponse (entities, old) {
  if (!old) {
    const allIds = []
    for (const id in entities) {
      const ids = collectAdditionalIds(entities[id], FETCH_ADDITIONAL)
      for (const id of ids) {
        if (!allIds.includes(id)) {
          allIds.push(id)
        }
      }
    }
    return allIds
  }

  const ids = []

  for (const id of old) {
    const entity = entities[id]

    if (!entity._needed) {
      continue
    }

    for (const prop in entity.claims) {
      if (prop in entity._needed) {
        for (const claim of entity.claims[prop]) {
          if (claim.value && claim.value.id) { continue }
          claim.value = entities[claim.value]
          ids.push(...collectAdditionalIds(claim.value, entity._needed[prop]))
        }
      }
    }

    delete entity._needed
  }

  return ids
}

function simplifyEntities (entities) {
  for (const id in entities) {
    if (entities[id].missing === '') {
      throw new Error(`Entity "${id}" not found`)
    }
  }

  const simplified = wdk.simplify.entities(entities, SIMPLIFY_OPTS)
  for (const id in entities) {
    const claims = entities[id].claims
    if (claims.P348) {
      simplified[id].claims['P348:all'] = wdk.simplify.propertyClaims(claims.P348, {
        ...SIMPLIFY_OPTS,
        keepNonTruthy: true,
        keepRank: true
      }).filter(claim => claim.rank !== 'deprecated')
    }
  }

  return simplified
}

/**
 * @typedef {Object} loopState
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @property {Array<String>} needed
 * @property {Array<String>} incomplete
 */

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @param {Object<String,module:@citation-js/core~CSL>} cache
 * @return {module:@citation-js/plugin-wikidata.parsers.response~loopState}
 */
function initLoopState (entities, cache) {
  return {
    needed: completeResponse(cache),
    incomplete: Object.keys(entities)
  }
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Array<String>} needed
 * @param {Object<String,module:@citation-js/core~CSL>} cache
 * @return {Array<String>} API URLs
 */
function filterIdsAndGetUrls (needed, cache) {
  const shouldFetch = needed.filter((id, i) => !(id in cache) && needed.indexOf(id) === i)
  return getUrls(shouldFetch)
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} response
 * @param {Object<String,module:@citation-js/core~CSL>} cache
 */
function addItemsToCache (response, cache) {
  const { entities } = JSON.parse(response)
  Object.assign(cache, simplifyEntities(entities))
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {module:@citation-js/plugin-wikidata.parsers.response~loopState} state
 * @param {Object<String,module:@citation-js/core~CSL>} cache
 * @return {module:@citation-js/plugin-wikidata.parsers.response~loopState}
 */
function updateLoopState (state, cache) {
  return {
    needed: completeResponse(cache, state.incomplete),
    incomplete: state.needed
  }
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @param {Object<String,module:@citation-js/core~CSL>} cache
 * @return {Array<module:@citation-js/core~CSL>}
 */
function finalizeItems (entities, cache) {
  return Object.keys(entities).map(id => cache[id])
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @return {Object<String,module:@citation-js/core~CSL>}
 */
export function fillCache (entities) {
  const cache = simplifyEntities(entities)
  let state = initLoopState(entities, cache)

  while (state.needed.length) {
    const urls = filterIdsAndGetUrls(state.needed, cache)
    urls.map(url => addItemsToCache(fetch(url), cache))

    state = updateLoopState(state, cache)
  }

  return cache
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @return {Array<module:@citation-js/core~CSL>}
 */
export function parse (entities) {
  const cache = fillCache(entities)

  return finalizeItems(entities, cache)
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @return {Promise<Object<String,module:@citation-js/core~CSL>>}
 */
export async function fillCacheAsync (entities) {
  const cache = simplifyEntities(entities)
  let state = initLoopState(entities, cache)

  while (state.needed.length) {
    const urls = filterIdsAndGetUrls(state.needed, cache)
    await Promise.all(
      urls.map(async url => addItemsToCache(await fetchAsync(url), cache))
    )

    state = updateLoopState(state, cache)
  }

  return cache
}

/**
 * @memberof module:@citation-js/plugin-wikidata.parsers.response
 * @param {Object} entities
 * @return {Promise<Array<module:@citation-js/core~CSL>>}
 */
export async function parseAsync (entities) {
  const cache = await fillCacheAsync(entities)

  return finalizeItems(entities, cache)
}
