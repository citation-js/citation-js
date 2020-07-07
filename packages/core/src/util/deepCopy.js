/**
 * Duplicate objects to prevent Cite changing values outside of own scope
 *
 * @access protected
 * @method deepCopy
 * @memberof module:@citation-js/core.util
 *
 * @param {Object} obj - Input object
 * @param {Set} [seen]
 *
 * @return {Object} Duplicated object
 * @throws {TypeError}
 */
export function deepCopy (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || (value.constructor !== Object && value.constructor !== Array)) {
    return value
  }

  if (seen.has(value)) {
    throw new TypeError('Recursively copying circular structure')
  }

  seen.add(value)
  let copy

  if (value.constructor === Array) {
    copy = value.map(value => deepCopy(value, seen))
  } else {
    const object = {}
    for (const key in value) {
      object[key] = deepCopy(value[key], seen)
    }
    copy = object
  }

  seen.delete(value)
  return copy
}

// // Unfortunately too costly performance-wise, but the
// // proper way to clone any object (apart from arrays perhaps):
// const object = Object.create(Object.getPrototypeOf(value))
// const descriptors = Object.getOwnPropertyDescriptors(value)
// for (let key in descriptors) {
//   const descriptor = descriptors[key]
//   if (descriptor.value) { descriptor.value = deepCopy(descriptor.value) }
//   Object.defineProperty(object, key, descriptor)
// }

export default deepCopy
