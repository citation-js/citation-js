/**
 * ## Formats
 *
 * For a full list, check out {@link module:@citation-js/plugin.bibtex.formats}.
 *
 * ### BibTeX
 *
 * This plugin adds input and output support for [BibTeX](http://www.bibtex.org/),
 * both in text form and as a JSON representation. Input types are called `@bibtex/text`
 * and `@bibtex/entry+object`, output format is `bibtex`. The output has format
 * dictionary support.
 *
 * ### BibLaTeX
 *
 * This plugin adds input and output support for [BibLaTeX](https://www.ctan.org/pkg/biblatex),
 * both in text form and as a JSON representation. Input types are called `@biblatex/text`
 * and `@biblatex/entry+object`, output format is `biblatex`. The output has format
 * dictionary support.
 *
 * ### Bib.TXT
 *
 * This plugin adds input and output support for [Bib.TXT](http://bibtxt.github.io/),
 * a simplified and modernised version of BibTeX. Input types are called `@bibtxt/text`
 * and `@biblatex/entry+object`, output format is `bibtxt`. The output has format
 * dictionary support.
 *
 * ## Configuration
 *
 * Check out {@link module:@citation-js/plugin-bibtex.config}.
 *
 * @module module:@citation-js/plugin-bibtex
 */

import { plugins } from '@citation-js/core'

import { ref, formats as input } from './input/index.js'
import config from './config.js'
import output from './output/index.js'

plugins.add(ref, { input, output, config })
