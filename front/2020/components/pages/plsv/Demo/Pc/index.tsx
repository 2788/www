import React from 'react'

// TODO js 生成 qrcode
import ios from './images/iOS.jpg'
import android from './images/Android.jpg'
import style from './index.less'

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
