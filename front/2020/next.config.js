const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST

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
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()

        if (entries['main.js'] && !entries['main.js'].includes('./utils/polyfills.ts')) {
          entries['main.js'].unshift('./utils/polyfills.ts')
        }

        return entries
      }

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
                publicPath: `${assetHost}/_next/static/media/`,
                outputPath: `${options.isServer ? '../' : ''}static/media/`,
                name: '[name].[hash].[ext]',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(file\.svg|png|jpe?g|gif)$/i,
          issuer: {
            test: /\.(js|ts)x?$/
          },
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: `${assetHost}/_next/static/media/`,
                outputPath: `${options.isServer ? '../' : ''}static/media/`,
                name: '[name].[hash].[ext]',
                esModule: false
              }
            }
          ]
        }
      )

      return config
    },
    // 目前 Kodo 的 bucket & Fusion 的域名均不支持按条件配置资源响应头中的缓存控制信息
    // 在线上环境我们分两个域名来 serve 站点内容（指向同一个 bucket）
    // 页面走 www(-2020).qiniu.com，静态资源走 www-static.qnssl.com
    // 前者在 CDN 配置客户端不缓存，后者配置客户端强缓存（1 年）
    // 另，Kodo bucket 支持按条件配置资源响应头中的缓存控制信息，已提需求 @guojia
    assetPrefix: assetHost
  }
)
