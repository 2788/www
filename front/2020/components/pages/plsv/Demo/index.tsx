import React from 'react'
import Section from 'components/Product/Section'

// TODO js 生成 qrcode
import ios from './images/iOS.jpg'
import android from './images/Android.jpg'
import style from './index.less'

// TODO 移动端
export default function Demo() {
  return (
    <Section title="体验 Demo" name="demo" grey>
      <figure className={style.figure}>
        <img src={ios} />
        <figcaption>扫码体验 iOS Demo</figcaption>
      </figure>
      <figure className={style.figure}>
        <img src={android} />
        <figcaption>扫码体验 Android Demo</figcaption>
      </figure>
    </Section>
  )
}
