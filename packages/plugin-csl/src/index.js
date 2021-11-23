/**
 * ## Formats
 *
 * Formats and other features added by this plugin. General output options:
 *
 *   * `template`: the style template to use. Currently, the following are built-in:
 *     * `apa` (default)
 *     * `vancouver`
 *     * `harvard1`
 *   * `lang`: the locale to use. Currently, the following are built-in:
 *     * `en-US` (default)
 *     * `es-ES`
 *     * `de-DE`
 *     * `fr-FR`
 *     * `nl-NL`
 *   * `format`: output (markup) format. Note: this doesn't support the output format dictionaries
 *   * `entry` (`String`, `Array[String]`): entry ID or list of entry IDs to identify the items to cite
 *
 * For all formats and format-specific options, check out {@link module:@citation-js/plugin-csl.output}.
 *
 * @module @citation-js/plugin-csl
 */

/**
 * @callback module:output/csl~retrieveItem
 * @param {String} id - Citation id
 * @return {CSL} CSL Citation object
 */

/**
 * @callback module:output/csl~retrieveLocale
 * @param {String} lang - Language code
 * @return {String} CSL Locale
 */

import { plugins } from '@citation-js/core'

import { locales } from './locales.js'
import { templates } from './styles.js'
import engine from './engines.js'

import bibliography from './bibliography.js'
import citation from './citation.js'

plugins.add('@csl', {
  /**
   * @namespace output
   * @type Object<module:@citation-js/core.plugins.output~formatterName,module:@citation-js/core.plugins.output~formatter>
   * @memberof module:@citation-js/plugin-csl
   */
  output: {
    bibliography,
    citation
  },

  /**
   * @namespace config
   * @memberof module:@citation-js/plugin-csl
   */
  config: {
    /**
     * The configuration object also exposes an internal method to prepare a Citeproc engine with given data and configuration:
     *
     * ```js
     * let config = plugins.config.get('csl')
     *
     * let citeproc = plugins.engine(
     *   [{ ... }], // data
     *   'apa',     // style
     *   'en-US',   // locale
     *   'html'     // format
     * )
     *
     * let sortedIds = citeproc.updateItems(
     *   [...] // data ids
     * )
     * let makeBibliography = citeproc.makeBibliography()
     * ```
     *
     * @memberof module:@citation-js/plugin-csl.config
     * @method engine
     * @param {module:@citation-js/core~CSL} data
     * @param {String} style
     * @param {String} locale
     * @param {String} format
     */
    engine,

    /**
     * Different [CSL Locales](https://github.com/citation-style-language/locales) can be registered like this:
     *
     * ```js
     * let language = 'en-GB'
     * let locale = '<?xml version="1.0" encoding="utf-8"?><locale ...>...</locale>' // The actual XML file
     *
     * let config = plugins.config.get('csl')
     * config.locales.add(language, locale)
     *
     * let example = new Cite(...)
     * example.format('bibliography', {
     *   format: 'html',
     *   template: 'apa',
     *   lang: language
     * })
     * ```
     *
     * @memberof module:@citation-js/plugin-csl.config
     * @var {module:@citation-js/core.util.Register} locales
     */
    locales,

    /**
     * Different [CSL Templates](https://github.com/citation-style-language/styles) can be registered like this:
     *
     * ```js
     * let templateName = 'custom'
     * let template = '<?xml version="1.0" encoding="utf-8"?><style ...>...</style>' // The actual XML file
     *
     * let config = plugins.config.get('csl')
     * config.templates.add(templateName, template)
     *
     * let example = new Cite(...)
     * example.format('bibliography', {
     *   format: 'html',
     *   template: templateName,
     *   lang: 'en-US'
     * })
     * ```
     *
     * @memberof module:@citation-js/plugin-csl.config
     * @var {module:@citation-js/core.util.Register} templates
     */
    templates
  }
})
