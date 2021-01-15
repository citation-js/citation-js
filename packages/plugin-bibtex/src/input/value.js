/**
 * @module input/bibtex
 */

import { util } from '@citation-js/core'

import moo from 'moo'
import config from '../config'
import * as constants from './constants'
import { orderNamePieces, formatNameParts, getStringCase } from './name'

const text = {
  command: {
    match: /\\(?:[a-z]+|.) */,
    type: moo.keywords({
      commandBegin: '\\begin',
      commandEnd: '\\end',
      escape: ['\\&', '\\%', '\\$', '\\#', '\\_', '\\{', '\\}']
    }),
    value: s => s.slice(1).trim()
  },
  lbrace: { match: '{', push: 'bracedLiteral' },
  mathShift: { match: '$', push: 'mathLiteral' },
  whitespace: {
    match: /[\s~]+/,
    lineBreaks: true,
    // \xa0 = Non-breakable space
    value (token) { return token.includes('~') ? '\xa0' : ' ' }
  }
}

const lexer = moo.states({
  stringLiteral: {
    ...text,
    text: /[^{$}\s~\\]+/
  },
  namesLiteral: {
    and: /\s+and\s+/,
    comma: ',',
    hyphen: '-',
    equals: '=',
    ...text,
    text: /[^{$}\s~\\,=-]+/
  },
  listLiteral: {
    and: /\s+and\s+/,
    ...text,
    text: /[^{$}\s~\\]+/
  },
  separatedLiteral: {
    comma: ',',
    ...text,
    text: /[^{$}\s~\\,]+/
  },
  bracedLiteral: {
    ...text,
    rbrace: { match: '}', pop: true },
    text: /[^{$}\s~\\]+/
  },
  mathLiteral: {
    ...text,
    mathShift: { match: '$', pop: true },
    script: /[\^_]/,
    text: /[^{$}\s~\\^_]+/
  }
})

function applyFormatting (text, format) {
  if (format in constants.formatting) {
    return text && constants.formatting[format].join(text)
  } else {
    return text
  }
}

export const valueGrammar = new util.Grammar({
  String () {
    let output = ''
    while (!this.matchEndOfFile()) {
      output += this.consumeRule('Text')
    }
    return output
  },

  StringNames () {
    const list = []

    while (true) {
      this.consumeToken('whitespace', true)
      list.push(this.consumeRule('Name'))
      this.consumeToken('whitespace', true)

      if (this.matchEndOfFile()) {
        return list
      } else {
        this.consumeToken('and')
      }
    }
  },

  Name () {
    const pieces = []

    while (true) {
      pieces.push(this.consumeRule('NamePiece'))

      if (this.matchEndOfFile() || this.matchToken('and')) {
        return orderNamePieces(pieces)
      } else {
        this.consumeToken('comma')
        this.consumeToken('whitespace', true)
      }
    }
  },

  NamePiece () {
    const parts = []

    while (true) {
      const part = this.consumeRule('NameToken')

      if (part.label) {
        part.label = formatNameParts([...parts, { value: part.label }])
        return [part]
      }

      parts.push(part)

      if (this.matchEndOfFile() || this.matchToken('and') || this.matchToken('comma')) {
        return parts
      } else {
        while (this.matchToken('hyphen') || this.matchToken('whitespace')) {
          this.consumeToken()
        }
      }
    }
  },

  NameToken () {
    let upperCase = null
    let value = ''

    while (true) {
      // If needed, test regular text for case
      if (upperCase === null && this.matchToken('text')) {
        const text = this.consumeToken().value
        value += text
        upperCase = getStringCase(text)

      // If end of name part, return up
      } else if (this.matchEndOfFile() || this.matchToken('and') || this.matchToken('comma') || this.matchToken('whitespace')) {
        return { value, upperCase }

      // Same for hyphen, but note it is hyphenated
      } else if (this.matchToken('hyphen')) {
        return { value, upperCase, hyphenated: true }

      // If equals we are in BibLaTeX extended mode
      // 'family=Last, given=First, prefix=von'
      } else if (this.matchToken('equals')) {
        this.consumeToken('equals')
        const text = this.consumeRule('NamePiece')
        if (text[0].label) { value += '=' + text[0].label }
        return { value: formatNameParts(text), label: value }

      // Else consume other text
      } else {
        value += this.consumeRule('Text')
      }
    }
  },

  StringList () {
    const list = []
    while (!this.matchEndOfFile()) {
      let output = ''
      while (!this.matchEndOfFile() && !this.matchToken('and')) {
        output += this.consumeRule('Text')
      }
      list.push(output)

      this.consumeToken('and', true)
    }
    return list.length === 1 ? list[0] : list
  },

  StringSeparated () {
    const list = []
    while (!this.matchEndOfFile()) {
      let output = ''
      while (!this.matchEndOfFile() && !this.matchToken('comma')) {
        output += this.consumeRule('Text')
      }
      list.push(output.trim())

      this.consumeToken('comma', true)
      this.consumeToken('whitespace', true)
    }
    return list
  },

  StringVerbatim () {
    let output = ''
    while (!this.matchEndOfFile()) {
      output += this.consumeToken().text
    }
    return output
  },

  StringUri () {
    const uri = this.consumeRule('StringVerbatim')
    try {
      if (decodeURI(uri) === uri) {
        return encodeURI(uri)
      } else {
        return uri
      }
    } catch (e) {
      // malformed URI
      return uri
    }
  },

  StringTitleCase () {
    const topLevel = this.token.offset === 0
    let output = ''

    while (!this.matchEndOfFile()) {
      // In non-top-level calls, return early. Returning early in top-level cases
      // would work for valid strings but would not error for certain invalid
      // strings.
      if (!topLevel && (this.matchToken('commandEnd') || this.matchToken('rbrace'))) {
        break
      }

      output += this.consumeRule('TextTitleCase')
    }

    return output
  },

  TextTitleCase () {
    // Top-level bracket strings should preserve case, unless the first token
    // inside is a command. The latter part is handled in BracketStringTitleCase.
    if (this.matchToken('lbrace')) {
      return this.consumeRule('BracketStringTitleCase')

    // If commands are *not* enclosed in brackets, any bracket arguments count
    // as top-level bracket strings (the same with envs like \em).
    } else if (this.matchToken('command')) {
      return this.consumeRule('CommandTitleCase')

    // ...and the same goes for \begin{}...\end{} pairs
    } else if (this.matchToken('commandBegin')) {
      return this.consumeRule('EnclosedEnvTitleCase')

    // Other text should be lowercased to convert the title-case string to
    // sentence-case. The first letter of the entire string should always be
    // left as-is.
    } else {
      const token = this.token
      const text = this.consumeRule('Text')

      if (token.offset === 0) {
        // Unicode-safe(?) splitting (as in, accounting for surrogate pairs)
        const [first, ...rest] = text
        return first + rest.join('').toLowerCase()
      } else {
        return text.toLowerCase()
      }
    }
  },

  BracketStringTitleCase () {
    let output = ''

    this.consumeToken('lbrace')

    const preserveCase = !this.matchToken('command')
    let caseToPreserve = preserveCase

    while (!this.matchToken('rbrace')) {
      const text = this.consumeRule('Text')
      const textLowerCase = text.toLowerCase()

      caseToPreserve = caseToPreserve && text === textLowerCase
      output += preserveCase ? text : textLowerCase
    }

    this.consumeToken('rbrace')

    return caseToPreserve && output ? constants.formatting.nocase.join(output) : output
  },

  EnclosedEnvTitleCase () {
    this.consumeToken('commandBegin')
    const beginEnv = this.consumeRule('BracketString')
    const output = this.consumeRule('StringTitleCase')
    const end = this.consumeToken('commandEnd')
    const endEnv = this.consumeRule('BracketString')

    if (beginEnv !== endEnv) {
      throw new SyntaxError(this.lexer.formatError(
        end,
        `environment started with "${beginEnv}", ended with "${endEnv}"`)
      )
    }

    return applyFormatting(output, constants.formattingEnvs[beginEnv])
  },

  CommandTitleCase () {
    const command = this.token.value

    // formatting commands
    if (command in constants.formattingCommands) {
      this.consumeToken('command')
      const text = this.consumeRule('BracketStringTitleCase')
      return applyFormatting(text, constants.formattingCommands[command])

    // formatting envs
    } else if (command in constants.formattingEnvs) {
      this.consumeToken('command')
      const text = this.consumeRule('StringTitleCase')
      return applyFormatting(text, constants.formattingEnvs[command])

    // other
    } else {
      return this.consumeRule('Command')
    }
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

  MathString () {
    let output = ''
    this.consumeToken('mathShift')
    while (!this.matchToken('mathShift')) {
      if (this.matchToken('script')) {
        const script = this.consumeToken('script').value
        const text = this.consumeRule('Text').split('')
        if (text.every(char => char in constants.mathScripts[script])) {
          output += text.map(char => constants.mathScripts[script][char]).join('')
        } else {
          const formatName = constants.mathScriptFormatting[script]
          output += constants.formatting[formatName].join(text.join(''))
        }
      } else {
        output += this.consumeRule('Text')
      }
    }
    this.consumeToken('mathShift')
    return output
  },

  Text () {
    /* eslint-disable padded-blocks */
    if (this.matchToken('lbrace')) {
      return this.consumeRule('BracketString')

    } else if (this.matchToken('mathShift')) {
      return this.consumeRule('MathString')

    } else if (this.matchToken('whitespace')) {
      return this.consumeToken('whitespace').value

    } else if (this.matchToken('commandBegin')) {
      return this.consumeRule('EnclosedEnv')

    } else if (this.matchToken('escape')) {
      return this.consumeToken('escape').value

    } else if (this.matchToken('command')) {
      return this.consumeRule('Command')

    } else {
      return this.consumeToken('text').value.replace(
        constants.ligaturePattern,
        ligature => constants.ligatures[ligature]
      )
    }
    /* eslint-enable padded-blocks */
  },

  Command () {
    const command = this.consumeToken('command').value

    // formatting envs
    if (command in constants.formattingEnvs) {
      const text = this.consumeRule('Env')
      const format = constants.formattingEnvs[command]
      return applyFormatting(text, format)

    // formatting commands
    } else if (command in constants.formattingCommands) {
      const text = this.consumeRule('BracketString')
      const format = constants.formattingCommands[command]
      return applyFormatting(text, format)

    // commands
    } else if (command in constants.commands) {
      return constants.commands[command]

    // diacritics
    } else if (command in constants.diacritics && !this.matchEndOfFile()) {
      const text = this.consumeRule('Text')
      const diacritic = text[0] + constants.diacritics[command]
      return diacritic.normalize('NFC') + text.slice(1)

    // unknown commands
    } else {
      return '\\' + command
    }
  },

  Env () {
    let output = ''
    while (!this.matchEndOfFile() && !this.matchToken('rbrace')) {
      output += this.consumeRule('Text')
    }
    return output
  },

  EnclosedEnv () {
    this.consumeToken('commandBegin')
    const beginEnv = this.consumeRule('BracketString')

    let output = ''

    while (!this.matchToken('commandEnd')) {
      output += this.consumeRule('Text')
    }

    const end = this.consumeToken('commandEnd')
    const endEnv = this.consumeRule('BracketString')

    if (beginEnv !== endEnv) {
      throw new SyntaxError(this.lexer.formatError(
        end,
        `environment started with "${beginEnv}", ended with "${endEnv}"`)
      )
    }

    return applyFormatting(output, constants.formattingEnvs[beginEnv])
  }
})

function isEnglIsh (languages) {
  return languages.every(
    language => constants.sentenceCaseLanguages.includes(language)
  )
}

function getMainRule (fieldType, languages) {
  if (fieldType[1] === 'name') {
    return fieldType[0] === 'list' ? 'StringNames' : 'Name'
  }

  if (fieldType[1] === 'title') {
    const option = config.parse.sentenceCase
    if (option === 'force' || (option === 'english' && isEnglIsh(languages))) {
      return 'StringTitle'
    } else {
      return 'String'
    }
  }

  switch (fieldType[0] === 'field' ? fieldType[1] : fieldType[0]) {
    case 'list':
      return 'StringList'
    case 'separated':
      return 'StringSeparated'
    case 'verbatim':
      return 'StringVerbatim'
    case 'uri':
      return 'StringUri'
    case 'title':
    case 'literal':
    default:
      return 'String'
  }
}

function getLexerState (fieldType) {
  if (fieldType[1] === 'name') {
    return 'namesLiteral'
  }

  switch (fieldType[0]) {
    case 'list':
      return 'listLiteral'
    case 'separated':
      return 'separatedLiteral'
    case 'field':
    default:
      return 'stringLiteral'
  }
}

export function parse (text, field, languages) {
  const fieldType = constants.fieldTypes[field] || []
  return valueGrammar.parse(lexer.reset(text, {
    state: getLexerState(fieldType),
    line: 0,
    col: 0
  }), getMainRule(fieldType, languages))
}
