/**
 * @file 客户案例聚合页
 */

import React from 'react'
import Layout from 'components/Layout'
import Section from 'components/Product/Section'
import { Navigatable } from 'components/Product/Navigator'
import ByIndustry from 'components/pages/case/ByIndustry'
import Selected from 'components/pages/case/Selected'
import Words from 'components/pages/case/Words'

import style from './style.less'

export default function CasePage() {
  return (
    <Layout title="客户案例">
      <Navigatable>
        <section className={style.banner}>
          <div className={style.bannerContent}></div>
        </section>

        <Section name="by-industry" title="行业案例" grey className={style.byIndustry}>
          <ByIndustry />
        </Section>

        <Section name="selected" title="精选案例" grey={false}>
          <Selected />
        </Section>

        <Section name="words" title="客户评价" grey>
          <Words />
        </Section>

      </Navigatable>
    </Layout>
  )
}
