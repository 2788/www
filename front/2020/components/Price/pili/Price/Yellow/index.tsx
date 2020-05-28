/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 18 2020
 * @file: 智能直播鉴黄
 *
 * Copyright (c) 2020 Qiniu
 */
import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '总调用量 P（单位：万张）',
    dataIndex: 'total'
  },
  {
    title: '调用单价（单位：元/百张）',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    total: 'P <= 300',
    price: '0.18'
  },
  {
    key: 1,
    total: '300 < P <=1500',
    price: '0.16'
  },
  {
    key: 2,
    total: '1500 < P <= 3000',
    price: '0.15'
  },
  {
    key: 3,
    total: 'P > 3000',
    price: '0.13'
  }
]

export default function Yellow() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <div>
      计费规则：<br />
      1. 计费规则：一个自然月内按照鉴黄调用量乘以对应的单价<br />
      2. 计费周期：按月计费，具体出账时间以系统为准<br />
    </div>
  )
}
