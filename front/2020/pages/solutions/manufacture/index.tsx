/**
 * @file 智能制造
 */

import React from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import { useModal } from 'components/Feedback'

import Value from 'components/pages/solutions/manufacture/Value'
import TypicalScene from 'components/pages/solutions/manufacture/Scene'

import banner from './banner.png'

function Page() {
  const { startConsulting } = useModal()
  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting }
  )

  return (
    <>
      <PageBanner
        title="智能制造"
        desc="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
        btns={btns.banner}
        icon={banner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Value />

      <TypicalScene />

    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="智能制造"
      keywords="智能制造, 智能, 制造"
      description="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
    >
      <Page />
    </Layout>
  )
}
