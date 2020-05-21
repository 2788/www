import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '名目',
    dataIndex: 'name',
    render(name, __, idx) {
      if (idx === 0) {
        return { children: name, props: { rowSpan: 4 } }
      }

      return { children: name, props: { rowSpan: 0 } }
    }
  },
  {
    title: '请求数',
    dataIndex: 'count'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: '1',
    name: '动态加速请求数',
    count: '第 0 次至 5 万次',
    price: '免费'
  },
  {
    key: '2',
    name: '动态加速请求数',
    count: '第 5 万次及以上',
    price: '0.19 元/万次'
  }
]

export default function DynamicAcc() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
