function createConditionEval (condition) {
  return function conditionEval (input) {
    if (typeof condition === 'boolean') {
      return condition
    }

    return Object.entries(condition).every(([prop, value]) => {
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

function createConverter (props, toSource) {
  toSource = toSource === Translator.CONVERT_TO_SOURCE
  props = props.map(prop => parsePropStatement(prop, toSource)).filter(Boolean)

  return function converter (input) {
    let output = {}

    for (let { inputProp, outputProp, convert, condition } of props) {
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
        let converted = convert.apply(input, outputData)
        outputData = outputProp.length === 1 ? [converted] : converted
      }

      outputProp.forEach((prop, index) => {
        let value = outputData[index]
        if (value !== undefined) {
          output[prop] = value
        }
      })
    }

    return output
  }
}

/**
 * @todo proper merging (?)
 * @todo 'else' conditions
 */
export class Translator {
  constructor (props) {
    this.convertToSource = createConverter(props, Translator.CONVERT_TO_SOURCE)
    this.convertToTarget = createConverter(props, Translator.CONVERT_TO_TARGET)
  }
}

Translator.CONVERT_TO_SOURCE = Symbol('convert to source')
Translator.CONVERT_TO_TARGET = Symbol('convert to target')
