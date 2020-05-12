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
import Navigator, { Button as NavButton } from 'components/Product/Navigator'

import Feature from 'components/pages/plsv/Feature'
import PriceList from 'components/pages/plsv/PriceList'
import Demo from 'components/pages/plsv/Demo'

import BannerIcon from './images/banner.svg'

const bannerBtns: ReactNode[] = [
  <UIButton key="try" href="/TODO">
    免费体验
  </UIButton>,
  <UIButton key="guide" href="/TODO" type="hollow">
    售前咨询
  </UIButton>
]

export default function Page() {
  return (
    <Layout>
      <PageBanner
        title="短视频 SDK"
        desc="短视频SDK，由七牛音视频团队潜心研发。100+功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方视频滤镜、人脸贴纸、背景分割等高级功能，协助您打造一站式手机视频制作工具。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            新用户可享 24 万次免费额度，更有超值套餐包可供选择
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>
        <NavButton type="primary" href="/products/kodo">免费试用</NavButton>
        <NavButton withBorder>售前咨询</NavButton>
      </Navigator>

      <Feature />
      <PriceList />
      <Demo />
    </Layout>
  )
}
