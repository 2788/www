/**
 * @file 产品“对象存储”
 */

import React, { ReactNode } from 'react'
import Layout from '../../../components/Layout'
import PageBanner from '../../../components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from '../../../components/Product/PageNotice'

import UIButton from '../../../components/UI/Button'

// svg 方式引入
// import BannerIcon from './images/bannerIcon.svg'

// 非 svg 方式引入
import bannerIconURL from './images/bannerIcon.png'

export default function KodoPage() {

  const bannerBtns: ReactNode[] = [(
    <UIButton
      href="/products/kodo">
      免费试用
    </UIButton>
  ), (
    <UIButton
      type="hollow"
      onClick={() => {
        // TODO 呼出全局反馈表单
        console.error('call feedback modal')
      }}>
      售前咨询
    </UIButton>
  )]

  return (
    <Layout>
      <PageBanner
        title="对象存储 Kodo"
        desc="七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        // svg 方式引入
        // icon={<BannerIcon />}
        // 非 svg 方式引入
        icon={(<img width="600" src={bannerIconURL} title="对象存储-七牛云" alt="对象存储-七牛云" />)} />
      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 >>
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 >>
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>
      This is Product Kodo Page.
    </Layout>
  )
}
