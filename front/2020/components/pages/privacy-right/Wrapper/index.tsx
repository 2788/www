import React, { ReactNode } from 'react'

import Link from 'components/Link'

import style from './style.less'

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className={style.wrapper}>
      <div className={style.left}></div>
      <div className={style.container}>
        <ul className={style.header}>
          <li>
            <Link className={style.link} href="/user-agreement">服务用户协议</Link>
          </li>
          <li className={style.active}>
            <Link className={style.link} href="/privacy-right">隐私权政策</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-kodo">对象存储 SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-fusion">CDN SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-pili">直播云 SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-dora">智能多媒体服务 SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-qvm">云服务器 QVM SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sla-sms">云短信 SLA</Link>
          </li>
          <li>
            <Link className={style.link} href="/sdk-agreement">短视频 SDK 服务协议</Link>
          </li>
        </ul>
        {children}
      </div>
      <div className={style.right}></div>
    </div>
  )
}
