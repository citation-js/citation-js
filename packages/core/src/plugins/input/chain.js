import deepCopy from '../../util/deepCopy'
import logger from '../../logger'

import {dataTypeOf} from './dataType'
import {type as parseType} from './type'
import {data as parseData, dataAsync as parseDataAsync} from './data'
import {applyGraph, removeGraph} from './graph'

class ChainParser {
  constructor (input, options = {}) {
    this.options = options
    this.type = this.options.forceType || parseType(input)
    this.data = dataTypeOf(input) === 'SimpleObject' ? deepCopy(input) : input
    this.graph = [
      {type: this.type, data: this.data}
    ]
    this.iteration = 0
  }

  iterate () {
    if (this.iteration !== 0) {
      this.type = parseType(this.data)
      this.graph.push({type: this.type})
    }

    const hasErrored = !!this.error
    const hasFinished = this.type === '@csl/list+object'

    if (hasErrored || hasFinished) {
      return false
    } else if (this.iteration >= this.options.maxChainLength) {
      this.error = new RangeError('Max. number of parsing iterations reached')
      return false
    } else {
      this.iteration++
      return true
    }
  }

  end () {
    if (this.error) {
      logger.error('[core]', this.error.message)
      if (this.options.strict !== false) {
        throw this.error
      } else {
        return []
      }
    } else {
      return this.data.map(this.options.generateGraph
        ? entry => applyGraph(entry, this.graph)
        : removeGraph
      )
    }
  }
}

/**
 * Parse input until success.
 *
 * @access protected
 * @method chain
 * @memberof Cite.plugins.input
 *
 * @param {InputData} input - input data
 * @param {Cite~InputOptions} [options] - options
 *
 * @return {Array<CSL>} The parsed input
 */
export const chain = (...args) => {
  let chain = new ChainParser(...args)

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
 * @memberof Cite.plugins.input
 *
 * @param {InputData} input - input data
 *
 * @return {Array<CSL>} The parsed input
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
 * @memberof Cite.plugins.input
 *
 * @param {InputData} input - input data
 * @param {Cite~InputOptions} [options] - options
 *
 * @return {Promise<Array<CSL>>} The parsed input
 */
export const chainAsync = async (...args) => {
  let chain = new ChainParser(...args)

  while (chain.iterate()) {
    chain.data = await parseDataAsync(chain.data, chain.type).catch(e => chain.error = e)
  }

  return chain.end()
}

/**
 * Parse input once. (async)
 *
 * @access protected
 * @method chainLinkAsync
 * @memberof Cite.plugins.input
 *
 * @param {InputData} input - The input data
 *
 * @return {Promise} The parsed input
 */
export const chainLinkAsync = async (input) => {
  const type = parseType(input)
  let output = type.match(/array|object/) ? deepCopy(input) : input

  return parseDataAsync(output, type)
}
