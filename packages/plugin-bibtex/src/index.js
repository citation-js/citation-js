/**
 * @module module:@citation-js/plugin-bibtex
 */

import { plugins } from '@citation-js/core'

import { ref, formats as input } from './input/'
import config from './config'
import output from './output/'

plugins.add(ref, { input, output, config })
