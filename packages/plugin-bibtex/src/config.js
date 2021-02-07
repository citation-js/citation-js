import * as biblatex from './mapping/biblatexTypes'
import * as bibtex from './mapping/bibtexTypes'
import * as constants from './input/constants'

/**
 * @memberof module:@citation-js/plugin-bibtex
 * @var {Object} config
 * @property {Boolean} [parse.strict=false] - When true, entries are checked for required fields.
 * @property {String} [parse.sentenceCase='never'] - Convert titles to sentence case when parsing.
 * @property {Boolean} [format.useIdAsLabel=false] - Use the entry ID as the label instead of generating one.
 */
export default {
  constants,
  types: { biblatex, bibtex },
  parse: {
    biblatex: true,
    strict: false,
    sentenceCase: 'never'
  },
  format: {
    useIdAsLabel: false
  }
}
