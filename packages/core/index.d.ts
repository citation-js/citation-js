export type CSLName = {
  family?: string
  given?: string
  'dropping-particle'?: string
  'non-dropping-particle'?: string
  suffix?: string
  literal?: string
}

type CSLDatePart = [string | number] | [string | number, string | number] | [string | number, string | number, string | number]

export type CSLDate = {
  'date-parts'?: [CSLDatePart] | [CSLDatePart, CSLDatePart]
  season?: string | number
  circa?: string | number | boolean
  literal?: string
  raw?: string
}

export type CSLType = 'article'
  | 'article-journal'
  | 'article-magazine'
  | 'article-newspaper'
  | 'bill'
  | 'book'
  | 'broadcast'
  | 'chapter'
  | 'classic'
  | 'collection'
  | 'dataset'
  | 'document'
  | 'entry'
  | 'entry-dictionary'
  | 'entry-encyclopedia'
  | 'event'
  | 'figure'
  | 'graphic'
  | 'hearing'
  | 'interview'
  | 'legal_case'
  | 'legislation'
  | 'manuscript'
  | 'map'
  | 'motion_picture'
  | 'musical_score'
  | 'pamphlet'
  | 'paper-conference'
  | 'patent'
  | 'performance'
  | 'periodical'
  | 'personal_communication'
  | 'post'
  | 'post-weblog'
  | 'regulation'
  | 'report'
  | 'review'
  | 'review-book'
  | 'software'
  | 'song'
  | 'speech'
  | 'standard'
  | 'thesis'
  | 'treaty'
  | 'webpage'

export type CSL = {
  type: CSLType
  id: string | number
  'citation-key'?: string
  categories?: string[]
  language?: string
  journalAbbreviation?: string
  shortTitle?: string
  author?: CSLName[]
  chair?: CSLName[]
  'collection-editor'?: CSLName[]
  compiler?: CSLName[]
  composer?: CSLName[]
  'container-author'?: CSLName[]
  contributor?: CSLName[]
  curator?: CSLName[]
  director?: CSLName[]
  editor?: CSLName[]
  'editorial-director'?: CSLName[]
  'executive-producer'?: CSLName[]
  guest?: CSLName[]
  host?: CSLName[]
  interviewer?: CSLName[]
  illustrator?: CSLName[]
  narrator?: CSLName[]
  organizer?: CSLName[]
  'original-author'?: CSLName[]
  performer?: CSLName[]
  producer?: CSLName[]
  recipient?: CSLName[]
  'reviewed-author'?: CSLName[]
  'script-writer'?: CSLName[]
  'series-creator'?: CSLName[]
  translator?: CSLName[]
  accessed?: CSLDate
  'available-date'?: CSLDate
  'event-date'?: CSLDate
  issued?: CSLDate
  'original-date'?: CSLDate
  submitted?: CSLDate
  abstract?: string
  annote?: string
  archive?: string
  archive_collection?: string
  archive_location?: string
  'archive-place'?: string
  authority?: string
  'call-number'?: string
  'chapter-number'?: string | number
  'citation-number'?: string | number
  'citation-label'?: string
  'collection-number'?: string | number
  'collection-title'?: string
  'container-title'?: string
  'container-title-short'?: string
  dimensions?: string
  division?: string
  DOI?: string
  edition?: string | number
  event?: string
  'event-title'?: string
  'event-place'?: string
  'first-reference-note-number'?: string | number
  genre?: string
  ISBN?: string
  ISSN?: string
  issue?: string | number
  jurisdiction?: string
  keyword?: string
  locator?: string | number
  medium?: string
  note?: string
  number?: string | number
  'number-of-pages'?: string | number
  'number-of-volumes'?: string | number
  'original-publisher'?: string
  'original-publisher-place'?: string
  'original-title'?: string
  page?: string | number
  'page-first'?: string | number
  part?: string | number
  'part-title'?: string
  PMCID?: string
  PMID?: string
  printing?: string | number
  publisher?: string
  'publisher-place'?: string
  references?: string
  'reviewed-genre'?: string
  'reviewed-title'?: string
  scale?: string
  section?: string
  source?: string
  status?: string
  supplement?: string | number
  title?: string
  'title-short'?: string
  URL?: string
  version?: string
  volume?: string | number
  'volume-title'?: string
  'volume-title-short'?: string
  'year-suffix'?: string
  custom?: Record<string, unknown>
}

interface InputOptions {
  maxChainLength: number
  generateGraph: boolean
  strict: boolean
  forceType: string
  target: string
}

export class Cite {
  constructor (data: any, options?: InputOptions)
  data: Array<CSL>

  static async (data: any): Promise<Cite>
  static async (data: any, options: undefined, callback: (data: Cite) => unknown): void

  getIds (): Array<string>
  format<
    Format extends keyof plugins.output.Formats,
    Options extends Parameters<plugins.output.Formats[Format]>,
    Result extends ReturnType<Extract<plugins.output.Formats[Format], (...args: Options) => any>>
  > (format: Format, ...options: Options): Result

  add (data: any): Cite
  addAsync (data: any): Promise<Cite>
  set (data: any): Cite
  setAsync (data: any): Promise<Cite>
  reset (): Cite

  sort (method: (a: CSL, b: CSL) => -1|0|1): Cite
  sort (method?: Array<keyof CSL>): Cite

  static validateOptions (options: InputOptions): boolean
}

export namespace plugins {
  type DictEntryName = 'bibliographyContainer' | 'entry' | 'list' | 'listItem'
  type Dict = Record<DictEntryName, [string, string]>

  interface TypeParserTokenList {
    token: RegExp
    split?: RegExp
    every?: boolean
    trim?: boolean
  }

  interface TypeParserPropertyConstraint {
    props?: string|string[]
    match?: 'every' | 'any' | 'some' | 'none'
    value?: (value: any) => boolean
  }

  interface TypeParserSpec {
    dataType: string
    predicate?: RegExp|((input: any) => boolean)
    tokenList?: TypeParserTokenList
    propertyConstraint?: TypeParserPropertyConstraint
    elementConstraint?: string
    extends?: string
  }

  type DataParser = (input: any) => Exclude<any, Promise<any>>
  type AsyncDataParser = (input: any) => Promise<any>

  interface ParserSpec {
    parseType?: TypeParserSpec
    parse?: DataParser
    parseAsync?: AsyncDataParser
  }

  interface Plugins {
    input: Record<string, ParserSpec>
    output: Record<string, Formatter>
    dict?: Record<string, Dict>
    config: any
  }

  type Formatter = (data: Array<CSL>, ...options: any) => any

  export function add (ref: string, plugins: Plugins): void
  export function remove (ref: string): void
  export function has (ref: string): boolean
  export function list (): string[]

  export namespace input {
    interface Formats {
      '@csl/object': (input: CSL) => Array<CSL>
      '@csl/list+object': (input: Array<CSL>) => Array<CSL>
      '@else/list+object': (input: Array<any>) => Array<any>
      '@invalid': () => never

      '@empty/text': (input: string) => []
      '@empty/whitespace+text': (input: string) => []
      '@empty': (input: undefined|null) => []
      '@else/json': (input: string) => object|object[]
      '@else/url': (input: string) => string
      // '@else/jquery': (input: jQuery) => string
      '@else/html': (input: HTMLElement) => string
    }

    export type { Formats }

    export function add (format: string, parsers: ParserSpec): void
    export function get (format: string): ParserSpec
    export function remove (format: string): void
    export function has (format: string): boolean
    export function list (): string[]

    export function chain (input: any, options?: InputOptions): Array<CSL>
    export function chainLink (input: any, options?: InputOptions): any
    export function chainAsync (input: any, options?: InputOptions): Promise<Array<CSL>>
    export function chainLinkAsync (input: any, options?: InputOptions): Promise<any>

    export function data<
      T extends keyof Formats,
      U extends Parameters<Formats[T]>[0]
    > (input: U, type: T): ReturnType<Formats[T]>
    export function dataAsync<
      T extends keyof Formats,
      U extends Parameters<Formats[T]>[0]
    > (input: U, type: T): Promise<ReturnType<Formats[T]>>

    export function addDataParser (format: string, options?: { parser: ParserSpec['parseAsync'], async: true }): void
    export function addDataParser (format: string, options?: { parser: ParserSpec['parse'], async?: false }): void
    export function hasDataParser (format: string, async?: boolean): boolean
    export function removeDataParser (format: string, async?: boolean): void
    export function listDataParser (async?: boolean): string[]

    export function type (input: any): string
    export function addTypeParser (format: string, typeParser: Pick<util.TypeParser, 'dataType' | 'predicate' | 'extends'>): void
    export function hasTypeParser (format: string): boolean
    export function removeTypeParser (format: string): void
    export function listTypeParser (): string[]
    export const typeMatcher: RegExp

    export namespace util {
      export function typeOf (thing: undefined): 'Undefined'
      export function typeOf (thing: null): 'Null'
      export function typeOf (thing: any): string

      export function dataTypeOf (thing: string): 'String'
      export function dataTypeOf (thing: number|undefined|null): 'Primitive'
      export function dataTypeOf (thing: Array<any>): 'Array'
      export function dataTypeOf (thing: object): 'SimpleObject' | 'ComplexObject'

      interface GraphElement {
        type: string
      }

      export function applyGraph (entry: CSL, graph: Array<GraphElement>): CSL
      export function removeGraph (entry: CSL): CSL

      export function clean (data: Array<CSL>, bestGuessConversions?: boolean): Array<CSL>

      export class TypeParser {
        constructor (data: TypeParserSpec)
        validate (): void

        dataType: string
        predicate: (input: any) => boolean
        extends: string|undefined
      }

      export class DataParser {
        constructor (parser: DataParser, options?: { async?: boolean })
        constructor (parser: AsyncDataParser, options: { async: true })
        validate (): void
      }

      export class FormatParser {
        constructor (format: string, parsers?: ParserSpec)
        validate (): void
      }
    }
  }

  export namespace output {
    interface Formats {
      data:
        | ((options?: { format?: 'text', version?: string }) => string)
        | ((options: { format: 'object', version?: string }) => Array<CSL>)
      label: () => Record<string, string>
    }

    export type { Formats }

    export function add (name: string, dict: any): void
    export function remove (name: string): void
    export function has (name: string): boolean
    export function list (): string[]
    export function format<
      Format extends keyof Formats,
      Options extends Parameters<Formats[Format]>,
      Result extends ReturnType<Extract<Formats[Format], (...args: Options) => any>>
    > (name: Format, data: Array<CSL>, ...options: Options): Result
  }

  export namespace config {
    export function add (ref: string, config: any): void
    export function get (ref: string): any
    export function remove (ref: string): void
    export function has (ref: string): boolean
    export function list (): string[]
  }

  export namespace dict {
    export const register: util.Register<Dict>
    export function add (name: string, dict: Dict): void
    export function remove (name: string): void
    export function has (name: string): boolean
    export function list (): string[]
    export function get (name: string): Dict
  }
}

export namespace util {
  // TODO TokenStack [deprecate]

  export function upgradeCsl (item: CSL): CSL
  export function upgradeCsl (item: CSL[]): CSL[]
  export function downgradeCsl (item: CSL): CSL
  export function downgradeCsl (item: CSL[]): CSL[]
  export function fetchId (list: string[], prefix: string): string
  export function deepCopy<T> (value: T): T

  interface FetchOptions {
    checkContentType?: boolean
    headers?: Record<string, string>
    body?: string|object
  }

  export function fetchFile (url: string, opts?: FetchOptions): string
  export function fetchFileAsync (url: string, opts?: FetchOptions): Promise<string>
  export function setUserAgent (userAgent: string): void

  export class Register<T> {
    constructor (data: Record<string, T>)

    set (key: string, value: T): void
    add (key: string, value: T): void
    delete (key: string): void
    remove (key: string): void
    get (key: string): T
    has (key: string): boolean
    list (): string[]
  }

  interface Token {
    text?: string
    offset: number
    lineBreaks: number
    line: number
    col: number
  }

  class Lexer {
    formatError (token: Token|null|undefined, message: string): string
    next (): Token
  }

  export class Grammar<R extends Record<string, () => any>> {
    constructor (rules: R, state?: object)

    // parse (iterator: Lexer): ReturnType<R[keyof R)[0]]>
    parse<K extends keyof R> (iterator: Lexer, mainRule: K): ReturnType<R[K]>
    matchEndOfFile (): boolean
    matchToken (type: string): boolean
    consumeToken (type?: string, optional?: boolean): Token|undefined
    consumeRule<K extends keyof R> (rule: K): ReturnType<R[K]>
  }

  type TranslatorConditions<S> = Record<
    keyof S,
    boolean |
    string |
    number |
    Array<S[keyof S]> |
    ((value: S[keyof S]) => any)
  >

  interface TranslatorUnit<S, T> {
    source: undefined|keyof S|Array<keyof S>,
    target: undefined|keyof T|Array<keyof T>
    convert?: {
      toSource?: (...args: Array<T[keyof T]>) => Array<S[keyof S]>
      toTarget?: (...args: Array<S[keyof S]>) => Array<T[keyof T]>
    },
    when?: {
      source?: boolean|Record<keyof T, boolean|TranslatorConditions<T>>
      target?: boolean|Record<keyof T, boolean|TranslatorConditions<T>>
    }
  }

  type SimpleTranslatorUnit<S, T> = keyof S & keyof T

  export class Translator<S extends object, T extends object> {
    constructor (props: Array<SimpleTranslatorUnit<S, T>|TranslatorUnit<S, T>>)

    convertToSource (input: T): S
    convertToTarget (input: S): T
  }
}

export interface logger {
  level: string
  http: (scope: string, message: string) => void
  debug: (scope: string, message: string) => void
  unmapped: (scope: string, message: string) => void
  info: (scope: string, message: string) => void
  warn: (scope: string, message: string) => void
  error: (scope: string, message: string) => void
  silent: (scope: string, message: string) => void
}

export const version: string
