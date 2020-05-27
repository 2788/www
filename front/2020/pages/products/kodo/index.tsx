/**
 * @file 产品“对象存储”
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import { useBtns } from 'hooks/product-btn'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import StorageType from 'components/pages/kodo/StorageType'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import KodoAdvantage from 'components/pages/kodo/Advantage'
import KodoCore from 'components/pages/kodo/Core'
import KodoScene from 'components/pages/kodo/Scene'
import KodoCase from 'components/pages/kodo/Case'

import BannerIcon from './images/banner-icon.svg'
import style from './index.less'

function PageContent() {

  const btns = useBtns(
    { children: '立即使用', href: 'https://portal.qiniu.com/kodo/bucket?shouldCreateBucket=true&ref=www.qiniu.com', pcOnly: true }
  )

  return (
    <>
      <PageBanner
        title="对象存储 Kodo"
        desc="七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem href="/solutions/kodoe">
            私有云存储，构建本地高扩展性数据存储平台 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem href="/prices/kodo">
            标准存储，低至 <span className={style.price}>0.099</span> 元/GB/月起。 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem href="http://qiniu-exp.mikecrm.com/yGntQCJ">
            体验边缘存储服务 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="https://marketing.qiniu.com/activity/kodopackage?ref=www.qiniu.com/products/kodo">
            资源包折扣套餐，上新特惠，立即购买。 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink={urlForPrice(Product.Kodo)}>{btns.nav}</Navigator>

      <StorageType />

      <KodoAdvantage />

      <KodoCore />

      <KodoScene />

      <KodoCase />

      <LinkGroups>
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/kodo">使用文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/api/1731/api-overview">API 文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/sdk/1240/objc">SDK 文档</LinkItem>
        </LinkGroup>
        {/* TODO 上线后补充 */}
        <LinkGroup title="FAQ（常见问题）" />
        <LinkGroup title="相关材料">
          <LinkItem href="/sla-kodo">用户协议</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="准备好了吗？"
        description="简单几步，即可创建您自己的对象存储产品"
      >
        <UsageGuideButton href="https://portal.qiniu.com/kodo/bucket?shouldCreateBucket=true&ref=www.qiniu.com">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function KodoPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
