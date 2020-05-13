/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频特效 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import UIButton from 'components/UI/Button'
import Navigator from 'components/Product/Navigator'
import { useModal } from 'components/Feedback'

import Advantage from 'components/pages/svesdk/Advantage'
import ProductFeature from 'components/pages/svesdk/Feature'
import Demo from 'components/pages/svesdk/Demo'

import BannerIcon from './images/banner.svg'

export function Content() {
  const { showModal } = useModal()

  const bannerBtns: ReactNode[] = [
    <UIButton key="consult" onClick={() => showModal()}>
      立即咨询
    </UIButton>,
    <UIButton key="download" onClick={() => { window.location.hash = 'demo' }} type="hollow">
      Demo 下载
    </UIButton>
  ]

  return (
    <>
      <PageBanner
        title="短视频特效 SDK"
        desc="短视频特效 SDK，是七牛云 SDK 团队与字节跳动 SDK 团队共同打造的一款短视频内容创作工具。其融合了移动端的短视频拍摄、编辑、上传等能力于一体，集成了丰富的滤镜和贴纸资源，在火山、轻颜等产品中也有使用。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator />

      <Advantage />
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
