/**
 * @file 站点地图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// https://cf.qiniu.io/pages/viewpage.action?pageId=107322875

import dayjs from 'dayjs'
import { GetServerSidePropsContext } from 'next'

import { getServerSidePaths as getActivityDetailPaths } from '../activity/detail/[id]'
import { getServerSidePaths as getActivityPagePaths } from '../activity/page/[page]'
import { getServerSidePaths as getPgcDetailPaths } from '../pgc/detail/[id]'
import { getServerSidePaths as getPgcTypePaths } from '../pgc/list/[type]'
import { getServerSidePaths as getPgcTypeCategoryPaths } from '../pgc/list/[type]/[category]'

export default function Sitemap() {
  return null
}

async function getPaths(staticPaths: string[]): Promise<string[]> {
  return [
    ...staticPaths,
    ...(await getActivityDetailPaths()).paths.map(
      ({ params: { id } }) => `${process.env.NEXT_PUBLIC_HOST}/activity/detail/${id}`
    ),
    ...(await getActivityPagePaths()).paths.map(
      ({ params: { page } }) => `${process.env.NEXT_PUBLIC_HOST}/activity/page/${page}`
    ),
    ...(await getPgcDetailPaths()).paths.map(
      ({ params: { id } }) => `${process.env.NEXT_PUBLIC_HOST}/pgc/detail/${id}`
    ),
    ...(await getPgcTypePaths()).paths.map(
      ({ params: { type } }) => `${process.env.NEXT_PUBLIC_HOST}/pgc/list/${type}`
    ),
    ...(await getPgcTypeCategoryPaths()).paths.map(
      ({ params: { type, category } }) => `${process.env.NEXT_PUBLIC_HOST}/pgc/list/${type}/${category}`
    )
  ].sort()
}

function render(paths: string[]): string {
  const now = dayjs().format('YYYY-MM-DD')

  // TODO: 设置 priority & 优化 lastmod 时间
  const urls = paths.map(path => `
      <url>
        <loc>${path}</loc>
        <lastmod>${now}</lastmod>
      </url>
  `.trimRight()).join('')

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      ${urls}
    </urlset>
  `.trim()
}

// TODO: ssr server 用 ts 重写后改为在 custom server 里直接实现（还要考虑前后端共用代码的组织和编译等问题）
//       然后可去掉 `__qiniu_www_global_ssr_data__` (`global-data.js`) 相关代码
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // eslint-disable-next-line no-underscore-dangle
  const globalData = (global as any).__qiniu_www_global_ssr_data__
  const staticSitemapPaths: string[] = globalData.staticSitemapPaths

  res.setHeader('Content-Type', 'text/xml')
  res.write(render(await getPaths(staticSitemapPaths)))
  res.end()

  return { props: {} }
}
