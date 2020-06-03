/**
 * @file 生成 sitemap.xml（主要为 SEO）
 * @description 需要在 next build && next export 之后做
 */

const path = require('path')
const sitemap = require('nextjs-sitemap-generator')

// next 产出物的目录
const outDir = 'out'

sitemap({
  baseUrl: 'https://www.qiniu.com',
  pagesDirectory: path.join(__dirname, outDir),
  targetDirectory: outDir,
  nextConfigPath: path.join(__dirname, 'next.config.js')
})

console.log('✅ sitemap.xml generated!')
