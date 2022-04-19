import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react'
import { useGlobalModal } from 'hooks/scroll'
import { track } from 'utils/sensors'
import { BaseModal } from 'components/UI/Modal'
import DialogForm from '../Form'
import IconClose from '../icons/close.svg'
import style from './style.less'

type ContextValue = {
  /** 是否可见，`null` 表示不存在（初始状态，不渲染） */
  visible: boolean | null
  /** 控制是否可见 */
  setVisible(visible: boolean): void
  /** 明确的意图 */
  intention: string | null
  /** 设置意图 */
  setIntention(intent: string | null): void
}

const context = createContext<ContextValue | null>(null)

export function useModal() {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('Missing `FeedbackModalProvider`.')
  }

  const { visible, setVisible, intention, setIntention } = contextValue

  const showModal = useCallback(() => setVisible(true), [setVisible])
  const hideModal = useCallback(() => setVisible(false), [setVisible])
  const consult = useCallback((consultIntention: string | null) => {
    setIntention(consultIntention)
    showModal()
    track('ClickFeedback', {
      feedback_intention: consultIntention ?? ''
    })
  }, [setIntention, showModal])
  const startConsulting = useCallback(() => {
    consult(null)
  }, [consult])
  const startIntentConsulting = useCallback((consultIntention: string) => {
    consult(consultIntention)
  }, [consult])

  return { visible, intention, hideModal, startConsulting, startIntentConsulting }
}

export default function FeedbackModal() {
  const { visible, hideModal, intention } = useModal()

  useGlobalModal(!!visible)

  if (visible == null) {
    return null
  }

  return (
    <BaseModal visible={visible} onCancel={hideModal} className={style.wrapper} modalClassName={style.modal}>
      <div title="关闭" className={style.closeBtn} onClick={hideModal}>
        <IconClose />
      </div>
      <DialogForm active={visible} intention={intention ?? undefined} />
    </BaseModal>
  )
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean | null>(null)
  const [intention, setIntention] = useState<string | null>(null)
  return (
    <context.Provider value={{ visible, setVisible, intention, setIntention }}>
      {children}
    </context.Provider>
  )
}
