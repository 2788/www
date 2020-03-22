/**
 * @file component NeedSigninModal
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import Modal from 'react-icecream/lib/modal'
import Button from 'react-icecream/lib/button'

import * as styles from './style.m.less'

export interface IProps {
  is_show: boolean
  control_show_func: (isShow: boolean) => void
}

export default observer(function NeedSigninModal(props: IProps) {
  const { is_show, control_show_func } = props

  // TODO: 样式
  return (
    <Modal
      title="提示"
      visible={is_show}
      onCancel={() => {
        control_show_func(false)
      }}
      footer={null}
      maskClosable={true}
      className={styles.modal}>
        <p className={styles.content}>
          您还未登录，请先&nbsp;
          <Button.Link
            href="https://portal.qiniu.com/signup"
            type="primary"
            target="_blank">注册
          </Button.Link>
          &nbsp;或&nbsp;
          <Button.Link
            href="https://sso.qiniu.com"
            type="primary"
            target="_blank">登录
          </Button.Link>
          &nbsp;七牛云账号
        </p>
    </Modal>
  )
})
