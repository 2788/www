/**
 * @file 内容站 - 详情页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { GetServerSidePropsContext } from 'next'

import {
  ContentId, ContentType, contentTypeTextMap, contentCategoryTextMap, ContentDetail, Preview
} from 'constants/pgc/content'
import { getContent, listAllReleasedContents } from 'apis/admin/pgc/content'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import Layout from 'components/Layout'
import Article, { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'
import Video from 'components/pgc/content/Video'
import File from 'components/pgc/content/File'
import NotFoundPage from 'pages/404'

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
    return <NotFoundPage globalBanners={globalBanners} />
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

export async function getServerSideProps({ params, res }: GetServerSidePropsContext<{ id: ContentId }>) {
  const id = params!.id

  const content = await getContent(id)

  if (content == null || content.release == null) {
    // TODO：暂时这么处理，升级 next 后可以：return { notFound: true }
    // 参考：https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#notfound
    res.statusCode = 404
    return { props: {} }
  }

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
