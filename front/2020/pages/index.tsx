/**
 * @file 首页内容
 */

import React from 'react'

import Carousel from 'react-icecream/lib/carousel'

import Layout from 'components/Product/Layout'
import { IndexPageBanner, IndexPageBannerContent } from 'components/pages/index/PageBanner'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import { useBtns } from 'hooks/product-btn'

import Activities from 'components/pages/index/Activities'
import Product from 'components/pages/index/Products'
import Solutions from 'components/pages/index/Solutions'
import News from 'components/pages/index/News'
import TryAndContact from 'components/pages/index/TryAndContact'

import BannerIcon from './_images/banner-icon.svg'
// import Activity1Icon from './_images/activity1.svg'
// import Activity2Icon from './_images/activity2.svg'
// import Activity3Icon from './_images/activity3.svg'
// import Activity4Icon from './_images/activity4.svg'
import Core1Icon from './_images/core1.svg'
import Core2Icon from './_images/core2.svg'
import Core3Icon from './_images/core3.svg'
import Core4Icon from './_images/core4.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/apply-pili', children: '立即使用' },
    { href: 'https://portal.qiniu.com/apply-pili', children: '立即咨询' }
  )

  return (
    <>
      <IndexPageBanner bgColor="#34A1EC">
        <Carousel>
          <IndexPageBannerContent
            title="连接数据 重塑价值"
            desc="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量"
            bgColor="#34A1EC"
            btns={btns.banner}
            icon={<BannerIcon />}
          />
          <IndexPageBannerContent
            title="连接数据 重塑价值"
            desc="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量"
            bgColor="#34A1EC"
            btns={btns.banner}
            icon={<BannerIcon />}
          />
          <IndexPageBannerContent
            title="连接数据 重塑价值"
            desc="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量"
            bgColor="#34A1EC"
            btns={btns.banner}
            icon={<BannerIcon />}
          />
        </Carousel>
      </IndexPageBanner>

      <Activities />

      <Feature name="core" title="连接数据 重塑价值" subtitle="用数据科技全面驱动数字化未来，赋能各行各业全面进入 DT 时代，并让每一个人掌握数据的力量">
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core1Icon />}
            title="做一个简单的人"
          >
            <FeatureDesc>以认定方向为坚持目标，以奋斗者为发展根本，坚持劳有所得，多劳多得，赢得员工的信赖。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core2Icon />}
            title="做一款简单的产品"
          >
            <FeatureDesc>以客户为中心，以结果为导向，坚持化繁为简，追求极致，赢得客户的信赖。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core3Icon />}
            title="做一家简单的公司"
          >
            <FeatureDesc>以社会责任为己任，以公司信用为重要资产，坚持言出必行，诚实守信，赢得社会的信赖。</FeatureDesc>
          </FeatureItem>

          <FeatureItem
            pos="left-right"
            align="left"
            icon={<Core4Icon />}
            title="做一家简单的公司"
          >
            <FeatureDesc>以社会责任为己任，以公司信用为重要资产，坚持言出必行，诚实守信，赢得社会的信赖。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Product />

      <Solutions />

      <News />

      <TryAndContact />

    </>
  )
}

export default function IndexPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
