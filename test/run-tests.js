const { spawn } = require('child_process')
const args = process.argv.slice(2)
const i = args.includes('--') ? args.indexOf('--') : Infinity

const lernaArgs = args.slice(0, i)
const scriptArgs = args.slice(i + 1)

const test = spawn('lerna', [
  'run',
  'test',
  '--no-bail',
  '--stream',
  '--ignore',
  '*/cli',
  ...lernaArgs,
  '--',
  '--',
  '-r',
  '@babel/register',
  ...scriptArgs
], {
  windowsHide: true,
  stdio: 'inherit'
})

test.on('close', (code) => {
  process.exit(code)
})
