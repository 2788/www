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
import { useUserInfo } from 'components/UserInfo'
import { useUrl } from 'hooks/url'
import { urlForSignin } from 'utils/route'
import Overlay from './Overlay'
import ArrowDown from './arrow-down.svg'

import style from './style.less'
import DropdownForHeader from '../Dropdown'

export default function Userinfo() {
  const currentUrl = useUrl()
  const user = useUserInfo()

  if (user?.signedIn) {
    return (
      <DropdownForHeader align={{ points: ['br', 'tr'], offset: [0, 0] }} overlay={() => <Overlay />}>
        <span className={classnames(style.wrapper, style.haveSignin)}>
          {user.name || user.email}
          <ArrowDown className={style.arrow} />
        </span>
      </DropdownForHeader>
    )
  }

  return (
    <span className={style.wrapper}>
      <a href={urlForSignin(currentUrl)} className={style.signin}>登录</a>
      <a href="https://portal.qiniu.com/signup?ref=www.qiniu.com" className={style.signup}>立即注册</a>
    </span>
  )
}
