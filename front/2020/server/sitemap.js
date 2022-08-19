/**
 * @file 站点地图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// https://cf.qiniu.io/pages/viewpage.action?pageId=107322875

const path = require('path')

const globalData = require('./global-data')
const utils = require('./utils')
const logger = require('./logger')

// TODO: 去掉使用了 `components/Redirect` 并且废弃了的路径以及一些无法直接打开使用的无效路径
const excludes = ['errno-404', '404', '500', 'sitemap.xml', 'sitemapindex.xml']

const rootPath = path.join(__dirname, '..')

exports.init = async function loadStaticSitemapPaths() {
  logger.log('Loading static sitemap...')

  const defaultPageSuffix = '/index.tsx'
  const pageFiles = await utils.getAllFiles(path.join(rootPath, 'pages'))
  const pagePaths = pageFiles
    .filter(url => (
      url.endsWith('.tsx')
      && url.includes('/')  // 只留目录（子路由）
      && !url.includes('[') // 去掉 [] 动态路由
    ))
    .map(url => url.endsWith(defaultPageSuffix)
      ? url.slice(0, -defaultPageSuffix.length)
      : url.slice(0, -'.tsx'.length)
    )
    .filter(url => !excludes.includes(url))
  const paths = [...new Set(pagePaths)].sort().map(url => `${process.env.NEXT_PUBLIC_HOST}/${url}`)

  globalData.register('staticSitemapPaths', paths)

  logger.log('Static sitemap loaded.')
}
