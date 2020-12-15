import React from 'react'
import { observer } from 'mobx-react'
import TabBar from 'admin-base/common/components/TabBar'

import Banner from './Banner'
import Activity from './Activity'
import News from './News'

const tabs = [
  { tab: 'Banner', path: '/banner', content: <Banner /> },
  { tab: '活动公告', path: '/activity', content: <Activity /> },
  { tab: '七牛资讯', path: '/news', content: <News /> }
]

export default observer(function Homepage() {
  return (
    <TabBar
      relative
      defaultPath="/banner"
      items={tabs}
    />
  )
})
