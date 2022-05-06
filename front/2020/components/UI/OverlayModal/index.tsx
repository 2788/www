/**
 * @deprecated use `components/UI/Modal` instead
 */

import React, { HTMLAttributes } from 'react'
import classnames from 'classnames'
import { useOverlay } from 'components/Overlay'

import IconClose from './image/close.svg'
import style from './index.less'

type Props = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: string
}

/** @deprecated use `components/UI/Modal` instead */
export default function OverlayModal(props: Props) {
  const { remove } = useOverlay()
  const modalClassName = classnames(style.modalContent, props.className)

  return (
    <div className={modalClassName}>
      <div className={style.modalHeader}>
        {props.title}
        <div className={style.closeBtn} onClick={() => remove()}>
          <IconClose className={style.closeIcon} />
        </div>
      </div>
      <div className={style.modalBody}>
        {props.children}
      </div>
    </div>
  )
}
