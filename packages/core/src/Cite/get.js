import { validateOutputOptions as validate } from './static.js'
import { format as formatData } from '../plugins/output.js'
import { clean as parseCsl } from '../plugins/input/csl.js'

/**
 * Get a list of the data entry IDs, in the order of that list
 *
 * @access public
 * @method getIds
 * @memberof module:@citation-js/core.Cite#
 *
 * @return {Array<String>} List of IDs
 */
export function getIds () {
  return this.data.map(entry => entry.id)
}

/**
 * Get formatted data from your object.
 *
 * @access public
 * @method format
 * @memberof module:@citation-js/core.Cite#
 *
 * @param {String} format - format module name
 * @param {...*} options - module options (see relevant documentation)
 *
 * @return {String|Array<Object>} formatted data
 */
export function format (format, ...options) {
  return formatData(format, parseCsl(this.data), ...options)
}

/**
 * Get formatted data from your object.
 *
 * @access public
 * @method get
 * @memberof module:@citation-js/core.Cite#
 * @tutorial output
 * @deprecated use {@link module:@citation-js/core.Cite#format}
 *
 * @param {module:@citation-js/core~OutputOptions} [options={}] - Output options
 *
 * @return {String|Array<Object>} The formatted data
 */
/* istanbul ignore next: deprecated */
export function get (options = {}) {
  validate(options)

  const parsedOptions = Object.assign({}, this.defaultOptions, this._options.output, options)

  const { type, style } = parsedOptions
  const [styleType, styleFormat] = style.split('-')
  const newStyle = styleType === 'citation' ? 'bibliography' : styleType === 'csl' ? 'data' : styleType
  const newType = type === 'string' ? 'text' : type === 'json' ? 'object' : type

  let formatOptions

  switch (newStyle) {
    case 'bibliography': {
      const { lang, append, prepend } = parsedOptions
      formatOptions = { template: styleFormat, lang, format: newType, append, prepend }
      break
    }

    case 'data':
    case 'bibtex':
    case 'bibtxt':
    case 'ndjson':
    case 'ris':
      formatOptions = { type: newType }
      break

    default:
      throw new Error(`Invalid style "${newStyle}"`)
  }

  const result = this.format(newStyle, Object.assign(formatOptions, options._newOptions))

  const { format } = parsedOptions
  if (format === 'real' && newType === 'html' && typeof document !== 'undefined' && typeof document.createElement === 'function') {
    const tmp = document.createElement('div')
    tmp.innerHTML = result
    return tmp.firstChild
  } else if (format === 'string' && typeof result === 'object') {
    return JSON.stringify(result)
  } else {
    return result
  }
}
