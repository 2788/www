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
    type: '企业型(OV)证书',
    years: 1,
    price: 4850
  },
  {
    key: 2,
    type: '企业型(OV)证书',
    years: 2,
    price: 8245
  },
  {
    key: 3,
    type: '企业型专业版(OV Pro)证书',
    years: 1,
    price: 7650
  },
  {
    key: 4,
    type: '企业型专业版(OV Pro)证书',
    years: 2,
    price: 13005
  },
  {
    key: 5,
    type: '企业增强型(EV)证书',
    years: 1,
    price: 7950
  },
  {
    key: 6,
    type: '企业增强型(EV)证书',
    years: 2,
    price: 13515
  },
  {
    key: 7,
    type: '企业增强型专业版(EV Pro)证书',
    years: 1,
    price: 12650
  },
  {
    key: 8,
    type: '企业增强型专业版(EV Pro)证书',
    years: 2,
    price: 21505
  },
  {
    key: 9,
    type: '企业型(OV)通配符证书',
    years: 1,
    price: 38000
  },
  {
    key: 10,
    type: '企业型(OV)通配符证书',
    years: 2,
    price: 64600
  },
  {
    key: 11,
    type: '企业型专业版(OV Pro)通配符证书',
    years: 1,
    price: 68000
  },
  {
    key: 12,
    type: '企业型专业版(OV Pro)通配符证书',
    years: 2,
    price: 115600
  }
]

export default function DigiCertPane() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} />
}
