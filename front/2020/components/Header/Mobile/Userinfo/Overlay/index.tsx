import React from 'react'
import Button from 'components/UI/Button'
import { UserInfo } from 'components/UserInfo'
import { useUrl } from 'hooks/url'
import { urlForSignin, urlForSignout } from 'utils/route'

import style from './style.less'

export default function Overlay({ user }: { user: UserInfo | null }) {
  const currentUrl = useUrl()
  if (user?.signedIn) {
    return (
      <div className={style.wrapper}>
        <div className={style.email}>{user.name || user.email}</div>
        <Button
          type="hollow"
          target="_self"
          href={urlForSignout(currentUrl)}
          withBorder
          className={style.whiteBtn}
        >
          退出当前账号
        </Button>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <Button href="https://portal.qiniu.com/signup?ref=www.qiniu.com" type="primary" className={style.primaryBtn}>
        免费注册
      </Button>
      <Button target="_self" href={urlForSignin(currentUrl)} withBorder className={style.whiteBtn}>
        登录
      </Button>
    </div>
  )
}
