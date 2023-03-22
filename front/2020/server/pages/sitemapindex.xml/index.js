/**
 * @file 站点地图索引
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps
// https://cf.qiniu.io/pages/viewpage.action?pageId=107322875

const dayjs = require('dayjs')

function getDate() {
  return dayjs().format('YYYY-MM-DD')
}

// TODO: 改为从 `qfans` 动态获取，方案参考 https://cf.qiniu.io/pages/viewpage.action?pageId=107322875
async function getQfansSitemaps() {
  const now = getDate()
  return Array.from(Array(36), (_, i) => i + 1).map(index => (`
      <sitemap>
        <loc>${process.env.NEXT_PUBLIC_HOST}/qfans/sitemap_${index}.xml</loc>
        <lastmod>${now}</lastmod>
        <priority>0.8</priority>
      </sitemap>
  `)).join('\n')
}

async function getSitemapIndexBody() {
  return `
    <?xml version="1.0" encoding="utf-8"?>
    <sitemapindex>
      <sitemap>
        <loc>${process.env.NEXT_PUBLIC_HOST}/sitemap.xml</loc>
        <lastmod>${getDate()}</lastmod>
        <priority>1.0</priority>
      </sitemap>
      ${await getQfansSitemaps()}
    </sitemapindex>
  `.trim()
}

exports.handle = async function handleSitemapIndex(_req, res) {
  res.setHeader('Content-Type', 'text/xml')
  res.write(await getSitemapIndexBody())
  res.end()
}
