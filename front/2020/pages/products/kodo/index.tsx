/**
 * @file 产品“对象存储”
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Product/Layout'
import { useBtns } from 'hooks/product-btn'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import PageBanner from 'components/Product/PageBanner'

import { getNotices, INotice } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import StorageType from 'components/pages/kodo/StorageType'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import KodoAdvantage from 'components/pages/kodo/Advantage'
import KodoCore from 'components/pages/kodo/Core'
import KodoScene from 'components/pages/kodo/Scene'
import { MpPage } from 'constants/mp'

import imgBanner from './images/banner.png'
// import style from './index.less'

function PageContent({ notices }: { notices: INotice[] }) {

  const priceUrl = urlForPrice(Product.Kodo)

  const btns = useBtns(
    { children: '立即使用', href: 'https://portal.qiniu.com/kodo/bucket?shouldCreateBucket=true&ref=www.qiniu.com', pcOnly: true },
    { children: '立即使用', onClick: () => wx.miniProgram.navigateTo({ url: MpPage.PortalKodo }), mpOnly: true },
    { href: priceUrl, children: '产品价格' }
  )

  return (
    <>
      <PageBanner
        title="对象存储 Kodo"
        desc="七牛云海量存储系统（Kodo）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <ProducNotice notices={notices} />

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      <StorageType />

      <KodoAdvantage />

      <KodoCore />

      <KodoScene />

      <LinkGroups>
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/kodo">使用文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/api/1731/api-overview">API 文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/sdk/1240/objc">SDK 文档</LinkItem>
        </LinkGroup>
        <LinkGroup title="FAQ（常见问题）">
          <LinkItem href="https://developer.qiniu.com/kodo/manual/3956/kodo-category">不同存储类型的区别？</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/kb/1344/how-to-heat-transfer-to-the-qiniu-online-data">如何将线上的数据热迁移到七牛云存储？</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/kb/1336/upload-download-instructions">如何上传和下载文件？</LinkItem>
          <LinkItem href="https://developer.qiniu.com/kodo/kb/3882/upload-problem-faq">上传慢、上传失败等上传常见问题的处理方法？</LinkItem>
        </LinkGroup>
        <LinkGroup title="相关材料">
          <LinkItem href="/sla-kodo">服务等级协议</LinkItem>
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

export default function KodoPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="对象存储 Kodo_云存储_海量安全高可靠云存储_oss"
      keywords="云存储, 对象存储, 七牛云存储, 分布式存储, 图片存储, 视频存储, 存储解决方案, 视频托管, 图片托管, 低频存储, 镜像存储, 私有部署, 静态资源托管, 备份归档, 数据迁移, 数据灾备, 弹性扩容"
      description="七牛云对象存储为七牛完全自主研发并拥有核心技术，经过大规模客户验证已占据行业绝对领先地位，可广泛应用于海量数据管理的场景。强安全、高可靠、易扩展、低成本，比传统存储节省 62% 的存储成本。"
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Kodo)
    }
  }
}
