/**
 * @file 官网在线咨询功能对应的管理功能
 */

import React from 'react'
import { observer } from 'mobx-react'
import TabBar from 'admin-base/common/components/TabBar'

import Keyword from './Keyword'

export default observer(function Consult() {
  return (
    <TabBar
      relative
      defaultPath="/keyword"
      items={[
        { tab: '关键词', path: '/keyword', content: <Keyword /> }
      ]}
    />
  )
})
