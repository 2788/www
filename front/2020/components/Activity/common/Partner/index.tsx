import React from 'react'

import Cases from 'components/Cases'
import juejin from './images/juejin.png'
import csdn from './images/csdn.png'
import cosChina from './images/oscchina.png'
import segmentFault from './images/segmentfault.png'

export interface Props {
}

const logoUrls = [csdn, segmentFault, juejin, cosChina]

export default function Partner(_props: Props) {
  return (
    <Cases customLogoUrls={logoUrls} />
  )
}
