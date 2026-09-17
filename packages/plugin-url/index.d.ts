import type { CSL } from '@citation-js/core'

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@else/url': (input: string) => string
      }
    }
  }
}
