/* eslint-disable react/no-danger */
/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 16 2020
 * @file: 自定义数据处理
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '规格',
    dataIndex: 'name'
  },
  {
    title: '内存/CPU/系统盘/GPU/数据盘',
    dataIndex: 'params'
  },
  {
    title: '按需算（每小时）',
    dataIndex: 'price_hour'
  },
  {
    title: '按月算（30 天）',
    dataIndex: 'price_month'
  }
]

const data = [
  {
    key: 0,
    name: 'C1M1',
    params: '1 GB / 1 Core / 20 GB / 0 / 0',
    price_hour: '0.0815 元/小时',
    price_month: '58.68 元/月'
  },
  {
    key: 1,
    name: 'C2M2',
    params: '2 GB / 2 Core / 20 GB / 0 / 0',
    price_hour: '0.1631 元/小时',
    price_month: '117.432 元/月'
  },
  {
    key: 2,
    name: 'C2M4',
    params: '4 GB / 2 Core / 20 GB / 0 / 0',
    price_hour: '0.1671 元/小时',
    price_month: '120.312 元/月'
  },
  {
    key: 3,
    name: 'C4M4',
    params: '4 GB / 4 Core / 20 GB / 0 / 0',
    price_hour: '0.3081 元/小时',
    price_month: '221.832 元/月'
  },
  {
    key: 4,
    name: 'C4M8',
    params: '8 GB / 4 Core / 20 GB / 0 / 0',
    price_hour: '0.3161 元/小时',
    price_month: '227.592 元/月'
  },
  {
    key: 5,
    name: 'C8M8',
    params: '8 GB / 8 Core / 20 GB / 0 / 0',
    price_hour: '0.6161 元/小时',
    price_month: '443.592 元/月'
  },
  {
    key: 6,
    name: 'C8M16',
    params: '16 GB / 8 Core / 20 GB / 0 / 0',
    price_hour: '0.6321 元/小时',
    price_month: '455.112 元/月'
  },
  {
    key: 7,
    name: 'C16M16',
    params: '16 GB / 16 Core / 20 GB / 0 / 0',
    price_hour: '2.0875 元/小时',
    price_month: '1503 元/月'
  },
  {
    key: 8,
    name: 'C16M32',
    params: '32 GB / 16 Core / 20 GB / 0 / 0',
    price_hour: '2.1451 元/小时',
    price_month: '1544.472 元/月'
  }
]

export default function Custom() {
  return <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
}
