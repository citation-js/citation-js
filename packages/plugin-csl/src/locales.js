import { util } from '@citation-js/core'

/**
 * Object containing CSL locales
 *
 * Locales from the [CSL Project](http://citationstyles.org/)<br>
 * [REPO](https://github.com/citation-style-language/locales)
 *
 * Accesed 10/22/2016
 *
 * @access private
 * @constant defaultLocales
 */
import defaultLocales from './locales.json'

/**
 * @access private
 * @type module:@citation-js/core.util.Register
 * @member
 */
const locales = new util.Register(defaultLocales)

export { locales }
