/**
 * Generate ID
 *
 * @access protected
 * @memberof module:@citation-js/core.util
 *
 * @param {Array<String>} list - old ID list
 * @param {String} prefix - ID prefix
 *
 * @return {String} CSL ID
 */
const fetchId = function (list, prefix) {
  let id

  while (id === undefined || list.includes(id)) {
    id = `${prefix}${Math.random().toString().slice(2)}`
  }

  return id
}

export default fetchId
