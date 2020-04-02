/**
 * @file component NeedSigninModal
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import Modal from 'react-icecream/lib/modal'
import Button from 'react-icecream/lib/button'
import Icon from 'react-icecream/lib/icon'

import { portalHost, ssoHost } from 'constants/host'

import * as styles from './style.m.less'

export interface IProps {
  code: string // activity code
  is_show: boolean
  control_show_func: (isShow: boolean) => void
}

export default observer(function NeedSigninModal(props: IProps) {
  const { code, is_show, control_show_func } = props
  const { location: { origin, pathname } } = window

  const header: JSX.Element = (
    <div className={styles.header}>
      <Icon type="exclamation-circle" />&nbsp;&nbsp;提示
    </div>
  )

  const footer: JSX.Element[] = [
    <Button.Link
      className={styles.footerBtn}
      key="signup"
      href={`${portalHost}/signup?promotion=${code}`}
      type="default">
      注册
    </Button.Link>,
    <Button.Link
      className={styles.footerBtn}
      key="signin"
      href={`${ssoHost}?redirect_url=${encodeURIComponent(origin + pathname)}`}
      type="primary">
      登录
    </Button.Link>
  ]

  // TODO: 样式
  return (
    <Modal
      title={header}
      visible={is_show}
      onCancel={() => {
        control_show_func(false)
      }}
      onOk={() => {
        control_show_func(false)
      }}
      footer={footer}
      maskClosable={true}
      className={styles.modal}>
      <p className={styles.content}>
        您还未登录，请先注册或登录七牛云账号哦！
      </p>
    </Modal>
  )
})
