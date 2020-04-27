/**
 * @file 全局的 Layout 组件
 * @description 每个页面的内容都应该用本组件包起来
 */

import React, { ReactNode } from 'react'
import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'
import { Entry as FeedbackEntry } from '../Feedback'
import style from './style.less'

type Props = {
  title?: string
  children: ReactNode
}

// TODO: 这个是不是需要调整，@市场部同学
const defaultTitle = '七牛云 - 国内领先的企业级云服务商'

export default function Layout({ children, title = defaultTitle }: Props) {
  return (
    <div className={style.wrapper}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className={style.main}>
        {children}
      </div>
      <Footer />
      <FeedbackEntry />
    </div>
  )
}
