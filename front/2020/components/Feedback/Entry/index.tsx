/**
 * @file 用户反馈输入入口组件
 * @description
 */

import cls from 'classnames'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'components/Link'
import { useMobile } from '../../../hooks/ua'
import Button from '../Button'
import Form from '../Form'
import style from './style.less'
import { useModal as useGlobalModal } from '../Modal'

export default function FeedbackEntry() {
  const isMobile = useMobile()
  const [modalVisible, setModalVisible] = useState(false)
  const { toggleModal: toggleGlobalModal } = useGlobalModal()

  const toggleModal = useCallback(() => {
    // 移动端直接用全局的 modal
    if (isMobile) {
      toggleGlobalModal()
      return
    }
    setModalVisible(visible => !visible)
  }, [isMobile, toggleGlobalModal])

  const hideModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const wrapperRef = useClickOutside(hideModal)

  const modalContent = modalVisible && (
    <FormModal />
  )

  const btnClassName = cls(
    style.btn,
    modalVisible ? style.btnClose : style.btnSmile
  )

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      {modalContent}
      <div className={style.entryWrapper}>
        <Button className={btnClassName} onClick={toggleModal} />
        <Link className={style.freeTrialLink} title="免费体验云服务套餐" href="/events/free?entry=index-floatwin">
          免费体验
        </Link>
      </div>
    </div>
  )
}

function FormModal() {
  return (
    <div className={style.formModalWrapper}>
      <Form />
    </div>
  )
}

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      return
    }
    callback()
  }, [callback])

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [handleDocumentClick])

  return ref
}
