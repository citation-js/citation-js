import { validateOutputOptions as validate } from './validate.js'

/**
 * @memberof module:@citation-js/core.Cite#
 *
 * @constant {module:@citation-js/core~OutputOptions} defaultOptions - default output options
 */
const defaultOptions = { format: 'real', type: 'json', style: 'csl', lang: 'en-US' }

/**
 * Change the default options of a `Cite` object.
 *
 * @memberof Cite#
 *
 * @param {module:@citation-js/core~OutputOptions} options - The options for the output
 * @param {Boolean} [log=false] - Show this call in the log
 *
 * @return {module:@citation-js/core.Cite} The updated parent object
 */
function options (options, log) {
  validate(options)

  if (log) {
    this.save()
  }

  Object.assign(this._options, options)

  return this
}

export { options, defaultOptions }
