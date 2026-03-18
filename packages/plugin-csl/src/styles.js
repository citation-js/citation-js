import { util } from '@citation-js/core'

/**
 * Object containing CSL styles
 *
 * Styles from the [CSL Project](http://citationstyles.org/)<br>
 * [REPO](https://github.com/citation-style-language/styles), [LICENSE](https://creativecommons.org/licenses/by-sa/3.0/)
 *
 * Accesed 10/22/2016
 *
 * @access private
 * @constant defaultStyles
 */
import defaultStyles from './styles.json'

/**
 * @access private
 * @type module:@citation-js/core.util.Register
 * @member
 */
const styles = new util.Register(defaultStyles)

export { styles }
