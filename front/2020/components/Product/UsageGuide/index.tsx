/**
 * @file 页面底部使用引导
 * @description 在用户浏览完页面后再做一次引导
 */

import React, { ReactNode } from 'react'
import { useMp } from 'hooks/ua'
import { showMpModal } from 'components/mp/Toast'

import UIButton, { Props as UIButtonProps } from '../../UI/Button'
import style from './style.less'

export type Props = {
  title: string
  description?: string
  children: ReactNode
}

export default function UsageGuide({ title, description, children }: Props) {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.textContent}>
          <h3 className={style.title}>{title}</h3>
          <p className={style.description}>{description}</p>
        </div>
        <div className={style.opContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export type ButtonProps = UIButtonProps

export function Button(props: ButtonProps) {
  const isMp = useMp()
  const className = [
    props.className,
    style.button
  ].filter(Boolean).join(' ')

  if (isMp) {
    const { href, ...mpProps } = props
    return <UIButton {...mpProps} onClick={() => showMpModal('为更好的用户体验，请登录电脑端管理控制台操作')} className={className} />
  }

  return <UIButton {...props} className={className} />
}
