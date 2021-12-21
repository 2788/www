import React from 'react'

import animation from '../../animation.less'

// 数据采集
export default function DataCollectIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className={animation.levitate3}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52.7271L32 52.7271V75.9998L1.45459 57.2361V52.7271Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 52.7271L32 52.7271V75.9998L62.5454 57.2361V52.7271Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52.7273L32 70.872L62.5455 52.7273L32 36L1.45459 52.7273Z" fill="#79DCFF" />
      </g>
      <g className={animation.levitate2}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 41.0908L32 41.0908V64.3635L1.45459 45.5999V41.0908Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 41.0908L32 41.0908V64.3635L62.5454 45.5999V41.0908Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 41.091L32 59.2357L62.5455 41.091L32 24.3638L1.45459 41.091Z" fill="#79DCFF" />
      </g>
      <g className={animation.levitate1}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 29.4541L32 29.4541V52.7268L1.45459 33.9632V29.4541Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 29.4541L32 29.4541V52.7268L62.5454 33.9632V29.4541Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 29.4543L32 47.599L62.5455 29.4543L32 12.7271L1.45459 29.4543Z" fill="#AAE9FF" />
        <g filter="url(#filter0_i_701_535)">
          <path fillRule="evenodd" clipRule="evenodd" d="M18 27.7421L20.947 29.5056L32.6583 22.716L29.92 21L18 27.7421ZM24.4138 32.0178L27.3608 33.7812L43.0836 24.2665L40.2474 22.7321L24.4138 32.0178ZM34.4874 38.0577L31.5404 36.2943L41.1638 30.4839L44 32.0183L34.4874 38.0577Z" fill="#07BEFF" />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_701_535" x="18" y="21" width="26" height="17.7703" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="0.712654" />
          <feGaussianBlur stdDeviation="0.712654" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_701_535" />
        </filter>
      </defs>
    </svg>

  )
}
