import React, { ReactNode } from 'react'
import { render } from 'react-dom'

import style from './index.less'

const modalids: HTMLElement[] = []

export function showModal(container: HTMLElement, builder: () => JSX.Element) {
  const root = document.createElement('div')
  container.appendChild(root)

  render(<Modal container={container}>{builder()}</Modal>, root)

  modalids.push(root)
}

export function removeModal(container: HTMLElement) {
  const modalid = modalids.pop()

  if (modalid) {
    container.removeChild(modalid)
  }
}

type ModalProps = {
  container: HTMLElement
  children: ReactNode
}

function Modal({ container, children }: ModalProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.mask} onClick={() => removeModal(container)}></div>
      <div className={style.modal}>
        {children}
      </div>
    </div>
  )
}
