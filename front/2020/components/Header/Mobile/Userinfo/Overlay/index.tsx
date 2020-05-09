import React from 'react'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'

import style from './style.less'

export default function Overlay() {
  const isMobile = useMobile()

  // TODO 登录状态
  if (isMobile) {
    return (
      <div className={style.wrapper}>
        <Button href="https://portal.qiniu.com/signup?ref=www.qiniu.com" type="primary" className={style.primaryBtn}>
          免费注册
        </Button>
        <Button
          href="https://sso.qiniu.com/?client_id=BG0o9WIbVw0QTMMF4nnnimetSKUlf5xy67pcymZMKW1otjBQePCr6DrGhYifj1gH&redirect_url=https://www.qiniu.com"
          withBorder
          className={style.whiteBtn}
        >
          登录
        </Button>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <div className={style.email}>changsheng@qiniu.com</div>
      <Button
        href="https://sso.qiniu.com/signout"
        withBorder
        className={style.whiteBtn}
      >
        退出当前账号
      </Button>
    </div>
  )
}
