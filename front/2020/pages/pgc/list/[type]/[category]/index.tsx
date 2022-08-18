/**
 * @file 内容站 - 列表页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetServerSidePropsContext } from 'next'

import {
  ContentType, contentTypes, contentTypeTextMap, ContentCategory, contentCategories, contentCategoryTextMap
} from 'constants/pgc/content'
import { listReleasedContents, ListOptions } from 'apis/admin/pgc/content'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import Layout from 'components/Layout'
import List, { Props as BaseProps, getPageSize } from 'components/pgc/content/List'

interface Props extends BaseProps {
  globalBanners: GlobalBanner[]
}

export default function PgcList({ globalBanners, ...pageProps }: Props) {
  const keywords = [
    '列表',
    contentTypeTextMap[pageProps.type],
    pageProps.category && contentCategoryTextMap[pageProps.category]
  ].filter(Boolean)

  return (
    <Layout
      title={keywords.join(' - ')}
      keywords={['七牛云', ...keywords].join(', ')}
      description={['七牛云', ...keywords].join(', ')}
      globalBanners={globalBanners}
    >
      <List {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ type: string, category: string }>) {
  const params = ctx.params!
  const type = params.type as ContentType
  const category = params.category === 'all' ? null : (params.category as ContentCategory)

  const options: ListOptions = {
    offset: 0,
    limit: getPageSize(type, false),
    type,
    category: category ?? undefined
  }
  const result = await listReleasedContents(options)

  const globalBanners = await getGlobalBanners()

  const props: Props = {
    type,
    category,
    firstScreenContent: {
      contents: result.data,
      total: result.count
    },
    globalBanners
  }
  return { props }
}

export async function getServerSidePaths() {
  const paths: Array<{ params: { type: string, category: string } }> = []
  contentTypes.forEach(type => {
    [...contentCategories, 'all'].forEach(category => {
      paths.push({
        params: {
          type,
          category
        }
      })
    })
  })
  return {
    paths,
    fallback: false
  }
}
