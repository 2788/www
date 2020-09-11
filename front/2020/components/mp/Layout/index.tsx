/**
 * @file 小程序 Layout 组件 TODO 非小程序打开此页面跳转
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import { UAParser } from 'ua-parser-js'
import { defaultTitle, titleSuffix } from 'constants/page'
import { UaContext, useUa, Ua } from 'hooks/ua'
import ErrorBoundary from 'components/ErrorBoundary'

export type Props = {
  /** 页面 title */
  title: string
  children: ReactNode
}

export default function Layout({ title, children }: Props) {
  title = !title ? defaultTitle : (title + titleSuffix)

  // 满足某些场景需要手动提供 ua 的情况，可以在父组件 provider 覆盖手动值
  const ua = useUa()
  const loaded = useLoaded()
  const uaParser = useUaParser()

  const uaValue: Ua = {
    isMobile: true,
    loaded,
    browser: uaParser.getBrowser(),
    os: uaParser.getOS(),
    ...ua
  }

  return (
    <UaContext.Provider value={uaValue}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=no" />
        <link rel="shortcut icon" href="//qiniu.staticfile.org/favicon.ico" type="image/x-icon" />
      </Head>
      <ErrorBoundary>
        <div style={{ padding: '16px' }}>{children}</div>
      </ErrorBoundary>
    </UaContext.Provider>
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
// iOS 微信内置浏览器 UA
const defaultUaText = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) > AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 > MicroMessenger/6.0.1 NetType/WIFI'

function useUaParser() {
  const [parser, setParser] = useState<UAParser>(new UAParser(defaultUaText))
  useEffect(() => {
    setParser(new UAParser())
  }, [])
  return parser
}
