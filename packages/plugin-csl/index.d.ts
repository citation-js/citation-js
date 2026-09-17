import type { CSL, util } from '@citation-js/core'

interface Config {
  engine: (data: Array<CSL>, style: string, locale: string, format: string) => any
  locales: util.Register<string>
  styles: util.Register<string>
}

type Affixer = string | ((data: CSL) => string)

interface BaseOptions {
  style?: string
  lang?: string
  format?: string
  downgradeCsl?: boolean
}

interface BibliographyOptions extends BaseOptions {
  asEntryArray?: boolean
  nosort?: boolean
  hyperlinks?: boolean
  entry?: string|string[]
  prepend?: Affixer
  append?: Affixer
}

interface CitationItem {
  id: string
  locator?: string|number
  label?: 'appendix' | 'article-locator' | 'book' | 'canon' | 'chapter' | 'column' | 'elocation' | 'equation' | 'figure' | 'folio' | 'issue' | 'line' | 'note' | 'opus' | 'page' | 'paragraph' | 'part' | 'rule' | 'section' | 'sub-verbo' | 'supplement' | 'table' | 'timestamp' | 'title' | 'verse' | 'volume'
  'suppress-author'?: boolean
  'author-only'?: boolean
  prefix?: string
  suffix?: string
}

interface Citation {
  citationItems: Array<string|CitationItem>
  properties: { noteIndex?: number }
}

interface CitationOptions extends BaseOptions {
  entry: string | CitationItem | Array<string|CitationItem> | Citation
  citationsPre: Array<string | CitationItem | Array<string|CitationItem>>
  citationsPost: Array<string | CitationItem | Array<string|CitationItem>>
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace output {
      interface Formats {
        citation: (options: CitationOptions) => string
        bibliography:
          | ((options: BibliographyOptions & { asEntryArray: true }) => Array<[string, string]>)
          | ((options: BibliographyOptions & { asEntryArray?: false }) => string)
      }
    }

    namespace config {
      export function get (ref: '@csl'): Config
    }
  }
}
