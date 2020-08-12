import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Func from 'components/pages/openapi/Func'
import Doc from 'components/pages/openapi/Doc'

import { useBtns } from 'hooks/product-btn'

import banner from './banner.png'

function Page() {
  const btns = useBtns(
    { children: '立即使用', href: 'https://portal.qiniu.com/create?ref=www.qiniu.com#openApi', pcOnly: true },
    { href: 'https://developer.qiniu.com/dora/api/3688/the-third-party-data-processing', children: '帮助文档' },
    { href: '/prices/openapi', children: '产品价格' }
  )

  return (
    <>
      <PageBanner
        title="Open API"
        desc="Open API 是一个开放平台，提供各种图片、音视频、以及其他数据处理的第三方服务接口，提供高质量的数据处理服务。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Func />

      <Doc />

    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="Open API"
      keywords="Open API, openapi, open api, 开放平台, 第三方, 图片, 音视频, 数据处理"
      description="Open API 是一个开放平台，提供各种图片、音视频、以及其他数据处理的第三方服务接口，提供高质量的数据处理服务。"
    >
      <Page />
    </Layout>
  )
}
