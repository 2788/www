import React, { ComponentClass, useEffect } from 'react'

import 'react-icecream/dist/icecream.min.css'
import './global.less'

type Props = {
  Component: ComponentClass
  pageProps: any
}

// TODO: Web 性能指标数据上报
// 详情见 https://nextjs.org/docs/advanced-features/measuring-performance

export default function MyApp({ Component, pageProps }: Props) {
  // 用来标识客户端渲染完成，如隔壁 `global.less` 会依赖之
  useEffect(() => {
    window.document.body.classList.add('mounted')
  }, [])

  return <Component {...pageProps} />
}