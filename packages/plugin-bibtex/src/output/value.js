import fieldTypes from '../input/fieldTypes'

/**
 * Mapping of BibTeX syntax chars to BibTeX Escaped Chars.
 *
 * From [Zotero's alwaysMap object](https://github.com/zotero/translators/blob/master/BibTeX.js#L225)
 * [REPO](https://github.com/zotero/translators)
 *
 * Accesed 11/20/2016
 *
 * @access private
 * @constant syntaxTokens
 * @default
 */
const syntaxTokens = {
  '|': '{\\textbar}',
  '<': '{\\textless}',
  '>': '{\\textgreater}',
  '~': '{\\textasciitilde}',
  '^': '{\\textasciicircum}',
  '\\': '{\\textbackslash}',
  // See http://tex.stackexchange.com/questions/230750/open-brace-in-bibtex-fields/230754
  '{': '\\{\\vphantom{\\}}',
  '}': '\\vphantom{\\{}\\}'
}

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
  return value.replace(/[|<>~^\\{}]/g, match => syntaxTokens[match])
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
    const prefixParts = name.prefix.split(/([ -])/)
    if (prefixParts.length === 1) {
      parts.push(name.prefix)
    }

    const last = prefixParts.pop()
    if (last[0] && last[0] === last[0].toUpperCase()) {
      prefixParts.push(`{${last}}`)
    } else {
      prefixParts.push(last)
    }

    parts[0] += prefixParts.join('') + ' '
  }

  if (name.family) {
    parts[0] += name.family.replace(/([ -])(.)([^ -]*)/g, (_, delimiter, first, rest) => {
      if (first === first.toLowerCase()) {
        return delimiter + `{${first + rest}}`
      } else {
        return delimiter + first + rest
      }
    })
  }

  if (name.suffix) {
    parts.push(name.suffix)
    parts.push(name.given || '')
  } else {
    parts.push(name.given)
  }

  return parts.join(', ').trim()
}

function formatSingleValue (value, valueType) {
  switch (valueType) {
    case 'title':
    case 'literal':
      return formatRichText(value)
    case 'name':
      return formatName(value)
    default:
      return escapeValue(value)
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
  if (!(field in fieldTypes)) {
    return formatSingleValue(value.toString(), 'verbatim')
  }

  const [listType, valueType] = fieldTypes[field]

  if (listType in listDelimiters) {
    return formatList(value, valueType, listType)
  } else {
    return formatSingleValue(value, valueType)
  }
}
