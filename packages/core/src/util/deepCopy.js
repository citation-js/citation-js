/**
 * Duplicate objects to prevent Cite changing values outside of own scope
 *
 * @access protected
 * @memberof Cite.util
 *
 * @param {Object} obj - Input object
 * @param {Set} [seen]
 *
 * @return {Object} Duplicated object
 * @throw {TypeError}
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

// // Proper way to clone any object (apart from arrays perhaps).
// // Unfortunately to costly performance-wise.
// const object = Object.create(Object.getPrototypeOf(value))
// const descriptors = Object.getOwnPropertyDescriptors(value)
// for (let key in descriptors) {
//   const descriptor = descriptors[key]
//   if (descriptor.value) { descriptor.value = deepCopy(descriptor.value) }
//   Object.defineProperty(object, key, descriptor)
// }

export default deepCopy
