import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import { Alert } from 'components/Price/UI'

const columns: Array<ColumnProps<any>> = [
  {
    title: '计费项',
    dataIndex: 'detail',
    width: 250
  },
  {
    title: '区域',
    dataIndex: 'area',
    width: 250
  },
  {
    title: '价格（元/Mbps/日）',
    dataIndex: 'price',
    width: 250
  }
]

const data = [
  {
    key: 0,
    detail: '视频监控-上行',
    area: '中国大陆-CN',
    price: '0.31'
  },
  {
    key: 1,
    detail: '视频监控-下行',
    area: '中国大陆-CN',
    price: '0.7'
  }
]
const title = (
  <div>
    基本描述：按日峰值带宽计费是以当日各个服务节点分别产生的带宽最高值（单位 Mbps）为结算标准。包括上行接入带宽和下行播放带宽两个计费项。
  </div>
)
const footer = (
  <div>
    计费规则：<br />
    1. 付费方式：后付费<br />
    2. 计费规则：中国大陆日带宽峰值按照指定单价计费<br />
    3. 计费周期：按月出账，具体出账时间以系统为准<br />
    <Alert>说明：</Alert>
    <Alert>按日宽峰值带宽计费是以您视频监控上下行分别产生的带宽最高值（单位 Mbps）为结算标准，上下行日峰值带宽分别计费</Alert>
  </div>
)

export default function Bandwidth() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} title={() => title} footer={() => footer} />
}
