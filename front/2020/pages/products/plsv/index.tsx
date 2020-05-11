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
        title="对象存储 Kodo"
        desc="七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
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
    </Layout>
  )
}
