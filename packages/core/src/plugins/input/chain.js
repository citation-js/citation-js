import { deepCopy, upgradeCsl } from '../../util/index.js'
import logger from '../../logger.js'

import { get as getTypeInfo } from './register.js'
import { type as parseType } from './type.js'
import { data as parseData, dataAsync as parseDataAsync } from './data.js'
import { applyGraph, removeGraph } from './graph.js'

/**
 * @access private
 * @param {Array<Object>} graph
 */
function prepareParseGraph (graph) {
  return graph
    // collapse continuous iterations of the same type
    .reduce((array, next) => {
      const last = array[array.length - 1]
      if (last && last.type === next.type) {
        last.count = last.count + 1 || 2
      } else {
        array.push(next)
      }
      return array
    }, [])
    // presentation
    .map(element => (element.count > 1 ? element.count + 'x ' : '') + element.type)
    .join(' -> ')
}

/**
 * @access private
 * @memberof module:@citation-js/core.plugins.input
 * @constructor ChainParser
 *
 * @param {module:@citation-js/core~InputData} input
 * @param {module:@citation-js/core~InputOptions} options
 */
class ChainParser {
  constructor (input, options = {}) {
    this.options = Object.assign({
      generateGraph: true,
      forceType: parseType(input),
      maxChainLength: 10,
      strict: true,
      target: '@csl/list+object'
    }, options)

    this.type = this.options.forceType
    this.data = typeof input === 'object' ? deepCopy(input) : input
    this.graph = [
      { type: this.type, data: input }
    ]
    this.iteration = 0
  }

  /**
   * After a round of data parsing, update type information and check targets.
   *
   * @access public
   * @return {Boolean} Whether this is the last iteration or not
   */
  iterate () {
    if (this.iteration !== 0) {
      const typeInfo = getTypeInfo(this.type)

      if (typeInfo && typeInfo.outputs) {
        this.type = typeInfo.outputs
      } else {
        this.type = parseType(this.data)
      }

      this.graph.push({ type: this.type })
    }

    if (this.error || this.type === this.options.target) {
      return false
    } else if (this.iteration >= this.options.maxChainLength) {
      this.error = new RangeError(`Max. number of parsing iterations reached (${
        prepareParseGraph(this.graph)
      })`)
      return false
    } else {
      this.iteration++
      return true
    }
  }

  /**
   * Finish the iteration and return parsed data.
   *
   * @access public
   * @return Array<module:@citation-js/core~CSL>
   */
  end () {
    if (this.error) {
      logger.error('[core]', this.error.message)
      if (this.options.strict !== false) {
        throw this.error
      } else {
        return []
      }
    } else if (this.options.target === '@csl/list+object') {
      return upgradeCsl(this.data).map(this.options.generateGraph
        ? entry => applyGraph(entry, this.graph)
        : removeGraph
      )
    } else {
      return this.data
    }
  }
}

/**
 * Parse input until success.
 *
 * @access protected
 * @method chain
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - input data
 * @param {module:@citation-js/core~InputOptions} [options] - options
 *
 * @return {Array<module:@citation-js/core~CSL>} The parsed input
 */
export const chain = (...args) => {
  const chain = new ChainParser(...args)

  while (chain.iterate()) {
    try {
      chain.data = parseData(chain.data, chain.type)
    } catch (e) {
      chain.error = e
    }
  }

  return chain.end()
}

/**
 * Parse input once.
 *
 * @access protected
 * @method chainLink
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - input data
 *
 * @return {module:@citation-js/core~InputData} The parsed input
 */
export const chainLink = (input) => {
  const type = parseType(input)
  const output = type.match(/array|object/) ? deepCopy(input) : input

  return parseData(output, type)
}

/**
 * Parse input until success. (async)
 *
 * @access protected
 * @method chainAsync
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - input data
 * @param {module:@citation-js/core~InputOptions} [options] - options
 *
 * @return {Promise<Array<module:@citation-js/core~CSL>>} The parsed input
 */
export const chainAsync = async (...args) => {
  const chain = new ChainParser(...args)

  while (chain.iterate()) {
    chain.data = await parseDataAsync(chain.data, chain.type).catch(e => { chain.error = e })
  }

  return chain.end()
}

/**
 * Parse input once. (async)
 *
 * @access protected
 * @method chainLinkAsync
 * @memberof module:@citation-js/core.plugins.input
 *
 * @param {module:@citation-js/core~InputData} input - The input data
 *
 * @return {Promise<module:@citation-js/core~InputData>} The parsed input
 */
export const chainLinkAsync = async (input) => {
  const type = parseType(input)
  const output = type.match(/array|object/) ? deepCopy(input) : input

  return parseDataAsync(output, type)
}
