/**
 * @file 免费体验落地页
 */

import React from 'react'
import Layout from 'components/Layout'
import Banner from 'components/Banner'
import { Navigatable } from 'components/Product/Navigator'
import FreeProducts from 'components/pages/events/free/Products'
import FreeActivities from 'components/pages/events/free/Activities'
import Section from 'components/Product/Section'

import imgBanner from './banner.png'
import style from './style.less'

export default function FreePage() {
  return (
    <Layout>
      <Navigatable>
        <Banner background={imgBanner}>
          <h1 className={style.bannerTitle}>
            <strong>免费</strong>云服务套餐
          </h1>
          <p className={style.bannerDesc}>为您提供 0 元上云服务</p>
        </Banner>

        <Section name="products" title="热门云产品" subtitle="完成实名认证 即可免费体验以下产品">
          <FreeProducts />
        </Section>

        <Section name="activities" title="活动推荐">
          <FreeActivities />
        </Section>
      </Navigatable>
    </Layout>
  )
}