import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Table, { ColumnProps } from 'react-icecream/lib/table'

import Overall from './Overall'

const columns: Array<ColumnProps<any>> = [
  {
    title: '计费方式',
    dataIndex: 'type'
  },
  {
    title: '计费规则',
    dataIndex: 'rule'
  }
]

const data = [
  {
    key: 1,
    type: '预付费（包年包月）',
    rule: '即先付费再使用，按月计费。计费周期以一个整点为一个结算周期（均以 UTC+8 时间为准），计费周期从创建开始付费，到释放结束付费，整点结算完进入新的结算周期时。'
  },
  {
    key: 2,
    type: '后付费（按量付费）',
    rule: '即先使用再付费，按小时计费。计费周期以 UTC+8 时区的时间为准，计费周期的起点是资源开通的时间点，终点是指定使用时长后的第一个 00:00:00。'
  }
]

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="计费模式" padding>
        <Table columns={columns} dataSource={data} pagination={false} />
      </PricePaneSection>
      <PricePaneSection title="计费项总览" padding>
        <Overall />
      </PricePaneSection>
    </PricePane>
  )
}
