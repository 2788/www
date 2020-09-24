import React, { ReactNode } from 'react'
import { useOverlay } from 'components/Overlay'

import style from './index.less'

interface MyModalProps {
  title: string
  clickText: ReactNode
  children: ReactNode
}

export default function MyModal({ title, clickText, children }: MyModalProps) {
  const { add, remove } = useOverlay()
  const modal = (
    <div className={style.modalContent}>
      <div className={style.modalHeader}>
        {title}
        <div className={style.closeIcon} onClick={() => remove()}></div>
      </div>
      <div className={style.modalBody}>
        {children}
      </div>
    </div>
  )
  return (
    <>
      <div className={style.clickDiv} onClick={() => add(modal)}>
        {clickText}
      </div>
    </>
  )
}
