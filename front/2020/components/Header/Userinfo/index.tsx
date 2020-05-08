/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon Apr 27 2020
 * @file: 登录后用户信息区域
 *
 * Copyright (c) 2020 Qiniu
 */
import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import Dropdown from '../../UI/Dropdown'
import { useMobile } from '../../../hooks/ua'
import Overlay from './Overlay'
import ArrowDown from './arrow-down.svg'

import style from './style.less'

export default function Userinfo() {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <span className={style.wrapper}>
        <Link href=""><a className={style.signin}>登录</a></Link>
        <Link href=""><a className={style.signup}>免费注册</a></Link>
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
