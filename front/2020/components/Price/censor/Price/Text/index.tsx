import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Tabs, { TabPane } from 'components/UI/Tabs'

const columns: Array<ColumnProps<any>> = [
  {
    title: '每月调用量 P',
    dataIndex: 'usage'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    usage: '无阶梯',
    price: '1 元／千次'
  }
]

export default function Text() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="文本反垃圾" value="1"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
    </Tabs>
  )
}
