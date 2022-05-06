/**
 * @file 内容站 - 详情页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetStaticPropsContext } from 'next'

import { ContentType, contentTypeTextMap, contentCategoryTextMap } from 'constants/pgc/content'
import { getContent, listAllReleasedContent } from 'apis/admin/pgc/content'
import Redirect from 'components/Redirect'
import Layout from 'components/Layout'
import { BaseProps } from 'components/pgc/content/Layout'
import Article, { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'
import Video from 'components/pgc/content/Video'
import File from 'components/pgc/content/File'

export interface Props extends Partial<BaseProps> {
  type?: ContentType
  articleHtmlAst: AstRootNode | null
}

export default function PgcDetail({ type, contentDetail, articleHtmlAst, createdAt, preview }: Props) {
  if (!type || !contentDetail) {
    return (
      <Redirect target="/404" />
    )
  }

  const title = contentDetail.title || `${contentDetail.category}${type}`
  const keywords = [
    '七牛云',
    contentTypeTextMap[type],
    contentCategoryTextMap[contentDetail.category]
  ].concat(contentDetail.keywords ?? []).join(', ')

  const pageView = {
    [ContentType.Article]: (
      <Article
        contentDetail={contentDetail}
        htmlAst={articleHtmlAst!}
        createdAt={createdAt}
        preview={preview}
      />
    ),
    [ContentType.Video]: (<Video contentDetail={contentDetail} createdAt={createdAt} />),
    [ContentType.File]: (<File contentDetail={contentDetail} createdAt={createdAt} />)
  }[type]

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={contentDetail.description ?? keywords}
      forceSimple={!!preview}
    >
      {pageView}
    </Layout>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
  const id = params!.id
  const content = await getContent(id)
  const articleHtmlAst = content.type === ContentType.Article
    ? await mdTextToHTMLAst(content.release!.content)
    : null
  const props: Props = {
    type: content.type,
    contentDetail: content.release,
    articleHtmlAst,
    createdAt: content.release?.createdAt
  }
  return { props }
}

export async function getStaticPaths() {
  const contents = await listAllReleasedContent()
  const paths = contents.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false
  }
}
