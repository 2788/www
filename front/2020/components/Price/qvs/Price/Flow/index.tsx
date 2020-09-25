import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import { TextWrapper } from 'components/Price/UI'

const columns: Array<ColumnProps<any>> = [
  {
    title: '流量',
    dataIndex: 'flow',
    width: 250
  },
  {
    title: '区域',
    dataIndex: 'area',
    width: 250
  },
  {
    title: '价格（元/GB）',
    dataIndex: 'price',
    width: 250
  }
]

const data = [
  {
    key: 0,
    flow: '视频监控-上行',
    area: '中国大陆-CN',
    price: '0.15'
  },
  {
    key: 1,
    flow: '视频监控-下行',
    area: '中国大陆-CN',
    price: '0.4'
  }
]
const title = (
  <div>
    基本描述：按不同区域节点产生的流量乘以流量单价计费，流量累积到自然月底，下月自动清零重新累积。
  </div>
)
const footer = (
  <TextWrapper>
    <p>计费规则：</p>
    <ol style={{ color: '#999999' }}>
      <li>付费方式：后付费</li>
      <li>计费规则：按中国大陆流量价格计费，上行接入流量和下行播放流量分别计费</li>
      <li>计费周期：按月出账，具体出账时间以系统为准</li>
    </ol>
  </TextWrapper>
)

export default function Flow() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} title={() => title} footer={() => footer} />
}
