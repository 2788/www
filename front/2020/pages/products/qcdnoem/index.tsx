/**
 * @file 产品“CDN OEM”
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import Advantages from 'components/pages/qcdnoem/Advantages'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import AccessStep1 from './_images/accessstep1.svg'
import AccessStep2 from './_images/accessstep2.svg'
import AccessStep3 from './_images/accessstep3.svg'
import AccessStep4 from './_images/accessstep4.svg'

import imgBanner from './_images/banner.png'
import SiteCustomize from './_images/sitecustomize.svg'
import FullSceneCoverage from './_images/fullscenecoverage.svg'
import HighQualityLine from './_images/highqualityline.svg'
import TechSupport from './_images/techsupport.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const btns = useBtns(
    { onClick: handleConsult, children: '咨询详情' }
  )

  return (
    <>
      <PageBanner
        title="CDN OEM"
        desc="成为七牛 CDN OEM 合作伙伴，零门槛获得七牛 CDN 产品技术能力，在创收的同时，为您的客户提供专业的 CDN 服务能力，我们期待与您合作共赢。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <Navigator>
        {btns.nav}
      </Navigator>

      <Feature header="七牛 CDN OEM 平台服务能力" name="capabilities" title="平台服务能力">
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<SiteCustomize />}
            title="全站定制"
          >
            <FeatureDesc>拥有自己的品牌，定制全站 Logo，定制访问域名和线路 CNAME。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<HighQualityLine />}
            title="优质线路资源"
          >
            <FeatureDesc>依托七牛底层 CDN 融合技术，精选主流厂商 1600+ 优质节点，全面覆盖 20+ 运营商，全网无盲区。</FeatureDesc>
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
    <Layout title="CDN OEM">
      <PageContent />
    </Layout>
  )
}
