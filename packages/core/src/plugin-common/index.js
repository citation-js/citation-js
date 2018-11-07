import * as plugins from '../plugins'

import {ref, formats as input} from './input/'
import * as output from './output/'

plugins.add(ref, {input, output})
