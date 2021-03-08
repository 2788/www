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
    name: '新车发票 OCR',
    price: '0.05 元/次'
  },
  {
    key: 1,
    name: '营业执照 OCR',
    price: '0.05 元/次'
  },
  {
    key: 2,
    name: '车险保单 OCR',
    price: '0.05 元/次'
  },
  {
    key: 3,
    name: '车辆登记证 OCR',
    price: '0.05 元/次'
  },
  {
    key: 4,
    name: '发票识别 OCR',
    price: '0.1 元/次'
  }
]

export default function Ocr() {
  return <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
}
