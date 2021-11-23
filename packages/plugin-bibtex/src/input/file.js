import { util, logger } from '@citation-js/core'

import moo from 'moo'
import { defaultStrings } from './constants.js'

const identifier = /[a-zA-Z_][a-zA-Z0-9_:-]*/
const whitespace = {
  comment: /%.*/,
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
    lbrace: { match: '{', push: 'bracedLiteral' },
    quote: { match: '"', pop: true },
    text: { match: /(?:\\[\\{]|[^{"])+/, lineBreaks: true }
  },
  bracedLiteral: {
    lbrace: { match: '{', push: 'bracedLiteral' },
    rbrace: { match: '}', pop: true },
    text: { match: /(?:\\[\\{}]|[^{}])+/, lineBreaks: true }
  }
})

const delimiters = {
  '(': ')',
  '{': '}'
}

export const bibtexGrammar = new util.Grammar({
  Main () {
    const entries = []

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
    const closeBrace = this.consumeToken('rbrace').value
    if (closeBrace !== delimiters[openBrace]) {
      logger.warn('[plugin-bibtex]', `entry started with "${openBrace}", but ends with "${closeBrace}"`)
    }

    return result
  },

  EntryBody () {
    const properties = {}

    while (this.matchToken('identifier')) {
      const [field, value] = this.consumeRule('Field')
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
    const field = this.consumeToken('identifier').value.toLowerCase()

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
      return this.state.strings[this.consumeToken('identifier').value.toLowerCase()] || ''
    } else if (this.matchToken('number')) {
      return parseInt(this.consumeToken('number'))
    } else if (this.matchToken('quote')) {
      return this.consumeRule('QuoteString')
    } else {
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

  Text () {
    if (this.matchToken('lbrace')) {
      return `{${this.consumeRule('BracketString')}}`
    } else {
      return this.consumeToken('text').value
    }
  }
}, {
  strings: defaultStrings
})

export function parse (text) {
  return bibtexGrammar.parse(lexer.reset(text))
}
