/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 18 2020
 * @file: 具体请联系销售询价
 *
 * Copyright (c) 2020 Qiniu
 */
import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '编码方式',
    dataIndex: 'name'
  },
  {
    title: '分辨率',
    dataIndex: 'ratio'
  },
  {
    title: '价格(元/分钟)',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    name: 'H.264',
    ratio: '480P（原流畅）',
    price: '0.016'
  },
  {
    key: 1,
    name: 'H.264',
    ratio: '720P（原标清/高清）',
    price: '0.0325'
  },
  {
    key: 2,
    name: 'H.264',
    ratio: '1080P（原超清）',
    price: '0.08'
  },
  {
    key: 3,
    name: 'H.264',
    ratio: '2K',
    price: '0.14'
  },
  {
    key: 4,
    name: 'H.264',
    ratio: '4K',
    price: '0.28'
  },
  {
    key: 5,
    name: 'H.264',
    ratio: '4K 以上（请联系销售开通）',
    price: '具体请联系销售询价'
  }
]

export default function Transcoding() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <div>
      计费规则：<br />
      1. 计费规则：以编码方式和分辨率计费，按一个自然月内不同编码标准和不同分辨率规格的转码时长乘以对应的单价，以分钟为计费单位，不足一分钟计一分钟<br />
      2. 计费周期：按月计费，具体出账时间以系统为准<br />
    </div>
  )
}
