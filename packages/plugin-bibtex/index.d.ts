import type { CSL } from '@citation-js/core'

interface BibtexEntry {
  type: string
  label: string
  properties: Record<string, string>
  annotations: Record<string, Record<string, string>>
}

interface BibtexTypeMapping {
  source: Record<string, string>
  target: Record<string, string>
}

interface BibtexConfig {
  constants: {
    required: {
      biblatex: Record<string, Array<string|string[]>>
      bibtex: Record<string, Array<string|string[]>>
    }

    fieldTypes: Record<string, [
      'field' | 'list' | 'separated',
      'code' | 'date' | 'entry key' | 'gender' | 'identifier' | 'integer' | 'key' | 'literal' | 'name' | 'options' | 'range' | 'string' | 'title' | 'uri' | 'verbatim'
    ]>

    diacritics: Record<string, string>
    commands: Record<string, string>
    ligatures: Record<string, string>
    ligaturePattern: RegExp

    mathScripts: {
      '^': Record<string, string>
      '_': Record<string, string>
    }

    formattingEnvs: Record<string, string>
    formattingCommands: Record<string, string>
    mathScriptFormatting: Record<string, string>
    formatting: Record<string, string>
    argumentCommands: Record<string, (...args: string[]) => string>
    sentenceCaseLanguages: Array<string>
    defaultStrings: Record<string, string>
  }

  types: {
    biblatex: BibtexTypeMapping
    bibtex: BibtexTypeMapping
  }

  parse: {
    biblatex: boolean
    strict: boolean
    sentenceCase: 'never'
  }

  format: {
    useIdAsLabel: boolean
    checkLabel: boolean
    asciiOnly: boolean
  }

  biber: {
    annotationMarker: string
    namedAnnotationMarker: string
  }
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@biblatex/text': (input: string) => Array<BibtexEntry>
        '@bibtex/text': (input: string) => Array<BibtexEntry>
        '@bibtxt/text': (input: string) => Array<BibtexEntry>

        '@biblatex/entry+object': (input: BibtexEntry) => Array<BibtexEntry>
        '@bibtex/entry+object': (input: BibtexEntry) => Array<BibtexEntry>

        '@biblatex/entries+list': (input: BibtexEntry[]) => Array<BibtexEntry>
        '@bibtex/entries+list': (input: BibtexEntry[]) => Array<BibtexEntry>
      }
    }

    namespace output {
      type FormatterSignature =
        | ((options: { format: 'object' }) => Array<BibtexEntry>)
        | ((options?: { format?: string }) => string)

      interface Formats {
        bibtex: FormatterSignature
        biblatex: FormatterSignature
        bibtxt: FormatterSignature
      }
    }

    namespace config {
      export function get (ref: '@bibtex'): BibtexConfig
    }
  }
}
