import React from 'react'
import CalcPane from 'components/Price/Tabs/CalcPane'

import style from './index.less'

export default function CdnCalc() {
  return (
    <CalcPane>
      <iframe className={style.iframe} src="https://calc-qvm.qiniu.com/?mode=user"></iframe>
    </CalcPane>
  )
}
