import { type, typeMatcher } from './type.js'

/**
 * @memberof module:@citation-js/core.plugins.input.util
 * @param {module:@citation-js/core.plugins.input~typeParser} data
 */
class TypeParser {
  /**
   * @access protected
   * @type {Array<module:@citation-js/core.plugins.input~dataType>}
   */
  validDataTypes = ['String', 'Array', 'SimpleObject', 'ComplexObject', 'Primitive']

  constructor (data) {
    this.data = data
  }

  // ==========================================================================
  // Validation
  // ==========================================================================

  /**
   * @access protected
   * @throws {RangeError} if dataType is not valid
   */
  validateDataType () {
    const dataType = this.data.dataType
    if (dataType && !this.validDataTypes.includes(dataType)) {
      throw new RangeError(`dataType was ${dataType}; expected one of ${this.validDataTypes}`)
    }
  }

  /**
   * @access protected
   * @throws {TypeError} if predicate is not valid
   */
  validateParseType () {
    const predicate = this.data.predicate
    if (predicate && !(predicate instanceof RegExp || typeof predicate === 'function')) {
      throw new TypeError(`predicate was ${typeof predicate}; expected RegExp or function`)
    }
  }

  /**
   * @access protected
   * @throws {TypeError} if predicate is not valid
   */
  validateTokenList () {
    const tokenList = this.data.tokenList
    if (tokenList && typeof tokenList !== 'object') {
      throw new TypeError(`tokenList was ${typeof tokenList}; expected object or RegExp`)
    }
  }

  /**
   * @access protected
   * @throws {TypeError} if propertyConstraint is not valid
   */
  validatePropertyConstraint () {
    const propertyConstraint = this.data.propertyConstraint
    if (propertyConstraint && typeof propertyConstraint !== 'object') {
      throw new TypeError(`propertyConstraint was ${typeof propertyConstraint}; expected array or object`)
    }
  }

  /**
   * @access protected
   * @throws {TypeError} if elementConstraint is not valid
   */
  validateElementConstraint () {
    const elementConstraint = this.data.elementConstraint
    if (elementConstraint && typeof elementConstraint !== 'string') {
      throw new TypeError(`elementConstraint was ${typeof elementConstraint}; expected string`)
    }
  }

  /**
   * @access protected
   * @throws {TypeError} if extends is not valid
   */
  validateExtends () {
    const extend = this.data.extends
    if (extend && typeof extend !== 'string') {
      throw new TypeError(`extends was ${typeof extend}; expected string`)
    }
  }

  /**
   * @access public
   * @throws {TypeError|RangeError} if typeParser is not valid
   */
  validate () {
    if (this.data === null || typeof this.data !== 'object') {
      throw new TypeError(`typeParser was ${typeof this.data}; expected object`)
    }
    this.validateDataType()
    this.validateParseType()
    this.validateTokenList()
    this.validatePropertyConstraint()
    this.validateElementConstraint()
    this.validateExtends()
  }

  // ==========================================================================
  // Simplification helpers
  // ==========================================================================

  /**
   * @access protected
   * @return {Array<module:@citation-js/core.plugins.input~predicate>}
   */
  parseTokenList () {
    let tokenList = this.data.tokenList

    if (!tokenList) {
      return []
    } else if (tokenList instanceof RegExp) {
      tokenList = { token: tokenList }
    }

    const { token, split = /\s+/, trim = true, every = true } = tokenList

    const trimInput = (input) => trim ? input.trim() : input
    const testTokens = every ? 'every' : 'some'

    const predicate = (input) =>
      trimInput(input).split(split)[testTokens](part => token.test(part))

    return [predicate]
  }

  /**
   * @access protected
   * @return {Array<module:@citation-js/core.plugins.input~predicate>}
   */
  parsePropertyConstraint () {
    const constraints = [].concat(this.data.propertyConstraint || [])

    return constraints.map(({ props, match, value }) => {
      props = [].concat(props)

      switch (match) {
        case 'any': // fall-through
        case 'some': return input => props.some(prop => prop in input && (!value || value(input[prop])))
        case 'none': return input => !props.some(prop => prop in input && (!value || value(input[prop])))
        case 'every': // fall-through
        default: return input => props.every(prop => prop in input && (!value || value(input[prop])))
      }
    })
  }

  /**
   * @access protected
   * @return {Array<module:@citation-js/core.plugins.input~predicate>}
   */
  parseElementConstraint () {
    const constraint = this.data.elementConstraint
    return !constraint ? [] : [input => input.every(entry => type(entry) === constraint)]
  }

  /**
   * @access protected
   * @return {Array<module:@citation-js/core.plugins.input~predicate>}
   */
  parsePredicate () {
    if (this.data.predicate instanceof RegExp) {
      return [this.data.predicate.test.bind(this.data.predicate)]
    } else if (this.data.predicate) {
      return [this.data.predicate]
    } else {
      return []
    }
  }

  /**
   * @access protected
   * @return {module:@citation-js/core.plugins.input~predicate}
   */
  getCombinedPredicate () {
    const predicates = [
      ...this.parsePredicate(),
      ...this.parseTokenList(),
      ...this.parsePropertyConstraint(),
      ...this.parseElementConstraint()
    ]

    if (predicates.length === 0) {
      return () => true
    } else if (predicates.length === 1) {
      return predicates[0]
    } else {
      return input => predicates.every(predicate => predicate(input))
    }
  }

  /**
   * @access protected
   * @return {module:@citation-js/core.plugins.input~dataType}
   */
  getDataType () {
    if (this.data.dataType) {
      return this.data.dataType
    } else if (this.data.predicate instanceof RegExp) {
      return 'String'
    } else if (this.data.tokenList) {
      return 'String'
    } else if (this.data.elementConstraint) {
      return 'Array'
    } else {
      return 'Primitive'
    }
  }

  // ==========================================================================
  // Data simplification
  // ==========================================================================

  /**
   * @type {module:@citation-js/core.plugins.input~dataType}
   */
  get dataType () {
    return this.getDataType()
  }

  /**
   * @type {module:@citation-js/core.plugins.input~predicate}
   */
  get predicate () {
    return this.getCombinedPredicate()
  }

  /**
   * @type {module:@citation-js/core.plugins.input~format}
   */
  get extends () {
    return this.data.extends
  }
}

/**
 * @memberof module:@citation-js/core.plugins.input.util
 * @param {module:@citation-js/core.plugins.input~dataParser|module:@citation-js/core.plugins.input~asyncDataParser} parser
 * @param {Object} options
 * @param {Boolean} [options.async=false]
 */
class DataParser {
  constructor (parser, { async } = {}) {
    this.parser = parser
    this.async = async
  }

  // ==========================================================================
  // Validation
  // ==========================================================================

  /**
   * @throws {TypeError} if dataParser is not valid
   */
  validate () {
    const parser = this.parser
    if (typeof parser !== 'function') {
      throw new TypeError(`parser was ${typeof parser}; expected function`)
    }
  }
}

/**
 * @memberof module:@citation-js/core.plugins.input.util
 * @param {module:@citation-js/core.plugins.input~format} format
 * @param {module:@citation-js/core.plugins.input~parsers} parsers
 */
class FormatParser {
  constructor (format, parsers = {}) {
    this.format = format

    if (parsers.parseType) {
      this.typeParser = new TypeParser(parsers.parseType)
    }
    if (parsers.parse) {
      this.dataParser = new DataParser(parsers.parse, { async: false })
    }
    if (parsers.parseAsync) {
      this.asyncDataParser = new DataParser(parsers.parseAsync, { async: true })
    }
  }

  // ==========================================================================
  // Validation
  // ==========================================================================

  /**
   * @access protected
   * @throws {TypeError} if format is not valid
   */
  validateFormat () {
    const format = this.format
    if (!typeMatcher.test(format)) {
      throw new TypeError(`format name was "${format}"; didn't match expected pattern`)
    }
  }

  /**
   * @throws {TypeError} if formatParser is not valid
   */
  validate () {
    this.validateFormat()
    if (this.typeParser) {
      this.typeParser.validate()
    }
    if (this.dataParser) {
      this.dataParser.validate()
    }
    if (this.asyncDataParser) {
      this.asyncDataParser.validate()
    }
  }
}

export { TypeParser, DataParser, FormatParser }
