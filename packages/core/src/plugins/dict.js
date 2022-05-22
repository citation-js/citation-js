/**
 * @namespace dict
 * @memberof module:@citation-js/core.plugins
 */

import Register from '../util/register.js'

/**
 * @typedef module:@citation-js/core.plugins.dict~dictName
 * @type String
 */

/**
 * @typedef module:@citation-js/core.plugins.dict~dict
 * @type Object<module:@citation-js/core.plugins.dict~entryName,module:@citation-js/core.plugins.dict~dictEntry>
 */

/**
 * @typedef module:@citation-js/core.plugins.dict~entryName
 * @type String
 */

/**
 * @typedef module:@citation-js/core.plugins.dict~dictEntry
 * @type Array<String>
 */

/**
 * Validate input arguments
 *
 * @access private
 * @memberof module:@citation-js/core.plugins.dict
 *
 * @param {module:@citation-js/core.plugins.dict~dictName} name - output format name
 * @param {module:@citation-js/core.plugins.dict~dict} formatter - outputting function
 * @throws {TypeError} Invalid output format name
 * @throws {TypeError} Invalid formatter
 */
function validate (name, dict) {
  if (typeof name !== 'string') {
    throw new TypeError(`Invalid dict name, expected string, got ${typeof name}`)
  } else if (typeof dict !== 'object') {
    throw new TypeError(`Invalid dict, expected object, got ${typeof dict}`)
  }

  for (const entryName in dict) {
    const entry = dict[entryName]
    if (!Array.isArray(entry) || entry.some(part => typeof part !== 'string')) {
      throw new TypeError(`Invalid dict entry "${entryName}", expected array of strings`)
    }
  }
}

/**
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @constant register
 *
 * @type module:@citation-js/core.util.Register
 */
export const register = new Register({
  html: {
    bibliographyContainer: ['<div class="csl-bib-body">', '</div>'],
    entry: ['<div class="csl-entry">', '</div>'],
    list: ['<ul style="list-style-type:none">', '</ul>'],
    listItem: ['<li>', '</li>']
  },
  text: {
    bibliographyContainer: ['', '\n'],
    entry: ['', '\n'],
    list: ['\n', ''],
    listItem: ['\t', '\n']
  }
})

/**
 * Add dictionary to register. Can be used by output plugins.
 *
 * @todo docs
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @method add
 *
 * @param {module:@citation-js/core.plugins.dict~dictName} name - dictionary name
 * @param {module:@citation-js/core.plugins.dict~dict} dict - dictionary data
 * @throws {TypeError} argument validation error
 */
export function add (name, dict) {
  validate(name, dict)
  register.set(name, dict)
}

/**
 * Remove dictionary.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @method remove
 *
 * @param {module:@citation-js/core.plugins.dict~dictName} name - output format name
 */
export function remove (name) {
  register.remove(name)
}

/**
 * Check if dictionary plugin exists.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @method has
 *
 * @param {module:@citation-js/core.plugins.dict~dictName} name - output format name
 * @return {Boolean} register has plugin
 */
export function has (name) {
  return register.has(name)
}

/**
 * List dictionary plugins.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @method list
 *
 * @return {Array<String>} list of plugins
 */
export function list () {
  return register.list()
}

/**
 * Get dictionary data.
 *
 * @access public
 * @memberof module:@citation-js/core.plugins.dict
 * @method get
 *
 * @param {module:@citation-js/core.plugins.dict~dictName} name - output format name
 * @return {module:@citation-js/core.plugins.dict~dict} dictionary data
 */
export function get (name) {
  if (!register.has(name)) {
    throw new Error(`Dict "${name}" unavailable`)
  }
  return register.get(name)
}

/**
 * Object containing HTML strings for building JSON and BibTeX. Made to match citeproc, for compatibility.
 *
 * @access protected
 * @memberof module:@citation-js/core.plugins.dict
 * @deprecated use the new formatting dicts: {@link module:@citation-js/core.plugins.dict}
 */
export const htmlDict = {
  wr_start: '<div class="csl-bib-body">',
  wr_end: '</div>',
  en_start: '<div class="csl-entry">',
  en_end: '</div>',
  ul_start: '<ul style="list-style-type:none">',
  ul_end: '</ul>',
  li_start: '<li>',
  li_end: '</li>'
}

/**
 * Object containing text strings for building JSON and BibTeX. Made to match citeproc, for compatibility.
 *
 * @access protected
 * @memberof module:@citation-js/core.plugins.dict
 * @deprecated use the new formatting dicts: {@link module:@citation-js/core.plugins.dict}
 */
export const textDict = {
  wr_start: '',
  wr_end: '\n',
  en_start: '',
  en_end: '\n',
  ul_start: '\n',
  ul_end: '',
  li_start: '\t',
  li_end: '\n'
}
