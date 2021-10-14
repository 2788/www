/**
 * @file          component  MdPreview
 * @description   markdown 预览
 * @author        renpanpan
 */

import React, { useState, useEffect, ReactNode, createElement } from 'react'
import { Tabs } from 'react-icecream'
import { mdTextToHTMLAst, renderHTMLAst, RenderOptions } from './utils'
import './style.m.less'

export default function MdPreview({ text, className }: { text: string, className: string }) {
  return (
    <>
      {/** 这边之所以使用自定义标签，是为了保证这边样式的独立性（不会影响到其他页面）之外，
       * 又降低了优先级（防止覆盖渲染 md 所替换的组件，如 tabs，里面的样式） */}
      {createElement('markdown-container', { class: className }, useRenderMdText(text))}
    </>
  )
}

const options: RenderOptions = {
  renderTabPane(tab: ReactNode, key: string, children: ReactNode) {
    return (
      <Tabs.TabPane tab={tab} key={key}>
        {children}
      </Tabs.TabPane>
    )
  },
  renderTabs(key: number, children: ReactNode) {
    return (
      <Tabs key={key}>
        {children}
      </Tabs>
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
