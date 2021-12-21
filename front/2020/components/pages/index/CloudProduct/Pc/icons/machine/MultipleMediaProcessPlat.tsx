import React from 'react'

import animation from '../../animation.less'

export default function MultipleMediaProcessPlatIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_731_4149)" className={animation.levitate3}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52L32 52V75.2727L1.45459 56.5091V52Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 52L32 52V75.2727L62.5454 56.5091V52Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52L32 70.1447L62.5455 52L32 35.2727L1.45459 52Z" fill="#7CDCFF" />
      </g>
      <g clipPath="url(#clip1_731_4149)" className={animation.levitate2}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 40.3638L32 40.3638V63.6365L1.45459 44.8729V40.3638Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 40.3638L32 40.3638V63.6365L62.5454 44.8729V40.3638Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 40.3637L32 58.5084L62.5455 40.3637L32 23.6365L1.45459 40.3637Z" fill="#7CDCFF" />
      </g>
      <g clipPath="url(#clip2_731_4149)" className={animation.levitate1}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 28.7273L32 28.7273V52L1.45459 33.2364V28.7273Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 28.7273L32 28.7273V52L62.5454 33.2364V28.7273Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 28.7273L32 46.872L62.5455 28.7273L32 12L1.45459 28.7273Z" fill="#AAE9FF" />
        <g filter="url(#filter0_i_731_4149)">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.3638 26.9664L34.8732 36.5307L39.2729 25.0908L20.3638 26.9664Z" fill="#2BB3FD" />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_731_4149" x="20.3638" y="25.0908" width="18.9092" height="12.4399" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_731_4149" />
        </filter>
        <clipPath id="clip0_731_4149">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 35.2727)" />
        </clipPath>
        <clipPath id="clip1_731_4149">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 23.6365)" />
        </clipPath>
        <clipPath id="clip2_731_4149">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 12)" />
        </clipPath>
      </defs>
    </svg>
  )
}
