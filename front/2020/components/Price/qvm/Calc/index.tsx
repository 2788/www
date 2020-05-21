import React from 'react'
import CalcPane from 'components/Price/Banner/CalcPane'

export default function CdnCalc() {
  return (
    <CalcPane>
      <iframe src="https://calc.qvm-dev.online/?mode=user"></iframe>
    </CalcPane>
  )
}
