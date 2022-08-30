import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

import { BaseModal } from 'components/UI/Modal'
import { useGlobalModal } from 'hooks/scroll'
import { useMobile } from 'hooks/ua'

import wechatQRCode from './images/wechat_qr_code.png'
import wechatAvatar from './images/avatar.jpg'
import IconClose from './icons/close.svg'

import style from './style.less'

type ContextValue = {
  /** 是否可见 */
  visible: boolean
  /** 控制是否可见 */
  setVisible(visible: boolean): void
}

const context = createContext<ContextValue | null>(null)

export function useWechatConsultModal() {
  const contextValue = useContext(context)
  if (!contextValue) {
    throw new Error('Missing `ModalProvider`')
  }

  const { visible, setVisible } = contextValue

  const showModal = useCallback(() => setVisible(true), [setVisible])
  const hideModal = useCallback(() => setVisible(false), [setVisible])

  return { visible, showModal, hideModal }
}

export default function WechatConsultModal() {
  const { visible, hideModal } = useWechatConsultModal()
  const isMobile = useMobile()

  useGlobalModal(visible)

  return (
    <BaseModal mobileMode="slideUp" visible={visible} onCancel={hideModal} modalClassName={style.wrapper}>
      <div className={style.content}>
        <div title="关闭" className={style.closeBtn} onClick={hideModal}>
          <IconClose />
        </div>

        <div className={style.avatar}>
          <img src={wechatAvatar} title="微信咨询" alt="微信咨询" />
        </div>

        <p>您好，我是您的专属售前顾问，我会为您提供专业的售前咨询服务！</p>

        <div className={style.qrCode}>
          <img
            src={wechatQRCode}
            title="微信咨询"
            alt="微信咨询"
          />
          {isMobile
            ? (<>
              <p>截图保存二维码，打开微信扫一扫添加，</p>
              <p>获取优惠价格，更有行业通用解决方案赠送</p>
            </>)
            : (<>
              <p>立即添加，获取优惠价格，</p>
              <p>更有行业通用解决方案赠送</p>
            </>)}
        </div>
      </div>
    </BaseModal>
  )
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean>(false)
  const contextValue = useMemo<ContextValue>(() => ({ visible, setVisible }), [visible, setVisible])
  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  )
}
