/**
 * @file 用户反馈输入入口组件
 * @description
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useMobile } from '../../../hooks/ua'
import Button from '../Button'
import Form from '../Form'
import style from './style.less'

export default function FeedbackEntry() {
  const isMobile = useMobile()
  const [modalVisible, setModalVisible] = useState(false)
  const toggleModal = () => setModalVisible(visible => !visible)
  const wrapperRef = useClickOutside(() => setModalVisible(false))

  if (isMobile) {
    // TODO: 移动端应该是全屏的
    return null
  }

  const modalContent = modalVisible && (
    <>
      <FormModal />
      <FreeTrialModal />
    </>
  )

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      {modalContent}
      <Button
        className={style.button}
        onClick={toggleModal}
      >TODO</Button>
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

function FreeTrialModal() {
  return (
    <div className={style.freeTrialModalWrapper}>
      <Link href="/events/free?entry=index-floatwin">
        <a className={style.freeTrialLink}>
          云产品免费体验
          <i className={style.freeTrialIcon}></i>
        </a>
      </Link>
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
