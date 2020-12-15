/**
 * @file 弹出框 UI 组件，不用 icecream modal 是因为它会导致 modal 内容无法获取到父节点提供的 context
 * @description 自带 mask，TODO: 跟 Overlay 实现合并下，貌似 Overlay 可以基于这个实现
 */

import cls from 'classnames'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import style from './style.less'

export type Props = PropsWithChildren<{
  className?: string
  modalClassName?: string
  visible: boolean
  onMaskClick: () => void
}>

export default function Modal({ className, modalClassName, visible, onMaskClick, children }: Props) {
  const [wrapper, setWrapper] = useState<HTMLDivElement | undefined>()

  useEffect(() => {
    const body = window.document.body
    const wrapperNode = document.createElement('div')
    body.appendChild(wrapperNode)
    setWrapper(wrapperNode)
    return () => {
      body.removeChild(wrapperNode)
    }
  }, [])

  if (wrapper == null) {
    return null
  }

  return createPortal(
    <div className={cls(style.wrapper, !visible && style.hidden, className)}>
      <div className={style.mask} onClick={onMaskClick}></div>
      <div className={cls(style.modal, modalClassName)}>{children}</div>
    </div>,
    wrapper
  )
}
