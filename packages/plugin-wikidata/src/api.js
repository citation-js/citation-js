/**
 * @module input/wikidata
 */

import { util } from '@citation-js/core'

const { fetchFile, fetchFileAsync } = util

export {
  fetchFile as parse,
  fetchFileAsync as parseAsync
}
