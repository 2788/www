/**
 * @file 产品“ssl”
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { useBtns } from 'hooks/product-btn'
import Packages from 'components/pages/ssl/Packages'
import SslScene from 'components/pages/ssl/Scene'
import Recommend from 'components/pages/ssl/Recommend'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import EncryptionTransmission from './_images/encryption-transmission.svg'
import PreventTrafficHijack from './_images/prevent-traffic-hijack.svg'
import EnhanceBrandInfluence from './_images/enhance-brand-influence.svg'
import ImproveSearchRanking from './_images/improve-search-ranking.svg'

import TopBrandCooperation from './_images/top-brand-cooperation.svg'
import EasyDeploymentToCDN from './_images/easy-deployment-to-cdn.svg'
import HighCompatibility from './_images/high-compatibility.svg'
import OneStepManagement from './_images/one-step-management.svg'

import AnXing from './_images/customer-anxing.png'
import HuangYou from './_images/customer-huangyou.png'
import KuaiKan from './_images/customer-kuaikan.png'
import MangGuo from './_images/customer-mangguo.png'
import MoMo from './_images/customer-momo.png'
import QiCheZhiJia from './_images/customer-qichezhijia.png'
import TanTan from './_images/customer-tantan.png'
import ZhongXin from './_images/customer-zhongxin.png'

import BannerIcon from './_images/bannerIcon.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const btns = useBtns(
    // TODO: 按钮点击行为
    { href: '/products/ssl', children: '立即使用' }
  )

  return (
    <>
      <PageBanner
        title="SSL 证书"
        desc="七牛云 SSL 证书提供证书申请、管理等一站式服务，与顶级的数字证书授权（CA）机构和代理商合作，为您的网站、应用、服务保驾护航。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="https://portal.qiniu.com/signup">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="/TODO">
        {btns.nav}
      </Navigator>

      <Feature name="features" title="产品功能" header="使用SSL 证书，提升网站安全性和品牌形象">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EncryptionTransmission />}
            title="顶级品牌合作"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<PreventTrafficHijack />}
            title="轻松部署至 CDN"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EnhanceBrandInfluence />}
            title="高兼容性"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<ImproveSearchRanking />}
            title="一站式管理"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Packages />

      <Recommend />

      <Feature name="advantages" title="产品优势" header="产品优势">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<TopBrandCooperation />}
            title="数据加密传输"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EasyDeploymentToCDN />}
            title="防止流量劫持"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<HighCompatibility />}
            title="提升品牌影响力"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<OneStepManagement />}
            title="提升搜索排名"
          >
            <FeatureDesc>防止数据在传送过程中被窃取、篡改，确保数据的完整性；防止运营商的流量劫持、网页植入广告现象；同时有效抵挡攻击，大大提升安全性。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <SslScene />

      <CustomerCaseGroup>
        <CustomerCase pic={ZhongXin} />
        <CustomerCase pic={MoMo} />
        <CustomerCase pic={AnXing} />
        <CustomerCase pic={HuangYou} />
        <CustomerCase pic={MangGuo} />
        <CustomerCase pic={QiCheZhiJia} />
        <CustomerCase pic={TanTan} />
        <CustomerCase pic={KuaiKan} />
      </CustomerCaseGroup>

      <LinkGroups title="相关文档">
        <LinkGroup title="产品简介">
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3656/product-overview">产品概述</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3657/noun-explanation">名词解释</LinkItem>
        </LinkGroup>
        <LinkGroup title="购买指导">
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3662/ssl-price-overview">价格总览</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3663/ssl-the-buying-process">购买流程</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/kb/4153/ssl-certificate-renewal-process">续费</LinkItem>
        </LinkGroup>
        <LinkGroup title="新手指南">
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3666/ssl-certificate-of-purchase-process">申购流程</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/manual/3667/ssl-certificate-of-free-dns-validation-guide">免费证书验证指南</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/ssl/kb/3905/ssl-certificate-faq">SSL 证书 FAQ</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/kb/3703/the-certificate-chain-is-what">证书链是什么</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/kb/3890/domain-name-already-how-do-parsing-by-verifying">域名已经做解析如何通过验证</LinkItem>
          <LinkItem href="https://developer.qiniu.com/ssl/kb/3655/what-are-common-certificate-application-status">常见的证书申请状态有哪些</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="准备好了吗？"
        description="简单几步，即可创建您自己的证书"
      >
        <UsageGuideButton href="/products/ssl/">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function SslPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
