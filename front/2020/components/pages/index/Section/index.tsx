/**
 * @author: zhuhao
 * @file: 带标题的块，children 自动居中
 */

import React, { ReactNode, CSSProperties } from 'react'
import classnames from 'classnames'
import { useMobile } from 'hooks/ua'

import style from './index.less'

export interface IndexSectionProps {
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  grey?: boolean
  style?: CSSProperties
  className?: string
  rootClassName?: string
}

export default function Section(props: IndexSectionProps) {
  const { title, subtitle = null, children, grey, rootClassName, ...rest } = props
  const isMobile = useMobile()

  const wrapperClassName = [style.wrapper, props.className].filter(Boolean).join(' ')

  return (
    <div className={classnames(style.blockWraper, !isMobile && grey && style.grey, rootClassName)}>
      <div {...rest} className={wrapperClassName}>
        {
          (title !== '') && (
            <div className={style.intro}>
              <div className={style.title}>{title}</div>
              {subtitle ? <div className={style.subtitle}>{subtitle}</div> : null}
            </div>
          )
        }
        {children}
      </div>
    </div>
  )
}