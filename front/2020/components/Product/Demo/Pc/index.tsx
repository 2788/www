import React from 'react'
import QRCode from 'qrcode.react'

import { Props } from '..'
import style from './index.less'

export default function Pc({ androidUrl, iosUrl, webUrl }: Props) {
  return (
    <>
      <figure className={style.figure}>
        <MyQRCode value={iosUrl} />
        <figcaption>扫码体验 iOS Demo</figcaption>
      </figure>
      <figure className={style.figure}>
        <MyQRCode value={androidUrl} />
        <figcaption>扫码体验 Android Demo</figcaption>
      </figure>
      {webUrl && (
        <div className={style.webDemo}>
          <a className={style.link} href={webUrl}>Web 端在线体验</a>
        </div>
      )}
    </>
  )
}

function MyQRCode(props: { value: string }) {
  return (
    <QRCode
      className={style.qrCode}
      renderAs="svg"
      fgColor="#333"
      {...props}
    />
  )
}
