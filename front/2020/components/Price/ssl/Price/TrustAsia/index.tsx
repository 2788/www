import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 450,
    render(type, _, idx) {
      if (idx % 2 === 1) {
        return { children: type, props: { rowSpan: 2 } }
      }

      if (idx % 2 === 0 && idx !== 0) {
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
    type: '域名型（DV）SSL 证书',
    years: 1,
    price: '七牛云用户免费'
  },
  {
    key: 2,
    type: '域名型（DV）通配符 SSL 证书',
    years: 1,
    price: 1699
  },
  {
    key: 3,
    type: '域名型（DV）通配符 SSL 证书',
    years: 2,
    price: 2698.50
  },
  {
    key: 4,
    type: '企业型（OV）证书',
    years: 1,
    price: 3375
  },
  {
    key: 5,
    type: '企业型（OV）证书',
    years: 2,
    price: 5265
  },
  {
    key: 6,
    type: '企业型（OV）多域名证书',
    years: 1,
    price: '4875（默认包含 2 个单域名）+ 额外单域名个数 x 1500'
  },
  {
    key: 7,
    type: '企业型（OV）多域名证书',
    years: 2,
    price: '7605（默认包含 2 个单域名）+ 额外单域名个数 x 2400'
  },
  {
    key: 8,
    type: '企业型（OV）通配符证书',
    years: 1,
    price: 10125
  },
  {
    key: 9,
    type: '企业型（OV）通配符证书',
    years: 2,
    price: 15795
  },
  {
    key: 10,
    type: '企业增强型（EV）证书',
    years: 1,
    price: 6650
  },
  {
    key: 11,
    type: '企业增强型（EV）证书',
    years: 2,
    price: 11115
  },
  {
    key: 12,
    type: '企业增强型（EV）多域名证书',
    years: 1,
    price: '9100（默认包含 2 个单域名）+ 额外单域名个数 x 2450'
  },
  {
    key: 13,
    type: '企业增强型（EV）多域名证书',
    years: 2,
    price: '15210（默认包含 2 个单域名）+ 额外单域名个数 x 4097'
  }
]

export default function TrustAsiaPane() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
