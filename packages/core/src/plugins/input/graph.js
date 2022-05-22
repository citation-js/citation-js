/**
 * Apply a parse chain graph to an element
 *
 * @access protected
 * @method applyGraph
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {module:@citation-js/core~CSL} entry
 * @param {Array<Object>} graph
 *
 * @return {module:@citation-js/core~CSL} entry
 */
export function applyGraph (entry, graph) {
  if (entry._graph) {
    const index = graph.findIndex(({ type }) => type === '@else/list+object')
    if (index !== -1) {
      graph.splice(index + 1, 0, ...entry._graph.slice(0, -1))
    }
  }

  entry._graph = graph
  return entry
}

/**
 * Remove the parse chain graph from an element
 *
 * @access protected
 * @method removeGraph
 * @memberof module:@citation-js/core.plugins.input.util
 *
 * @param {module:@citation-js/core~CSL} entry
 *
 * @return {module:@citation-js/core~CSL} entry
 */
export function removeGraph (entry) {
  delete entry._graph
  return entry
}
