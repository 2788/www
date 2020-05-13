import React from 'react'

// TODO js 生成 qrcode
import ios from './images/iOS.png'
import android from './images/Android.png'
import style from './index.less'

// TODO 移动端
export default function Pc() {
  return (
    <>
      <figure className={style.figure}>
        <img src={ios} />
        <figcaption>扫码体验 iOS Demo</figcaption>
      </figure>
      <figure className={style.figure}>
        <img src={android} />
        <figcaption>扫码体验 Android Demo</figcaption>
      </figure>
    </>
  )
}
