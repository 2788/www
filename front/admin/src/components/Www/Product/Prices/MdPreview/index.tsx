/**
 * @file          component  MdPreview
 * @description   markdown 预览
 * @author        renpanpan
 */

import React, { useState, useEffect, ReactNode } from 'react'
import cls from 'classnames'
import { Tabs } from 'react-icecream'
import { renderMdText } from './utils'
import * as style from './style.m.less'

export default function MdPreview({ text, className }: { text: string, className: string }) {
  return <div className={cls(style.container, className)}>{useRenderMdText(text)}</div>
}

function useRenderMdText(text: string) {
  const [element, setElement] = useState<JSX.Element | null>(null)
  useEffect(() => {
    renderMdText(
      text,
      {
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
        },
        // 因价格页展示需求，md 文档会有多个一级标题，为符合 html 语义以及和实际上页面展示所对应，
        // 这边特意将 h1 -> h2，顺延 h2 -> h3，因 h3 -> tabs，故后续无需再转换
        tagNames: {
          h1: 'h2',
          h2: 'h3'
        }
      }
    ).then(res => setElement(res))
  }, [text])
  return element
}
