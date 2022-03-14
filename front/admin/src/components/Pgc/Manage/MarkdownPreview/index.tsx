/**
 * @file markdown preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 * @description modify from `components/Www/Product/Prices/MdPreview/index.tsx` & to be merged
 */

import React, { useState, useEffect, createElement, useMemo } from 'react'
import { Loading } from 'react-icecream'

import { mdTextToHTMLAst, renderHTMLAst, RenderOptions, getExternalContentId } from './utils'

import './style.m.less'

export interface Props {
  text: string
  className?: string
}

export default function MdPreview({ text, className }: Props) {
  return (
    <>
      {/** 这边之所以使用自定义标签，是为了保证这边样式的独立性（不会影响到其他页面）之外，
      * 又降低了优先级（防止覆盖渲染 md 所替换的组件里面的样式） */}
      {createElement('pgc-markdown-preview', { class: className }, useRenderMdText(text))}
    </>
  )
}

function ExternalContent({ url }: { url: string }) {
  const [isLoading] = useState(true)
  const [info] = useState<unknown | null>(null)
  const id = useMemo(() => getExternalContentId(url), [url])

  // TODO: fetchInfo(id).then(setInfo) 然后根据 type 按照官网规格渲染以下两种东西：
  //   <video src={url} controls></video>
  //   <a href={url} download>{url}</a>

  const content = info
    ? (
      <div>
        TODO: render {id}
      </div>
    )
    : (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={url} target="_blank" title="点击查看内容">
        {url}
      </a>
    )

  return (
    <Loading loading={isLoading}>
      {content}
    </Loading>
  )
}

const options: RenderOptions = {
  renderExternalContent(url: string, key: number | string) {
    return (
      <ExternalContent url={url} key={key} />
    )
  }
}

function useRenderMdText(text: string) {
  const [element, setElement] = useState<JSX.Element | null>(null)
  useEffect(() => {
    mdTextToHTMLAst(
      text
    ).then(htmlAst => {
      setElement(renderHTMLAst(htmlAst, options))
    })

  }, [text])
  return element
}
