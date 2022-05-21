/**
 * Upgrade CSL item from 1.0.1 to 1.0.2
 *
 * @method upgradeCsl
 * @memberof module:@citation-js/core.util
 *
 * @param {Object} item - Input object
 *
 * @return {Object} upgraded item
 */
export function upgradeCsl (item) {
  if (Array.isArray(item)) {
    return item.map(upgradeCsl)
  }

  item = { ...item }
  if ('event' in item) {
    item['event-title'] = item.event
    delete item.event
  }
  if (item.type === 'book' && 'version' in item) {
    item.type = 'software'
  }
  return item
}

/**
 * Downgrade CSL item from 1.0.2 to 1.0.1
 *
 * @method downgradeCsl
 * @memberof module:@citation-js/core.util
 *
 * @param {Object} item - Input object
 *
 * @return {Object} downgraded item
 */
export function downgradeCsl (item) {
  if (Array.isArray(item)) {
    return item.map(downgradeCsl)
  }

  item = { ...item }
  if ('event-title' in item) {
    item.event = item['event-title']
    delete item['event-title']
  }
  if (item.type === 'software') {
    item.type = 'book'
  }
  return item
}
