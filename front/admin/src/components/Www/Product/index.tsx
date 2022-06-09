import React from 'react'
import { observer } from 'mobx-react'
import TabBar from 'admin-base/common/components/TabBar'

import Page from './Page'
import Prices from './Prices'

const tabs = [
  { tab: '页面管理', path: '/page', content: <Page /> },
  { tab: '价格', path: '/prices', content: <Prices /> }
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
