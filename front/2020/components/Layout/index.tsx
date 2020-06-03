/**
 * @file 全局的 Layout 组件
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode, useState, useEffect } from 'react'
import Head from 'next/head'
import { defaultTitle, titleSuffix } from 'constants/page'
import { UaContext, useUa } from 'hooks/ua'

import Header from '../Header'
import Footer from '../Footer'
import * as feedback from '../Feedback'

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

  // 满足某些场景需要手动提供 ua 的情况，可以在父组件 provideer 覆盖手动值
  const ua = useUa()
  const isMobile = useIsMobile()
  const loaded = useLoaded()

  const keywordsMeta = keywords && (
    <meta name="keywords" content={keywords} />
  )

  const descriptionMeta = description && (
    <meta name="description" content={description} />
  )

  return (
    <UaContext.Provider value={{ isMobile, loaded, ...ua }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
        {keywordsMeta}
        {descriptionMeta}
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
