/**
 * @file 带头部标题、底部操作按钮的卡片
 */

import cls from 'classnames'
import React, { ReactNode, PropsWithChildren, HTMLAttributes } from 'react'
import { Card } from 'components/UI/Card'
import RawButton, { Props as RawButtonProps } from 'components/UI/Button'
import style from './style.less'

export * from './List'

export type Props = PropsWithChildren<{
  header: ReactNode
  footer: ReactNode
  className?: string
}>

export default function OperationCard({ header, footer, className, children }: Props) {

  const headerView = header && (
    <header className={style.header}>
      {header}
    </header>
  )

  const footerView = footer && (
    <footer className={style.footer}>
      {footer}
    </footer>
  )

  return (
    <Card className={cls(style.wrapper, className)}>
      {headerView}
      <div className={style.body}>
        {children}
      </div>
      {footerView}
    </Card>
  )
}

export function Title({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <h4 className={cls(style.title, className)} {...others} />
}

export function Desc({ className, ...others }: HTMLAttributes<HTMLElement>) {
  return <p className={cls(style.desc, className)} {...others} />
}

export function Button({ className, ...others }: RawButtonProps) {
  return <RawButton type="hollow" withBorder className={cls(style.button, className)} {...others} />
}
