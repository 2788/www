/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Wed Aug 12 2020
 * @file: APP 安装包分析
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '范围（次）',
    dataIndex: 'range'
  },
  {
    title: '单价（元/次）',
    dataIndex: 'price'
  }
]

const data = [
  {
    range: '0 - 3 万',
    price: '0.2'
  },
  {
    range: '3 万 - 10 万',
    price: '0.15'
  },
  {
    range: '> 10 万',
    price: '0.1'
  }
]
export default function App() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
