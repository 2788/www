/**
 * @file 产品“CDN”
 */

import React, { ReactNode } from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import UIButton from 'components/UI/Button'
import Coverage from 'components/pages/qcdn/Coverage'
import Packages from 'components/pages/qcdn/Packages'
import CustomerRemarks from 'components/pages/qcdn/CustomerRemarks'
import CdnScene from 'components/pages/qcdn/Scene'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'

import AnXing from './images/customer-anxing.png'
import HuangYou from './images/customer-huangyou.png'
import KuaiKan from './images/customer-kuaikan.png'
import MangGuo from './images/customer-mangguo.png'
import MoMo from './images/customer-momo.png'
import QiCheZhiJia from './images/customer-qichezhijia.png'
import TanTan from './images/customer-tantan.png'
import ZhongXin from './images/customer-zhongxin.png'

import BannerIcon from './images/bannerIcon.svg'
import AdvantIconFile from './images/advantIconFile.svg'
import AdvantIconChart from './images/advantIconChart.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const bannerBtns: ReactNode[] = [(
    <UIButton key="try" href="/products/fusion">
      立即使用
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="CDN"
        desc="七牛 CDN 是在传统 CDN 基础上实现的对数据网络加速进一步优化的智能管理服务。通过全方位的 CDN 质量监控，以及智能易用的节点调度等功能，提供稳定快速的网络访问服务。保障客户的音视频点播、大文件下载、应用及 Web 加速服务的稳定及连续性。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="/products/fusion">立即使用</NavButton>
      </Navigator>

      <Coverage />

      <Feature name="core" title="核心功能及服务">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="多媒体数据处理"
          >
            <FeatureDesc>基于对象存储，您可以一站式地完成图片处理和音视频处理。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconChart />}
            title="跨区域同步"
          >
            <FeatureDesc>跨区域同步让用户通过简单操作即可对不同存储区域的数据进行高效迁移和同步，实现数据异地容灾。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="生命周期管理"
          >
            <FeatureDesc>生命周期管理让用户可以根据业务需要，为存储空间制定规则，存储对象可自动化定时进行存储类型转化或删除操作。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="低频存储"
          >
            <FeatureDesc>低频存储提供了比标准存储更低的价格，适用于数据访问实时，读取频率较低的业务场景（如企业数据备份、监控数据、网盘应用等）。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconChart />}
            title="镜像存储"
          >
            <FeatureDesc>镜像存储适用于迁移原有业务系统的已有数据。可以帮助用户实现无缝数据迁移，迁移过程中并不影响原有业务系统的访问。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="上传／下载"
          >
            <FeatureDesc>针对不同的上传 / 下载场景，七牛云提供了丰富的 API 接口和工具供用户使用，同时支持服务端上传和客户端直传，并提供加速服务。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <CdnScene />

      <Packages />

      <CustomerRemarks />

      <CustomerCaseGroup header="他们都在用">
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
        <LinkGroup title="常用文档">
          <LinkItem href="https://www.qiniu.com">快速入门</LinkItem>
          <LinkItem href="https://www.qiniu.com">域名接入</LinkItem>
          <LinkItem href="https://www.qiniu.com">配置概览</LinkItem>
          <LinkItem href="https://www.qiniu.com">名词解释</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://www.qiniu.com">接入方式</LinkItem>
          <LinkItem href="https://www.qiniu.com">流量带宽</LinkItem>
          <LinkItem href="https://www.qiniu.com">缓存刷新与查询</LinkItem>
          <LinkItem href="https://www.qiniu.com">绑定加速域名</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 文档">
          <LinkItem href="https://www.qiniu.com">CDN 日志查询</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://www.qiniu.com">如何配置域名的 CNAME</LinkItem>
          <LinkItem href="https://www.qiniu.com">测试域名试用规范</LinkItem>
          <LinkItem href="https://www.qiniu.com">刷新缓存的方法</LinkItem>
          <LinkItem href="https://www.qiniu.com">域名配置 FAQ</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="准备好了吗？"
        description="简单几步，即可创建您自己的直播产品"
      >
        <UsageGuideButton href="/products/qcdn/">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function CdnPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
