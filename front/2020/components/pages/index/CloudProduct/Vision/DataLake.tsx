import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import { Node } from '..'
import style from '../index.less'
import Line from '../Line'
import DataLakeIcon from '../icons/media/DataLake'

export default function DataLake() {
  return (
    <>
      <Positioned top={458} left={523}><Line width={27} /></Positioned>
      <Positioned identity={Node.Kodo} top={350} left={575} zIndex={1}>
        <svg width="160" height="207" viewBox="0 0 160 207">
          <DataLakeIcon />
          <Link className={style.link} href="/products/kodo">
            <g transform="translate(20 175)">
              <rect width="120" height="32" fill="#E0F7FF"></rect>
              <text fill="#34A1EC">
                <tspan x="25" y="21">异构数据湖</tspan>
              </text>
            </g>
          </Link>
        </svg>
      </Positioned>
    </>
  )
}
