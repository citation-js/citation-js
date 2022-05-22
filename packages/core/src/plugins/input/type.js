import logger from '../../logger.js'
import { dataTypeOf } from './dataType.js'

// register
const types = {}
const dataTypes = {}

// extensions not registered as such
const unregExts = {}

/**
 * Hard-coded, for reasons
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input
 * @param {module:@citation-js/core.plugins.input~dataType} dataType
 * @return {module:@citation-js/core.plugins.input~format} native format
 */
function parseNativeTypes (input, dataType) {
  switch (dataType) {
    case 'Array':
      if (input.length === 0 || input.every(entry => type(entry) === '@csl/object')) {
        return '@csl/list+object'
      } else {
        return '@else/list+object'
      }

    case 'SimpleObject':
    case 'ComplexObject':
      // might, of course, be something completely else, but this is how the parser works
      return '@csl/object'

    default:
      return '@invalid'
  }
}

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {Array<module:@citation-js/core.plugins.input~format>} [typeList=[]]
 * @param {module:@citation-js/core~InputData} data
 *
 * @return {module:@citation-js/core.plugins.input~format} native format
 */
function matchType (typeList = [], data) {
  for (const type of typeList) {
    if (types[type].predicate(data)) {
      return matchType(types[type].extensions, data) || type
    }
  }
}

/**
 * @access public
 * @method type
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input
 *
 * @return {module:@citation-js/core.plugins.input~format} type
 */
export function type (input) {
  const dataType = dataTypeOf(input)

  // Empty array should be @csl/list+object too
  if (dataType === 'Array' && input.length === 0) {
    // Off-load to parseNativeTypes() to not repeat the name
    // '@csl/list+object' here as well, as it might change
    return parseNativeTypes(input, dataType)
  }

  const match = matchType(dataTypes[dataType], input)

  // If no matching formats found, test if native format,
  // else invalid input.
  return match || parseNativeTypes(input, dataType)
}

/**
 * @access public
 * @method addTypeParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} format
 * @param {module:@citation-js/core.plugins.input.util.TypeParser} typeParser
 */
export function addTypeParser (format, { dataType, predicate, extends: extend }) {
  // 1. check if any subclass formats are waiting for this format
  let extensions = []
  if (format in unregExts) {
    extensions = unregExts[format]
    delete unregExts[format]
    logger.debug('[core]', `Subclasses "${extensions}" finally registered to parent type "${format}"`)
  }

  // 2. create object with parser info
  const object = { predicate, extensions }
  types[format] = object

  // 3. determine which type lists the type should be added to
  if (extend) {
    // 3.1. if format is subclass, check if parent type is registered
    const parentTypeParser = types[extend]

    if (parentTypeParser) {
      // 3.1.1. if it is, add the type parser
      parentTypeParser.extensions.push(format)
    } else {
      // 3.1.2. if it isn't, register type as waiting
      if (!unregExts[extend]) {
        unregExts[extend] = []
      }
      unregExts[extend].push(format)
      logger.debug('[core]', `Subclass "${format}" is waiting on parent type "${extend}"`)
    }
  } else {
    // 3.2. else, add
    const typeList = dataTypes[dataType] || (dataTypes[dataType] = [])
    typeList.push(format)
  }
}

/**
 * @access public
 * @method hasTypeParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} type
 *
 * @return {Boolean} type parser is registered
 */
export function hasTypeParser (type) {
  return Object.prototype.hasOwnProperty.call(types, type)
}

/**
 * @access public
 * @method removeTypeParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} type
 */
export function removeTypeParser (type) {
  delete types[type]

  // Removing orphaned type refs
  const typeLists = [
    ...Object.keys(dataTypes).map(key => dataTypes[key]),
    ...Object.keys(types).map(type => types[type].extensions).filter(list => list.length > 0)
  ]
  typeLists.forEach(typeList => {
    const index = typeList.indexOf(type)
    if (index > -1) {
      typeList.splice(index, 1)
    }
  })
}

/**
 * @access public
 * @method listTypeParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @return {Array<module:@citation-js/core.plugins.input~format>} list of registered type parsers
 */
export function listTypeParser () {
  return Object.keys(types)
}

/**
 * @access public
 * @method treeTypeParser
 * @memberof module:@citation-js/core.plugins.input
 *
 * @return {Object} tree structure
 */
/* istanbul ignore next: debugging */
export function treeTypeParser () {
  const attachNode = name => ({ name, children: types[name].extensions.map(attachNode) })
  return {
    name: 'Type tree',
    children: Object.keys(dataTypes).map(name => ({
      name,
      children: dataTypes[name].map(attachNode)
    }))
  }
}

/**
 * Validate and parse the format name
 *
 * @access public
 * @method typeMatcher
 * @memberof module:@citation-js/core.plugins.input
 * @type {RegExp}
 */
export const typeMatcher = /^(?:@(.+?))(?:\/(?:(.+?)\+)?(?:(.+)))?$/
