/**
 * @file rtc Demo Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Demo from 'components/Product/Demo'
import mpDemoImg from './mp-demo.jpg'

export default function RTCDemo() {
  return (
    <Demo
      iosUrl="http://fir.qnsdk.com/517z"
      androidUrl="http://fir.qnsdk.com/b5ce"
      mpImgUrl={mpDemoImg}
      webUrl="https://demo-rtc.qnsdk.com"
    />
  )
}
