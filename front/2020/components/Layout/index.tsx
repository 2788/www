/**
 * @file 全局的 Layout 组件
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { UAParser } from 'ua-parser-js'
import { defaultTitle, titleSuffix } from 'constants/page'
import { UaContext, useUa, Ua } from 'hooks/ua'
import { pv } from 'utils/sensors'
import { OverlayProvider, OverlaySlot } from 'components/Overlay'

import ErrorBoundary from './ErrorBoundary'
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

  // 满足某些场景需要手动提供 ua 的情况，可以在父组件 provider 覆盖手动值
  const ua = useUa()
  const isMobile = useIsMobile()
  const isMp = useIsMp()
  const loaded = useLoaded()
  const uaParser = useUaParser()

  const keywordsMeta = keywords && (
    <meta name="keywords" content={keywords} />
  )

  const descriptionMeta = description && (
    <meta name="description" content={description} />
  )

  const uaValue: Ua = {
    isMobile,
    isMp,
    loaded,
    browser: uaParser.getBrowser(),
    os: uaParser.getOS(),
    ...ua
  }

  return (
    <UaContext.Provider value={uaValue}>
      <UserInfoProvider>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=no" />
          <link rel="shortcut icon" href="//qiniu.staticfile.org/favicon.ico" type="image/x-icon" />
          <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
          {keywordsMeta}
          {descriptionMeta}
        </Head>
        <OverlayProvider>
          <feedback.ModalProvider>
            {!isMp && <Header />}
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            {!isMp && <Footer />}
            <RegisterEntry />
            {!isMp && <feedback.Entry />}
            <feedback.Modal />
          </feedback.ModalProvider>
          <OverlaySlot />
        </OverlayProvider>
      </UserInfoProvider>
    </UaContext.Provider>
  )
}

function useIsMp() {
  // 是否是小程序环境
  const uaParser = useUaParser()
  const [isMp, setIsMp] = useState(false)

  useEffect(() => {
    // __wxjs_environment 同步有可能为空，则应该在 WeixinJSBridgeReady 中判断，或者使用 getEnv
    // eslint-disable-next-line no-underscore-dangle
    if ((window as any).__wxjs_environment === 'miniprogram') {
      setIsMp(true)
      return
    }

    const mainVersion = uaParser.getBrowser().version?.split('.')[0] || ''

    // 从微信 [7.0.0] 开始，可以通过判断 [userAgent] 中包含 [miniProgram] 字样来判断小程序 web-view 环境。
    if (+mainVersion >= 7) {
      if (uaParser.getUA().indexOf('miniProgram') > -1) {
        setIsMp(true)
        return
      }
    }

    if (uaParser.getBrowser().name === 'WeChat') {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          setIsMp(true)
        }
      })
    }
  }, [uaParser])

  return isMp
}

function useIsMobile() {
  // 初始状态使用 false，以保持客户端渲染跟静态（服务端）渲染逻辑的一致
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function syncIsMobile() {
      setIsMobile(getIsMobile())
    }
    syncIsMobile()
    window.addEventListener('resize', syncIsMobile)
    return () => window.removeEventListener('resize', syncIsMobile)
  }, [])

  return isMobile
}

function getIsMobile() {
  return (
    typeof window !== 'undefined'
    // 同 utils/style.less `.mobile()` 实现
    && window.matchMedia('(max-width: 767px)').matches
  )
}

function useLoaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.document.readyState === 'complete') {
      setLoaded(true)
      return
    }

    const markLoaded = () => setLoaded(true)
    window.addEventListener('load', markLoaded)
    return () => window.removeEventListener('load', markLoaded)
  }, [])

  return loaded
}

// 默认 UA 值，用于静态渲染 & 首屏初始化逻辑
const defaultUaText = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'

function useUaParser() {
  const [parser, setParser] = useState<UAParser>(new UAParser(defaultUaText))
  useEffect(() => {
    setParser(new UAParser())
  }, [])
  return parser
}

function usePv(title: string) {
  const router = useRouter()
  const path = router.pathname
  useEffect(() => {
    pv(title, path)
  }, [title, path])
}
