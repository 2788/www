/**
 * @file 内容站 - 首页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentType } from 'constants/pgc/content'
import { articlesCount, videosMaxCount } from 'constants/pgc/content-banner'
import { listBanners } from 'apis/admin/pgc/content-banner'
import { listReleasedContent } from 'apis/admin/pgc/content'
import Layout from 'components/Layout'
import PgcIndex, { Props } from 'components/pgc/content/Index'

export default function Pgc(props: Props) {
  const title = '内容首页'
  return (
    <Layout
      title={title}
      keywords={`七牛云, ${title}`}
      description={`七牛云, ${title}`}
    >
      <PgcIndex {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  const [banners, articleRes, videoRes] = await Promise.all([
    listBanners(),
    listReleasedContent({ type: ContentType.Article, limit: articlesCount }),
    listReleasedContent({ type: ContentType.Video, limit: videosMaxCount })
  ])
  const props: Props = {
    banners,
    articles: articleRes.data,
    hasMoreArticles: articleRes.count > articlesCount,
    videos: videoRes.data
  }
  return { props }
}
