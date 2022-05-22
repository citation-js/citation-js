/**
 * Gets the constructor name, with a special case for `null` and `undefined`
 *
 * @access public
 * @method typeOf
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {*} thing - input data or anything else
 *
 * @return {String} type
 */
export function typeOf (thing) {
  switch (thing) {
    case undefined:
      return 'Undefined'
    case null:
      return 'Null'
    default:
      return thing.constructor.name
  }
}

/**
 * @access public
 * @method dataTypeOf
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {*} thing - input data or anything else
 *
 * @return {module:@citation-js/core.plugins.input~dataType} dataType
 */
export function dataTypeOf (thing) {
  switch (typeof thing) {
    case 'string':
      return 'String'

    case 'object':
      if (Array.isArray(thing)) {
        return 'Array'
      } else if (typeOf(thing) === 'Object') {
        return 'SimpleObject'
      } else if (typeOf(thing) !== 'Null') {
        return 'ComplexObject'
      }
      // fall through when thing === null, return default value

    default:
      return 'Primitive'
  }
}
