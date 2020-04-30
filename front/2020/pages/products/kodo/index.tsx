/**
 * @file 产品“对象存储”
 */

import React from 'react'
import Layout from '../../../components/Layout'
import PageBanner from '../../../components/Product/PageBanner'

import UIButton from '../../../components/UI/Button'

// svg 方式引入
// import BannerIcon from './images/bannerIcon.svg'

// 非 svg 方式引入
import bannerIconURL from './images/bannerIcon.png'

export default function KodoPage() {

  const bannerBtns: React.ReactNode[] = [(
    <UIButton
      href="/products/fusion">
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
        title="对象存储"
        desc="七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        // svg 方式引入
        // icon={<BannerIcon />}
        // 非 svg 方式引入
        icon={(<img width="600" src={bannerIconURL} title="对象存储-七牛云" alt="对象存储-七牛云" />)} />
      This is Product Kodo Page.
    </Layout>
  )
}
