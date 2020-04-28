import React, { createContext, useState, ReactNode, useContext } from 'react'
import Button from '../Button'
import Form from '../Form'
import style from './style.less'

type ContextValue = {
  visible: boolean
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
  const { visible, hideModal, toggleModal } = useModal()

  if (!visible) {
    return null
  }

  return (
    <div className={style.wrapper}>
      <div
        className={style.mask}
        onClick={hideModal}
      ></div>
      <div className={style.modal}>
        <Form />
      </div>
      <Button
        className={style.closeBtn}
        onClick={toggleModal}
      >TODO</Button>
    </div>
  )
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  return (
    <context.Provider value={{ visible, setVisible }}>
      {children}
    </context.Provider>
  )
}
