import type { CSL } from '@citation-js/core'

type RisEntry = Record<string, string|string[]>
type RisSpec = 'new' | 'mixed' | 'old'

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@ris/file': (input: string) => Array<RisEntry>
        '@ris/record': (input: RisEntry) => CSL
        '@ris/new+record': (input: RisEntry) => CSL
        '@ris/old+record': (input: RisEntry) => CSL
      }
    }

    namespace output {
      interface Formats {
        ris:
          | ((options: { format: 'object', spec?: RisSpec }) => Array<RisEntry>)
          | ((options?: { format?: 'text', spec?: RisSpec }) => string)
      }
    }
  }
}
