import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import { TextWrapper } from 'components/Price/UI'

const columns: Array<ColumnProps<any>> = [
  {
    title: '转推流（路）',
    dataIndex: 'stream'
  },
  {
    title: '国内价格（元/分钟）',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    stream: '1',
    price: '0.1'
  }
]

export default function Pub() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <TextWrapper>
      <p>计费规则：</p>
      <ol>
        <li>计费方式：每月出账后付费（账单）</li>
        <li>计费规则：统计转推流数量并根据总使用时长乘以对应的单价，为最终结算标准</li>
        <li>计费周期：按月出账，具体出账时间以系统为准</li>
      </ol>
    </TextWrapper>
  )
}
