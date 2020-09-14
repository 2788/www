import React, { ReactNode } from 'react'
import { render } from 'react-dom'

import style from './index.less'

const modalids: HTMLElement[] = []

export function showMpModal(title: string) {
  const root = document.createElement('div')
  const container = document.body
  container.appendChild(root)

  render(<Modal container={container} title={title} />, root)

  modalids.push(root)
}

export function hideMpModal(container: HTMLElement) {
  const modalid = modalids.pop()

  if (modalid) {
    container.removeChild(modalid)
  }
}

type ModalProps = {
  container: HTMLElement
  title: ReactNode
}

function Modal({ container, title }: ModalProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.mask} onClick={() => hideMpModal(container)}></div>
      <div className={style.modal}>
        <div className={style.modalTitle}>{title}</div>
        <div className={style.modalFooter} onClick={() => hideMpModal(container)}>我知道了</div>
      </div>
    </div>
  )
}
