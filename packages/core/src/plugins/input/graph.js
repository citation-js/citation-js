/**
 * Apply a parse chain graph to an element
 *
 * @access protected
 * @memberof Cite.plugins.input.util
 *
 * @param {CSL} entry
 * @param {Array<Object>} graph
 *
 * @return {CSL} entry
 */
export const applyGraph = (entry, graph) => {
  if (entry._graph) {
    const index = graph.findIndex(({type}) => type === '@else/list+object')
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
 * @memberof Cite.plugins.input.util
 *
 * @param {CSL} entry
 *
 * @return {CSL} entry
 */
export const removeGraph = (entry) => {
  delete entry._graph
  return entry
}
