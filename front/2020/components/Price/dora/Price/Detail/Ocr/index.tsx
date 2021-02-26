import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '名目',
    dataIndex: 'name',
    render(name, __, idx) {
      const result = { children: name, props: { rowSpan: 1 } }
      if (idx === 4) {
        result.props.rowSpan = 4
      }
      if (idx > 4) {
        result.props.rowSpan = 0
      }
      return result
    }
  },
  {
    title: '阶梯',
    dataIndex: 'ladder',
    render(ladder) {
      return ladder || '不区分阶梯'
    }
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
    ladder: '',
    price: '0.05 元/次'
  },
  {
    key: 1,
    name: '营业执照 OCR',
    ladder: '',
    price: '0.05 元/次'
  },
  {
    key: 2,
    name: '车险保单 OCR',
    ladder: '',
    price: '0.05 元/次'
  },
  {
    key: 3,
    name: '车辆登记证 OCR',
    ladder: '',
    price: '0.05 元/次'
  },
  {
    key: 4,
    name: '发票识别 OCR',
    ladder: '第 0 次到 30 万次',
    price: '0.1 元/次'
  },
  {
    key: 5,
    name: '发票识别 OCR',
    ladder: '第 30 万次到 60 万次',
    price: '0.08 元/次'
  },
  {
    key: 6,
    name: '发票识别 OCR',
    ladder: '第 60 万次到 100 万次',
    price: '0.06 元/次'
  },
  {
    key: 7,
    name: '发票识别 OCR',
    ladder: '100 万次以上',
    price: '0.05 元/次'
  }
]

export default function Ocr() {
  return <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
}
