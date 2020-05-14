/**
 * @file 云主机客户案例
 */

import React from 'react'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'

import imgChangba from './changba.png'
import imgYidong from './yidong.png'
import imgPingan from './pingan.png'
import imgShunfeng from './shunfeng.png'
import imgSohu from './sohu.png'
import imgZhihu from './zhihu.png'
import imgZhongxing from './zhongxing.png'
import imgQingtingfm from './qingtingfm.png'

export default function QvmCases() {
  return (
    <CustomerCaseGroup>
      <CustomerCase pic={imgChangba} />
      <CustomerCase pic={imgYidong} />
      <CustomerCase pic={imgPingan} />
      <CustomerCase pic={imgShunfeng} />
      <CustomerCase pic={imgSohu} />
      <CustomerCase pic={imgZhihu} />
      <CustomerCase pic={imgZhongxing} />
      <CustomerCase pic={imgQingtingfm} />
    </CustomerCaseGroup>
  )
}
