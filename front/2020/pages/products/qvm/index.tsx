/**
 * @file 产品“云主机”
 */

/* eslint-disable max-len */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { useBtns } from 'hooks/product-btn'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNotices } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

import Navigator from 'components/Product/Navigator'
import Feature, * as feature from 'components/Product/Feature'
import Section from 'components/Product/Section'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import Specs from 'components/pages/qvm/Specs'
import MoreProducts from 'components/pages/qvm/MoreProducts'
import Scenes from 'components/pages/qvm/Scenes'
import QvmCommonCases from 'components/pages/qvm/Cases'
import { useMobile } from 'hooks/ua'
import { getStarterSpecs, getMetaInfo, getEnterpriseSpecs } from 'apis/qvm'

import imgBanner from './banner.png'
import IconFeatureEasy from './_icons/feature/easy.svg'
import IconFeatureFlexibility from './_icons/feature/flexibility.svg'
import IconFeatureHighPerf from './_icons/feature/high-perf.svg'
import IconFeatureSafe from './_icons/feature/safe.svg'
import IconFeatureScalable from './_icons/feature/scalable.svg'
import IconFeatureStable from './_icons/feature/stable.svg'
import style from './style.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent(props: InferGetStaticPropsType<typeof getStaticProps>) {

  const isMobile = useMobile()

  const priceUrl = urlForPrice(Product.Qvm)
  const priceCalculatorUrl = urlForPrice(Product.Qvm, true)

  const descView = (
    <>
      <p>七牛云主机服务是围绕云主机为核心，推出的含云硬盘、数据库、高防、负载均衡等解决方案为一体的云计算综合服务。</p>
      <br />
      <p>
        免费使用最高 4 核 8 G 主机，
        <a target="_blank" href="/events/qvm0rmb">
          立即参与&gt;&gt;
        </a>
      </p>
    </>
  )

  const btns = useBtns(
    { children: '立即购买', href: 'https://portal.qiniu.com/qvm/vm/instance/create', pcOnly: true },
    { children: '价格计算器', href: priceCalculatorUrl, pcOnly: true },
    { href: priceUrl, children: '产品价格', mobileOnly: true }
  )

  return (
    <>
      <PageBanner
        title="云主机服务 QVM"
        desc={descView}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <ProducNotice notices={props.notices} />

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      {!isMobile && ( // 移动端无需展示，因为移动端无法购买（Portal 未适配移动端）
        <Section name="specs" title="产品规格" header="热销产品规格">
          <Specs starterConfig={props.starter} enterpriseConfig={props.enterprise} metaInfo={props.metaInfo} />
        </Section>
      )}

      <Feature>
        <feature.Group>
          <feature.Item title="弹性" icon={<IconFeatureFlexibility />}>
            <feature.Desc className={style.featureDesc}>支持分钟级别创建 1000 台实例，多种弹性付费选择更贴合业务现状，支持弹性扩容，实例、带宽和云盘随时升配</feature.Desc>
          </feature.Item>
          <feature.Item title="稳定" icon={<IconFeatureStable />}>
            <feature.Desc className={style.featureDesc}>单实例可用性达 99.95%，多可用区多实例可用性达 99.99%，云盘可靠性达 99.9999999%，可实现自动宕机迁移</feature.Desc>
          </feature.Item>
          <feature.Item title="安全" icon={<IconFeatureSafe />}>
            <feature.Desc className={style.featureDesc}>通过多方国际安全认证，免费提供 DDoS 基础防护、专用网络服务，可结合七牛云其它安全产品进一步保障数据和服务</feature.Desc>
          </feature.Item>
        </feature.Group>
        <feature.Group>
          <feature.Item title="易用" icon={<IconFeatureEasy />}>
            <feature.Desc className={style.featureDesc}>丰富的操作系统，通过镜像可一键简单部署，同一镜像可在多台实例中快速复制环境，轻松扩展</feature.Desc>
          </feature.Item>
          <feature.Item title="可拓展" icon={<IconFeatureScalable />}>
            <feature.Desc className={style.featureDesc}>与七牛云各种丰富的云产品无缝衔接，可持续为业务发展提供完整的计算、存储、安全等解决方案</feature.Desc>
          </feature.Item>
          <feature.Item title="高性能" icon={<IconFeatureHighPerf />}>
            <feature.Desc className={style.featureDesc}>单实例最高可选 208 vCPU，内存 4096 GB，单实例性能最高可达到 1000 万 PPS 网络收发包，40 Gbps 带宽</feature.Desc>
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

      <QvmCommonCases title="客户案例" header="他们都在用七牛" />

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

export default function QvmPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="云主机服务 QVM_云服务器_云主机_弹性计算_云主机合伙人_0 元主机"
      keywords="七牛云, 云服务器, 云主机, 云数据库, 高防"
      description="七牛云主机服务是围绕云主机为核心，推出的含云硬盘、数据库、高防、负载均衡等解决方案为一体的云计算综合服务。"
    >
      <PageContent {...props} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      starter: await getStarterSpecs(),
      enterprise: await getEnterpriseSpecs(),
      metaInfo: await getMetaInfo(),
      notices: await getNotices(Product.Qvm)
    }
  }
}
