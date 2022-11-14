/**
 * @file 移动端全局的注册入口
 * @description 固定在页面底部
 */

import React from 'react'
import Link, { Props as LinkProps } from 'components/Link'
import { useMp } from 'hooks/ua'
import { useSignupUrl } from 'hooks/url'
import { MpPage } from 'constants/mp'

import styles from './style.less'

export default function MobileRegisterEntry() {
  const isMp = useMp()
  const signupUrl = useSignupUrl()

  let linkProps: LinkProps

  if (isMp) {
    linkProps = {
      onClick(e: React.MouseEvent) {
        e.preventDefault()
        wx.miniProgram.navigateTo({ url: MpPage.Signup })
      }
    }
  } else {
    linkProps = {
      href: signupUrl
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.fixed}>
        <Link className={styles.link} {...linkProps}>注册</Link>
      </div>
    </div>
  )
}
