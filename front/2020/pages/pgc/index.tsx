/**
 * @file 内容站 - 首页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { ContentType } from 'constants/pgc/content'
import { articlesCount, videosMaxCount } from 'constants/pgc/content-banner'
import { listBanners } from 'apis/admin/pgc/content-banner'
import { listReleasedContent } from 'apis/admin/pgc/content'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import Layout from 'components/Layout'
import PgcIndex, { Props as BaseProps } from 'components/pgc/content/Index'

interface Props extends BaseProps {
  globalBanners: GlobalBanner[]
}

export default function Pgc({ globalBanners, ...pageProps }: Props) {
  const title = '内容首页'
  return (
    <Layout
      title={title}
      keywords={`七牛云, ${title}`}
      description={`七牛云, ${title}`}
      globalBanners={globalBanners}
    >
      <PgcIndex {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const [banners, articleRes, videoRes, globalBanners] = await Promise.all([
    listBanners(),
    listReleasedContent({ type: ContentType.Article, limit: articlesCount }),
    listReleasedContent({ type: ContentType.Video, limit: videosMaxCount }),
    getGlobalBanners()
  ])
  const props: Props = {
    banners,
    articles: articleRes.data,
    hasMoreArticles: articleRes.count > articlesCount,
    videos: videoRes.data,
    globalBanners
  }
  return { props }
}
