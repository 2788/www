/**
 * @file article
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'
import { ContentId, ContentDetailWithTime } from 'constants/pgc/content'

import Layout, { BaseProps, Header } from '../Layout'
import Card, { CardLink, CardContent } from '../Card'
import Markdown, { mdTextToHTMLAst, AstRootNode } from './Markdown'

import style from './style.less'

export { mdTextToHTMLAst }
export type { AstRootNode }

export interface Props extends BaseProps {
  htmlAst: AstRootNode
}

export default function Article({ contentDetail, htmlAst, createdAt, preview }: Props) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <Layout preview={preview} className={style.detail}>
        <Header
          contentDetail={contentDetail}
          createdAt={createdAt}
          preview={preview}
          className={style.detailHeader}
        />
        {contentDetail.description && (
          <p className={style.desc}>{contentDetail.description}</p>
        )}
        <Markdown htmlAst={htmlAst} preview={preview} />
      </Layout>
    )
  }

  return (
    <div>
      <Header
        contentDetail={contentDetail}
        createdAt={createdAt}
        preview={preview}
        className={style.detailHeader}
        hasBackground
      />
      <Layout preview={preview} className={style.detail}>
        {contentDetail.description && (
          <p className={style.desc}>{contentDetail.description}</p>
        )}
        <Markdown htmlAst={htmlAst} preview={preview} />
      </Layout>
    </div>
  )
}

export interface ArticleItemProps {
  id: ContentId
  contentDetail: ContentDetailWithTime
}

export function ArticleItem({ id, contentDetail }: ArticleItemProps) {
  const isMobile = useMobile()
  return (
    <CardLink id={id} className={style.item}>
      {!isMobile && (
        <img src={contentDetail.posterUrl} alt="封面" />
      )}
      <Card contentDetail={contentDetail} className={style.card}>
        <CardContent description={contentDetail.description} className={style.content}>
          {
            isMobile
            ? (<img src={contentDetail.posterUrl} alt="封面" />)
            : undefined
          }
        </CardContent>
      </Card>
    </CardLink>
  )
}
