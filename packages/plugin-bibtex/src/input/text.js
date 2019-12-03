/**
 * @module input/bibtex
 */

import { util, logger } from '@citation-js/core'

import moo from 'moo'
import * as constants from './constants'

const identifier = /[a-zA-Z][a-zA-Z0-9_-]*/
const whitespace = {
  comment: /%.*/,
  whitespace: { match: /\s+/, lineBreaks: true }
}
const text = {
  command: /\\(?:[a-z]+|.) */,
  lbrace: { match: '{', push: 'bracedLiteral' },
  mathShift: { match: '$', push: 'mathLiteral' },
  whitespace: { match: /\s+/, lineBreaks: true }
}

const lexer = moo.states({
  main: {
    junk: { match: /@[cC][oO][mM][mM][eE][nN][tT].+|[^@]+/, lineBreaks: true },
    at: { match: '@', push: 'entry' }
  },
  entry: {
    ...whitespace,
    otherEntryType: {
      match: /[sS][tT][rR][iI][nN][gG]|[pP][rR][eE][aA][mM][bB][lL][eE]/,
      next: 'otherEntryContents'
    },
    dataEntryType: {
      match: identifier,
      next: 'dataEntryContents'
    }
  },
  otherEntryContents: {
    ...whitespace,
    lbrace: { match: /[{(]/, next: 'fields' }
  },
  dataEntryContents: {
    ...whitespace,
    lbrace: { match: /[{(]/, next: 'dataEntryContents' },
    label: /[^,\s]+/,
    comma: { match: ',', next: 'fields' }
  },
  fields: {
    ...whitespace,
    identifier,
    number: /-?\d+/,
    hash: '#',
    equals: '=',
    comma: ',',
    quote: { match: '"', push: 'quotedLiteral' },
    lbrace: { match: '{', push: 'bracedLiteral' },
    rbrace: { match: /[})]/, pop: true }
  },
  quotedLiteral: {
    ...text,
    quote: { match: '"', pop: true },
    text: /[^{$"\s\\]+/
  },
  bracedLiteral: {
    ...text,
    rbrace: { match: '}', pop: true },
    text: /[^{$}\s\\]+/
  },
  mathLiteral: {
    ...text,
    mathShift: { match: '$', pop: true },
    script: /[\^_]/,
    text: /[^{$}\s\\^_]+/
  }
})

const delimiters = {
  '(': ')',
  '{': '}'
}

export const bibtexGrammar = new util.Grammar({
  Main () {
    let entries = []

    while (true) {
      while (this.matchToken('junk')) {
        this.consumeToken('junk')
      }

      if (this.matchEndOfFile()) {
        break
      }

      entries.push(this.consumeRule('Entry'))
    }

    return entries.filter(Boolean)
  },

  _ () {
    let oldToken
    while (oldToken !== this.token) {
      oldToken = this.token
      this.consumeToken('whitespace', true)
      this.consumeToken('comment', true)
    }
  },

  Entry () {
    this.consumeToken('at')
    this.consumeRule('_')

    const type = (
      this.matchToken('otherEntryType')
        ? this.consumeToken('otherEntryType')
        : this.consumeToken('dataEntryType')
    ).value.toLowerCase()

    this.consumeRule('_')
    const openBrace = this.consumeToken('lbrace').value
    this.consumeRule('_')

    let result

    if (type === 'string') {
      const [key, value] = this.consumeRule('Field')
      this.state.strings[key] = value
    } else if (type === 'preamble') {
      this.consumeRule('Expression')
    } else {
      const label = this.consumeToken('label').value

      this.consumeRule('_')
      this.consumeToken('comma')
      this.consumeRule('_')

      const properties = this.consumeRule('EntryBody')

      result = { type, label, properties }
    }

    this.consumeRule('_')
    const closeBrace = this.consumeToken('rbrace')
    if (closeBrace !== delimiters[openBrace]) {
      logger.warn('[plugin-bibtex]', `entry started with "${openBrace}", but ends with "${closeBrace}"`)
    }

    return result
  },

  EntryBody () {
    let properties = {}

    while (this.matchToken('identifier')) {
      let [field, value] = this.consumeRule('Field')
      properties[field] = value

      this.consumeRule('_')
      if (this.consumeToken('comma', true)) {
        this.consumeRule('_')
      } else {
        break
      }
    }

    return properties
  },

  Field () {
    const field = this.consumeToken('identifier')

    this.consumeRule('_')
    this.consumeToken('equals')
    this.consumeRule('_')

    const value = this.consumeRule('Expression')

    return [field, value]
  },

  Expression () {
    let output = this.consumeRule('ExpressionPart')
    this.consumeRule('_')

    while (this.matchToken('hash')) {
      this.consumeToken('hash')
      this.consumeRule('_')
      output += this.consumeRule('ExpressionPart').toString()
      this.consumeRule('_')
    }

    return output
  },

  ExpressionPart () {
    if (this.matchToken('identifier')) {
      return this.state.strings[this.consumeToken('identifier').value] || ''
    } else if (this.matchToken('number')) {
      return this.consumeToken('number').value
    } else if (this.matchToken('quote')) {
      return this.consumeRule('QuoteString')
    } else if (this.matchToken('lbrace')) {
      return this.consumeRule('BracketString')
    }
  },

  QuoteString () {
    let output = ''
    this.consumeToken('quote')
    while (!this.matchToken('quote')) {
      output += this.consumeRule('Text')
    }
    this.consumeToken('quote')
    return output
  },

  BracketString () {
    let output = ''
    this.consumeToken('lbrace')
    while (!this.matchToken('rbrace')) {
      output += this.consumeRule('Text')
    }
    this.consumeToken('rbrace')
    return output
  },

  BracketText () {
    let output = ''
    this.consumeToken('lbrace')

    // Ignore braces as long as they are used for grouping commands
    while (this.matchToken('command')) {
      output += this.consumeRule('Command')
    }

    // If a non-command is encountered before closing, add braces to output
    if (!this.matchToken('rbrace')) {
      do {
        output += this.consumeRule('Text')
      } while (!this.matchToken('rbrace'))
      output = `{${output}}`
    }

    this.consumeToken('rbrace')
    return output
  },

  MathString () {
    let output = ''
    this.consumeToken('mathShift')
    while (!this.matchToken('mathShift')) {
      if (this.matchToken('script')) {
        const script = this.consumeToken('script').value
        const text = this.consumeRule('Text').replace(/^{|}$/g, '')
        output += constants.mathScripts[script][text[0]] + text.slice(1)
      } else {
        output += this.consumeRule('Text')
      }
    }
    this.consumeToken('mathShift')
    return output
  },

  Text () {
    let raw;
    if (this.matchToken('lbrace')) {
      raw = this.consumeRule('BracketText')
    } else if (this.matchToken('mathShift')) {
      raw = this.consumeRule('MathString')
    } else if (this.matchToken('whitespace')) {
      this.consumeToken('whitespace')
      raw = ' '
    } else if (this.matchToken('command')) {
      raw = this.consumeRule('Command')
    } else {
      raw = this.consumeToken('text').value.replace(
        constants.ligaturePattern,
        ligature => constants.ligatures[ligature]
      )
    }
    return raw.normalize();
  },

  Command () {
    const command = this.consumeToken('command').value.slice(1).trim()

    // command
    if (command in constants.commands) {
      return constants.commands[command]

    // diacritics
    } else if (command in constants.diacritics && !this.matchEndOfFile()) {
      if (this.matchToken('text')) {
        const text = this.consumeToken('text').value
        return text[0] + constants.diacritics[command] + text.slice(1)
      } else {
        return this.consumeRule('Text').replace(/^{|}$/g, '') + constants.diacritics[command]
      }

    // escapes
    } else if (/^\W$/.test(command)) {
      return command

    // unknown commands
    } else {
      return '\\' + command
    }
  }
}, {
  strings: Object.assign({}, constants.defaultStrings)
})

export function parse (text) {
  return bibtexGrammar.parse(lexer.reset(text))
}

export default parse
