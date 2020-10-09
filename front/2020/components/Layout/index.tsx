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

import ErrorBoundary from './ErrorBoundary'
import UaProvder from './UaProvider'
import Header from '../Header'
import Footer from '../Footer'
import * as feedback from '../Feedback'
import { Provider as UserInfoProvider } from '../UserInfo'
import RegisterEntry from '../RegisterEntry'

export type Props = {
  /** 页面 title */
  title: string
  /** 页面 keywords（SEO 用） */
  keywords: string
  /** 页面 description（SEO 用） */
  description: string
  children: ReactNode
}

export default function Layout({ title, keywords, description, children }: Props) {
  title = !title ? defaultTitle : (title + titleSuffix)

  usePv(title)

  const keywordsMeta = keywords && (
    <meta name="keywords" content={keywords} />
  )

  const descriptionMeta = description && (
    <meta name="description" content={description} />
  )

  return (
    <UaProvder>
      <UserInfoProvider>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=no" />
          <link rel="shortcut icon" href="//qiniu.staticfile.org/favicon.ico" type="image/x-icon" />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
          {keywordsMeta}
          {descriptionMeta}
        </Head>
        <ContentWrapper>{children}</ContentWrapper>
      </UserInfoProvider>
    </UaProvder>
  )
}

function ContentWrapper({ children }: PropsWithChildren<{}>) {
  const keepSimple = useSimple()

  return (
    <OverlayProvider>
      <feedback.ModalProvider>
        {!keepSimple && <Header />}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        {!keepSimple && <Footer />}
        <RegisterEntry />
        {!keepSimple && <feedback.Entry />}
        <feedback.Modal />
      </feedback.ModalProvider>
      <OverlaySlot />
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
