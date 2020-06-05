import React from 'react'

import MenuIcon from './menu.svg'
import Overlay from './Overlay'
import style from './style.less'
import MobileDropdown from '../MobileDropdown'

export default function Nav() {
  return (
    <MobileDropdown overlayClassName={style.overlay} overlay={() => <Overlay />}>
      <div className={style.wrapper}>
        <MenuIcon />
      </div>
    </MobileDropdown>
  )
}
