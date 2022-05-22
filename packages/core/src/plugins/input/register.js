import { FormatParser } from './parser.js'
import { addTypeParser, removeTypeParser } from './type.js'
import { addDataParser, removeDataParser } from './data.js'

/**
 * @access private
 * @type {Object<module:@citation-js/core.plugins.input~format, Object>}
 */
const formats = {}

/**
 * See the relevant tutorial: {@tutorial input_plugins}
 *
 * @access public
 * @method add
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} format - input format name
 * @param {module:@citation-js/core.plugins.input~parsers} parsers - parsers
 *
 * @tutorial input_plugins
 */
export function add (format, parsers) {
  const formatParser = new FormatParser(format, parsers)
  formatParser.validate()

  const index = formats[format] || (formats[format] = {})

  if (formatParser.typeParser) {
    addTypeParser(format, formatParser.typeParser)
    index.type = true
  }
  if (formatParser.dataParser) {
    addDataParser(format, formatParser.dataParser)
    index.data = true
  }
  if (formatParser.asyncDataParser) {
    addDataParser(format, formatParser.asyncDataParser)
    index.asyncData = true
  }

  if (parsers.outputs) {
    index.outputs = parsers.outputs
  }
}

/**
 * @access public
 * @method get
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} format - input format name
 * @returns {Object} index
 */
export function get (format) {
  return formats[format]
}

/**
 * @access public
 * @method remove
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core.plugins.input~format} format - input format name
 */
export function remove (format) {
  const index = formats[format]

  if (!index) {
    return
  }

  if (index.type) {
    removeTypeParser(format)
  }
  if (index.data) {
    removeDataParser(format)
  }
  if (index.asyncData) {
    removeDataParser(format, true)
  }

  delete formats[format]
}

/**
 * @access public
 * @method has
 * @memberof module:@citation-js/core.plugins.input
 * @param {module:@citation-js/core.plugins.input~format} format - input format name
 * @returns {Boolean} input format is registered
 */
export function has (format) {
  return format in formats
}

/**
 * @access public
 * @method list
 * @memberof module:@citation-js/core.plugins.input
 * @returns {Array<module:@citation-js/core.plugins.input~format>} input format is registered
 */
export function list () {
  return Object.keys(formats)
}
