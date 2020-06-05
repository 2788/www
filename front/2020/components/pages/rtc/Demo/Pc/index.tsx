import React from 'react'
import QRCode from 'qrcode.react'

import style from './index.less'

export default function Pc() {
  return (
    <>
      <figure className={style.figure}>
        <MyQRCode value="http://fir.qnsdk.com/517z?utm_source=fir&utm_medium=qr" />
        <figcaption>扫码体验 iOS Demo</figcaption>
      </figure>
      <figure className={style.figure}>
        <MyQRCode value="http://fir.qnsdk.com/b5ce" />
        <figcaption>扫码体验 Android Demo</figcaption>
      </figure>
      <div className={style.webDemo}>
        <a className={style.link} href="https://demo-rtc.qnsdk.com/">Web 端在线体验</a>
      </div>
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
