module.exports = {
  extends: [
    '@qiniu'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  rules: {
    'no-underscore-dangle': 'off'
  }
}
