/**
 * @file article
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'

import Layout, { BaseProps, Header } from '../Layout'
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
      <Layout preview={preview} className={style.main}>
        <Header
          contentDetail={contentDetail}
          createdAt={createdAt}
          preview={preview}
          className={style.header}
        />
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
        className={style.header}
        hasBackground
      />
      <Layout preview={preview} className={style.main}>
        <Markdown htmlAst={htmlAst} preview={preview} />
      </Layout>
    </div>
  )
}
