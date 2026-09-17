import type { CSL } from '@citation-js/core'

type BibjsonName =
  | { name: string, [k: string]: string }
  | { lastname: string, firstname: string, [k: string]: string }
  | { lastName: string, firstName: string, [k: string]: string }

type BibjsonItem = {
  title: string
  author: Array<BibjsonName>
  [k: string]: any
}

type QuickscrapeItem = BibjsonItem & {
  link: Array<{
    type: string
    url: string
  }>
}

interface BibjsonCollection {
  metadata: {
    collection: any
  }
  records: Array<BibjsonItem>
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@bibjson/quickscrape+record+object': (input: QuickscrapeItem) => CSL
        '@bibjson/record+object': (input: BibjsonItem) => CSL
        '@bibjson/collection+object': (input: BibjsonCollection) => Array<BibjsonItem>
      }
    }
  }
}
