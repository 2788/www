module.exports = {
  extends: [ '@qiniu' ],
  ignorePatterns: [ '**/*.js' ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
        moduleDirectory: [ 'node_modules', './' ]
      }
    }
  }
}
