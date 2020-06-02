/**
 * @file 产品“ssl”
 */

import React from 'react'

import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
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

import imgBanner from './_images/banner.png'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const priceUrl = urlForPrice(Product.Ssl)
  const btns = useBtns(
    { href: 'https://portal.qiniu.com/ssl', children: '立即使用', pcOnly: true },
    { href: priceUrl, children: '价格' }
  )

  return (
    <>
      <PageBanner
        title="SSL 证书"
        desc="七牛云 SSL 证书提供证书申请、管理等一站式服务，与顶级的数字证书授权（CA）机构和代理商合作，为您的网站、应用、服务保驾护航。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="https://portal.qiniu.com/signup">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      <Feature name="features" title="产品功能" header="使用 SSL 证书，提升网站安全性和品牌形象">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EncryptionTransmission />}
            title="数据加密传输"
          >
            <FeatureDesc>HTTPS 是加密传输网络协议，可防止数据在传输过程中不被窃取、改变，确保数据的完整性</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<PreventTrafficHijack />}
            title="防止流量劫持"
          >
            <FeatureDesc>全站 HTTPS 是根治运营商、中间人流量劫持的解决方案，防止网页中被插入的广告，保护用户隐私安全</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EnhanceBrandInfluence />}
            title="提升品牌影响力"
          >
            <FeatureDesc>浏览器标注网站为安全站点，可以放心的进行操作和交易，EV 高级证书会在浏览器显示企业名称</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<ImproveSearchRanking />}
            title="数据加密传输"
          >
            <FeatureDesc>HTTPS 是加密传输网络协议，可防止数据在传输过程中不被窃取、改变，确保数据的完整性</FeatureDesc>
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
            title="顶级品牌合作"
          >
            <FeatureDesc>七牛云携手 TrustAsia 与国际顶级数字证书提供商 Digicert、GeoTrust 合作</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<EasyDeploymentToCDN />}
            title="轻松部署至 CDN"
          >
            <FeatureDesc>支持 CDN 中 HTTP 一键升级 HTTPS，更换证书等功能直接调用用户证书，帮助用户更快速的完成操作</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<HighCompatibility />}
            title="高兼容性"
          >
            <FeatureDesc>兼容性强，收费证书支持目前所有主流的浏览器和移动设备</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<OneStepManagement />}
            title="一站式管理"
          >
            <FeatureDesc>支持申购的证书和用户上传的证书在七牛云平台上集中统一管理</FeatureDesc>
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
    </>
  )
}

export default function SslPage() {
  return (
    <Layout title="SSL 证书">
      <PageContent />
    </Layout>
  )
}
