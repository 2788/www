/**
 * @file 产品“dora”
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import PurchaseInfo, { PurchaseInfoItem, PurchaseInfoAction } from 'components/Product/PurchaseInfo'
import DoraCore from 'components/pages/dora/Core'
import DoraScene from 'components/pages/dora/Scene'
import DoraFunctions from 'components/pages/dora/Fuctions'

import ChangBa from './_images/changba.png'
import PingAn from './_images/pingan.png'
import ShunFeng from './_images/shunfeng.png'
import YiDong from './_images/yidong.png'

import BannerIcon from './_images/banner-icon.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/create?source_page=dora', children: '立即使用', pcOnly: true },
    { href: '/prices?source=dora&source_page=dora', children: '产品价格' },
    { href: 'https://developer.qiniu.com/dora?source_page=dora', children: '帮助文档' }
  )

  return (
    <>
      <PageBanner
        title="智能多媒体服务"
        desc="智能多媒体服务（DORA），是一种零运维、高可用、高性能的多媒体数据处理服务。提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习，对媒体内容实现智能审核、智能识别、智能标签。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="免费额度" href="/prices?source=dora&source_page=dora">
            免费额度：20 元/月多媒体处理， 20TB/月图片处理，750 小时/月自定义数据处理服务。 了解详情 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="转码时长包" href="/events/dora-package?entry=dora-advert">
            转码时长包，优惠来袭。 立即选购 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="/TODO">
        {btns.nav}
      </Navigator>

      <DoraCore />

      <DoraFunctions />

      <DoraScene />

      <CustomerCaseGroup grey>
        <CustomerCase pic={ChangBa} />
        <CustomerCase pic={PingAn} />
        <CustomerCase pic={YiDong} />
        <CustomerCase pic={ShunFeng} />
        <CustomerCase pic={PingAn} />
        <CustomerCase pic={YiDong} />
      </CustomerCaseGroup>

      <PurchaseInfo>
        <PurchaseInfoItem title="CDN 产品价格" desc="CDN 产品价格CDN 产品价格">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包" desc="CDN 资源包CDN 资源包CDN 资源包">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包1" desc="CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包2" desc="CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
      </PurchaseInfo>

      <LinkGroups grey>
        <LinkGroup title="用户指南">
          <LinkItem href="https://developer.qiniu.com/dora?source_page=dora&ref=www.qiniu.com">如何使用智能多媒体服务</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及文档">
          <LinkItem href="https://developer.qiniu.com/dora/tools/1222/qdoractl?source_page=dora">快速实现 API 调用及 SDK集成开发</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/faq?space=dora&source_page=dora">智能多媒体服务使用过程中常遇到的问题</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="注册即可免费试用智能多媒体服务"
      >
        <UsageGuideButton href="https://portal.qiniu.com/create?source_page=dora">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function DoraPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
