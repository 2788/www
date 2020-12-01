/* eslint-disable react/no-danger */
/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 16 2020
 * @file: 音视频处理
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

import style from './index.less'

// 渲染模板
function renderTemplate(text: string) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}

const columns: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type',
    render(type, _, idx) {
      const result = { children: type, props: { rowSpan: 0 } }
      if (idx === 0) {
        result.props.rowSpan = 1
      }
      // 视频转码（H.264 及其他）
      if (idx === 1) {
        result.props.rowSpan = 6
      }

      if (idx === 7) {
        result.props.rowSpan = 6
      }

      if (idx === 13) {
        result.props.rowSpan = 6
      }

      if (idx === 19) {
        result.props.rowSpan = 6
      }

      // 锐智转码（H.264）、锐智转码（H.265）
      if (idx === 25 || idx === 29) {
        result.props.rowSpan = 4
      }

      if (idx > 32) {
        result.props.rowSpan = 1
      }

      return result
    }
  },
  {
    title: '输出规格',
    dataIndex: 'out'
  },
  {
    title: '普通帧率价格（<= 30 帧/秒）',
    dataIndex: 'low_frame_price',
    render(price, _, idx) {
      if (idx > 24 && idx <= 28) {
        return { children: price, props: { colSpan: 2 } }
      }

      if (idx > 28) {
        return { children: price, props: { colSpan: 2 } }
      }

      return price
    }
  },
  {
    title: '高帧率价格（30 帧/秒 < r <= 60 帧/秒）',
    dataIndex: 'high_frame_price',
    render(price, _, idx) {
      if (idx > 24 && idx <= 28) {
        return { children: price, props: { colSpan: 0 } }
      }

      if (idx > 28) {
        return { children: price, props: { colSpan: 0 } }
      }

      return price
    }
  }
]

const data = [
  {
    key: 0,
    type: '音频转码',
    out: '',
    low_frame_price: '0.0048 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 1,
    type: renderTemplate(`
      视频转码（H.264 及其他）<br />
      <a href="https://www.qiniu.com/events/dora-package" target="_blank" ref="noopener" class="${style.link}">H.264 转码时长包特惠选购 >></a>
    `),
    out: '视频转码 SD240（ 320x240）',
    low_frame_price: '0.0057 元/分钟',
    high_frame_price: '0.0114 元/分钟'
  },
  {
    key: 2,
    type: '',
    out: '视频转码 SD480（640x480）',
    low_frame_price: '0.0072 元/分钟',
    high_frame_price: '0.0144 元/分钟'
  },
  {
    key: 3,
    type: '',
    out: '视频转码 SD（1080x720）',
    low_frame_price: '0.0189 元/分钟',
    high_frame_price: '0.0378 元/分钟'
  },
  {
    key: 4,
    type: '',
    out: '视频转码 HD（1920x1080）',
    low_frame_price: '0.0324 元/分钟',
    high_frame_price: '0.0648 元/分钟'
  },
  {
    key: 5,
    type: '',
    out: '视频转码 2K（2560x1440）',
    low_frame_price: '0.06 元/分钟',
    high_frame_price: '0.12 元/分钟'
  },
  {
    key: 6,
    type: '',
    out: '视频转码 4K（3840x2160）',
    low_frame_price: '0.12 元/分钟',
    high_frame_price: '0.24 元/分钟'
  },
  {
    key: 7,
    type: renderTemplate(`
      视频转码（H.265）<br />
      <a href="https://www.qiniu.com/events/dora-package#dora-package-h265" target="_blank" ref="noopener" class="${style.link}">H.265 转码时长包特惠选购 >></a>
    `),
    out: '视频转码 SD240（ 320x240）',
    low_frame_price: '0.0285 元/分钟',
    high_frame_price: '0.057 元/分钟'
  },
  {
    key: 8,
    type: '',
    out: '视频转码 SD480（640x480）',
    low_frame_price: '0.036 元/分钟',
    high_frame_price: '0.072 元/分钟'
  },
  {
    key: 9,
    type: '',
    out: '视频转码 SD（1080x720）',
    low_frame_price: '0.0945 元/分钟',
    high_frame_price: '0.189 元/分钟'
  },
  {
    key: 10,
    type: '',
    out: '视频转码 HD（1920x1080）',
    low_frame_price: '0.162 元/分钟',
    high_frame_price: '0.324 元/分钟'
  },
  {
    key: 11,
    type: '',
    out: '视频转码 2K（2560x1440）',
    low_frame_price: '0.3 元/分钟',
    high_frame_price: '0.6 元/分钟'
  },
  {
    key: 12,
    type: '',
    out: '视频转码 4K（3840x2160）',
    low_frame_price: '0.6 元/分钟',
    high_frame_price: '1.2 元/分钟'
  },
  {
    key: 13,
    type: '倍速转码（H.264）',
    out: '倍速转码 SD240',
    low_frame_price: '0.0086 元/分钟',
    high_frame_price: '0.0172 元/分钟'
  },
  {
    key: 14,
    type: '',
    out: '倍速转码 SD480',
    low_frame_price: '0.0108 元/分钟',
    high_frame_price: '0.0216元/分钟'
  },
  {
    key: 15,
    type: '',
    out: '倍速转码 SD',
    low_frame_price: '0.0284 元/分钟',
    high_frame_price: '0.057 元/分钟'
  },
  {
    key: 16,
    type: '',
    out: '倍速转码 HD',
    low_frame_price: '0.0486 元/分钟',
    high_frame_price: '0.0972元/分钟'
  },
  {
    key: 17,
    type: '',
    out: '倍速转码 2K',
    low_frame_price: '0.09 元/分钟',
    high_frame_price: '0.18 元/分钟'
  },
  {
    key: 18,
    type: '',
    out: '倍速转码 4K',
    low_frame_price: '0.18 元/分钟',
    high_frame_price: '0.36 元/分钟'
  },
  {
    key: 19,
    type: '倍速转码（H.265）',
    out: '倍速转码 SD240',
    low_frame_price: '0.0428 元/分钟',
    high_frame_price: '0.0856 元/分钟'
  },
  {
    key: 20,
    type: '',
    out: '倍速转码 SD480',
    low_frame_price: '0.054 元/分钟',
    high_frame_price: '0.108 元/分钟'
  },
  {
    key: 21,
    type: '',
    out: '倍速转码 SD',
    low_frame_price: '0.1418 元/分钟',
    high_frame_price: '0.2836 元/分钟'
  },
  {
    key: 22,
    type: '',
    out: '倍速转码 HD',
    low_frame_price: '0.243 元/分钟',
    high_frame_price: '0.486 元/分钟'
  },
  {
    key: 23,
    type: '',
    out: '倍速转码 2K',
    low_frame_price: '0.45 元/分钟',
    high_frame_price: '0.9 元/分钟'
  },
  {
    key: 24,
    type: '',
    out: '倍速转码 4K',
    low_frame_price: '0.9 元/分钟',
    high_frame_price: '1.8 元/分钟'
  },
  {
    key: 25,
    type: '锐智转码（H.264）',
    out: '视频转码 SD（1280x720）及以下',
    low_frame_price: '0.08 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 26,
    type: '',
    out: '视频转码 HD（1920x1080）',
    low_frame_price: '0.16 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 27,
    type: '锐智转码（H.264）',
    out: '视频转码 2K（2560x1440）',
    low_frame_price: '0.32 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 28,
    type: '',
    out: '视频转码 4K（3840x2160）',
    low_frame_price: '0.64 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 29,
    type: '锐智转码（H.265）',
    out: '视频转码 SD（1280x720）及以下',
    low_frame_price: '0.4 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 30,
    type: '',
    out: '视频转码 HD（1920x1080）',
    low_frame_price: '0.8 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 31,
    type: '锐智转码（H.265）',
    out: '视频转码 2K（2560x1440）',
    low_frame_price: '1.6 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 32,
    type: '',
    out: '视频转码 4K（3840x2160）',
    low_frame_price: '3.2 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 33,
    type: '音视频转封装',
    out: '',
    low_frame_price: '0.003 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 34,
    type: '实时音视频转封装',
    out: '',
    low_frame_price: '0.009 元/分钟（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 35,
    type: 'avinfo（音视频元信息）',
    out: '',
    low_frame_price: '0.1 元/千次（不分帧率）',
    high_frame_price: ''
  },
  {
    key: 36,
    type: 'vframe, vsample（视频截图）',
    out: '',
    low_frame_price: '0.1 元/千次（不分帧率）',
    high_frame_price: ''
  }
]

export default function Media() {
  return <Table bordered scroll={{ x: 'max-content' }} columns={columns} dataSource={data} pagination={false} />
}
