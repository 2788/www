/**
 * @file 产品“CDN OEM”
 */

import React, { ReactNode } from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import UIButton from 'components/UI/Button'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import Advantages from 'components/pages/qcdnoem/Advantages'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import AccessStep1 from './images/accessstep1.svg'
import AccessStep2 from './images/accessstep2.svg'
import AccessStep3 from './images/accessstep3.svg'
import AccessStep4 from './images/accessstep4.svg'

import BannerIcon from './images/bannerIcon.svg'
import SiteCustomize from './images/sitecustomize.svg'
import FullSceneCoverage from './images/fullscenecoverage.svg'
import HighQualityLine from './images/highqualityline.svg'
import TechSupport from './images/techsupport.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="try" href="/products/fusion">
      咨询详情
    </UIButton>
  ), (
    <UIButton key="consult" type="hollow" onClick={handleConsult}>
      体验 Demo
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="CDN OEM"
        desc="成为七牛 CDN OEM合作伙伴，零门槛获得七牛 CDN 产品技术能力，在创收的同时，为您的客户提供专业的CDN服务能力，我们期待与您合作共赢。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator>
        <NavButton type="primary" href="/products/fusion">咨询详情</NavButton>
        <NavButton withBorder onClick={handleConsult}>体验 Demo</NavButton>
      </Navigator>

      <Feature header="七牛 CDN OEM 平台服务能力" name="capabilities" title="平台服务能力">
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<SiteCustomize />}
            title="全站定制"
          >
            <FeatureDesc>拥有自己的品牌，定制全站Logo，定制访问域名和线路 cnme。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<HighQualityLine />}
            title="优质线路资源"
          >
            <FeatureDesc>依托七牛底层CDN融合技术，精选主流厂商1600+优质节点，全面覆盖20+运营商，全网无盲区。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<TechSupport />}
            title="技术保证"
          >
            <FeatureDesc>七牛自研融合能力，全网实时精选调度，有效提高访问响应速度，防止劫持，全方位立体品控。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<FullSceneCoverage />}
            title="全场景覆盖"
          >
            <FeatureDesc>支持图片小文件，下载分发点、点播、动态加速等多种业务场景，针对资源特性进行线路优化。 HDFS 访问方式，为大数据和机器学习的海量高速读写场景进行了大量优化。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Advantages />

      <AccessProcess>
        <Step icon={<AccessStep1 />}>服务咨询</Step>
        <Step icon={<AccessStep2 />}>商务洽谈</Step>
        <Step icon={<AccessStep3 />}>平台对接</Step>
        <Step icon={<AccessStep4 />}>上线运营</Step>
      </AccessProcess>
    </>
  )
}

export default function CdnOemPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
