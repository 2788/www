/* eslint-disable react/no-danger */
/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 16 2020
 * @file: 图片处理
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import renderTemplate from 'utils/render-template'

const columns: Array<ColumnProps<any>> = [
  {
    title: '名目',
    dataIndex: 'name',
    render(name, _, idx) {
      const result = { children: name, props: { rowSpan: 1 } }
      // 图片盲水印处理
      if (idx === 3) {
        result.props.rowSpan = 2
      }

      if (idx > 3 && idx <= 4) {
        result.props.rowSpan = 0
      }

      // 全景拼接
      if (idx === 11) {
        result.props.rowSpan = 3
      }

      if (idx > 11) {
        result.props.rowSpan = 0
      }

      return result
    }
  },
  {
    title: '价格',
    dataIndex: 'price',
    render(price, _, idx) {
      const result = { children: price, props: { rowSpan: 1 } }

      // 图片盲水印处理
      if (idx === 5) {
        result.props.rowSpan = 6
      }

      if (idx > 5 && idx <= 10) {
        result.props.rowSpan = 0
      }

      return result
    }
  }
]

const data = [
  {
    key: 0,
    name: 'imageslim（图片瘦身）',
    price: '0.1 元/千次'
  },
  {
    key: 1,
    name: 'animate（动图合成）',
    price: '0.2 元/千次'
  },
  {
    key: 2,
    name: 'imageAve（图片主色调）',
    price: '0.1 元/千次'
  },
  {
    key: 3,
    name: '图片盲水印处理',
    price: '添加：1 元/千次'
  },
  {
    key: 4,
    name: '',
    price: '提取：1 元/千次'
  },
  {
    key: 5,
    name: 'imageView2（图片基本处理）',
    price: renderTemplate('每月 0 - 20 TB：免费<br /><br />20 TB 以上：0.025 元/GB')
  },
  {
    key: 6,
    name: 'imageMogr2（图片高级处理）',
    price: ''
  },
  {
    key: 7,
    name: 'imageInfo（图片基本信息）',
    price: ''
  },
  {
    key: 8,
    name: 'exif（图片 EXIF 信息）',
    price: ''
  },
  {
    key: 9,
    name: 'watermark（图片水印处理）',
    price: ''
  },
  {
    key: 10,
    name: 'roundPic（图片圆角）',
    price: ''
  },
  {
    key: 11,
    name: '全景拼接',
    price: '800 x 600 及以下：0.28 元/百张'
  },
  {
    key: 12,
    name: '',
    price: '1600 x 1200：0.46 元/百张'
  },
  {
    key: 13,
    name: '',
    price: '3200 x 2400：1.48 元/百张'
  }
]

export default function Picture() {
  return <Table bordered columns={columns} dataSource={data} pagination={false} />
}
