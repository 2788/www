/**
 * @file render markdown
 * @author lizhifeng <lizhifeng@qiniu.com>
 * @description modify from `components/Price/Tabs/DocumentPane/index.tsx` & to be merged
 */

import React, { useMemo, createElement } from 'react'

import { Preview } from 'constants/pgc/content'
import { mdTextToHTMLAst, RootNode, renderHTMLAst, getIdFromContentDetailUrl } from './utils'
import Embed from './Embed'

import './style.less'

export { mdTextToHTMLAst }
export type { RootNode as AstRootNode }

export interface Props {
  htmlAst: RootNode
  preview?: Preview
  className?: string
}

export default function Markdown({ htmlAst, preview, className }: Props) {
  const element = useMemo(() => (
    renderHTMLAst(
      htmlAst,
      {
        renderContentDetail(url: string, key: number | string) {
          return (
            <Embed id={getIdFromContentDetailUrl(url)} preview={preview} key={key} />
          )
        }
      }
    )
  ), [htmlAst, preview])

  return (
    <>
      {/** 这边之所以使用自定义标签，是为了保证这边样式的独立性（不会影响到其他页面）之外，
      * 又降低了优先级（防止覆盖渲染 md 所替换的组件里面的样式） */}
      {createElement('pgc-markdown-container', { class: className }, element)}
    </>
  )
}
