/**
 * @file 缓存刷新相关
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { unionStringsFrom } from 'utils/ts'

/** 路径基本规则 */
export const pathRule = /^(\/[^/]+)*$/

/** www 主站的主要一级目录，跟 pages 目录大致上一一对应 */
export const basePaths = unionStringsFrom([
  '/activity',
  '/agreements',
  '/appeal',
  '/calculator',
  '/calculator_qvm',
  '/case',
  '/channel',
  '/company',
  '/contact',
  '/cooperations',
  '/cps',
  '/en',
  '/events',
  '/friendlink',
  '/intl',
  '/invite',
  '/landpage',
  '/mp',
  '/partner',
  '/pgc',
  '/prices',
  '/privacy-right',
  '/product-news',
  '/products',
  '/sdk-agreement',
  '/search',
  '/sla-dora',
  '/sla-fusion',
  '/sla-kodo',
  '/sla-pili',
  '/sla-qvm',
  '/sla-sms',
  '/solutions',
  '/ssl',
  '/student',
  '/user-agreement'
])

/** 首页 */
export const indexPath = ''

/**
 * kodo 404 默认路径
 * https://developer.qiniu.com/kodo/manual/1659/download-setting
 * TODO: 404 本身并不触发 errno-404 回源，因此目前只能覆盖更新、不能直接删缓存自动回源，后续需要优化
 */
export const kodo404Path = '/errno-404'

/** 站点地图 */
export const sitemapPaths = unionStringsFrom([
  '/sitemap.xml',
  '/sitemapindex.xml'
])

/** www 主站内可通过 ssr 生成的主体动态内容，全局刷新的时候需要刷新这里的全部内容 */
export const wwwPaths = unionStringsFrom([indexPath, kodo404Path, ...basePaths])

/** 嵌入式组件加载器 */
export const externalLoaderPath = '/externals/loader.js'

/** 分站路径前缀 */
export const externalSitePaths = unionStringsFrom([
  '/developer',
  '/qfans'
])
