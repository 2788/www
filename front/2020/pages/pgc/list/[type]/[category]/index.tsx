/**
 * @file 内容站 - 列表页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetStaticPropsContext } from 'next'

import {
  ContentType, contentTypes, contentTypeTextMap, ContentCategory, contentCategories, contentCategoryTextMap
} from 'constants/pgc/content'
import { listReleasedContent, ListOptions } from 'apis/admin/pgc/content'
import Layout from 'components/Layout'
import List, { Props, getPageSize } from 'components/pgc/content/List'

export default function PgcList(props: Props) {
  const keywords = [
    '列表',
    contentTypeTextMap[props.type],
    props.category && contentCategoryTextMap[props.category]
  ].filter(Boolean)

  return (
    <Layout
      title={keywords.join(' - ')}
      keywords={['七牛云', ...keywords].join(', ')}
      description={['七牛云', ...keywords].join(', ')}
    >
      <List {...props} />
    </Layout>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext<{ type: string, category: string }>) {
  const params = ctx.params!
  const type = params.type as ContentType
  const category = params.category === 'all' ? null : (params.category as ContentCategory)

  const options: ListOptions = {
    offset: 0,
    limit: getPageSize(type, false),
    type,
    category: category ?? undefined
  }
  const result = await listReleasedContent(options)

  const props: Props = {
    type,
    category,
    firstScreenContent: {
      contents: result.data,
      total: result.count
    }
  }
  return { props }
}

export async function getStaticPaths() {
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
