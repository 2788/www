/**
 * @file 解决方案页“客户案例”模块
 * @description 跟产品页 logo 墙不一样的是，这里除展示 logo 外，还展示客户名称 & 简单的介绍
 */

import React, { PropsWithChildren } from 'react'
import { useModal } from 'components/Feedback'

import IconChat from './chat.svg'
import style from './style.less'

export type Props = PropsWithChildren<{}>

export default function Cases({ children }: Props) {
  return <>{children}</>
}

export type CaseProps = PropsWithChildren<{
  logo: string
  title: string
}>

export function Case({ logo, title, children }: CaseProps) {
  const { startConsulting } = useModal()
  return (
    <section className={style.case}>
      <img src={logo} alt={title} className={style.logo} />
      <h5 className={style.title}>{title}</h5>
      <div className={style.desc}>{children}</div>
      <div className={style.footer}>
        <span className={style.consultEntry} onClick={startConsulting}>
          <IconChat className={style.iconChat} />
          在线咨询
        </span>
      </div>
    </section>
  )
}
