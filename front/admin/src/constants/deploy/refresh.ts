/**
 * @file 缓存刷新相关
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export const pathRule = /^(\/[^/]+)*$/

/** www 主站的主要一级目录，跟 pages 目录大致上一一对应 */
export const basePaths = [
  '/activity',
  '/agreements',
  '/appeal',
  '/calculator',
  '/calculator_qvm',
  '/case',
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
  '/user-agreement'
] as const

/** 4xx & 5xx */
export const errorPaths = [
  // https://developer.qiniu.com/kodo/manual/1659/download-setting
  // TODO: 404 本身并不触发 errno-404 回源，因此目前只能覆盖更新、不能直接删缓存自动回源，后续需要优化
  '/errno-404',

  // https://nextjs.org/docs/advanced-features/custom-error-page
  '/404',

  // https://nextjs.org/docs/advanced-features/custom-error-page
  // TODO: 待实现
  '/500'
] as const

/** www 主站内可通过 ssr 生成的主体动态内容，全局刷新的时候需要刷新这里的全部内容 */
export const wwwPaths = ['', '/sitemap.xml', ...errorPaths, ...basePaths] as const // 空字符串为首页

/** 分站路径前缀 */
export const externalSitePaths = [
  '/developer',
  '/qfans'
] as const
