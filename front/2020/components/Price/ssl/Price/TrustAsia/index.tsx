import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type',
    width: 450,
    render(type, _, idx) {
      if (idx === 2 || idx === 4 || idx === 6 || idx === 8) {
        return { children: type, props: { rowSpan: 2 } }
      }

      if (idx === 3 || idx === 5 || idx === 7 || idx === 9) {
        return { children: type, props: { rowSpan: 0 } }
      }

      return type
    }
  },
  {
    title: '年限',
    dataIndex: 'years'
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
    price: '1699（送 100 元 CDN 资源包抵用券）'
  },
  {
    key: 3,
    type: '企业型（OV）证书',
    years: 1,
    price: 3375
  },
  {
    key: 4,
    type: '企业型（OV）证书',
    years: 2,
    price: 5400
  },
  {
    key: 5,
    type: '企业型（OV）多域名证书（默认包含 2 个标准域名额度）',
    years: 1,
    price: 4875
  },
  {
    key: 6,
    type: '企业型（OV）多域名证书（默认包含 2 个标准域名额度）',
    years: 2,
    price: 7800
  },
  {
    key: 7,
    type: '企业型（OV）多域名证书额外域名',
    years: 1,
    price: 1500
  },
  {
    key: 8,
    type: '企业型（OV）多域名证书额外域名',
    years: 2,
    price: 2400
  },
  {
    key: 9,
    type: '企业型（OV）通配符证书',
    years: 1,
    price: 10125
  },
  {
    key: 10,
    type: '企业型（OV）通配符证书',
    years: 2,
    price: 16200
  }
]

export default function TrustAsiaPane() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
