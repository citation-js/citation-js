import { util } from '@citation-js/core'

import moo from 'moo'
import config from '../config.js'
import * as constants from './constants.js'
import { orderNamePieces, formatNameParts, getStringCase } from './name.js'

const commandKeywords = {
  '\\begin': 'commandBegin',
  '\\end': 'commandEnd'
}

const text = {
  command: {
    match: /\\(?:[a-zA-Z]+|.) */,
    type: command => commandKeywords[command],
    value: s => s.slice(1).trim()
  },
  lbrace: { match: '{', push: 'bracedLiteral' },
  mathShift: { match: '$', push: 'mathLiteral' },
  whitespace: {
    match: /[\s]+|~/,
    lineBreaks: true,
    // \xa0 = Non-breakable space
    value (token) { return token === '~' ? '\xa0' : ' ' }
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

function flattenConsString (string) {
  // eslint-disable-next-line no-unused-expressions
  string[0]
  return string
}

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
    return flattenConsString(output)
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
      list.push(flattenConsString(output))

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
    return flattenConsString(output)
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
      return encodeURI(uri)
    }
  },

  StringTitleCase () {
    this.state.sentenceCase = true
    let output = ''

    while (!this.matchEndOfFile()) {
      output += this.consumeRule('Text')
    }

    return flattenConsString(output)
  },

  BracketString () {
    let output = ''
    this.consumeToken('lbrace')

    const sentenceCase = this.state.sentenceCase
    // If the bracket string starts with a command the sentence case behavior
    // is maintained within the brackets.
    this.state.sentenceCase = sentenceCase && this.matchToken('command')
    this.state.partlyLowercase &&= this.state.sentenceCase

    while (!this.matchToken('rbrace')) {
      output += this.consumeRule('Text')
    }

    // topLevel meaning that the bracket string is not top level but a direct
    // child of the top level value.
    const topLevel = sentenceCase && !this.state.sentenceCase
    // Protect the case of the bracket string if it is a direct child of the top
    // level, and the string is partly lowercase.
    const protectCase = topLevel && this.state.partlyLowercase
    // Restore the sentence case of the outside of the brackets.
    this.state.sentenceCase = sentenceCase

    this.consumeToken('rbrace')

    return protectCase ? applyFormatting(output, 'nocase') : output
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

        continue
      }

      if (this.matchToken('command')) {
        const command = this.token.value
        if (command in constants.mathScriptFormatting) {
          this.consumeToken('command')
          const text = this.consumeRule('BracketString')
          output += applyFormatting(text, constants.mathScriptFormatting[command])
          continue
        }
      }

      output += this.consumeRule('Text')
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

    } else if (this.matchToken('command')) {
      return this.consumeRule('Command')
    }
    /* eslint-enable padded-blocks */

    const text = this.consumeToken('text').value.replace(
      constants.ligaturePattern,
      ligature => constants.ligatures[ligature]
    )

    const afterPunctuation = this.state.afterPunctuation
    this.state.afterPunctuation = /[?!.:]$/.test(text)

    // If the text fragment is not topLevel and has a case, check whether lowercase
    if (!this.state.sentenceCase) {
      this.state.partlyLowercase ||= text === text.toLowerCase() && text !== text.toUpperCase()
      return text
    }

    // Unicode-safe splitting (as in, accounting for surrogate pairs)
    const [first, ...otherCharacters] = text
    const rest = otherCharacters.join('')
    const restLowerCase = rest.toLowerCase()

    // Word case should be preserved for proper nouns (e.g. those with capital
    // letters in other places than the first letter).
    if (rest !== restLowerCase) {
      return text
    }

    if (!afterPunctuation) {
      return text.toLowerCase()
    }

    return first + restLowerCase
    // return first.toUpperCase() + restLowerCase
  },

  Command () {
    const commandToken = this.consumeToken('command')
    const command = commandToken.value

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

    // argument commands
    } else if (command in constants.argumentCommands) {
      const func = constants.argumentCommands[command]
      const args = []
      let arity = func.length

      while (arity-- > 0) {
        this.consumeToken('whitespace', true)
        args.push(this.consumeRule('BracketString'))
      }

      return func(...args)

    // escapes
    } else if (/^[&%$#_{}]$/.test(command)) {
      return commandToken.text.slice(1)

    // unknown commands
    } else {
      return commandToken.text
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
}, {
  sentenceCase: false,
  partlyLowercase: false,
  afterPunctuation: true
})

function singleLanguageIsEnglish (language) {
  return constants.sentenceCaseLanguages.includes(language.toLowerCase())
}

function isEnglish (languages) {
  if (Array.isArray(languages)) {
    return languages.every(singleLanguageIsEnglish)
  }
  return singleLanguageIsEnglish(languages)
}

function getMainRule (fieldType, languages) {
  if (fieldType[1] === 'name') {
    /* istanbul ignore next: does not exist */
    return fieldType[0] === 'list' ? 'StringNames' : 'Name'
  }

  if (fieldType[1] === 'title') {
    const option = config.parse.sentenceCase
    if (option === 'always' || (option === 'english' && isEnglish(languages))) {
      return 'StringTitleCase'
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

export function parse (text, field, languages = []) {
  const fieldType = constants.fieldTypes[field] || []
  return valueGrammar.parse(lexer.reset(text, {
    state: getLexerState(fieldType),
    line: 0,
    col: 0
  }), getMainRule(fieldType, languages))
}
