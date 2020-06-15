import React from 'react'

import { getUserInfo } from 'apis/legacy'
import { useApiWithParams } from 'hooks/api'

import PersonIcon from './person.svg'
import Overlay from './Overlay'
import style from './style.less'
import MobileDropdown from '../MobileDropdown'

export default function Userinfo() {
  const { $: user } = useApiWithParams(getUserInfo, { params: [] })

  return (
    <MobileDropdown overlayClassName={style.overlay} overlay={() => <Overlay user={user} />}>
      <div className={style.wrapper}>
        <PersonIcon />
      </div>
    </MobileDropdown>
  )
}
