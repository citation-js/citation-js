import type { CSL } from '@citation-js/core'

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@doi/api': (input: string) => CSL
        '@doi/short-url': (input: string) => string
        '@doi/id': (input: string) => Array<string>
        '@doi/list+text': (input: string) => Array<string>
        '@doi/list+object': (input: string[]) => Array<string>
        '@doi/type': (input: string) => string
      }
    }
  }
}
