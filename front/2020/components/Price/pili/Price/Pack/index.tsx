/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 18 2020
 * @file: 预付费直播流量包
 *
 * Copyright (c) 2020 Qiniu
 */
import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import style from '../index.less'

const columns: Array<ColumnProps<any>> = [
  {
    title: '流量包规格',
    dataIndex: 'name'
  },
  {
    title: '流量包价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    name: '100 GB',
    price: '25 元／年'
  },
  {
    key: 1,
    name: '500 GB',
    price: '116 元／年'
  },
  {
    key: 2,
    name: '1 TB',
    price: '233 元／年'
  },
  {
    key: 3,
    name: '5 TB',
    price: '1075 元／年'
  },
  {
    key: 4,
    name: '10 TB',
    price: '2099 元／年'
  },
  {
    key: 5,
    name: '50 TB',
    price: '9472 元／年'
  },
  {
    key: 6,
    name: '200 TB',
    price: '33792 元／年'
  }
]

export default function Pack() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <div>
      计费说明：<br />
      1. 流量资源包仅支持中国大陆地区流量计费方式下的直播流量抵扣，如您当前为带宽峰值计费，需 <a className={style.link} href="https://portal.qiniu.com/financial/price?product=pili">点此</a> 找到【产品价格-直播云】，点击“切换计费方式”按钮变更为流量计费<br />
      2. 支持购买多个流量资源包叠加使用，一个计费周期内，全时段流量包和闲时段流量包不能同时被用来抵扣账单，多个资源包可用时，优先抵扣过期时间早的资源包<br />
      3. 一个计费周期内，可用的流量资源包抵扣完毕后，直播流量仍有超出的，超出部分按流量后付费价格计费<br />
      4. 已购买但从未使用且未过期的资源包可以工单联系进行退款<br />
    </div>
  )
}
