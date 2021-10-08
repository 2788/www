/**
 * @file 智能制造
 */

import React, { createElement } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import { useModal } from 'components/Feedback'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct, Item as RelatedItem } from 'components/Solution/Related'
import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { Landpage as Land, nameMap as landpageNameMap, urlMap, descMap, smallIconMap as iconMap } from 'constants/landpage'

import Value from 'components/pages/solutions/manufacture/Value'
import TypicalScene from 'components/pages/solutions/manufacture/Scene'
import Case from 'components/pages/solutions/manufacture/Case'

import banner from './banner.png'

const title = `${nameMap[Solution.IntelligentManufacturing]}行业解决方案`

function Page() {
  const { startIntentConsulting } = useModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { children: '立即咨询', onClick: handleConsult }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
        btns={btns.banner}
        icon={banner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Value />

      <TypicalScene onConsult={handleConsult} />

      <Case />

      <Section name="related" title="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct name="机器数据智能" product={Product.Express} />
          <RelatedProduct name="存储与数据湖" product={Product.Kodo} />
          <RelatedItem icon={createElement(iconMap[Land.Dora])} href={urlMap[Land.Dora]} desc={descMap[Land.Dora]}>
            {landpageNameMap[Land.Dora]}
          </RelatedItem>
        </Related>
      </Section>

      <UsageGuide
        title="欢迎联系我们了解更多行业成功案例经验"
      >
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title={title}
      keywords="智能制造, 智能, 制造"
      description="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
    >
      <Page />
    </Layout>
  )
}
