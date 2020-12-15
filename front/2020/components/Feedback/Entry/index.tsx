/**
 * @file 用户反馈输入入口组件
 * @description
 */

import cls from 'classnames'
import { debounce } from 'lodash'
import React, { useState, ReactNode, PropsWithChildren, useMemo, useCallback } from 'react'
import { useHoverHandlers } from 'hooks/hover'
import { useMobile } from 'hooks/ua'
import { useClickOutside } from 'hooks/click'
import Link from 'components/Link'
import IconTextEntry from 'components/IconTextEntry'
import { useModal } from '../Modal'
import IconContact from '../icons/contact.svg'
import IconPhone from '../icons/phone.svg'
import IconEarphone from '../icons/earphone.svg'
import style from './style.less'

/** 用户反馈入口 */
export default function FeedbackEntry() {
  const isMobile = useMobile()
  return (
    isMobile
    ? <FeedbackEntryMobile />
    : <FeedbackEntryPc />
  )
}

function FeedbackEntryPc() {
  const [contactPanelVisible, setPanelVisible] = useState<boolean | null>(null)

  const handleHover = useMemo(() => debounce(setPanelVisible, 100), [])

  const contactPanelView = contactPanelVisible != null && (
    <ContactPanel visible={contactPanelVisible} onHover={handleHover} />
  )

  return (
    <div className={style.wrapper}>
      <div className={style.entryWrapper}>
        <IconTextEntry
          icon={<IconContact />}
          onHover={handleHover}
        >
          联系<br />我们
        </IconTextEntry>
      </div>
      {contactPanelView}
    </div>
  )
}

type ContactPanelProps = {
  visible: boolean
  onHover?: (hovered: boolean) => void
}

function ContactPanel({ visible, onHover }: ContactPanelProps) {
  const { showModal } = useModal()
  const hoverHandlers = useHoverHandlers(onHover)
  return (
    <div className={cls(style.contactPanelWrapper, !visible && style.hidden)} {...hoverHandlers}>
      <ContactItem title="电话咨询" icon={<IconPhone />} href="/contact">
        <p>售前：<span className={style.number}>400-808-9176 转 1</span></p>
        <p>售后：<span className={style.number}>400-808-9176 转 2</span></p>
      </ContactItem>
      <ContactItem title="智能客服" icon={<IconEarphone />} onClick={showModal}>
        智能客服 24 小时在线，为你解决问题
      </ContactItem>
    </div>
  )
}

type ContactItemProps = PropsWithChildren<{
  title: string
  icon: ReactNode
  href?: string
  onClick?: () => void
}>

function ContactItem({ icon, title, href, onClick, children }: ContactItemProps) {
  const content = (
    <>
      <div className={style.iconWrapper}>{icon}</div>
      <h5 className={style.title}>{title}</h5>
      <div className={style.content}>{children}</div>
    </>
  )
  if (href == null) {
    return <div className={style.contactItem} onClick={onClick}>{content}</div>
  }
  return (
    <Link className={style.contactItem} href={href} onClick={onClick}>
      {content}
    </Link>
  )
}

function FeedbackEntryMobile() {
  const [contactPanelVisible, setPanelVisible] = useState<boolean | null>(null)

  const handleEntryClick = useCallback(() => {
    setPanelVisible(visible => !visible)
  }, [])

  const handleClickOutside = useCallback(() => {
    setPanelVisible(false)
  }, [])

  const wrapperRef = useClickOutside(handleClickOutside)

  const contactPanelView = contactPanelVisible != null && (
    <ContactPanel visible={contactPanelVisible} />
  )

  return (
    <div className={style.mobileWrapper} ref={wrapperRef}>
      <div className={style.mobileEntryWrapper}>
        <div className={style.iconBtn} onClick={handleEntryClick}>
          <IconContact />
        </div>
      </div>
      {contactPanelView}
    </div>
  )
}
