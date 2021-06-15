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
    price: 3637.5
  },
  {
    key: 2,
    type: '企业型（OV）证书',
    years: 2,
    price: 5674.5
  },
  {
    key: 3,
    type: '企业型（OV）多域名证书',
    years: 1,
    price: '7275（默认包含 2 个单域名）+ 额外单域名个数 x 3637.5'
  },
  {
    key: 4,
    type: '企业型（OV）多域名证书',
    years: 2,
    price: '11349（默认包含 2 个单域名）+ 额外单域名个数 x 5674.5'
  },
  {
    key: 5,
    type: '企业型（OV）多域名泛域名证书',
    years: 1,
    price: '7275（默认包含 2 个单域名）+ 额外单域名个数 x 3637.5 + 额外泛域名个数 x 28500'
  },
  {
    key: 6,
    type: '企业型（OV）多域名泛域名证书',
    years: 2,
    price: '11349（默认包含 2 个单域名）+ 额外单域名个数 x 5674.5 + 额外泛域名个数 x 44460'
  },
  {
    key: 7,
    type: '企业型专业版（OV Pro）证书',
    years: 1,
    price: 5355
  },
  {
    key: 8,
    type: '企业型专业版（OV Pro）证书',
    years: 2,
    price: 8950.5
  },
  {
    key: 7,
    type: '企业型专业版（OV Pro）多域名证书',
    years: 1,
    price: '10710（默认包含 2 个单域名）+ 额外单域名个数 x 5355'
  },
  {
    key: 8,
    type: '企业型专业版（OV Pro）多域名证书',
    years: 2,
    price: '17901（默认包含 2 个单域名）+ 额外单域名个数 x 8950.5'
  },
  {
    key: 9,
    type: '企业型专业版（OV Pro）多域名泛域名证书',
    years: 1,
    price: '10710（默认包含 2 个单域名）+ 额外单域名个数 x 5355 + 额外泛域名个数 x 47600'
  },
  {
    key: 10,
    type: '企业型专业版（OV Pro）多域名泛域名证书',
    years: 2,
    price: '17901（默认包含 2 个单域名）+ 额外单域名个数 x 8950.5 + 额外泛域名个数 x 79560'
  },
  {
    key: 11,
    type: '企业增强型（EV）证书',
    years: 1,
    price: 5565
  },
  {
    key: 12,
    type: '企业增强型（EV）证书',
    years: 2,
    price: 9301.5
  },
  {
    key: 13,
    type: '企业增强型（EV）多域名证书',
    years: 1,
    price: '11130（默认包含 2 个单域名）+ 额外单域名个数 x 5565'
  },
  {
    key: 14,
    type: '企业增强型（EV）多域名证书',
    years: 2,
    price: '18603（默认包含 2 个单域名）+ 额外单域名个数 x 9301.5'
  },
  {
    key: 15,
    type: '企业增强型专业版（EV Pro）证书',
    years: 1,
    price: 9487.5
  },
  {
    key: 16,
    type: '企业增强型专业版（EV Pro）证书',
    years: 2,
    price: 14800.5
  },
  {
    key: 17,
    type: '企业增强型专业版（EV Pro）多域名证书',
    years: 1,
    price: '18975（默认包含 2 个单域名）+ 额外单域名个数 x 9487.5'
  },
  {
    key: 18,
    type: '企业增强型专业版（EV Pro）多域名证书',
    years: 2,
    price: '29601（默认包含 2 个单域名）+ 额外单域名个数 x 14800.5'
  },
  {
    key: 19,
    type: '企业型（OV）通配符证书',
    years: 1,
    price: 28500
  },
  {
    key: 20,
    type: '企业型（OV）通配符证书',
    years: 2,
    price: 44460
  },
  {
    key: 21,
    type: '企业型专业版（OV Pro）通配符证书',
    years: 1,
    price: 51000
  },
  {
    key: 22,
    type: '企业型专业版（OV Pro）通配符证书',
    years: 2,
    price: 79560
  }
]

export default function DigiCertPane() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
