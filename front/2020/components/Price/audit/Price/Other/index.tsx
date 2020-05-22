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

// const data2 = [
//   {
//     key: 0,
//     usage: '第 0 张 至 1 万张',
//     price: '1.2 元/百张'
//   },
//   {
//     key: 1,
//     usage: '第 1 万张 至 5 万张',
//     price: '0.96 元/百张'
//   },
//   {
//     key: 2,
//     usage: '第 5 万张 至 10 万张',
//     price: '0.78 元/百张'
//   },
//   {
//     key: 3,
//     usage: '第 10 万张 至 50 万张',
//     price: '0.66 元/百张'
//   },
//   {
//     key: 4,
//     usage: '第 50 万张 至 100 万张',
//     price: '0.6 元/百张'
//   },
//   {
//     key: 5,
//     usage: '100 万张以上',
//     price: '0.54 元/百张'
//   }
// ]

export default function Other() {
  return <Table pagination={false} columns={columns} dataSource={data1} />
}
