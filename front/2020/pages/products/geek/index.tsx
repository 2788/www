/**
 * @file 产品 “低延时直播” 落地页
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import qs from 'query-string'
import { InferGetStaticPropsType } from 'next'
import { getNotices, INotice } from 'apis/admin/notice'
import { Product, urlMap } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import { useUserInfo } from 'components/UserInfo'
import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import FeatureList from 'components/pages/geek/Feature'
import SceneList from 'components/pages/geek/Scene'
import Comparison from 'components/pages/geek/Comparison'
import BannerIcon from './banner.png'

const pageInfo = {
  layoutTitle: '低延时直播 Geek_快直播',
  bannerTitle: '低延时直播 Geek',
  keywords: '低延时直播, 快直播, 超低延迟直播',
  description:
    '七牛云低延时直播（Geek）构建了全新的低延时直播互动体验，相比于传统的直播能力降低了延时、优化了协议与底层技术，为各类直播多业务场景提供了更为优渥的使用体验。支持千万级并发同时拥有毫秒级开播体验，打通了用户对于直播低延时性的核心诉求。'
}

/**
 * qs.stringifyUrl API 实现
 *
 * @description 项目内使用 query-string 版本被锁定在了 v5 ，
 *              原因是更高版本到 query-string 不支持 IE 浏览器，
 *              v5 版本的没有提供 stringifyUrl API
 */
function stringifyUrl(url: string, options: object): string {
  const parsed = qs.parseUrl(url)
  const query = { ...parsed.query, ...options }
  const str = qs.stringify(query)
  return str === '' ? parsed.url : parsed.url + '?' + str
}

/**
 * 获取需要用到到 URL 信息
 */
function getUrls() {
  const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST
  const NEXT_PUBLIC_SSO_HOST = process.env.NEXT_PUBLIC_SSO_HOST

  const urls = {
    current: `${NEXT_PUBLIC_HOST}${urlMap[Product.Geek]}`,
    sso: `${NEXT_PUBLIC_SSO_HOST}`,
    support: 'https://support.qiniu.com/tickets/new/form'
  }

  urls.sso = stringifyUrl(urls.sso, {
    client_id: 'web-api',
    redirect_url: urls.current
  })

  urls.support = stringifyUrl(urls.support, {
    space: '直播云',
    category: '其他类咨询',
    title: '七牛低延时直播',
    method: 'PC 推流',
    description: '七牛低延时直播接入测试申请'
  })

  return urls
}

function PageContent({ notices }: { notices: INotice[] }) {
  const user = useUserInfo()
  const urls = getUrls()

  const firstBtn = {
    children: '立即咨询',
    // 根据登陆状态判断是跳转登陆还是跳转到工单系统
    href: (user?.signedIn) ? urls.support : urls.sso
  }

  const BannerBtns = useBtns(firstBtn)

  return (
    <>
      <PageBanner
        title={pageInfo.bannerTitle}
        desc={pageInfo.description}
        bgColor="#34A1EC"
        btns={BannerBtns.banner}
        icon={BannerIcon}
      />
      <ProductNotice notices={notices} />
      <Navigator>{BannerBtns.nav}</Navigator>
      <FeatureList />
      <SceneList />
      <Comparison />
    </>
  )
}

export default function GeekPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={pageInfo.layoutTitle}
      keywords={pageInfo.description}
      description={pageInfo.description}
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Geek)
    }
  }
}
