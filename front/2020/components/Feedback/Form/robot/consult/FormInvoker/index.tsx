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
  const isMobile = useMobile()
  const { sendInput } = useRobotCtx()
  const [visible, setVisible] = useState(false)
  const showModal = useCallback(() => setVisible(true), [])
  const hideModal = useCallback(() => setVisible(false), [])

  const headerView = (
    isMobile
    ? (
      <header className={style.mobileHeader}>
        <div className={style.closeBtn} onClick={hideModal}>
          <IconArrow className={style.iconArrow} />
        </div>
        问题反馈
      </header>
    )
    : (
      <header className={style.header}>
        问题反馈
        <div className={style.closeBtn} onClick={hideModal}><IconClose /></div>
      </header>
    )
  )

  const handleSubmit = useCallback(() => {
    hideModal()
    sendInput({ type: InputType.FormSubmitted })
  }, [hideModal, sendInput])

  const modalView = (
    <Modal visible={visible} onMaskClick={hideModal} className={style.modalWrapper} modalClassName={style.modal}>
      {headerView}
      <section className={style.body}>
        <Form consult={consult} onSubmit={handleSubmit} onCancel={hideModal} />
      </section>
    </Modal>
  )

  return (
    <>
      <span className={style.invoker} onClick={showModal}>
        {children}
      </span>
      {modalView}
    </>
  )
}

