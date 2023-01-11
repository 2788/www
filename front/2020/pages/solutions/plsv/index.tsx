/**
 * @file 解决方案”短视频“
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Solution, nameMap } from 'constants/solutions'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import PlsvAdvantage from 'components/pages/plsv-solution/Advantage'
import PlsvFeature from 'components/pages/plsv-solution/Feature'
import PlsvFunc from 'components/pages/plsv-solution/Func'
import PlsvSolution from 'components/pages/plsv-solution/Solution'
import PlsvClientLogo from 'components/pages/plsv-solution/ClientLogo'
import PlsvAccess from 'components/pages/plsv-solution/Access'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import { getGlobalBanners } from 'apis/admin/global-banners'

import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'

import imgBannerPc from './images/banner-pc.jpg'
import imgBannerMobile from './images/banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = `${nameMap[Solution.Plsv]}解决方案`

function PageContent() {
  const isMobile = useMobile()

  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { children: '0 元体验', href: 'https://qmall.qiniu.com/template/MTE1', pcOnly: true },
    { children: '短视频 SDK', href: 'https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download' },
    { children: 'SDK 功能列表', href: 'https://developer.qiniu.com/pili/sdk/3731/short-video' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="七牛短视频解决方案（PLSV）是提供端到云的一站式的短视频解决方案，
        集视频拍摄、编辑、处理、上传、存储、分发加速、播放、内容分析审核、大数据分析等功能于一体。"
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <Navigator>{btns.nav}</Navigator>

      <PlsvAdvantage />

      <PlsvFeature />

      <PlsvFunc />

      <PlsvSolution />

      <PlsvClientLogo />

      <PlsvAccess onConsult={showWechatConsultModal} />

      <LinkGroups title="产品相关" header="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3919/a-short-video-the-white-paper">七牛短视频白皮书</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili//sdk/3921/the-server-api">服务端 API</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及工具">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3734/android-short-video-sdk">Android 采集端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3733/short-video-ios-sdk">iOS 采集端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/4164/windows-player-sdk">Windows 播放端 SDK</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">Demo 下载</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide title="注册即可免费试用短视频">
        <UsageGuideButton href="https://qmall.qiniu.com/template/MTE1">
          立即开通
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function PlsvPage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="短视频解决方案_短视频服务_短视频"
        keywords="短视频 SDK, 七牛短视频, 短视频服务, 短视频解决方案, ios 短视频 sdk, android 短视频 sdk"
        description="七牛短视频解决方案（PLSV）是提供端到云的一站式的短视频解决方案，集视频拍摄、编辑、处理、上传、存储、分发加速、播放、内容分析审核、大数据分析等功能于一体。"
        globalBanners={globalBanners}
      >
        <PageContent />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
