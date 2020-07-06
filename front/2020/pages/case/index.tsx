/**
 * @file 客户案例聚合页
 */

import React from 'react'
import Redirect from 'components/Redirect'
import Layout from 'components/Layout'
import Section from 'components/Product/Section'
import { Navigatable } from 'components/Product/Navigator'
import ByIndustry from 'components/pages/case/ByIndustry'
import Selected from 'components/pages/case/Selected'
import Words from 'components/pages/case/Words'

import style from './style.less'

export default function CasePage() {
  // 这边先干掉客户案例页面内容，等内容 OK 了，再重新打开
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      <Redirect target="/" />
    )
  }

  return (
    <Layout
      title="客户案例"
      keywords="七牛客户, 七牛客户案例"
      description="100 多万企业用户和开发者，间接服务超过 90% 网民"
    >
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
