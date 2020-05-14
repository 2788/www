/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import UIButton from 'components/UI/Button'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import Feature from 'components/pages/plsv/Feature'
import PriceList from 'components/pages/plsv/PriceList'
import Demo from 'components/pages/plsv/Demo'
import Scene from 'components/pages/plsv/Scene'

import BannerIcon from './images/banner.svg'

const bannerBtns: ReactNode[] = [
  <UIButton key="try" href="https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com">
    免费体验
  </UIButton>,
  <UIButton key="guide" href="https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide" type="hollow">
    接入指南
  </UIButton>
]

export default function Page() {
  return (
    <Layout>
      <PageBanner
        title="短视频 SDK"
        desc="短视频 SDK，由七牛音视频团队潜心研发。100+功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方视频滤镜、人脸贴纸、背景分割等高级功能，协助您打造一站式手机视频制作工具。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="/products/svesdk">
            短视频特效 SDK
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator />

      <Feature />
      <Scene />
      <PriceList />
      <Demo />
      {/* 相关文档 */}
      <UsageGuide title="注册即可体验全方位实时音视频">
        <UsageGuideButton href="https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com">
          免费体验
        </UsageGuideButton>
      </UsageGuide>
    </Layout>
  )
}