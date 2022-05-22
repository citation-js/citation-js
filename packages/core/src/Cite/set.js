import { chain as parseInput, chainAsync as parseInputAsync } from '../plugins/input/index.js'
import fetchId from '../util/fetchId.js'

/**
 * Add an object to the array of objects
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {module:@citation-js/core~InputData} data - The data to add to your object
 * @param {module:@citation-js/core~InputOptions} [options] - Options
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {module:@citation-js/core.Cite} The updated parent object
 */
function add (data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save()
  }

  this.data.push(...parseInput(data, options))

  this.data
    .filter(entry => !Object.prototype.hasOwnProperty.call(entry, 'id'))
    .forEach(entry => {
      entry.id = fetchId(this.getIds(), 'temp_id_')
    })

  return this
}

/**
 * Add an object to the array of objects
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {module:@citation-js/core~InputData} data - The data to add to your object
 * @param {module:@citation-js/core~InputOptions} [options] - Options
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Promise<module:@citation-js/core.Cite>} The updated parent object
 */
async function addAsync (data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save()
  }

  this.data.push(...await parseInputAsync(data, options))

  this.data
    .filter(entry => !Object.prototype.hasOwnProperty.call(entry, 'id'))
    .forEach(entry => {
      entry.id = fetchId(this.getIds(), 'temp_id_')
    })

  return this
}

/**
 * Recreate a `Cite` object with almost any kind of data, and manipulate it with its default methods.
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {module:@citation-js/core~InputData} data - Replacement data
 * @param {module:@citation-js/core~InputOptions} [options] - Options
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {module:@citation-js/core.Cite} The updated parent object
 */
function set (data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save()
  }

  this.data = []
  return typeof options !== 'boolean' ? this.add(data, options) : this.add(data)
}

/**
 * Recreate a `Cite` object with almost any kind of data, and manipulate it with its default methods.
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {module:@citation-js/core~InputData} data - Replacement data
 * @param {module:@citation-js/core~InputOptions} [options] - Options
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {Promise<module:@citation-js/core.Cite>} The updated parent object
 */
async function setAsync (data, options = {}, log = false) {
  if (options === true || log === true) {
    this.save()
  }

  this.data = []
  return typeof options !== 'boolean' ? this.addAsync(data, options) : this.addAsync(data)
}

/**
 * Reset a `Cite` object.
 *
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {module:@citation-js/core.Cite} The updated, empty parent object (except the log, the log lives)
 */
function reset (log) {
  if (log) {
    this.save()
  }

  this.data = []
  this._options = {}

  return this
}

export { add, addAsync, set, setAsync, reset }
