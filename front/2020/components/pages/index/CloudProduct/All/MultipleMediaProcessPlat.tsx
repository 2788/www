import React from 'react'
import Link from 'components/Link'
import { urlMap, Landpage } from 'constants/landpage'
import Positioned from '../Positioned'
import { Node } from '..'
import MultipleMediaProcessPlatIcon from '../icons/machine/MultipleMediaProcessPlat'

import style from '../index.less'

export default function MultipleMediaProcessPlat() {
  return (
    <>
      <Positioned identity={Node.MultiMediaDataProcess} top={65} left={320} zIndex={1}>
        <svg width="144" height="151">
          <MultipleMediaProcessPlatIcon />
          <g transform="translate(0 119)">
            <Link className={style.link} href={urlMap[Landpage.Dora]}>
              <rect width="144" height="32" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="17" y="21">视觉数据分析平台</tspan>
              </text>
            </Link>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
