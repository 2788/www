/**
 * @file 解决方案 客户案例
 * @author zhangzuzhou <zhangzuzhou@qiniu.com>
 */

import React from 'react'

import { useWechatConsultModal } from 'components/WechatConsultModal'

import { useMobile } from 'hooks/ua'

import IconChat from './chat.svg'
import style from './style.m.less'

interface CaseItem {
  name: string
  desc: string
  logoUrl: string
}

interface Props {
  items: CaseItem[]
}

export default function SolutionCase({ items }: Props) {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  if (!items.length) {
    return null
  }

  return (
    <div className={style.cases}>
      {items.map(({ name, desc, logoUrl }: CaseItem) => (
        <section className={style.case} key={name}>
          <div className={style.logoWrapper}>
            <img src={logoUrl} alt={name} className={style.logo} />
          </div>
          <div className={style.content}>
            <h5 className={style.title}>{name}</h5>
            <div className={style.desc}>{desc}</div>
            {!isMobile
              && (<div className={style.footer}>
                <button type="button" className={style.consultEntry} onClick={showWechatConsultModal}>
                  <IconChat className={style.iconChat} />
                  <span>在线咨询</span>
                </button>
              </div>)}
          </div>
        </section>
      ))}
    </div>
  )
}
