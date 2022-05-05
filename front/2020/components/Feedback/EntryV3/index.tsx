/**
 * @file 用户反馈输入入口组件 V3
 * @description
 */

import React, { useState, ReactNode, PropsWithChildren, useMemo, useCallback } from 'react'
import cls from 'classnames'
import { debounce } from 'lodash'

import { useHoverHandlers } from 'hooks/hover'
import { useMobile } from 'hooks/ua'
import { useClickOutside } from 'hooks/click'

import Link from 'components/Link'
import IconEntry from 'components/IconEntry'

import { useModal } from '../Modal'

import IconContact from '../icons/contact_v2.svg'
import IconPhone from '../icons/phone.svg'
import IconPhoneV3 from '../icons/phone_v3.svg'
import IconWechatV3 from '../icons/wechat_v3.svg'
import IconEarphone from '../icons/earphone.svg'
import IconEarphoneV3 from '../icons/earphone_v3.svg'
import IconWechatQRCodeV3 from '../icons/wechat_qr_code_v3.png'

import style from './style.less'

/** 用户反馈入口 */
export default function FeedbackEntry() {
  const isMobile = useMobile()

  if (isMobile) {
    return <FeedbackEntryMobile />
  }

  return <FeedbackEntryPc />
}

function FeedbackEntryMobile() {
  const { startConsulting } = useModal()
  const [contactPanelVisible, setPanelVisible] = useState<boolean | null>(null)

  const handleEntryClick = useCallback(() => {
    setPanelVisible(visible => !visible)
  }, [])

  const handleClickOutside = useCallback(() => {
    setPanelVisible(false)
  }, [])

  const wrapperRef = useClickOutside(handleClickOutside)

  const contactPanelView = contactPanelVisible != null && (
    <ContactPanel visible={contactPanelVisible}>
      <ContactItem
        title="电话咨询"
        icon={<IconPhone />}
        href="/contact"
      >
        <p>售前：<span className={style.number}>400-808-9176 转 1</span></p>
        <p>售后：<span className={style.number}>400-808-9176 转 2</span></p>
      </ContactItem>

      <ContactItem
        title="智能客服"
        icon={<IconEarphone />}
        onClick={startConsulting}
      >
        <p>智能客服 24 小时在线，为你解决问题</p>
      </ContactItem>
    </ContactPanel>
  )

  return (
    <div
      className={style.mobileWrapper}
      ref={wrapperRef}
    >
      <div className={style.mobileEntryWrapper}>
        <div
          className={style.iconBtn}
          onClick={handleEntryClick}
        >
          <IconContact />
        </div>
      </div>

      {contactPanelView}
    </div>
  )
}

function FeedbackEntryPc() {
  const { startConsulting } = useModal()

  const [contactPanelVisible, setContactPanelVisible] = useState<boolean | null>(null)
  const [wechatPanelVisible, setWechatPanelVisible] = useState<boolean | null>(null)
  const [consultPanelVisible, setConsultPanelVisible] = useState<boolean | null>(null)

  const handleContactHover = useMemo(() => debounce(setContactPanelVisible, 100), [])
  const handleWechatHover = useMemo(() => debounce(setWechatPanelVisible, 100), [])
  const handleConsultHover = useMemo(() => debounce(setConsultPanelVisible, 100), [])

  const contactPanelView = (contactPanelVisible != null) && (
    <ContactPanel
      visible={contactPanelVisible}
      onHover={handleContactHover}
    >
      <ContactItem
        title="电话咨询"
        href="/contact"
      >
        <p>售前：<span className={style.number}>400-808-9176 转 1</span></p>
        <p>售后：<span className={style.number}>400-808-9176 转 2</span></p>
      </ContactItem>
    </ContactPanel>
  )
  const wechatPanelView = (wechatPanelVisible != null) && (
    <ContactPanel
      visible={wechatPanelVisible}
      onHover={handleWechatHover}
    >
      <ContactItem title="微信咨询">
        <p>扫码添加牛小七，立获专业售前服务和新人优惠券</p>

        <img
          className={style.iconWechatQRCode}
          src={IconWechatQRCodeV3}
          title="微信咨询"
          alt="微信咨询"
        />
      </ContactItem>
    </ContactPanel>
  )
  const consultPanelView = (consultPanelVisible != null) && (
    <ContactPanel
      visible={consultPanelVisible}
      onHover={handleConsultHover}
    >
      <ContactItem
        title="智能客服"
        onClick={startConsulting}
      >
        <p>智能客服 24 小时在线，为你解决问题</p>
      </ContactItem>
    </ContactPanel>
  )

  return (
    <>
      <div
        className={cls(
          style.wrapper,
          style.phoneWrapper
        )}
      >
        <div className={style.entryWrapper}>
          <IconEntry
            icon={<IconPhoneV3 />}
            onHover={handleContactHover}
          />
        </div>

        {contactPanelView}
      </div>

      <div
        className={cls(
          style.wrapper,
          style.wechatWrapper
        )}
      >
        <div className={style.entryWrapper}>
          <IconEntry
            icon={<IconWechatV3 />}
            onHover={handleWechatHover}
          />
        </div>

        {wechatPanelView}
      </div>

      <div
        className={cls(
          style.wrapper,
          style.earphoneWrapper
        )}
      >
        <div className={style.entryWrapper}>
          <IconEntry
            icon={<IconEarphoneV3 />}
            onHover={handleConsultHover}
          />
        </div>

        {consultPanelView}
      </div>
    </>
  )
}

type ContactPanelProps = PropsWithChildren<{
  visible: boolean
  onHover?: (hovered: boolean) => void
}>

export function ContactPanel({
  visible,
  onHover,
  children
}: ContactPanelProps) {
  const hoverHandlers = useHoverHandlers(onHover)

  return (
    <div
      className={cls(
        style.contactPanelWrapper,
        !visible && style.hidden
      )}
      {...hoverHandlers}
    >
      {children}
    </div>
  )
}

type ContactItemProps = PropsWithChildren<{
  title: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
}>

function ContactItem({
  title,
  icon,
  href,
  onClick,
  children
}: ContactItemProps) {
  const iconView = icon && (
    <div className={style.iconWrapper}>
      {icon}
    </div>
  )

  const content = (
    <>
      {iconView}

      <h5 className={style.title}>
        {title}
      </h5>

      <div className={style.content}>
        {children}
      </div>
    </>
  )

  if (href == null) {
    return (
      <div
        className={style.contactItem}
        onClick={onClick}
      >
        {content}
      </div>
    )
  }

  return (
    <Link
      className={style.contactItem}
      href={href}
      onClick={onClick}
    >
      {content}
    </Link>
  )
}
