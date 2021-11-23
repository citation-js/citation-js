import { diacritics, commands, ligatures, fieldTypes } from '../input/constants.js'

const unicode = {}
for (const command in commands) { unicode[commands[command]] = command }
for (const diacritic in diacritics) { unicode[diacritics[diacritic]] = diacritic }
for (const ligature in ligatures) { unicode[ligatures[ligature]] = ligature }

// eslint-disable-next-line no-misleading-character-class
const UNSAFE_UNICODE = /[^a-zA-Z0-9\s!"#%&'()*+,\-./:;=?@[\]{}\u0300-\u0308\u030a-\u030c\u0332\u0323\u0327\u0328\u0361\u0326]/g
const DIACRITIC_PATTERN = /.[\u0300-\u0308\u030a-\u030c\u0332\u0323\u0327\u0328\u0361\u0326]+/g

const listDelimiters = {
  separated: ',',
  list: ' and '
}

const richTextMappings = {
  i: '\\textit{',
  b: '\\textbf{',
  sc: '\\textsc{',
  sup: '\\textsuperscript{',
  sub: '\\textsubscript{',
  'span style="font-variant:small-caps;"': '\\textsc{',
  'span class="nocase"': '{'
}

function escapeValue (value) {
  return value
    .normalize('NFKD')
    .replace(UNSAFE_UNICODE, char => char in unicode
      ? unicode[char] in ligatures ? unicode[char] : `\\${unicode[char]}{}`
      : ''
    )
    .replace(DIACRITIC_PATTERN, match => Array.from(match).reduce(
      (subject, diacritic) => `{\\${unicode[diacritic]} ${subject}}`
    ))
}

function formatRichText (value) {
  const closingTags = []
  let tokens = value.split(/<(\/?(?:i|b|sc|sup|sub|span)|span .*?)>/g)

  // split, so odd values are text and even values are rich text tokens
  tokens = tokens.map((token, index) => {
    if (index % 2 === 0) {
      return escapeValue(token)
    } else if (token in richTextMappings) {
      closingTags.push('/' + token.split(' ')[0])
      return richTextMappings[token]
    } else if (token === closingTags[closingTags.length - 1]) {
      closingTags.pop()
      return '}'
    } else {
      return ''
    }
  })

  return tokens.join('')
}

function formatName (name) {
  // Return literal names as-is
  if (name.family && !name.prefix && !name.given & !name.suffix) {
    // Hack as names including " and " are already wrapped in brackets
    return name.family.includes(listDelimiters.list) ? name.family : `{${name.family}}`
  }

  const parts = ['']

  if (name.prefix && name.family) {
    parts[0] += name.prefix + ' '
  }

  if (name.family) {
    parts[0] += name.family
  }

  if (name.suffix) {
    parts.push(name.suffix)
    parts.push(name.given || '')
  } else {
    parts.push(name.given)
  }

  return escapeValue(parts.join(', ').trim())
}

function formatTitle (title) {
  // Use this again when Safari supports lookbehinds
  // return formatRichText(title).replace(/(?<!^|:\s*)\b[a-z]*[A-Z].*?\b/g, '{$&}')
  return formatRichText(title)
    .split(/(:\s*)/)
    .map((part, i) => i % 2 ? part : part.replace(/(?!^)\b[a-z]*[A-Z].*?\b/g, '{$&}'))
    .join('')
}

function formatSingleValue (value, valueType) {
  switch (valueType) {
    case 'title':
      return formatTitle(value)
    case 'literal':
      return formatRichText(value.toString())
    case 'name':
      return formatName(value)
    case 'verbatim':
    case 'uri':
      return value.toString()
    default:
      return escapeValue(value.toString())
  }
}

function formatList (values, valueType, listType) {
  const delimiter = listDelimiters[listType]
  return values.map(value => {
    const formatted = formatSingleValue(value, valueType)
    return formatted.includes(delimiter) ? `{${formatted}}` : formatted
  }).join(delimiter)
}

export function format (field, value) {
  /* istanbul ignore if: not relevant in normal use */
  if (!(field in fieldTypes)) {
    return formatSingleValue(value, 'verbatim')
  }

  const [listType, valueType] = fieldTypes[field]

  if (listType in listDelimiters) {
    return formatList(value, valueType, listType)
  } else {
    return formatSingleValue(value, valueType)
  }
}
