import { Cite, plugins } from '@citation-js/core'
import '@citation-js/plugin-bibjson'
import '@citation-js/plugin-bibtex'
import '@citation-js/plugin-csl'
import '@citation-js/plugin-doi'
import '@citation-js/plugin-ris'
import '@citation-js/plugin-url'
import '@citation-js/plugin-wikidata'

const a = new Cite({})
const b = a.format('bibliography', { style: 'apa' })
const c = a.format('bibliography', { style: 'apa', asEntryArray: true })

type Expect<T extends true> = T
type Not<T extends boolean> = T extends true ? false : true
type IsString<T> = T extends string ? true : false

// @ts-ignore
type Tests = [
  Expect<IsString<typeof b>>,
  Expect<Not<IsString<typeof c>>>,
]
