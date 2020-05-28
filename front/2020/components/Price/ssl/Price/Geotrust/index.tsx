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
    dataIndex: 'years'
  },
  {
    title: '七牛云售价',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 1,
    type: '企业型（OV）证书',
    years: 1,
    price: '2850'
  },
  {
    key: 2,
    type: '企业型（OV）证书',
    years: 2,
    price: 4845
  },
  {
    key: 3,
    type: '企业型（OV）多域名证书（默认包含 5 个标准域名额度）',
    years: 1,
    price: 5450
  },
  {
    key: 4,
    type: '企业型（OV）多域名证书（默认包含 5 个标准域名额度）',
    years: 2,
    price: 9265
  },
  {
    key: 5,
    type: '企业型（OV）多域名证书额外域名',
    years: 1,
    price: 650
  },
  {
    key: 6,
    type: '企业型（OV）多域名证书额外域名',
    years: 2,
    price: 1105
  },
  {
    key: 7,
    type: '企业型（OV）通配符证书',
    years: 1,
    price: 6850
  },
  {
    key: 8,
    type: '企业型（OV）通配符证书',
    years: 2,
    price: 11645
  },
  {
    key: 9,
    type: '企业增强型(EV)证书',
    years: 1,
    price: 4850
  },
  {
    key: 10,
    type: '企业增强型(EV)证书',
    years: 2,
    price: 8245
  },
  {
    key: 11,
    type: '企业增强型(EV)多域名证书（默认包含 5 个单域名）',
    years: 1,
    price: 9650
  },
  {
    key: 12,
    type: '企业增强型(EV)多域名证书（默认包含5个单域名）',
    years: 2,
    price: 19300
  },
  {
    key: 13,
    type: '企业增强型(EV)多域名证书额外域名',
    years: 1,
    price: 1450
  },
  {
    key: 14,
    type: '企业增强型(EV)多域名证书额外域名',
    years: 2,
    price: 2465
  }
]

export default function GeotrustPane() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
