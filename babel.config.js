const targets = {
  node: '8'
}

module.exports = {
  presets: [
    ['@babel/env', { modules: 'commonjs', targets }]
  ],
  env: {
    mjs: {
      presets: [
        ['@babel/env', { modules: 'auto', targets }]
      ]
    },
    coverage: {
      plugins: ['istanbul']
    }
  },
  comments: false
}
