/**
 * @file 解决方案”私有云存储“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Product, urlMap as productUrlMap, nameMap as productNameMap } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import KodoeAdvantage from 'components/pages/kodoe/Advantage'
import KodoeSpec from 'components/pages/kodoe/Spec'
import KodoeScene from 'components/pages/kodoe/Scene'
import KodoeCase from 'components/pages/kodoe/Case'
import KodoeClientLogo from 'components/pages/kodoe/ClientLogo'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { getGlobalBanners } from 'apis/admin/global-banners'

import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'

import imgBannerPc from './images/banner-pc.jpg'
import imgBannerMobile from './images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = `${nameMap[Solution.Kodoe]}解决方案 Kodo Enterprise`

function PageContent() {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '咨询详情' },
    { href: 'https://developer.qiniu.com/kodoe/manual/5867/a-free-trial', children: '免费试用' }
  )

  const descView = (
    <>
      <span>七牛私有云存储 (Kodo Enterprise) 是基于七牛公有云对象存储服务的架构设计和运营经验完全自主研发的存储系统。</span>
      <span>能够为客户搭建数百 EB 级别的高可靠、强安全、低成本、可扩展的业务系统，满足多样的非结构化数据存储需求。</span>
    </>
  )

  return (
    <>
      <PageBanner
        title={title}
        desc={descView}
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <Navigator>{btns.nav}</Navigator>

      <KodoeAdvantage />

      <KodoeSpec />

      <KodoeScene />

      <KodoeCase />

      <KodoeClientLogo />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/kodoe">私有云存储</LinkItem>
        </LinkGroup>
        <LinkGroup title="相关产品">
          {[Product.Kodo, Product.Dora].map(product => (
            <LinkItem key={product} href={productUrlMap[product]!}>{productNameMap[product]}</LinkItem>
          ))}
        </LinkGroup>
      </LinkGroups>

      <UsageGuide title="联系我们，了解更多详情">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function KodoePage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="私有云存储解决方案 Kodo Enterprise_私有云部署_机器资源管理_私有云存储_平台服务器"
        keywords="私有云解决方案, 私有云搭建方案, 企业私有云解决方案, 私有云解决方案, 私有云存储方案"
        description="七牛私有云存储 (Kodo Enterprise) 是基于七牛公有云对象存储服务的架构设计和运营经验完全自主研发的存储系统。能够为客户搭建数百 EB 级别的高可靠、强安全、低成本、可扩展的业务系统，满足多样的非结构化数据存储需求。"
        globalBanners={globalBanners}
      >
        <PageContent />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
