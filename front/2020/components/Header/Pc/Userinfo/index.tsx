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
import { useApiWithParams } from 'hooks/api'
import { useUrl } from 'hooks/url'
import { urlForSignin } from 'utils/route'
import { getUserInfo } from 'apis/legacy'
import Overlay from './Overlay'
import ArrowDown from './arrow-down.svg'

import style from './style.less'

export default function Userinfo() {
  const currentUrl = useUrl()
  const { $: user } = useApiWithParams(getUserInfo, { params: [] })

  if (user?.is_signin) {
    return (
      <span className={classnames(style.wrapper, style.haveSignin)}>
        <Dropdown align={{ offset: [-30, 0] }} overlay={() => <Overlay />}><span>{user.email}</span></Dropdown>
        <ArrowDown className={style.arrow} />
      </span>
    )
  }

  return (
    <span className={style.wrapper}>
      <a href={urlForSignin(currentUrl)} className={style.signin}>登录</a>
      <a href="https://portal.qiniu.com/signup?ref=www.qiniu.com" className={style.signup}>免费注册</a>
    </span>
  )
}
