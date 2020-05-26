import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'

import zhongxing from './images/zhongxing.png'
import momo from './images/momo.png'
import yidong from './images/yidong.png'
import pingan from './images/pingan.png'
import zhihu from './images/zhihu.png'
import oppo from './images/oppo.png'
import bubugao from './images/bubugao.png'
import yingshi from './images/yingshi.png'

export default function KodoCase() {
  return (
    <CustomerCaseGroup>
      <CustomerCase pic={zhongxing} />
      <CustomerCase pic={momo} />
      <CustomerCase pic={yidong} />
      <CustomerCase pic={pingan} />
      <CustomerCase pic={zhihu} />
      <CustomerCase pic={oppo} />
      <CustomerCase pic={bubugao} />
      <CustomerCase pic={yingshi} />
    </CustomerCaseGroup>
  )
}
