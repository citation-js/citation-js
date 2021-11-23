// Adapted from plk/biblatex and BibTeXing[1] (accessed 2019-09-15)
// [1] http://mirrors.ctan.org/biblio/bibtex/base/btxdoc.pdf
import _required from './required.json'

// Adapted from plk/biblatex (accessed 2019-09-15)
import _fieldTypes from './fieldTypes.json'

// Adapted from latex3/latex3 (accessed 2020-05-05)
// https://github.com/latex3/latex3/blob/master/texmf/tex/latex/base/tuenc.def
import unicode from './unicode.json'

export const required = _required
export const fieldTypes = _fieldTypes
export const diacritics = unicode.diacritics
export const commands = unicode.commands

// Adapted from astrocite-bibtex (accessed 2018-02-22)
// https://github.com/dsifford/astrocite/blob/668a9e4/packages/astrocite-bibtex/src/constants.ts#L112-L148
export const defaultStrings = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
  acmcs: 'ACM Computing Surveys',
  acta: 'Acta Informatica',
  cacm: 'Communications of the ACM',
  ibmjrd: 'IBM Journal of Research and Development',
  ibmsj: 'IBM Systems Journal',
  ieeese: 'IEEE Transactions on Software Engineering',
  ieeetc: 'IEEE Transactions on Computers',
  ieeetcad: 'IEEE Transactions on Computer-Aided Design of Integrated Circuits',
  ipl: 'Information Processing Letters',
  jacm: 'Journal of the ACM',
  jcss: 'Journal of Computer and System Sciences',
  scp: 'Science of Computer Programming',
  sicomp: 'SIAM Journal on Computing',
  tocs: 'ACM Transactions on Computer Systems',
  tods: 'ACM Transactions on Database Systems',
  tog: 'ACM Transactions on Graphics',
  toms: 'ACM Transactions on Mathematical Software',
  toois: 'ACM Transactions on Office Information Systems',
  toplas: 'ACM Transactions on Programming Languages and Systems',
  tcs: 'Theoretical Computer Science'
}

export const formattingEnvs = {
  it: 'italics',
  itshape: 'italics',
  sl: 'italics',
  slshape: 'italics',
  em: 'italics',

  bf: 'bold',
  bfseries: 'bold',

  sc: 'smallcaps',
  scshape: 'smallcaps',

  // Font selection
  rm: undefined,
  sf: undefined,
  tt: undefined
}

export const formattingCommands = {
  textit: 'italics',
  textsl: 'italics',
  emph: 'italics',
  mkbibitalic: 'italics',
  mkbibemph: 'italics',

  textbf: 'bold',
  strong: 'bold',
  mkbibbold: 'bold',

  textsc: 'smallcaps',

  textsuperscript: 'superscript',
  textsubscript: 'subscript',

  enquote: 'quotes',
  mkbibquote: 'quotes',

  // Font selection
  textmd: undefined,
  textrm: undefined,
  textsf: undefined,
  texttt: undefined,
  textup: undefined
}

export const formatting = {
  italics: ['<i>', '</i>'],
  bold: ['<b>', '</b>'],
  superscript: ['<sup>', '</sup>'],
  subscript: ['<sub>', '</sub>'],
  smallcaps: ['<span style="font-variant:small-caps;">', '</span>'],
  nocase: ['<span class="nocase">', '</span>'],
  quotes: ['\u201C', '\u201D']
}

// Partly adapted from retorquere/bibtex-parser (2020-11-16)
// https://github.com/retorquere/bibtex-parser/blob/7ad73df/index.ts
export const argumentCommands = {
  ElsevierGlyph (glyph) { return String.fromCharCode(parseInt(glyph, 16)) },
  href (url, text) { return url },
  url (url) { return url }
}

export const ligaturePattern = /---?|''|``|~/g

export const ligatures = {
  '--': '\u2013',
  '---': '\u2014',
  '``': '\u201C',
  "''": '\u201D',
  '~': '\u00A0'
}

export const mathScriptFormatting = {
  '^': 'superscript',
  sp: 'superscript',

  _: 'subscript',
  sb: 'subscript',

  mathrm: undefined
}

/* eslint-disable quote-props */
export const mathScripts = {
  '^': {
    '0': '\u2070',
    '1': '\u00B9',
    '2': '\u00B2',
    '3': '\u00B3',
    '4': '\u2074',
    '5': '\u2075',
    '6': '\u2076',
    '7': '\u2077',
    '8': '\u2078',
    '9': '\u2079',
    '+': '\u207A',
    '-': '\u207B',
    '=': '\u207C',
    '(': '\u207D',
    ')': '\u207E',
    'i': '\u2071',
    'n': '\u207F'
  },
  '_': {
    '0': '\u2080',
    '1': '\u2081',
    '2': '\u2082',
    '3': '\u2083',
    '4': '\u2084',
    '5': '\u2085',
    '6': '\u2086',
    '7': '\u2087',
    '8': '\u2088',
    '9': '\u2089',
    '+': '\u208A',
    '-': '\u208B',
    '=': '\u208C',
    '(': '\u208D',
    ')': '\u208E',
    'a': '\u2090',
    'e': '\u2091',
    'o': '\u2092',
    'x': '\u2093',
    '\u0259': '\u2094',
    'h': '\u2095',
    'k': '\u2096',
    'l': '\u2097',
    'm': '\u2098',
    'n': '\u2099',
    's': '\u209A',
    'p': '\u209B',
    't': '\u209C'
  }
}
/* eslint-enable quote-props */

// Adapted from retorquere/bibtex-parser (2020-10-15)
// https://github.com/retorquere/bibtex-parser/blob/0c8bd92/index.ts#L416-L441
export const sentenceCaseLanguages = [
  'american',
  'british',
  'canadian',
  'english',
  'australian',
  'newzealand',
  'usenglish',
  'ukenglish',
  'en',
  'eng',
  'en-au',
  'en-bz',
  'en-ca',
  'en-cb',
  'en-gb',
  'en-ie',
  'en-jm',
  'en-nz',
  'en-ph',
  'en-tt',
  'en-us',
  'en-za',
  'en-zw',
  'anglais'
]
