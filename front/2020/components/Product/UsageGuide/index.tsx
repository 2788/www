/**
 * @file 页面底部使用引导
 * @description 在用户浏览完页面后再做一次引导
 */

import React, { ReactNode } from 'react'
import { useMp } from 'hooks/ua'

import UIButton, { Props as UIButtonProps } from '../../UI/Button'
import style from './style.less'

export type Props = {
  title: string
  description?: string
  children: ReactNode
}

export default function UsageGuide({ title, description, children }: Props) {
  if (useMp()) {
    return null
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.textContent}>
          <h3 className={style.title}>{title}</h3>
          {description && <p className={style.description}>{description}</p>}
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
  const className = [
    props.className,
    style.button
  ].filter(Boolean).join(' ')

  return <UIButton type="primary" {...props} className={className} />
}
