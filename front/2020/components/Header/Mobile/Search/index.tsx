import React from 'react'

import SearchIcon from './search.svg'
import Overlay from './Overlay'
import style from './style.less'
import MobileDropdown from '../MobileDropdown'

export default function Search() {
  return (
    <MobileDropdown overlayClassName={style.overlay} overlay={Overlay}>
      <div className={style.wrapper}>
        <SearchIcon />
      </div>
    </MobileDropdown>
  )
}
