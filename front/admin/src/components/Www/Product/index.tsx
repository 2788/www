import React from 'react'
import { observer } from 'mobx-react'
import TabBar from 'admin-base/common/components/TabBar'

import Page from './Page'
import Notice from './Notice'
import News from './News'

const tabs = [
  { tab: '页面管理', path: '/page', content: <Page /> },
  { tab: '产品公告', path: '/notice', content: <Notice /> },
  { tab: '产品动态', path: '/news', content: <News /> }
]

export default observer(function Product() {
  return (
    <TabBar
      relative
      defaultPath="/page"
      items={tabs}
    />
  )
})
