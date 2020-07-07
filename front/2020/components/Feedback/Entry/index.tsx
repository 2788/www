/**
 * @file 用户反馈输入入口组件
 * @description
 */

import cls from 'classnames'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'components/Link'
import { useMobile } from 'hooks/ua'
import { track } from 'utils/sensors'
import Button from '../Button'
import Form from '../Form'
import { useModal as useGlobalModal } from '../Modal'
import IconClose from '../icons/close.svg'
import IconSmile from '../icons/smile.svg'
import style from './style.less'

export default function FeedbackEntry() {
  const isMobile = useMobile()
  const [modalVisible, setModalVisible] = useState<boolean | null>(null)
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

  useEffect(() => {
    if (modalVisible) {
      track('ClickFeedback', {
        // 这里先跟老官网值保持一致
        // TODO: 这里的值需要重新设计（考虑现在咨询分成调起窗口 & 开始咨询两个过程）
        feedback_intention: '服务咨询'
      })
    }
  }, [modalVisible])

  const wrapperRef = useClickOutside(hideModal)

  const btnClassName = cls(
    style.btn,
    modalVisible ? style.btnClose : style.btnSmile
  )

  const formModalView = modalVisible != null && !isMobile && (
    <FormModal visible={modalVisible} />
  )

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      <div className={style.entryWrapper}>
        <Button className={btnClassName} onClick={toggleModal}>
          <IconClose className={style.iconClose} />
          <IconSmile className={style.iconSmile} />
        </Button>
        <Link className={style.freeTrialLink} title="免费体验云服务套餐" href="/events/free?entry=index-floatwin">
          免费<br />体验
        </Link>
      </div>
      {formModalView}
    </div>
  )
}

function FormModal({ visible }: { visible: boolean }) {
  return (
    <div className={cls(style.formModalWrapper, !visible && style.hidden)}>
      <Form active />
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
