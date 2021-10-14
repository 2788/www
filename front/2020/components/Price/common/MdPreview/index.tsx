/**
 * @file          component  MdPreview
 * @description   markdown 预览
 */

import React, { ReactNode } from 'react'
import PricePane from 'components/Price/Banner/PricePane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { renderHTMLAst, RootNode as HTMLRootNode, RenderOptions } from './utils'
import * as style from './style.m.less'

export { mdTextToHTMLAst } from './utils'
export type { RootNode as HTMLRootNode } from './utils'

const options: RenderOptions = {
  renderTabPane(tab: ReactNode, key: string, children: ReactNode) {
    return (
      <TabPane tab={tab} value={key} key={key}>
        {children}
      </TabPane>
    )
  },
  renderTabs(key: number, children: ReactNode) {
    return (
      <Tabs key={key} className={style.tabs} defaultValue="0" size="middle">
        {children}
      </Tabs>
    )
  }
}

export default function MdPreview({ htmlAst, className }: { htmlAst: HTMLRootNode | null, className?: string }) {
  return (
    <PricePane>
      {/** 这边之所以使用自定义标签，是为了保证这边样式的独立性（不会影响到其他页面）之外，
       * 又降低了优先级（防止覆盖渲染 md 所替换的组件，如 tabs，里面的样式） */}
      {
        React.createElement(
          'markdown-container',
          { class: className },
          htmlAst ? renderHTMLAst(htmlAst, options) : null
        )
      }
    </PricePane >
  )
}
