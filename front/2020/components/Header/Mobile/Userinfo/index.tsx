import React from 'react'

import { useUserInfo } from 'components/UserInfo'

import PersonIcon from './person.svg'
import Overlay from './Overlay'
import style from './style.less'
import MobileDropdown from '../MobileDropdown'

export default function Userinfo() {
  const user = useUserInfo()

  return (
    <MobileDropdown overlayClassName={style.overlay} overlay={() => <Overlay user={user} />}>
      <div className={style.wrapper}>
        <PersonIcon />
      </div>
    </MobileDropdown>
  )
}
