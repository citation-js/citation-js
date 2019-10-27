const targets = {
  node: '8'
}

module.exports = {
  presets: [
    ['@babel/env', { targets }]
  ],
  env: {
    mjs: {
      presets: [
        ['@babel/env', { modules: false, targets }]
      ]
    },
    coverage: {
      plugins: ['istanbul']
    }
  },
  comments: false
}
