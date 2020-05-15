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

      if (idx === 4) {
        return { children: name, props: { rowSpan: 3 } }
      }

      return { children: name, props: { rowSpan: 0 } }
    }
  },
  {
    title: '流量阶梯/月',
    dataIndex: 'bandwidth'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: '1',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 0 GB 至 10 GB',
    price: '免费（仅限 HTTP 下载流量）'
  },
  {
    key: '2',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 10 GB 至 100 TB',
    price: '0.24 元/GB'
  },
  {
    key: '3',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 100 TB 至 1 PB',
    price: '0.19 元/GB'
  },
  {
    key: '4',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 1PB 以上',
    price: '0.14 元/GB'
  },
  {
    key: '5',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 0 GB 至 100 TB',
    price: '0.28 元/GB'
  },
  {
    key: '6',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 100 TB 至 1 PB',
    price: '0.23 元/GB'
  },
  {
    key: '7',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 1 PB 以上',
    price: '0.18 元/GB'
  }
]

export default function TabPane1() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
