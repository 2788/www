import React, { ReactNode } from 'react'
import { useOverlay } from 'components/Overlay'

import style from './index.less'

type ModalProps = {
  title: ReactNode
}

export default function MpModal({ title }: ModalProps) {
  const { remove } = useOverlay()
  return (
    <div className={style.modal}>
      <div className={style.modalTitle}>{title}</div>
      <div className={style.modalFooter} onClick={() => remove()}>我知道了</div>
    </div>
  )
}
