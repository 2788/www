/**
 * @file ssr server 启动脚本
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 执行命令： node server/index.js -p $PORT

// TODO: 用 ts 重写

const http = require('http')
const url = require('url')

const next = require('next')
const minimist = require('minimist')

const { cleanPathTrailingSlash } = require('./utils')
const globalData = require('./global-data')
const logger = require('./logger')
const sitemap = require('./sitemap')

const argv = minimist(process.argv.slice(2))
const port = argv.port || argv.p || 80
// ssr 是否应该为 /_ 开头的路径如 /_next 等提供服务；开发环境需要提供服务，而线上则可能预示着出现了潜在的问题
const shouldServeInternal = !!argv['serve-internal']

const isDev = process.env.NODE_ENV !== 'production'

const app = next({ dev: isDev })

async function startApp() {
  const handle = app.getRequestHandler()

  await app.prepare()

  http.createServer(async (req, res) => {
    try {
      const parsedUrl = url.parse(req.url, true)
      const isInternalRequest = req.url.startsWith('/_') // 主要是 /_next 和 /__nextjs

      if (isInternalRequest) {
        if (!shouldServeInternal) {
          logger.warn('Request internal resource:', req.url)
        }
      } else {
        logger.log('Request:', req.url) // TODO: log 一下 http status code

        // remove trailing slash
        // TODO: 升级 >= 9.5 后试一下这个 https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
        // TODO: kodo 会一直 follow 308 直到 200 并作为文件内容存下来
        //       因此内容是按照无 / 的请求路径渲染出来的，但 bucket 的 key 和浏览器的 url 都带着原始的 /，两者不一致可能出问题
        const pathname = cleanPathTrailingSlash(parsedUrl.pathname)
        if (pathname !== parsedUrl.pathname) {
          logger.log('Path rewrite:', parsedUrl.pathname, '->', pathname)
          parsedUrl.pathname = pathname
          const targetUrl = url.format(parsedUrl)
          res.writeHead(308, { Location: targetUrl }).end()
          return
        }
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      logger.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error') // TODO: fallback page
    }
  }).listen(Number(port), err => {
    if (err) {
      throw err
    }

    logger.log(`> Ready on http://localhost:${port}`)
  })
}

async function main() {
  globalData.init()
  await sitemap.init()
  await startApp()
}

main()
