import { util } from '@citation-js/core'

/**
 * Object containing CSL templates
 *
 * Templates from the [CSL Project](http://citationstyles.org/)<br>
 * [REPO](https://github.com/citation-style-language/styles), [LICENSE](https://creativecommons.org/licenses/by-sa/3.0/)
 *
 * Accesed 10/22/2016
 *
 * @access private
 * @constant defaultTemplates
 */
import defaultTemplates from './styles.json'

/**
 * @access private
 * @type module:@citation-js/core.util.Register
 * @member
 */
const templates = new util.Register(defaultTemplates)

export { templates }
