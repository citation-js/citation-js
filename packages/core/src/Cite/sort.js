import { getLabel } from '../plugin-common/output/label.js'
import { format as getName } from '@citation-js/name'

/**
 * @callback module:@citation-js/core.Cite#sort~sort
 * @param {module:@citation-js/core~CSL} a - element a
 * @param {module:@citation-js/core~CSL} b - element b
 * @return {Number} positive for a > b, negative for b > a, zero for a = b
 */

/**
 * Get value for comparing
 *
 * @access private
 * @method getComparisonValue
 *
 * @param {module:@citation-js/core~CSL} obj - obj
 * @param {String} prop - The prop in question
 * @param {Boolean} label - Prop is label
 *
 * @return {String|Number} something to compare
 */
function getComparisonValue (obj, prop, label = prop === 'label') {
  let value = label ? getLabel(obj) : obj[prop]

  switch (prop) {
    case 'author':
    case 'editor':
      return value.map(name => name.literal || name.family || getName(name))

    case 'accessed':
    case 'issued':
      return value['date-parts'][0]

    case 'page':
      return value.split('-').map(num => parseInt(num))

    case 'edition':
    case 'issue':
    case 'volume':
      value = parseInt(value)
      return !isNaN(value) ? value : -Infinity

    default:
      return value || -Infinity
  }
}

/**
 * Compares props
 *
 * @access private
 * @method compareProp
 *
 * @param {module:@citation-js/core~CSL} entryA
 * @param {module:@citation-js/core~CSL} entryB
 * @param {String} prop - The prop in question. Prepend ! to sort the other way around.
 * @param {Boolean} flip - Override flip
 *
 * @return {Number} positive for a > b, negative for b > a, zero for a = b (flips if prop has !)
 */
function compareProp (entryA, entryB, prop, flip = /^!/.test(prop)) {
  prop = prop.replace(/^!/, '')
  const a = getComparisonValue(entryA, prop)
  const b = getComparisonValue(entryB, prop)

  return (flip ? -1 : 1) * (a > b ? 1 : a < b ? -1 : 0)
}

/**
 * Generates a sorting callback based on props.
 *
 * @access private
 * @method getSortCallback
 *
 * @param {...String} props - How to sort
 *
 * @return {module:@citation-js/core.Cite#sort~sort} sorting callback
 */
function getSortCallback (...props) {
  return (a, b) => {
    const keys = props.slice()
    let output = 0

    while (!output && keys.length) {
      output = compareProp(a, b, keys.shift())
    }

    return output
  }
}

/**
 * Sort the dataset
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {module:@citation-js/core.Cite#sort~sort|Array<String>} [method=[]] - How to sort
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {module:@citation-js/core.Cite} The updated parent object
 */
function sort (method = [], log) {
  if (log) {
    this.save()
  }

  this.data.sort(typeof method === 'function' ? method : getSortCallback(...method, 'label'))

  return this
}

export { sort }
