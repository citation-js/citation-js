import * as biblatex from './mapping/biblatexTypes'
import * as bibtex from './mapping/bibtexTypes'
import * as constants from './input/constants'

export default {
  constants,
  types: { biblatex, bibtex },
  parse: {
    biblatex: true,
    sentenceCase: 'never'
  },
  format: {
    useIdAsLabel: false
  }
}
