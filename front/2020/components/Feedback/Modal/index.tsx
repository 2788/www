import cls from 'classnames'
import React, { createContext, useState, ReactNode, useContext } from 'react'
import Button from '../Button'
import Form from '../Form'
import IconClose from '../icons/close.svg'
import style from './style.less'

type ContextValue = {
  /** 是否可见，`null` 表示不存在（初始状态，不渲染） */
  visible: boolean | null
  setVisible(visible: boolean): void
}

const context = createContext<ContextValue | null>(null)

export function useModal() {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('Missing `FeedbackModalProvider`.')
  }

  const { visible, setVisible } = contextValue
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const toggleModal = () => setVisible(!visible)

  return { showModal, hideModal, visible, toggleModal }
}

export default function FeedbackModal() {
  const { visible, hideModal } = useModal()

  if (visible == null) {
    return null
  }

  return (
    <div className={cls(style.wrapper, !visible && style.hidden)}>
      <div
        className={style.mask}
        onClick={hideModal}
      ></div>
      <div className={style.modal}>
        <Button title="关闭" className={style.closeBtn} onClick={hideModal}>
          <IconClose className={style.closeIcon} />
        </Button>
        <Form wide />
      </div>
    </div>
  )
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean | null>(null)
  return (
    <context.Provider value={{ visible, setVisible }}>
      {children}
    </context.Provider>
  )
}
