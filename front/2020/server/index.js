/**
 * @file ssr server 启动脚本
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 执行命令： node server/index.js -p $PORT

// TODO: 用 ts 重写 https://github.com/vercel/next.js/tree/canary/examples/custom-server-typescript

const http = require('http')
const url = require('url')

const next = require('next')
const minimist = require('minimist')

const { cleanPathTrailingSlash } = require('./utils')
const globalData = require('./global-data')
const logger = require('./logger')
const sitemap = require('./sitemap')
const sitemapIndex = require('./pages/sitemapindex.xml')

const argv = minimist(process.argv.slice(2))
const port = argv.port || argv.p || 80
// ssr 是否应该为 /_ 开头的路径如 /_next 等提供服务；开发环境需要提供服务，而线上则可能预示着出现了潜在的问题
const shouldServeInternal = !!argv['serve-internal']

const isDev = process.env.NODE_ENV !== 'production'

const app = next({ dev: isDev }) // https://nextjs.org/docs/advanced-features/custom-server

async function startApp() {
  const handle = app.getRequestHandler()

  await app.prepare()

  http.createServer(async (req, res) => {
    const startTime = Date.now()

    try {
      const parsedUrl = url.parse(req.url, true)
      const isInternalRequest = req.url.startsWith('/_') // 主要是 /_next 和 /__nextjs

      if (!isInternalRequest) {
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

      if (parsedUrl.pathname === '/sitemapindex.xml') {
        await sitemapIndex.handle(req, res)
      } else {
        await handle(req, res, parsedUrl)
      }

      const reqInfos = [
        req.method,
        `[${res.statusCode}]`,
        req.url,
        (Date.now() - startTime) / 1e3 + 's',
        req.headers && req.headers.host != null ? req.headers.host : null,
        req.headers && req.headers.referer != null ? req.headers.referer : null
      ]

      if (res.statusCode !== 200 && res.statusCode !== 304) { // 实际上 dev 环境几乎总是 200 哪怕挂了
        logger.error(...reqInfos)
      } else if (isInternalRequest) {
        if (!shouldServeInternal) {
          logger.warn(...reqInfos)
        }
      } else if (['#', '?', '//'].some(str => req.url.includes(str))) {
        logger.warn(...reqInfos)
      } else {
        logger.log(...reqInfos)
      }
    } catch (err) {
      logger.error('Error occurred handling', req.url, err) // TODO: 记录更多信息
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
