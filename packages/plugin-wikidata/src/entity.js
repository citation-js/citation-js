import { logger } from '@citation-js/core'
import * as response from './response.js'
import { parseProp, getLabel } from './prop.js'
import props from './props.json'
import ignoredProps from './ignoredProps.json'

/**
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {Array<String>} parts - nested Wikidata properties
 * @param {Object} entity
 * @return {Object} statement
 */
function resolve (parts, { claims }) {
  const [prop, qualifier] = parts[0].split('#')

  if (!claims[prop] || !claims[prop].length) {
    return
  }

  if (parts.length === 1) {
    if (qualifier) {
      if (claims[prop][0].qualifiers[qualifier]) {
        return claims[prop][0].qualifiers[qualifier].map(value => ({ value }))
      }
      return
    }

    return claims[prop]
  }

  return resolve(parts.slice(1), claims[prop][0].value)
}

/**
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {String} prop_ - Chain of nested Wikidata properties
 * @param {Object} entity
 * @param {Set} unknown
 * @return {Object} statement
 */
function resolveProp (prop_, entity, unknown) {
  const parts = prop_.split('.')
  unknown.delete(parts[0])

  return resolve(parts, entity)
}

/**
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {Object|String} statement
 * @param {Object} entity
 * @param {Set} unknown
 * @return {module:@citation-js/core~CSL}
 */
function prepareValue (statement, entity, unknown) {
  if (typeof statement !== 'object') {
    const value = resolveProp(statement, entity, unknown)
    return value && value[0].value
  }

  const values = [].concat(...statement.props
    .map(prop => resolveProp(prop, entity, unknown))
    .filter(Boolean)
  )

  if (statement.values === 'all') {
    return values[0] && values
  } else {
    return values[0] && values[0].value
  }
}

/**
 * @access private
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {Object} entity - The input data
 * @return {module:@citation-js/core~CSL} The formatted input data
 */
export function parseEntity (entity) {
  const data = {
    id: entity.id,
    custom: { QID: entity.id },
    source: 'Wikidata'
  }

  const unknown = new Set(Object.keys(entity.claims))

  for (const prop in props) {
    const input = prepareValue(props[prop], entity, unknown)
    if (input) {
      const output = parseProp(prop, input, entity)
      if (output) {
        data[prop] = output
      }
    }
  }

  for (const prop of unknown) {
    if (prop in ignoredProps) {
      continue
    }

    logger.unmapped('[plugin-wikidata]', 'property', prop)
  }

  if (!data.title) {
    data.title = getLabel(entity)
  }

  // BEGIN: Hot-fix some types

  if (data['reviewed-title'] || data['reviewed-author']) {
    // not all
    if (data.type.slice(0, 6) !== 'review') {
      data.type = 'review'
    }

    // P921 (main subject) is used for review subjects and keywords
    delete data.keyword
  }

  if (data.recipient) {
    data.type = 'personal_communication'
  }

  if (data['event-title']) {
    data.type = 'paper-conference'
  }

  if (typeof data['part-number'] === 'number') {
    delete data['part-title']
  } else if (typeof data['part-title'] === 'string') {
    delete data['part-number']
  }

  if (data.type !== 'chapter' && data['chapter-number']) {
    delete data['chapter-number']
  }

  if (data['original-author'] && !data.author) {
    data.author = data['original-author']
  }

  // END

  return data
}

/**
 * Asynchronously parse entities from an API response.
 *
 * @access protected
 * @method parseAsync
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {Object} data - The input data
 * @return {Promise<Array<module:@citation-js/core~CSL>>} The formatted input data
 */
export async function parseEntitiesAsync ({ entities }) {
  return (await response.parseAsync(entities)).map(parseEntity)
}

/**
 * Parse entities from an API response.
 *
 * @access protected
 * @method parse
 * @memberof module:@citation-js/plugin-wikidata.parsers.entity
 * @param {Object} data - The input data
 * @return {Array<module:@citation-js/core~CSL>} The formatted input data
 */
export function parseEntities ({ entities }) {
  return response.parse(entities).map(parseEntity)
}

export {
  parseEntities as parse,
  parseEntitiesAsync as parseAsync,
  parseEntities as default
}
