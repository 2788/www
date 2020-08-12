import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    type: '视频鉴黄',
    price: '0.01 元 / 10 张视频截图'
  },
  {
    type: '音频审核',
    price: '0.012 元 / 分钟'
  }
]
export default function Audio() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
