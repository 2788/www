/* eslint-disable react/no-danger */
/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 16 2020
 * @file: 文件处理
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '名目',
    dataIndex: 'name',
    width: '50%'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    name: 'qhash（文件 HASH 值）',
    price: '0.05 元/GB'
  },
  {
    key: 1,
    name: 'concat（文本文件合并）',
    price: '0.05 元/GB'
  },
  {
    key: 2,
    name: 'mkzip（多文件压缩）',
    price: '0.05 元/GB'
  },
  {
    key: 3,
    name: 'md2html（MD 转 HTML）',
    price: '0.1 元/千次'
  },
  {
    key: 4,
    name: 'qrcode（资源下载二维码）',
    price: '0.1 元/千次'
  }
]

export default function File() {
  return <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
}
