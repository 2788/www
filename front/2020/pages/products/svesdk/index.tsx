/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频特效 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal } from 'components/Feedback'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import Link from 'components/Link'

import Advantage from 'components/pages/svesdk/Advantage'
import ProductFeature from 'components/pages/svesdk/Feature'
import Demo from 'components/pages/svesdk/Demo'
import Scene from 'components/pages/svesdk/Scene'

import banner from './images/banner.png'
import Step1 from './images/step1.svg'
import Step2 from './images/step2.svg'
import Step3 from './images/step3.svg'
import Step4 from './images/step4.svg'

export function Content() {
  const { startConsulting } = useModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    { children: 'Demo 下载', href: '#demo' }
  )

  return (
    <>
      <PageBanner
        title="短视频特效 SDK"
        desc="短视频特效 SDK，是七牛云 SDK 团队与字节跳动 SDK 团队共同打造的一款短视频内容创作工具。其融合了移动端的短视频拍摄、编辑、上传等能力于一体，集成了丰富的滤镜和贴纸资源，在火山、轻颜等产品中也有使用。"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Advantage />
      <ProductFeature />
      <Scene />
      <Demo />
      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide">短视频 SDK 快速接入指南</LinkItem>
          <LinkItem href="https://github.com/pili-engineering/PLDroidShortVideo-ByteDance">Android SDK 接入指南</LinkItem>
          <LinkItem href="https://github.com/pili-engineering/PLShortVideoKit-ByteDance">iOS SDK 接入指南</LinkItem>
        </LinkGroup>
      </LinkGroups>
      <AccessProcess header="接入流程">
        <Step icon={<Step1 />} onClick={startConsulting}>
          <Link blue onClick={startConsulting}>售前咨询 &gt;&gt;</Link>
        </Step>
        <Step icon={<Step2 />}>申请试用</Step>
        <Step icon={<Step3 />}>接入测试</Step>
        <Step icon={<Step4 />}>正式购买</Step>
      </AccessProcess>
      <UsageGuide title="全方位体验短视频特效 SDK">
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page() {
  return (
    <Layout
      title="短视频特效 SDK"
      keywords="短视频特效SDK, 短视频SDK, 七牛云, 七牛短视频, 短视频特效"
      description="短视频特效 SDK，是七牛云 SDK 团队与字节跳动 SDK 团队共同打造的一款短视频内容创作工具。其融合了移动端的短视频拍摄、编辑、上传等能力于一体，集成了丰富的滤镜和贴纸资源，在火山、轻颜等产品中也有使用。"
    >
      <Content />
    </Layout>
  )
}
