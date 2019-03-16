import * as plugins from '../plugins'

import { ref, formats as input } from './input/'
import output from './output/'

plugins.add(ref, { input, output })
