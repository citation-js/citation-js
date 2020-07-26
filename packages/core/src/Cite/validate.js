const formats = ['real', 'string']
const types = ['json', 'html', 'string', 'rtf']
const styles = ['csl', 'bibtex', 'bibtxt', 'citation-*', 'ris', 'ndjson']
const wrapperTypes = ['string', 'function']

/**
 * @access public
 * @method validateOutputOptions
 * @memberof module:@citation-js/core.Cite
 *
 * @deprecated
 * @param {module:@citation-js/core~OutputOptions} - options
 *
 * @return {Boolean} true (if valid)
 * @throws {TypeError} Options not an object
 * @throws {TypeError} Invalid options
 * @throws {Error} Invalid options combination
 *
 * @todo check registers if styles and langs are present
 */
/* istanbul ignore next: deprecated */
export function validateOutputOptions (options) {
  if (typeof options !== 'object') {
    throw new TypeError('Options not an object!')
  }

  const { format, type, style, lang, append, prepend } = options

  if (format && !formats.includes(format)) {
    throw new TypeError(`Option format ("${format}") should be one of: ${formats}`)
  } else if (type && !types.includes(type)) {
    throw new TypeError(`Option type ("${type}") should be one of: ${types}`)
  } else if (style && !styles.includes(style) && !/^citation/.test(style)) {
    throw new TypeError(`Option style ("${style}") should be one of: ${styles}`)
  } else if (lang && typeof lang !== 'string') {
    throw new TypeError(`Option lang should be a string, but is a ${typeof lang}`)
  } else if (prepend && !wrapperTypes.includes(typeof prepend)) {
    throw new TypeError(`Option prepend should be a string or a function, but is a ${typeof prepend}`)
  } else if (append && !wrapperTypes.includes(typeof append)) {
    throw new TypeError(`Option append should be a string or a function, but is a ${typeof append}`)
  }

  if (/^citation/.test(style) && type === 'json') {
    throw new Error(`Combination type/style of json/citation-* is not valid: ${type}/${style}`)
  }

  return true
}

/**
 * @access public
 * @method valdiateOptions
 * @memberof module:@citation-js/core.Cite
 *
 * @param {module:@citation-js/core~InputOptions} - options
 *
 * @return {Boolean} true (if valid)
 * @throws {TypeError} Options not an object
 * @throws {TypeError} Invalid options
 *
 * @todo check registers if type is present
 */
export function validateOptions (options) {
  if (typeof options !== 'object') {
    throw new TypeError('Options should be an object')
  }

  /* istanbul ignore if: deprecated */
  if (options.output) {
    validateOutputOptions(options.output)
  } else if (options.maxChainLength && typeof options.maxChainLength !== 'number') {
    throw new TypeError('Option maxChainLength should be a number')
  } else if (options.forceType && typeof options.forceType !== 'string') {
    throw new TypeError('Option forceType should be a string')
  } else if (options.generateGraph != null && typeof options.generateGraph !== 'boolean') {
    throw new TypeError('Option generateGraph should be a boolean')
  } else if (options.strict != null && typeof options.strict !== 'boolean') {
    throw new TypeError('Option strict should be a boolean')
  } else if (options.target != null && typeof options.target !== 'string') {
    throw new TypeError('Option target should be a boolean')
  }

  return true
}
