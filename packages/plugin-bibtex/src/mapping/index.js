import { TYPE, LABEL } from './shared.js'
import biblatex from './biblatex.js'
import bibtex from './bibtex.js'
import { crossref } from './crossref.js'

function _parse (input, spec) {
  const registry = {}

  for (const entry of input) {
    registry[entry.label] = entry
  }

  return input.map(({ type, label, properties }) => spec.convertToTarget({
    [TYPE]: type,
    [LABEL]: label,
    ...crossref(type, properties, registry)
  }))
}

function _format (input, spec) {
  return input.map(entry => {
    const { [TYPE]: type, [LABEL]: label, ...properties } = spec.convertToSource(entry)
    return { type, label, properties }
  })
}

export function parseBibtex (input) {
  return _parse(input, bibtex)
}

export function formatBibtex (input) {
  return _format(input, bibtex)
}

export function parse (input) {
  return _parse(input, biblatex)
}

export function format (input) {
  return _format(input, biblatex)
}
