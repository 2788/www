import React, { ReactNode } from 'react'

import Link from 'components/Link'

import style from './style.less'

export type AgreementName = 'user-agreement' | 'privacy-right'

export default function Wrapper({ children, active }: { children: ReactNode, active: AgreementName }) {
  return (
    <div className={style.wrapper}>
      <div className={style.left}></div>
      <div className={style.container}>
        <ul className={style.header}>
          <li className={active === 'user-agreement' && style.active || ''}>
            <Link className={style.link} href="/intl/agreements/user-agreement">服务用户协议</Link>
          </li>
          <li className={active === 'privacy-right' && style.active || ''}>
            <Link className={style.link} href="/intl/agreements/privacy-right">隐私权政策</Link>
          </li>
        </ul>
        {children}
      </div>
      <div className={style.right}></div>
    </div>
  )
}
