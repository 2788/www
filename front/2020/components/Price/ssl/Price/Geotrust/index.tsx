import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 450,
    render(type, _, idx) {
      if (idx % 2 === 0) {
        return { children: type, props: { rowSpan: 2 } }
      }

      if (idx % 2 === 1) {
        return { children: type, props: { rowSpan: 0 } }
      }

      return type
    }
  },
  {
    title: '年限',
    dataIndex: 'years',
    width: 100
  },
  {
    title: '七牛云售价（元）',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 1,
    type: '企业型（OV）证书',
    years: 1,
    price: 1995
  },
  {
    key: 2,
    type: '企业型（OV）证书',
    years: 2,
    price: 3334.5
  },
  {
    key: 3,
    type: '企业型（OV）多域名证书（默认包含 2 个标准域名额度）',
    years: 1,
    price: 2450
  },
  {
    key: 4,
    type: '企业型（OV）多域名证书（默认包含 2 个标准域名额度）',
    years: 2,
    price: 4095
  },
  {
    key: 5,
    type: '企业型（OV）多域名证书额外域名',
    years: 1,
    price: 455
  },
  {
    key: 6,
    type: '企业型（OV）多域名证书额外域名',
    years: 2,
    price: 760.5
  },
  {
    key: 7,
    type: '企业型（OV）通配符证书',
    years: 1,
    price: 4795
  },
  {
    key: 8,
    type: '企业型（OV）通配符证书',
    years: 2,
    price: 8014.5
  },
  {
    key: 9,
    type: '企业增强型(EV)证书',
    years: 1,
    price: 3637.5
  },
  {
    key: 10,
    type: '企业增强型(EV)证书',
    years: 2,
    price: 5674.50
  },
  {
    key: 11,
    type: '企业增强型(EV)多域名证书（默认包含 2 个单域名）',
    years: 1,
    price: 4725
  },
  {
    key: 12,
    type: '企业增强型(EV)多域名证书（默认包含 2 个单域名）',
    years: 2,
    price: 7371
  },
  {
    key: 13,
    type: '企业增强型(EV)多域名证书额外域名',
    years: 1,
    price: 1087.5
  },
  {
    key: 14,
    type: '企业增强型(EV)多域名证书额外域名',
    years: 2,
    price: 1696.5
  }
]

export default function GeotrustPane() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
