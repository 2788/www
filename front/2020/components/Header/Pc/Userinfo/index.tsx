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
import Button from 'components/UI/Button'
import { useUserInfo } from 'components/UserInfo'
import Overlay from './Overlay'
import ArrowDown from './arrow-down.svg'

import style from './style.less'

export default function Userinfo() {
  const user = useUserInfo()
  const portalUrl = 'https://portal.qiniu.com'

  if (user?.signedIn) {
    return (
      <>
        <Dropdown align={{ points: ['bc', 'tc'], offset: [0, 0] }} overlay={() => <Overlay />}>
          <span className={classnames(style.wrapper, style.haveSignin)}>
            {user.name || user.email}
            <ArrowDown className={style.arrow} />
          </span>
        </Dropdown>
        <Button type="primary" size="small" href={portalUrl}>进入控制台</Button>
      </>
    )
  }

  return (
    <>
      <span className={style.wrapper}>
        <a href="https://portal.qiniu.com/signup?ref=www.qiniu.com" className={style.signup}>免费注册</a>
      </span>
      <Button type="primary" size="small" href={portalUrl}>登录控制台</Button>
    </>
  )
}
