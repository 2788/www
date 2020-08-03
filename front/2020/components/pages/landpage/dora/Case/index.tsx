import React from 'react'
import Section from 'components/Product/Section'
import { CustomerCase, RawCustomerCaseGroup } from 'components/Product/CustomerCaseGroup'
import Swiper from 'components/UI/Swiper'

import jumei from './images/jumei.png'
import dj from './images/dj.png'
import blued from './images/blued.png'
import liulishuo from './images/liulishuo.png'
import changba from './images/changba.png'
import hupu from './images/hupu.png'
import fangdd from './images/fangdd.png'
import xiaohongshu from './images/xiaohongshu.png'
import hujiang from './images/hujiang.png'
import faceu from './images/faceu.png'
import tangdou from './images/tangdou.png'
import makalong from './images/makalong.png'

export default function Case() {
  return (
    <Section title="客户案例" name="case">
      <Swiper withArrow withPagination>
        <RawCustomerCaseGroup>
          <CustomerCase pic={jumei} />
          <CustomerCase pic={dj} />
          <CustomerCase pic={blued} />
          <CustomerCase pic={liulishuo} />
          <CustomerCase pic={hujiang} />
          <CustomerCase pic={faceu} />
          <CustomerCase pic={changba} />
          <CustomerCase pic={xiaohongshu} />
        </RawCustomerCaseGroup>
        <RawCustomerCaseGroup>
          <CustomerCase pic={hupu} />
          <CustomerCase pic={fangdd} />
          <CustomerCase pic={tangdou} />
          <CustomerCase pic={makalong} />
        </RawCustomerCaseGroup>
      </Swiper>
    </Section>
  )
}
