/**
 * @file 全局的 Layout 组件
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import { UaContext, useUa } from 'hooks/ua'

import Header from '../Header'
import Footer from '../Footer'
import * as feedback from '../Feedback'

export type Props = {
  title?: string
  children: ReactNode
}

const defaultTitle = '七牛云 - 国内领先的企业级云服务商'
const titleSuffix = ' - 七牛云'

export default function Layout({ children, title }: Props) {
  title = (
    title == null
      ? defaultTitle
      : title + titleSuffix
  )
  // 满足某些场景需要手动提供 ua 的情况，可以在父组件 provideer 覆盖手动值
  const ua = useUa()
  const isMobile = useIsMobile()
  const loaded = useLoaded()

  return (
    <UaContext.Provider value={{ isMobile, loaded, ...ua }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <feedback.ModalProvider>
        <Header />
        {children}
        <Footer />
        <feedback.Entry />
        <feedback.Modal />
      </feedback.ModalProvider>
    </UaContext.Provider>
  )
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
