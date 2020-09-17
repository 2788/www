
/**
 * @file 云存储一体机
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import Navigator from 'components/Product/Navigator'
import Advantage from 'components/pages/storage/Advantage'
import Product from 'components/pages/storage/Product'
import Scene from 'components/pages/storage/Scene'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'

import banner from './banner.png'

function Page() {

  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="云存储一体机"
        desc="七牛云存储一体机，预集成七牛自主研发的企业级存储服务和多媒体计算平台，经过深度的软硬件整合优化，以一体机为载体，实现敏捷部署、开箱即用，降低企业 IT 基础架构建设与运维成本。以高性能、高可扩展、高可靠、高资源利用率的存储能力和对软、硬件资源统一管理能力，帮助企业轻松管理 EB 级海量数据。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Product />

      <Advantage />

      <Scene />

    </>
  )
}

export default function StoragePage() {
  return (
    <Layout
      title="云存储一体机"
      keywords="七牛, 云存储, 一体机, 云存储一体机, 企业级, 存储服务, 多媒体计算平台, 敏捷部署, 开箱即用, 高性能, 高可扩展, 高可靠, 高资源利用率, 统一管理, 海量数据"
      description="七牛云存储一体机，预集成七牛自主研发的企业级存储服务和多媒体计算平台，经过深度的软硬件整合优化，以一体机为载体，实现敏捷部署、开箱即用，降低企业 IT 基础架构建设与运维成本。以高性能、高可扩展、高可靠、高资源利用率的存储能力和对软、硬件资源统一管理能力，帮助企业轻松管理 EB 级海量数据。"
    >
      <Page />
    </Layout>
  )
}
