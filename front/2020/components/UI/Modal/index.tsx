/**
 * @file 弹出框 UI 组件，不用 icecream modal 是因为它会导致 modal 内容无法获取到父节点提供的 context
 * @description 自带 mask，TODO: 跟 Overlay 实现合并下，貌似 Overlay 可以基于这个实现
 */

import cls from 'classnames'
import React, { PropsWithChildren, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import CloseIcon from './close.svg'
import style from './style.less'

export type BaseModalProps = PropsWithChildren<{
  className?: string
  modalClassName?: string
  visible: boolean
  /** 移动端效果，full：全屏、slideUp：底部上滑（默认 full） */
  mobileMode?: 'full' | 'slideUp'
  onCancel: () => void
}>

export function BaseModal({ className, modalClassName, visible, mobileMode = 'full', onCancel, children }: BaseModalProps) {
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
    <div className={cls(style.wrapper, style[mobileMode], !visible && style.hidden, className)}>
      <div className={style.mask} onClick={() => { onCancel() }}></div>
      <div className={cls(style.modal, modalClassName)}>{children}</div>
    </div>,
    wrapper
  )
}

export interface ModalHeaderProps {
  title: string
  onClose(): void
  className?: string
}

export function ModalHeader(props: ModalHeaderProps) {
  return (
    <header className={cls(style.header, props.className)}>
      {props.title}
      <div className={style.closeBtn} onClick={() => { props.onClose() }}>
        <CloseIcon className={style.closeIcon} />
      </div>
    </header>
  )
}

export interface ModalWithHeaderProps extends BaseModalProps {
  header: ReactNode
}

export function ModalWithHeader({ header, children, onCancel, modalClassName, ...baseProps }: ModalWithHeaderProps) {
  return (
    <BaseModal
      {...baseProps}
      modalClassName={cls(style.modalWithHeader, modalClassName)}
      onCancel={onCancel}
    >
      {
        typeof header === 'string'
        ? (<ModalHeader title={header} onClose={onCancel} />)
        : header
      }
      <div className={style.body}>{children}</div>
    </BaseModal>
  )
}
