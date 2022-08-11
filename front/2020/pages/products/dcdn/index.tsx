/**
 * @file DCDN
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Product } from 'constants/products'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Navigator from 'components/Product/Navigator'
import DcdnCase from 'components/pages/dcdn/Case'
import DcdnFunction from 'components/pages/dcdn/Function'

import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'

import banner from './banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/dcdn/domain', children: '立即配置' },
    { href: 'https://developer.qiniu.com/dcdn/10489/dynamic-acceleration-upgraded-to-total-station', children: '开发者文档' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Dcdn]
  })

  return (
    <>
      <PageBanner
        title="全站加速"
        desc="七牛全站加速 DCDN 在 CDN 静态加速的基础上融合了动态加速的能力，通过资源动静态分离、智能缓存、路由优化等核心技术一站式解决动静态资源混合站点内容分发慢的问题。适用于动态资源或动静态资源混合的加速场景。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <ProductNotice {...(currentNotices || notices)} />

      <DcdnFunction />

      <DcdnCase />

      <ProductNews newsRes={newsRes} />

      <LinkGroups>
        <LinkGroup title="相关文档">
          <LinkItem href="https://developer.qiniu.com/kodo">产品文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10575/dcdn-overview">产品概述</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10743/dcdn-features">功能特性</LinkItem>
        </LinkGroup>
        <LinkGroup title="快速入门">
          <LinkItem href="https://developer.qiniu.com/dcdn/10767/dcdn-guide-to-the-console">控制台指南</LinkItem>
        </LinkGroup>
        <LinkGroup title="API 文档">
          <LinkItem href="https://developer.qiniu.com/dcdn/10748/dcdn-access">接入方式</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10752/dcdn-download-the-log">日志下载</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10753/dcdn-traffic-bandwidth">流量带宽</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10754/dcdn-log-analysis">日志分析</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10755/dcdn-cache-refresh-with-the-query">缓存刷新与查询</LinkItem>
          <LinkItem href="https://developer.qiniu.com/dcdn/10756/dcdn-file-prefetching-and-query">文件预取与查询</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function DcdnPage({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="全站加速_动态加速_混合加速"
      keywords="全站加速,动态加速,混合加速,dcdn,cdn,Dynamic acceleration"
      description="七牛全站加速 DCDN 在 CDN 静态加速的基础上融合了动态加速的能力，通过资源动静态分离、智能缓存、路由优化等核心技术一站式解决动静态资源混合站点内容分发慢的问题。适用于动态资源或动静态资源混合的加速场景。"
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Dcdn),
      newsRes: await getNews({ product: Product.Dcdn }),
      globalBanners: await getGlobalBanners()
    }
  }
}
