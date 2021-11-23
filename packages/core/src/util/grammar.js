import { deepCopy } from './deepCopy.js'

/**
 * @typedef module:@citation-js/core.util.Grammar~ruleName
 * @type {String}
 */

/**
 * @callback module:@citation-js/core.util.Grammar~rule
 * @this module:@citation-js/core.util.Grammar
 */

/**
 * @memberof module:@citation-js/core.util
 *
 * @param {Object<module:@citation-js/core.util.Grammar~ruleName,module:@citation-js/core.util.Grammar~rule>} rules
 * @param {Object} state
 */
class Grammar {
  constructor (rules, state) {
    this.rules = rules
    this.defaultState = state
    this.mainRule = Object.keys(rules)[0]
    this.log = []
  }

  /**
   * @param iterator - lexer supporting formatError() and next()
   * @param [mainRule] - defaults to the first rule
   * @return result of the main rule
   */
  parse (iterator, mainRule) {
    this.lexer = iterator
    this.token = this.lexer.next()
    this.state = deepCopy(this.defaultState)
    this.log = []
    return this.consumeRule(mainRule || this.mainRule)
  }

  /**
   * @return {Boolean} true if there are no more tokens
   */
  matchEndOfFile () {
    return !this.token
  }

  /**
   * @param {String} type - a token type
   * @return {Boolean} true if the current token has the given type
   */
  matchToken (type) {
    return this.token && type === this.token.type
  }

  /**
   * @param {String} [type] - a token type
   * @param {Boolean} [optional=false] - false if it should throw an error if the type does not match
   * @return {Object} token information
   * @throws {SyntaxError} detailed syntax error if the current token is not the expected type or if there are no tokens left
   */
  consumeToken (type, optional) {
    const token = this.token

    if (!type || (token && token.type === type)) {
      this.token = this.lexer.next()
      return token
    } else if (optional) {
      return undefined
    } else {
      const got = token ? `"${token.type}"` : 'EOF'
      const error = new SyntaxError(this.lexer.formatError(token, `expected "${type}", got ${got}`))
      error.message += ` (${this.log.join('->')})`
      throw error
    }
  }

  /**
   * @param {String} rule - a rule name
   * @return whatever the rule function returns
   */
  consumeRule (rule) {
    this.log.push(rule)
    const result = this.rules[rule].call(this)
    this.log.pop()
    return result
  }
}

export { Grammar }
