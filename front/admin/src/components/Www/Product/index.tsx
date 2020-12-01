import React from 'react'
import { observer } from 'mobx-react'
import Tabs from 'react-icecream/lib/tabs'

import Page from './Page'
import Detail from './Detail'

const tabs = [
  { title: '页面管理', content: <Page /> },
  { title: '产品详情', content: <Detail /> }
]
export default observer(function Homepage() {

  return (
    <Tabs>
      {
        tabs.map((item, index) => (
          <Tabs.TabPane key={index.toString()} tab={item.title} >
            {item.content}
          </Tabs.TabPane>
        ))
      }
    </Tabs>
  )
})
