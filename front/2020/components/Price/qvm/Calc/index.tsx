import React from 'react'
import CalcPane from 'components/Price/Banner/CalcPane'

import style from './index.less'

export default function CdnCalc() {
  return (
    <CalcPane>
      <iframe className={style.iframe} src="https://calc.qvm-dev.online/?mode=user"></iframe>
    </CalcPane>
  )
}