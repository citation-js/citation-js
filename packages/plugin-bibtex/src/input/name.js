/**
 * @access private
 * @param {String}
 * @returns {Boolean|null} true if uppercase, false if lowercase, null if neither
 */
export function getStringCase (string) {
  const a = string.toUpperCase()
  const b = string.toLowerCase()

  for (let i = 0; i < string.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] === string[i]
    }
  }

  return null
}

/**
 * @access private
 * @param {Array<Object>} parts
 * @return {String|undefined}
 */
export function formatNameParts (parts) {
  if (parts.length === 0) {
    return undefined
  }

  let piece = ''

  while (parts.length > 1) {
    const { value, hyphenated } = parts.shift()
    piece += value + (hyphenated ? '-' : ' ')
  }

  const output = piece + parts[0].value
  return output[0] && output
}

/**
 * @access private
 * @param {Array<Object>} parts
 * @param {Boolean} [orderGiven=true] - also consider the given name
 * @return {Array<String>}
 */
export function orderNameParts (parts, /* istanbul ignore next */ orderGiven = true) {
  const given = []
  const undecided = []

  if (orderGiven) {
    while (parts.length > 1 && parts[0].upperCase !== false) {
      given.push(...undecided)
      undecided.length = 0

      while (parts.length > 1 && parts[0].upperCase !== false && !parts[0].hyphenated) {
        given.push(parts.shift())
      }

      while (parts.length > 0 && parts[0].upperCase !== false && parts[0].hyphenated) {
        undecided.push(parts.shift())
      }
    }
  }

  const prefix = []
  const family = []

  while (parts.length > 1) {
    prefix.push(...family)
    family.length = 0

    while (parts.length > 1 && parts[0].upperCase === false) {
      prefix.push(parts.shift())
    }

    while (parts.length > 0 && parts[0].upperCase !== false) {
      family.push(parts.shift())
    }
  }

  if (undecided.length) {
    family.unshift(...undecided)
  }
  if (parts.length) {
    family.push(parts[0])
  }

  return [
    formatNameParts(given),
    formatNameParts(prefix),
    formatNameParts(family)
  ]
}

/**
 * @access private
 * @param {Array<Array<Object>>} pieces
 * @return {Object}
 */
export function orderNamePieces (pieces) {
  if (pieces[0][0].label) {
    const name = {}
    for (const [{ value, label }] of pieces) {
      name[label] = value
    }
    return name
  }

  const name = {}
  const [given, prefix, family] = orderNameParts(pieces[0], pieces.length === 1)

  if (family) {
    name.family = family
  }
  if (prefix) {
    name.prefix = prefix
  }

  if (pieces.length === 3) {
    name.given = formatNameParts(pieces[2])
    name.suffix = formatNameParts(pieces[1])
  } else if (pieces.length === 2) {
    name.given = formatNameParts(pieces[1])
  } else if (given) {
    name.given = given
  }

  return name
}
