/**
 * @file 内容站 - 详情页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetServerSidePropsContext } from 'next'

import {
  ContentId, ContentType, contentTypeTextMap, contentCategoryTextMap, ContentDetail, ReleasedContent, Preview
} from 'constants/pgc/content'
import { getContent, listAllReleasedContents } from 'apis/admin/pgc/content'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import Redirect from 'components/Redirect'
import Layout from 'components/Layout'
import Article, { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'
import Video from 'components/pgc/content/Video'
import File from 'components/pgc/content/File'

export interface Props {
  id: ContentId | null
  type: ContentType | null
  contentDetail: ContentDetail | null
  articleHtmlAst: AstRootNode | null
  createdAt: number | null // 10 位 unix 时间戳
  preview: Preview | null
  globalBanners?: GlobalBanner[]
}

export default function PgcDetail(
  { id, type, contentDetail, articleHtmlAst, createdAt, preview, globalBanners }: Props
) {
  if (type == null || contentDetail == null) {
    return (
      <Redirect target="/404" />
    )
  }

  const title = contentDetail.title || `${contentDetail.category}${type}`
  const keywords = [
    '七牛云',
    contentTypeTextMap[type],
    contentCategoryTextMap[contentDetail.category]
  ].concat(contentDetail.keywords ?? []).join(',')

  const pageView = {
    [ContentType.Article]: (
      <Article
        id={id ?? undefined}
        contentDetail={contentDetail}
        htmlAst={articleHtmlAst!}
        createdAt={createdAt ?? undefined}
        preview={preview ?? undefined}
      />
    ),
    [ContentType.Video]: (<Video contentDetail={contentDetail} createdAt={createdAt ?? undefined} />),
    [ContentType.File]: (<File contentDetail={contentDetail} createdAt={createdAt ?? undefined} />)
  }[type]

  const layoutBaseProps = {
    title,
    keywords,
    description: contentDetail.description ?? keywords
  }

  return (
    preview ? (
      <Layout {...layoutBaseProps} forceSimple>
        {pageView}
      </Layout>
    ) : (
      <Layout {...layoutBaseProps} globalBanners={globalBanners ?? []}>
        {pageView}
      </Layout>
    )
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext<{ id: ContentId }>) {
  const id = params!.id
  const content = (await getContent(id)) as ReleasedContent
  const articleHtmlAst = content.type === ContentType.Article
    ? await mdTextToHTMLAst(content.release!.content)
    : null
  const globalBanners = await getGlobalBanners()
  const props: Props = {
    id,
    type: content.type,
    contentDetail: content.release,
    articleHtmlAst,
    createdAt: content.release.createdAt,
    preview: null,
    globalBanners
  }
  return { props }
}

export async function getServerSidePaths() {
  const contents = await listAllReleasedContents()
  const paths = contents.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false
  }
}
