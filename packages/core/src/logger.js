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
  _levels: ['http', 'debug', 'unmapped', 'info', 'warn', 'error', 'silent'],

  level: 'silent'
}

for (let level of logger._levels) {
  logger[level] = (scope, ...msg) => logger._output(level, scope, msg)
}

if (typeof console.Console === 'function') {
  logger._console = new console.Console(process.stderr)
} else {
  logger._console = console
}

export default logger
