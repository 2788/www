/**
 * @file 产品“云主机”
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, { Group as PageNoticeGroup, Item as PageNoticeItem } from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import Section from 'components/Product/Section'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Specs from 'components/pages/qvm/Specs'
import MoreProducts from 'components/pages/qvm/MoreProducts'
import Scenes from 'components/pages/qvm/Scenes'
import Cases from 'components/pages/qvm/Cases'
import { useMobile } from 'hooks/ua'
import IconBanner from './banner.svg'
import IconFeatureEasy from './_icons/feature/easy.svg'
import IconFeatureFlexibility from './_icons/feature/flexibility.svg'
import IconFeatureHighPerf from './_icons/feature/high-perf.svg'
import IconFeatureSafe from './_icons/feature/safe.svg'
import IconFeatureScalable from './_icons/feature/scalable.svg'
import IconFeatureStable from './_icons/feature/stable.svg'
import style from './style.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const isMobile = useMobile()

  const descView = (
    <>
      <p>七牛云主机服务是围绕云主机为核心，推出的含云硬盘、数据库、高防、负载均衡等解决方案为一体的云计算综合服务。</p>
      <br />
      <p>
        免费使用最高 4 核 8 G 主机，
        <a className={style.bannerLink} target="_blank" href="/events/qvm0rmb">
          立即参与&gt;&gt;
        </a>
      </p>
    </>
  )

  const btns = useBtns(
    { children: '立即购买', href: 'https://portal.qiniu.com/qvm/vm/instance/create', pcOnly: true },
    { children: '控制台', href: 'https://portal.qiniu.com/qvm', pcOnly: true }
  )

  return (
    <>
      <PageBanner
        title="云主机服务 QVM"
        desc={descView}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<IconBanner />}
      />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem href="https://developer.qiniu.com/qvm/manual/6681/enterprise-network">
            助力用户快速实现混合云云产品【云企业网】上线
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="/products/qvm/partner">
            云主机合伙人
          </PageNoticeItem>
          <PageNoticeItem href="/events/qvm0rmb">
            企业 0 元云主机活动
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink={urlForPrice(Product.Qvm)}>
        {btns.nav}
      </Navigator>

      {!isMobile && ( // 移动端无需展示，因为移动端无法购买（Portal 未适配移动端）
        <Section name="specs" title="产品规格" header="热销产品规格">
          <Specs />
        </Section>
      )}

      <Feature>
        <feature.Group>
          <feature.Item title="弹性" icon={<IconFeatureFlexibility />}>
            <feature.Desc>千台七牛云服务器一分钟创建，完美响应业务需求；随时调整配置，多种计费模式灵活选择</feature.Desc>
          </feature.Item>
          <feature.Item title="稳定" icon={<IconFeatureStable />}>
            <feature.Desc>高达 99.95% 的服务可用性和 99.9999999% 的数据可靠性，自动宕机迁移，自动快照备份，数据恢复更方便</feature.Desc>
          </feature.Item>
          <feature.Item title="安全" icon={<IconFeatureSafe />}>
            <feature.Desc>专有网络隔离攻击；安全组、高防等安全服务保证您的服务安全运行</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="易用" icon={<IconFeatureEasy />}>
            <feature.Desc>上千台七牛云服务器多重实时管理，一键部署，快速复制环境，轻松扩展</feature.Desc>
          </feature.Item>
          <feature.Item title="可拓展" icon={<IconFeatureScalable />}>
            <feature.Desc>无缝衔接七牛云丰富产品，持续为业务发展提供完整的计算、存储、安全等解决方案</feature.Desc>
          </feature.Item>
          <feature.Item title="高性能" icon={<IconFeatureHighPerf />}>
            <feature.Desc>单实例最高可选 88 vCPU，内存 704 GB，700 万 PPS 网络收发包，35 Gbps 带宽</feature.Desc>
          </feature.Item>
        </feature.Group>
      </Feature>

      <Section
        name="more-products"
        title="更多产品"
        header={<>
          更多产品
          <p style={{ fontSize: '16px', marginTop: '12px', color: '#666' }}>
            配合云主机使用，搭建专业高效云上环境
          </p>
        </>}
      >
        <MoreProducts />
      </Section>

      <Scenes />
      <Cases />

      <LinkGroups name="docs" title="产品文档">
        <LinkGroup title="产品文档">
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4289/qvm-overview">产品简介</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4238/qvm-billing-contrast">计费说明</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4294/record-introduction">备案相关</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4305/qvm-netsec-overview">网络与安全性概述</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4208/qvm-instance-family">实例规格族</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4233/qvm-disk">磁盘管理</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/qvm/kb/5099/connection-on-redis">为什么云主机连不上 Redis?</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/kb/5146/how-to-install-grub-for-linux-server">如何为 Linux 服务器安装 GRUB?</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/kb/5144/the-common-problems-in-load-balancing">负载均衡常见问题</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/kb/5147/the-backend-server-common-problems">后端服务器常见问题</LinkItem>
        </LinkGroup>
        <LinkGroup title="上云实践">
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4288/server-migration-qiniu">使用迁移工具迁移服务器至 QVM</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvm/manual/4269/qvm-kodo">云主机与对象存储内网相互连接使用</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function QvmPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
