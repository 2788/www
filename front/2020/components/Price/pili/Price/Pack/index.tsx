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
    price: '33792 元／百张'
  }
]

export default function Pack() {
  return <Table bordered pagination={false} columns={columns} dataSource={data} footer={() => <Footer />} />
}

function Footer() {
  return (
    <div>
      计费说明：<br />
      1. 有效期：当月 1 日立即生效，有效期为 1 年<br />
      2. 仅支持中国大陆地区按月结流量计费的抵扣，抵扣完毕后，超出部分按流量（公开价）后计费<br />
      3. 支持购买多个流量包叠加使用，有效期不叠加，优先抵扣先过期的流量包<br />
      4. 已购买但从未使用可以联系销售进行退款<br />
      5. 流量资源包仅支持当前计费规则为流量计费的用户购买，如您当前以带宽峰值计费，请联系对应销售或拨打 400-808-9176 转 1 完成计费方式切换<br />
      6. 流量计费方式，无论是按量后付费或预付费购买资源包，业务带宽上限为 10Gbps，如有更多需要，请联系对应销售或拨打 400-808-9176 转 1<br />
    </div>
  )
}
