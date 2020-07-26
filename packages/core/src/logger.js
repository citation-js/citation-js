/**
 * @memberof module:@citation-js/core
 * @var {Object} logger
 * @property _output
 * @property {Console} _console
 * @property {Array<String>} _log
 * @property {Array<module:@citation-js/core~logLevel>} _levels
 * @property {module:@citation-js/core~logLevel} level
 */
const logger = {
  _output (level, scope, msg) {
    this._log.push(scope, msg)

    if (this._levels.indexOf(level) < this._levels.indexOf(this.level)) {
      return
    }

    this._console.log(scope, ...msg)
  },
  _console: null,
  _log: [],

  /**
   * @typedef {String} module:@citation-js/core~logLevel
   */
  _levels: ['http', 'debug', 'unmapped', 'info', 'warn', 'error', 'silent'],

  level: 'silent'
}

for (const level of logger._levels) {
  logger[level] = (scope, ...msg) => logger._output(level, scope, msg)
}

if (typeof console.Console === 'function') {
  logger._console = new console.Console(process.stderr)
} else {
  logger._console = console
}

export default logger
