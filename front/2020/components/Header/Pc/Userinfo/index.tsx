/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Apr 27 2020
 * @file: 登录后用户信息区域
 *
 * Copyright (c) 2020 Qiniu
 */
import React from 'react'
import classnames from 'classnames'
import Dropdown from 'components/UI/Dropdown'
import { useMobile } from 'hooks/ua'
import Overlay from './Overlay'
import ArrowDown from './arrow-down.svg'

import style from './style.less'

export default function Userinfo() {
  const isMobile = useMobile()

  if (!isMobile) {
    return (
      <span className={style.wrapper}>
        <a href="https://portal.qiniu.com/signup?ref=www.qiniu.com" className={style.signin}>登录</a>
        <a href="https://sso.qiniu.com/?client_id=BG0o9WIbVw0QTMMF4nnnimetSKUlf5xy67pcymZMKW1otjBQePCr6DrGhYifj1gH&redirect_url=https://www.qiniu.com" className={style.signup}>免费注册</a>
      </span>
    )
  }

  return (
    <span className={classnames(style.wrapper, style.haveSignin)}>
      <Dropdown align={{ offset: [-30, 18] }} overlay={() => <Overlay />}><span>123@qq.com</span></Dropdown>
      <ArrowDown className={style.arrow} />
    </span>
  )
}
