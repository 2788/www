/**
 * @file          component  QrCode
 * @description   二维码签到页面
 * @author        renpanpan
 */

import React from 'react'
import QRCode from 'qrcode.react'
import { useQueryValue } from 'hooks/url'
import Layout from 'components/Layout'

import style from './style.less'

export function PageContent() {
  const [id] = useQueryValue('id', '')
  return (
    <div className={style.container}>
      <QRCode className={style.qrCode} renderAs="svg" fgColor="#333" value={id} />
    </div>
  )
}

export default function QrCode() {
  return (
    <Layout title="签到二维码" keywords="" description="" forceSimple>
      <PageContent />
    </Layout>
  )
}
