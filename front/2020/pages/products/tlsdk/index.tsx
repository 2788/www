/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 推流 sdk TODO 确认 url
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import UIButton from 'components/UI/Button'
import Navigator from 'components/Product/Navigator'
import PageNotice, { Group as PageNoticeGroup, Item as PageNoticeItem } from 'components/Product/PageNotice'

import ProductFeature from 'components/pages/tlsdk/Feature'
import Demo from 'components/pages/tlsdk/Demo'

import BannerIcon from './images/banner.svg'

export function Content() {

  const bannerBtns: ReactNode[] = [
    <UIButton key="try" href="TODO">
      免费体验
    </UIButton>,
    <UIButton key="guide" href="TODO" type="hollow">
      接入指南
    </UIButton>
  ]

  return (
    <>
      <PageBanner
        title="直播推流 SDK"
        desc="直播推流SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="welfares">
          <PageNoticeItem href="/products/svesdk">
            直播特效SDK落地页
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator priceLink="TODO" />

      <ProductFeature />
      {/* 应用场景 */}
      <Demo />
      {/* 相关文档 */}
    </>
  )
}

export default function Page() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
