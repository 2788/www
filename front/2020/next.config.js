const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withPlugins(
  [
    [ withCss ],
    [
      withLess,
      {
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
    webpack(config, options) {
      config.module.rules.push(
        {
          test: /\.svg$/i,
          issuer: {
            test: /\.(js|ts)x?$/
          },
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: {
                    removeViewBox: false
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(svg|eot|ttf|woff|woff2|png|jpe?g|gif)$/i,
          issuer: {
            test: /\.(css|less)$/
          },
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: `/_next/static/media/`,
                outputPath: `${options.isServer ? '../' : ''}static/media/`,
                name: '[name].[hash].[ext]',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          issuer: {
            test: /\.(js|ts)x?$/
          },
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: `/_next/static/media/`,
                outputPath: `${options.isServer ? '../' : ''}static/media/`,
                name: '[name].[hash].[ext]',
                esModule: false
              }
            }
          ]
        }
      )

      return config
    }
  }
)
