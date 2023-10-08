/**
 * @file 全局的 Layout 组件
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode, useEffect, PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { defaultTitle, titleSuffix } from 'constants/page'
import { pv } from 'utils/sensors'
import { useMp } from 'hooks/ua'
import { useSource } from 'hooks/sensors'
import { OverlayProvider, OverlaySlot } from 'components/Overlay'
import CpsVisitReporter from 'components/CpsVisitReporter'
import { GlobalBanner } from 'apis/admin/global-banners'
import WechatConsultModal, { ModalProvider as WechatConsultModalProvider } from 'components/WechatConsultModal'
import BDVidReporter from 'components/BDVidReporter'
import { context as libIconContext, IconMap } from 'components/LibIcon'

import ErrorBoundary from './ErrorBoundary'
import UaProvider from './UaProvider'
import Header from '../Header'
import Footer from '../Footer'
import * as feedback from '../Feedback'
import ScrollToTop from '../ScrollToTopV2'
import { Provider as UserInfoProvider } from '../UserInfo'
import GlobalEntryProvider from '../GlobalEntryProvider'
import GlobalBannerComp from './GlobalBanner'
import logo from './logo.jpg'

type BaseProps = {
  /** 页面 title */
  title: string
  /** 页面 keywords（SEO 用） */
  keywords: string
  /** 页面 description（SEO 用） */
  description: string
  children: ReactNode
  iconMap?: IconMap
}

export type Props = BaseProps & ({
  forceSimple?: false
  globalBanners: GlobalBanner[]
} | {
  forceSimple: true
  globalBanners?: undefined
})

export default function Layout({
  title, keywords, description, forceSimple, globalBanners, iconMap, children
}: Props) {
  title = !title ? defaultTitle : (title + titleSuffix)

  usePv(title)
  useReportUrl(title)

  const keywordsMeta = keywords && (
    <meta name="keywords" content={keywords} />
  )

  const descriptionMeta = description && (
    <meta name="description" content={description} />
  )

  return (
    <UaProvider>
      <UserInfoProvider>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=no" />
          <link rel="shortcut icon" href="//qiniu.staticfile.org/favicon.ico" type="image/x-icon" />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
          {keywordsMeta}
          {descriptionMeta}
        </Head>
        <ContentWrapper
          forceSimple={forceSimple}
          globalBanners={globalBanners}
          iconMap={iconMap}
        >{children}</ContentWrapper>
      </UserInfoProvider>
    </UaProvider>
  )
}

function ContentWrapper({
  forceSimple = false,
  globalBanners,
  iconMap,
  children
}: PropsWithChildren<Pick<Props, 'forceSimple' | 'globalBanners' | 'iconMap'>>) {
  const keepSimple = useSimple()
  const notSimple = !forceSimple && !keepSimple

  return (
    <OverlayProvider>
      <libIconContext.Provider value={iconMap || null}>
        <WechatConsultModalProvider>
          <feedback.ModalProvider>
            {/* 企业微信会自动寻找第一张 img 作为分享出去的图标 */}
            <img src={logo} style={{ display: 'none' }} />
            {notSimple && <GlobalBannerComp banners={globalBanners ?? []} />}
            {notSimple && <Header />}
            <ErrorBoundary>
              <GlobalEntryProvider>
                {children}
              </GlobalEntryProvider>
            </ErrorBoundary>
            {notSimple && <Footer />}
            {notSimple && <feedback.EntryV4 />}
            <feedback.Modal />
            <ScrollToTop />
            <WechatConsultModal />
          </feedback.ModalProvider>
        </WechatConsultModalProvider>
        <OverlaySlot />
        <CpsVisitReporter />
        <BDVidReporter />
      </libIconContext.Provider>
    </OverlayProvider>
  )
}

// 是否保持简单布局(去掉头尾等等)
// 1、默认全部布局 2、小程序简单布局 3、渠道的小程序全部布局
function useSimple() {
  const isMp = useMp()
  const source = useSource()
  if (isMp) {
    if (source) return false
    return true
  }
  return false
}

function usePv(title: string) {
  const router = useRouter()
  const path = router.pathname
  useEffect(() => {
    pv(title, path)
  }, [title, path])
}

// 给小程序 webview 上报当前 url
// https://jira.qiniu.io/browse/RMBWEB-2881
function useReportUrl(title: string) {
  const isMp = useMp()
  useEffect(() => {
    if (!isMp) return
    // 参数必须是 { data: {} } 格式
    wx.miniProgram.postMessage({
      data: {
        from: 'www',
        event: 'location:href',
        data: {
          href: window.location.href,
          title
        }
      }
    })
  })
}
