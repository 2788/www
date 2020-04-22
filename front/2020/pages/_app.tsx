import React, { ComponentClass } from 'react'

import './global.less'

type Props = {
  Component: ComponentClass
  pageProps: any
}

export default function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}
