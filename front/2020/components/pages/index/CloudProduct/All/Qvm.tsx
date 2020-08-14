import React from 'react'
import Link from 'components/Link'
import { urlMap, Product } from 'constants/products'
import style from '../index.less'

export default function Qvm() {
  return (
    <svg width="1130" height="32" viewBox="0 0 1130 32">
      <Link href={urlMap[Product.Qvm]} className={style.link}>
        <g fill="none" fillRule="evenodd">
          <rect width="1130" height="32" fill="#E0F7FF" />
          <text fill="#34A1EC">
            <tspan x="549" y="21">QVM</tspan>
          </text>
        </g>
      </Link>
    </svg>
  )
}
