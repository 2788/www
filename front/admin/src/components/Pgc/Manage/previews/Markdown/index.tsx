/**
 * @file markdown preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 * @description modify from `components/Www/Product/Prices/MdPreview/index.tsx` & to be merged
 */

import React, { useState, useEffect, createElement, useMemo } from 'react'
import { Loading } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { ContentType, Content } from 'constants/pgc/conetnt'
import { getContentIdFromWwwContentDetailUrl } from 'transforms/pgc/content'
import PgcContentApis from 'apis/pgc/content'

import { mdTextToHTMLAst, renderHTMLAst, RenderOptions } from './utils'
import { EmbedArticlePreview } from '../Article'
import { EmbedVideoPreview } from '../Video'
import { EmbedFilePreview } from '../File'
import InitialEmbed from '../InitialEmbed'
import UnreleasedEmbedPreview from '../UnreleasedEmbed'

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

function WwwContentDetail({ url }: { url: string }) {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentApis = useInjection(PgcContentApis)

  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<Content | null>(null)

  const id = useMemo(() => getContentIdFromWwwContentDetailUrl(url), [url])

  useEffect(() => {
    setIsLoading(true)
    setContent(null)
    toasterStore.promise(
      pgcContentApis.get(id)
        .then(ct => { setContent(ct) })
        .finally(() => { setIsLoading(false) })
    )
  }, [pgcContentApis, toasterStore, id])

  // eslint-disable-next-line no-nested-ternary
  const contentView = content
    ? (
      content.release
      ? ({
        [ContentType.Article]: (<EmbedArticlePreview />),
        [ContentType.Video]: (<EmbedVideoPreview contentDetail={content.release} id={id} />),
        [ContentType.File]: (<EmbedFilePreview contentDetail={content.release} id={id} />)
      }[content.type])
      : (
        <UnreleasedEmbedPreview content={content} />
      )
    )
    : (
      <InitialEmbed id={id} />
    )

  return (
    <Loading loading={isLoading}>
      {contentView}
    </Loading>
  )
}

const options: RenderOptions = {
  renderWwwContentDetail(url: string, key: number | string) {
    return (
      <WwwContentDetail url={url} key={key} />
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
