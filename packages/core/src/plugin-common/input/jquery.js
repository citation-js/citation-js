export /* istanbul ignore next: not testable in Node */ function parse (input) {
  return input.val() || input.text() || input.html()
}
