import React from 'react'
import { observer } from 'mobx-react'
import Tabs from 'react-icecream/lib/tabs'

import Banner from './Banner'
import Activity from './Activity'
import News from './News'

const tabs = [
  { title: 'banner', content: <Banner /> },
  { title: '活动公告', content: <Activity /> },
  { title: '七牛资讯', content: <News /> }
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
