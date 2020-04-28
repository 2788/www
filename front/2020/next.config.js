const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withPlugins(
  [
    [ withCss ],
    [
      withLess,
      {
        exportTrailingSlash: true,
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
          esModule: true
        }
      }
    ]
  ],
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/
        },
        use: [ '@svgr/webpack' ]
      })

      return config
    }
  }
)
