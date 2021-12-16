import React from 'react'

import animation from '../../animation.less'

export default function SDKIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_731_4177)" className={animation.levitate3}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52.7273L32 52.7273V76L1.45459 57.2364V52.7273Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 52.7273L32 52.7273V76L62.5454 57.2364V52.7273Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52.7273L32 70.872L62.5455 52.7273L32 36L1.45459 52.7273Z" fill="#79DCFF" />
      </g>
      <g clipPath="url(#clip1_731_4177)" className={animation.levitate2}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 41.0911L32 41.0911V64.3638L1.45459 45.6002V41.0911Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 41.0911L32 41.0911V64.3638L62.5454 45.6002V41.0911Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 41.091L32 59.2357L62.5455 41.091L32 24.3638L1.45459 41.091Z" fill="#79DCFF" />
      </g>
      <g clipPath="url(#clip2_731_4177)" className={animation.levitate1}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 29.4546L32 29.4546V52.7273L1.45459 33.9637V29.4546Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 29.4546L32 29.4546V52.7273L62.5454 33.9637V29.4546Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 29.4546L32 47.5993L62.5455 29.4546L32 12.7273L1.45459 29.4546Z" fill="#AAE9FF" />
        <g filter="url(#filter0_i_731_4177)">
          <path fillRule="evenodd" clipRule="evenodd" d="M39.6623 27.616L42.9092 29.5543L30.5049 37.4546L18.9092 30.3972L31.7778 22.9091L34.4821 24.5235L36.2639 22.1819L42.9093 26.1518L39.6623 27.616Z" fill="#07BEFF" />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_731_4177" x="18.9092" y="22.1819" width="24" height="16.2727" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_731_4177" />
        </filter>
        <clipPath id="clip0_731_4177">
          <rect width="61.091" height="40" fill="white" transform="translate(1.45459 36)" />
        </clipPath>
        <clipPath id="clip1_731_4177">
          <rect width="61.091" height="40" fill="white" transform="translate(1.45459 24.3638)" />
        </clipPath>
        <clipPath id="clip2_731_4177">
          <rect width="61.091" height="40" fill="white" transform="translate(1.45459 12.7273)" />
        </clipPath>
      </defs>
    </svg>
  )
}
