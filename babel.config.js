module.exports = {
  presets: [
    ['@babel/env', { targets: {
      node: '6'
    } }]
  ],
  env: {
    'mjs': {
      presets: [
        ['@babel/env', { modules: false }]
      ]
    },
    test: {
      plugins: ['istanbul']
    }
  },
  comments: false
}
