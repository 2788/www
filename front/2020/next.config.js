const withLess = require('@zeit/next-less')

module.exports = withLess({
  exportTrailingSlash: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    esModule: true
  }
})
