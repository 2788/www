import React, { ComponentClass, useEffect } from 'react'

import 'react-icecream/dist/icecream.min.css'
import './global.less'

type Props = {
  Component: ComponentClass
  pageProps: any
}

export default function MyApp({ Component, pageProps }: Props) {
  // 用来标识客户端渲染完成，如隔壁 `global.less` 会依赖之
  useEffect(() => {
    window.document.body.classList.add('mounted')
  }, [])

  return <Component {...pageProps} />
}
