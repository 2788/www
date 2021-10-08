/**
 * @file 点击调起咨询表单的组件
 */

import React, { PropsWithChildren, useState, useCallback } from 'react'

import Modal from 'components/UI/Modal'
import { useMobile } from 'hooks/ua'
import Form from '../Form'
import { useMustContext as useRobotCtx } from '../../utils'
import IconClose from '../../../../icons/close.svg'
import IconArrow from '../../../../icons/arrow.svg'
import style from './style.less'
import { InputType } from '../..'

export type Props = PropsWithChildren<{
  consult: string
}>

export default function FormInvoker({ consult, children }: Props) {
  const [visible, setVisible] = useState(false)
  const showModal = useCallback(() => setVisible(true), [])
  const hideModal = useCallback(() => setVisible(false), [])

  return (
    <>
      <span className={style.invoker} onClick={showModal}>
        {children}
      </span>
      <FormModal consult={consult} visible={visible} onClose={hideModal} />
    </>
  )
}

export interface FormModalProps {
  consult: string
  visible: boolean
  onClose: () => void
}

export function FormModal({ visible, consult, onClose }: FormModalProps) {
  const isMobile = useMobile()
  const { sendInput } = useRobotCtx()

  const headerView = (
    isMobile
    ? (
      <header className={style.mobileHeader}>
        <div className={style.closeBtn} onClick={onClose}>
          <IconArrow className={style.iconArrow} />
        </div>
        问题反馈
      </header>
    )
    : (
      <header className={style.header}>
        问题反馈
        <div className={style.closeBtn} onClick={onClose}><IconClose /></div>
      </header>
    )
  )

  const handleSubmit = useCallback(() => {
    onClose()
    sendInput({ type: InputType.FormSubmitted })
  }, [onClose, sendInput])

  return (
    <Modal visible={visible} onMaskClick={onClose} className={style.modalWrapper} modalClassName={style.modal}>
      {headerView}
      <section className={style.body}>
        <Form consult={consult} onSubmit={handleSubmit} onCancel={onClose} />
      </section>
    </Modal>
  )
}
