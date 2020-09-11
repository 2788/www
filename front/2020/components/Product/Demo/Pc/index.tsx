import React from 'react'
import QRCode from 'qrcode.react'
import Link from 'components/Link'
import { Row, LayoutCard } from 'components/UI/Card'

import { Props } from '..'
import style from './index.less'

export default function Pc({ androidUrl, iosUrl, mpImgUrl, webUrl }: Props) {
  return (
    <>
      <Row>
        <LayoutCard className={style.figure}>
          <MyQRCode value={iosUrl} />
          <figcaption className={style.desc}>扫码体验 iOS Demo</figcaption>
        </LayoutCard>
        <LayoutCard className={style.figure}>
          <MyQRCode value={androidUrl} />
          <figcaption className={style.desc}>扫码体验 Android Demo</figcaption>
        </LayoutCard>
        {mpImgUrl != null && <LayoutCard className={style.figure}>
          <img className={style.mpCode} alt="小程序" src={mpImgUrl} />
          <figcaption className={style.desc}>扫码体验微信小程序 Demo</figcaption>
        </LayoutCard>}
      </Row>
      {webUrl && (
        <div className={style.webDemo}>
          <Link className={style.link} href={webUrl}>Web 端在线体验</Link>
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
