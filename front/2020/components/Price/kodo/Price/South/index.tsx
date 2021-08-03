/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 18 2020
 * @file: 华南
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Hot from 'components/Hot'
import Footer from '../Footer'

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'name',
    width: 100,
    render(name, _, idx) {
      const result = { children: name, props: { rowSpan: 0 } }

      // 存储费用
      if (idx === 0) {
        result.props.rowSpan = 2
      }

      if (idx === 2) {
        result.props.rowSpan = 6
      }

      // 数据处理
      if (idx === 8) {
        result.props.rowSpan = 1
      }

      // 请求费用
      if (idx === 9) {
        result.props.rowSpan = 5
      }

      return result
    }
  },
  {
    title: '计费项',
    dataIndex: 'detail',
    width: 250,
    render(name, _, idx) {
      const result = { children: name, props: { rowSpan: 0 } }

      // 存储空间费用
      if (idx === 0) {
        result.props.rowSpan = 2
      }

      // 流量费用
      if (idx === 2 || idx === 4 || idx === 6) {
        result.props.rowSpan = 2
      }

      // 数据取回
      if (idx === 8) {
        result.props.rowSpan = 1
      }

      // PUT/DELETE 请求次数
      if (idx === 9) {
        result.props.rowSpan = 2
      }

      // GET 请求次数
      if (idx === 11) {
        result.props.rowSpan = 2
      }

      if (idx === 13) {
        result.props.rowSpan = 1
      }

      return result
    }
  },
  {
    title: '计量',
    dataIndex: 'measure',
    width: 160
  },
  {
    title: '标准存储',
    dataIndex: 'standard',
    width: 250
  },
  {
    title: '低频访问存储',
    dataIndex: 'low',
    render(low, _, idx) {
      const result = { children: low, props: { rowSpan: 1 } }
      // 存储空间费用
      if (idx === 0) {
        result.props.rowSpan = 2
      }

      if (idx === 1) {
        result.props.rowSpan = 0
      }

      // PUT/DELETE 请求次数
      if (idx === 9) {
        result.props.rowSpan = 2
      }

      if (idx === 10) {
        result.props.rowSpan = 0
      }

      // GET 请求次数
      if (idx === 11) {
        result.props.rowSpan = 2
      }

      if (idx === 12) {
        result.props.rowSpan = 0
      }

      return result
    }
  },
  {
    title: '归档存储',
    dataIndex: 'archive',
    render(archive, _, idx) {
      const result = { children: archive, props: { rowSpan: 1 } }
      // 存储空间费用
      if (idx === 0) {
        result.props.rowSpan = 2
      }

      if (idx === 1) {
        result.props.rowSpan = 0
      }

      // PUT/DELETE 请求次数
      if (idx === 9) {
        result.props.rowSpan = 2
      }

      if (idx === 10) {
        result.props.rowSpan = 0
      }

      // GET 请求次数
      if (idx === 11) {
        result.props.rowSpan = 2
      }

      if (idx === 12) {
        result.props.rowSpan = 0
      }

      return result
    }
  }
]

const data = [
  {
    key: 0,
    name: '存储费用',
    detail: '存储空间费用',
    measure: '0 - 10 GB',
    standard: '免费',
    low: '0.06 元/GB/月',
    archive: '0.032 元/GB/月'
  },
  {
    key: 1,
    name: '存储费用',
    detail: '存储空间费用',
    measure: '10 GB 以上',
    standard: <>0.099 元/GB/月 <Hot text="new" /></>,
    low: '0.06 元/GB/月',
    archive: '0.032 元/GB/月'
  },
  {
    key: 2,
    name: '流量费用',
    detail: '外网流出流量',
    measure: '0 - 100TB',
    standard: '0.29 元/GB',
    low: '0.29 元/GB',
    archive: '0.29 元/GB'
  },
  {
    key: 3,
    name: '流量费用',
    detail: '外网流出流量',
    measure: '100 TB 以上',
    standard: '0.26 元/GB',
    low: '0.26 元/GB',
    archive: '0.26 元/GB'
  },
  {
    key: 4,
    name: '流量费用',
    detail: 'CDN 回源流量',
    measure: '0 - 10 GB',
    standard: '免费',
    low: '0.15 元/GB',
    archive: '0.15 元/GB'
  },
  {
    key: 5,
    name: '流量费用',
    detail: 'CDN 回源流量',
    measure: '10 GB 以上',
    standard: '0.15 元/GB',
    low: '0.15 元/GB',
    archive: '0.15 元/GB'
  },
  {
    key: 6,
    name: '流量费用',
    detail: '跨区域同步流量',
    measure: '国内 <-> 国内',
    standard: '0.29 元/GB',
    low: '0.29 元/GB',
    archive: '不涉及'
  },
  {
    key: 7,
    name: '流量费用',
    detail: '跨区域同步流量',
    measure: '国内 <-> 海外',
    standard: '0.58 元/GB',
    low: '0.58 元/GB',
    archive: '不涉及'
  },
  {
    key: 8,
    name: '数据处理',
    detail: '数据取回',
    measure: '',
    standard: '免费',
    low: '0.03 元/GB',
    archive: '0.08 元/GB'
  },
  {
    key: 9,
    name: '请求费用',
    detail: 'PUT/DELETE 请求次数',
    measure: '0 - 10 万次',
    standard: '免费',
    low: '0.1 元/万次',
    archive: '0.1 元/万次'
  },
  {
    key: 10,
    name: '请求费用',
    detail: 'PUT/DELETE 请求次数',
    measure: '10 万次以上',
    standard: '0.01 元/万次',
    low: '0.1 元/万次',
    archive: '0.1 元/万次'
  },
  {
    key: 11,
    name: '请求费用',
    detail: 'GET 请求次数',
    measure: '0 - 100 万次',
    standard: '免费',
    low: '0.1 元/万次',
    archive: '0.1 元/万次'
  },
  {
    key: 12,
    name: '请求费用',
    detail: 'GET 请求次数',
    measure: '100 万次以上',
    standard: '0.01 元/万次',
    low: '0.1 元/万次',
    archive: '0.1 元/万次'
  },
  {
    key: 13,
    name: '请求费用',
    detail: '类型转换次数',
    measure: '',
    standard: '0.1 元/万次',
    low: '0.1 元/万次',
    archive: '0.1 元/万次'
  }
]

export default function SouthAsia() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}
