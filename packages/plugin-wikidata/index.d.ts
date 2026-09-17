import type { CSL } from '@citation-js/core'
import type { Item, LanguageCode } from 'wikibase-sdk'

interface WikibaseResponse {
  entities: Record<string, Item>
  success: 1
}

interface Config {
  langs: Array<LanguageCode>
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@wikidata/id': (input: string) => string[]
        '@wikidata/list+text': (input: string) => string[]

        '@wikidata/api': (input: string) => string
        '@wikidata/array+api': (input: string[]) => string[]

        '@wikidata/url': (input: string) => string
        '@wikidata/list+object': (input: string[]) => string[]

        '@wikidata/object': (input: WikibaseResponse) => Array<CSL>
        '@wikidata/array+object': (input: WikibaseResponse[]) => WikibaseResponse
      }
    }

    namespace config {
      export function get (ref: '@wikidata'): Config
    }
  }
}
