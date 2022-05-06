/**
 * @file 内容站 - 列表页 - 翻页/加载更多
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetStaticPropsContext } from 'next'

import {
  ContentType, contentTypes, contentTypeTextMap, ContentCategory, contentCategories, contentCategoryTextMap
} from 'constants/pgc/content'
import { listReleasedContent, listAllReleasedContent, ListOptions } from 'apis/admin/pgc/content'
import Layout from 'components/Layout'
import List, { Props, getPageSize } from 'components/pgc/content/List'

export type { Props }

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

type StaticProps = {
  type: string
  category: string
  page: string
}

export async function getStaticProps(ctx: GetStaticPropsContext<StaticProps>) {
  const params = ctx.params!
  const type = params.type as ContentType
  const category = params.category === 'all' ? null : (params.category as ContentCategory)
  const currentPage = Number(params.page)
  const pageSize = getPageSize(type, false)

  const options: ListOptions = {
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
    type,
    category: category ?? undefined
  }
  const result = await listReleasedContent(options)

  const props: Props = {
    type,
    category,
    firstScreenContent: {
      contents: result.data,
      currentPage,
      total: result.count
    }
  }
  return { props }
}

export async function getStaticPaths() {
  const optionsList: Array<{ type: ContentType, category: ContentCategory | undefined }> = []
  contentTypes.forEach(type => {
    [...contentCategories, undefined].forEach(category => {
      optionsList.push({ type, category })
    })
  })

  const contentsList = await Promise.all(optionsList.map(options => listAllReleasedContent(options)))

  const paths: Array<{ params: StaticProps }> = []
  contentsList.forEach((contents, index) => {
    const options = optionsList[index]
    const pageSize = getPageSize(options.type, false)
    const len = Math.ceil(contents.length / pageSize)
    const paramsList = Array.from(Array(len), (_, i) => ({
      type: options.type as string,
      category: options.category ?? 'all',
      page: String(i + 1)
    }))
    paramsList.forEach(params => {
      paths.push({ params })
    })
  })

  return {
    paths,
    fallback: false
  }
}
