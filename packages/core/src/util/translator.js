/**
 * Mapping unit.
 *
 * @typedef {Object} module:@citation-js/core.util.Translator~statement
 * @property {String|Array<String>} [source] - properties to source value from
 * @property {String|Array<String>} [target] - properties the value should go to
 * @property {Object} [convert] - convert serialized or nested values
 * @property {module:@citation-js/core.util.Translator~convertProp} [convert.toTarget] - function to convert source prop to target
 * @property {module:@citation-js/core.util.Translator~convertProp} [convert.toSource] - function to convert target prop to source
 * @property {Object} [when] - conditions as to when this statement should apply
 * @property {module:@citation-js/core.util.Translator~condition} [when.source]
 * @property {module:@citation-js/core.util.Translator~condition} [when.target]
 */

/**
 * In the case of toTarget, source is input and target is output. In the case of
 * toSource, source is output and target is input.
 *
 * @callback module:@citation-js/core.util.Translator~convertProp
 * @param {...*} input - input values
 * @return {Array|*} If output is an array and multiple output properties are
 *                   specified, the output is divided over those properties.
 */

/**
 * A top-level Boolean enables or disables a mapping unit in a given direction.
 * Otherwise, individual properties are checked with an object specifying the
 * property name and one of four things:
 *
 *  - A boolean, checking for presence of the property
 *  - An array of values for checking whether the property value is in them
 *  - A value that should match with the property value
 *  - A predicate function taking in the value and returning a boolean
 *
 * All conditions have to be fulfilled for the mapping unit to be enabled.
 *
 * @typedef {Boolean|Object<String,Boolean|Array<*>|module:@citation-js/core.util.Translator~conditionPropPredicate|*>} module:@citation-js/core.util.Translator~condition
 */

/**
 * Return, based on a property, whether a mapping should apply.
 *
 * @callback module:@citation-js/core.util.Translator~conditionPropPredicate
 * @param {*} input - input value
 * @return {Boolean}
 */

/**
 * Return, whether a mapping should apply.
 *
 * @callback module:@citation-js/core.util.Translator~conditionPredicate
 * @param {Object} input - input
 * @return {Boolean}
 */

/**
 * @access private
 * @memberof module:@citation-js/core.util.Translator
 * @param {module:@citation-js/core.util.Translator~condition} condition
 * @return {module:@citation-js/core.util.Translator~conditionPredicate}
 */
function createConditionEval (condition) {
  return function conditionEval (input) {
    if (typeof condition === 'boolean') {
      return condition
    }

    return Object.keys(condition).every(prop => {
      const value = condition[prop]
      if (value === true) {
        return prop in input
      } else if (value === false) {
        return !(prop in input)
      } else if (typeof value === 'function') {
        return value(input[prop])
      } else if (Array.isArray(value)) {
        return value.includes(input[prop])
      } else {
        return input[prop] === value
      }
    })
  }
}

/**
 * @access private
 * @typedef {Object} module:@citation-js/core.util.Translator~normalizedStatement
 * @property {Array<String>} inputProp
 * @property {Array<String>} outputProp
 * @property {module:@citation-js/core.util.Translator~convertProp} convert
 * @property {module:@citation-js/core.util.Translator~conditionPredicate} condition
 */

/**
* @access private
* @memberof module:@citation-js/core.util.Translator
* @param {module:@citation-js/core.util.Translator~statement} prop
* @param {Boolean} toSource
* @return {module:@citation-js/core.util.Translator~normalizedStatement} normalized one-directional object
*/
function parsePropStatement (prop, toSource) {
  let inputProp
  let outputProp
  let convert
  let condition

  if (typeof prop === 'string') {
    inputProp = outputProp = prop
  } else if (prop) {
    inputProp = toSource ? prop.target : prop.source
    outputProp = toSource ? prop.source : prop.target

    if (prop.convert) {
      convert = toSource ? prop.convert.toSource : prop.convert.toTarget
    }

    if (prop.when) {
      condition = toSource ? prop.when.target : prop.when.source
      if (condition != null) {
        condition = createConditionEval(condition)
      }
    }
  } else {
    return null
  }

  inputProp = [].concat(inputProp).filter(Boolean)
  outputProp = [].concat(outputProp).filter(Boolean)

  return { inputProp, outputProp, convert, condition }
}

/**
 * Return, whether a mapping should apply.
 *
 * @callback module:@citation-js/core.util.Translator~convert
 * @param {Object} input - input
 * @return {Object} output
 */

/**
* @access private
* @memberof module:@citation-js/core.util.Translator
* @param {Array<module:@citation-js/core.util.Translator~statement>} props
* @param {Boolean} toSource
* @return {module:@citation-js/core.util.Translator~convert} converter
*/
function createConverter (props, toSource) {
  toSource = toSource === Translator.CONVERT_TO_SOURCE
  props = props.map(prop => parsePropStatement(prop, toSource)).filter(Boolean)

  return function converter (input) {
    const output = {}

    for (const { inputProp, outputProp, convert, condition } of props) {
      // Skip when no output will be assigned
      if (outputProp.length === 0) {
        continue
      // Skip when requested by the requirements of the prop converter
      } else if (condition && !condition(input)) {
        continue
      // Skip when none of the required props are in the input data
      // NOTE: if no input is required, do not skip
      } else if (inputProp.length !== 0 && inputProp.every(prop => !(prop in input))) {
        continue
      }

      let outputData = inputProp.map(prop => input[prop])
      if (convert) {
        try {
          const converted = convert.apply(input, outputData)
          outputData = outputProp.length === 1 ? [converted] : converted
        } catch (cause) {
          throw new Error(`Failed to convert ${inputProp} to ${outputProp}`, { cause })
        }
      }

      outputProp.forEach((prop, index) => {
        const value = outputData[index]
        if (value !== undefined) {
          output[prop] = value
        }
      })
    }

    return output
  }
}

/**
 * @memberof module:@citation-js/core.util
 *
 * @param {Array<module:@citation-js/core.util.Translator~statement>} props
 *
 * @todo proper merging (?)
 * @todo 'else' conditions
 */
class Translator {
  constructor (props) {
    /**
     * @type {module:@citation-js/core.util.Translator~convert}
     */
    this.convertToSource = createConverter(props, Translator.CONVERT_TO_SOURCE)

    /**
     * @type {module:@citation-js/core.util.Translator~convert}
     */
    this.convertToTarget = createConverter(props, Translator.CONVERT_TO_TARGET)
  }
}

/**
 * @memberof module:@citation-js/core.util.Translator
 * @property {Symbol} CONVERT_TO_SOURCE
 */
Translator.CONVERT_TO_SOURCE = Symbol('convert to source')

/**
 * @memberof module:@citation-js/core.util.Translator
 * @property {Symbol} CONVERT_TO_TARGET
 */
Translator.CONVERT_TO_TARGET = Symbol('convert to target')

export { Translator }
