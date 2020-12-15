import React, { createContext, useState, ReactNode, useContext } from 'react'
import { useGlobalModal } from 'hooks/scroll'
import { track } from 'utils/sensors'
import UIModal from 'components/UI/Modal'
import DialogForm from '../Form'
import IconClose from '../icons/close.svg'
import style from './style.less'

type ContextValue = {
  /** 是否可见，`null` 表示不存在（初始状态，不渲染） */
  visible: boolean | null
  /** 控制是否可见 */
  setVisible(visible: boolean): void
  /** 帮助用户自动发出的信息 */
  userMessage: string | null
  /** 帮助用户自动发送信息 */
  setUserMessage(message: string | null): void
}

const context = createContext<ContextValue | null>(null)

export function useModal() {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('Missing `FeedbackModalProvider`.')
  }

  const { visible, setVisible, userMessage } = contextValue
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const toggleModal = () => setVisible(!visible)
  const startConsulting = () => {
    showModal()
    track('ClickFeedback', {
      // 这边按照设计预期不同地方调起的咨询发送不同的 intention 值
      // 不过老官网几乎没有配置（只有个别位置添加了 intention 值）
      // 所以这里先无脑不传吧，后边考虑清楚再说
      feedback_intention: ''
    })
  }

  return { visible, showModal, hideModal, toggleModal, userMessage, startConsulting }
}

export default function FeedbackModal() {
  const { visible, hideModal, userMessage } = useModal()

  useGlobalModal(!!visible)

  if (visible == null) {
    return null
  }

  const startWith = userMessage != null ? userMessage : undefined

  return (
    <UIModal visible={visible} onMaskClick={hideModal} className={style.wrapper} modalClassName={style.modal}>
      <div title="关闭" className={style.closeBtn} onClick={hideModal}>
        <IconClose />
      </div>
      <DialogForm active={visible} startWith={startWith} />
    </UIModal>
  )
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean | null>(null)
  const [userMessage, setUserMessage] = useState<string | null>(null)
  return (
    <context.Provider value={{ visible, setVisible, userMessage, setUserMessage }}>
      {children}
    </context.Provider>
  )
}
