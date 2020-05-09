import React from 'react'

import PersonIcon from './person.svg'
import Overlay from './Overlay'
import style from './style.less'
import MobileDropdown from '../MobileDropdown'

export default function Userinfo() {
  return (
    <MobileDropdown overlay={Overlay}>
      <div className={style.wrapper}>
        <PersonIcon />
      </div>
    </MobileDropdown>
  )
}
