import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '每月调用量 P',
    dataIndex: 'usage'
  },
  {
    title: '机器智能审核价格',
    dataIndex: 'price'
  }
]

const data1 = [
  {
    key: 0,
    usage: '第 0 张 至 500 万张',
    price: '0.38 元／百张'
  },
  {
    key: 1,
    usage: '第 500 万张 至 1500 万张',
    price: '0.36 元／百张'
  },
  {
    key: 2,
    usage: '第 1500 万张 至 3000 万张',
    price: '0.34 元／百张'
  },
  {
    key: 3,
    usage: '3000 万张以上',
    price: '0.32 元／百张'
  }
]

export default function Other() {
  return <Table bordered pagination={false} columns={columns} dataSource={data1} />
}
