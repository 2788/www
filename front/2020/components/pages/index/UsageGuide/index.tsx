/**
 * @file 首页页面底部使用引导
 * @description 在用户浏览完页面后再做一次引导
 */

import React from 'react'
import { useMp } from 'hooks/ua'
import { useSignupUrl } from 'hooks/url'
import Button from 'components/UI/Button'

import style from './style.less'

export default function UsageGuide() {
  const signupUrl = useSignupUrl()

  if (useMp()) {
    return null
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>立即注册，即可免费试用 30+ 产品</h3>
      <Button type="primary" className={style.btn} href={signupUrl}>免费试用</Button>
    </div>
  )
}
