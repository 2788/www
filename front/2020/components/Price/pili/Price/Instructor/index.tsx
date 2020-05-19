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
    title: '导播输出规格（H.264）',
    dataIndex: 'name'
  },
  {
    title: '国内价格（元/分钟）',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    name: '480P',
    price: '0.2'
  },
  {
    key: 1,
    name: '720P',
    price: '0.35'
  },
  {
    key: 2,
    name: '1080P',
    price: '0.6'
  },
  {
    key: 3,
    name: '2K 及以上（请联系销售开通）',
    price: '具体请联系销售询价'
  }
]

export default function Instructor() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <div>
      计费规则：<br />
      1. 计费规则：按照导播流不同规格输出的时长乘以对应的单价<br />
      2. 计费周期：按月计费，具体出账时间以系统为准<br />
    </div>
  )
}
