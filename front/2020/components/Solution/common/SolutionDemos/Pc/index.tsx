import React from 'react'
import QRCode from 'qrcode.react'

import { Props } from '..'
import style from './style.less'

export default function Pc({ items }: Props) {
  return (
    <div className={style.demoWrapper}>
      {items.map((item, index) => (
        <figure key={index}>
          <QRCode
            value={item.demoUrl}
            className={style.qrCode}
            renderAs="svg"
            fgColor="#333"
          />
          <figcaption>{item.desc}</figcaption>
        </figure>
      ))}
    </div>
  )
}
