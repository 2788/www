import React from 'react'
import { CustomerCase, RawCustomerCaseGroup } from 'components/Product/CustomerCaseGroup'
import Swiper from 'components/UI/Swiper'
import Section from 'components/Product/Section'

import zhongxing from './images/zhongxing.png'
import people from './images/people.png'
import yidong from './images/yidong.png'
import pingan from './images/pingan.png'
import zhihu from './images/zhihu.png'
import oppo from './images/oppo.png'
import bubugao from './images/bubugao.png'
import yingshi from './images/yingshi.png'
import bilibili from './images/bilibili.png'
import nainiukuaichuan from './images/nainiukuaichuan.png'
import momo from './images/momo.png'
import dj from './images/dj.png'
import blued from './images/blued.png'
import hujiang from './images/hujiang.png'
import meipai from './images/meipai.png'
import camera360 from './images/camera360.png'

export default function KodoCase() {
  return (
    <Section title="客户案例" name="cases">
      <Swiper withArrow withPagination>
        <RawCustomerCaseGroup>
          <CustomerCase pic={zhongxing} />
          <CustomerCase pic={people} />
          <CustomerCase pic={yidong} />
          <CustomerCase pic={pingan} />
          <CustomerCase pic={zhihu} />
          <CustomerCase pic={oppo} />
          <CustomerCase pic={bubugao} />
          <CustomerCase pic={yingshi} />
        </RawCustomerCaseGroup>
        <RawCustomerCaseGroup>
          <CustomerCase pic={bilibili} />
          <CustomerCase pic={nainiukuaichuan} />
          <CustomerCase pic={momo} />
          <CustomerCase pic={dj} />
          <CustomerCase pic={blued} />
          <CustomerCase pic={hujiang} />
          <CustomerCase pic={meipai} />
          <CustomerCase pic={camera360} />
        </RawCustomerCaseGroup>
      </Swiper>
    </Section>
  )
}
