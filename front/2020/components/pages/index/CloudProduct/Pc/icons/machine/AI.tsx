import React from 'react'

import animation from '../../animation.less'

// AI
export default function AIIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_701_476)" className={animation.levitate3}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52L32 52V75.2727L1.45459 56.5091V52Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 52L32 52V75.2727L62.5454 56.5091V52Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 52L32 70.1447L62.5455 52L32 35.2727L1.45459 52Z" fill="#7CDCFF" />
      </g>
      <g clipPath="url(#clip1_701_476)" className={animation.levitate2}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 40.3638L32 40.3638V63.6365L1.45459 44.8729V40.3638Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 40.3638L32 40.3638V63.6365L62.5454 44.8729V40.3638Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 40.3637L32 58.5084L62.5455 40.3637L32 23.6365L1.45459 40.3637Z" fill="#7CDCFF" />
      </g>
      <g clipPath="url(#clip2_701_476)" className={animation.levitate1}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 28.7273L32 28.7273V52L1.45459 33.2364V28.7273Z" fill="#1DA4ED" />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.5454 28.7273L32 28.7273V52L62.5454 33.2364V28.7273Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.45459 28.7273L32 46.872L62.5455 28.7273L32 12L1.45459 28.7273Z" fill="#AAE9FF" />
        <g filter="url(#filter0_i_701_476)">
          <path fillRule="evenodd" clipRule="evenodd" d="M33.1668 22.0194C32.6532 21.7158 31.9906 21.886 31.6869 22.3997C31.3833 22.9133 31.5535 23.5759 32.0671 23.8796L41.3696 29.3791C41.8832 29.6828 42.5458 29.5125 42.8495 28.9989C43.1531 28.4852 42.9829 27.8227 42.4693 27.519L33.1668 22.0194ZM30.0247 29.3008L26.2407 28.2326L27.6966 30.9365L30.0247 29.3008ZM32.7061 30.0578L37.6767 31.4609C38.251 31.623 38.8479 31.2889 39.01 30.7146C39.1722 30.1404 38.838 29.5434 38.2638 29.3813L24.3838 25.4631C24.3329 25.4482 24.2808 25.4371 24.2281 25.4298C24.1789 25.4229 24.1298 25.4196 24.0811 25.4195C23.9077 25.4193 23.7318 25.4609 23.5684 25.5489C23.3985 25.6404 23.263 25.7708 23.167 25.9231C23.1396 25.9665 23.1151 26.0122 23.0939 26.06C23.0465 26.1663 23.0165 26.2798 23.0051 26.3959C23.0017 26.4307 23 26.4653 23 26.4998C22.9998 26.6732 23.0414 26.8491 23.1294 27.0124L28.6524 37.2692L28.7061 37.3585C29.012 37.816 29.6215 37.9745 30.116 37.7082C30.6413 37.4253 30.8379 36.7701 30.555 36.2447L28.7284 32.8525L32.7061 30.0578Z" fill="#2BB3FD" />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_701_476" x="23" y="21.8689" width="20" height="16.9688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_701_476" />
        </filter>
        <clipPath id="clip0_701_476">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 35.2727)" />
        </clipPath>
        <clipPath id="clip1_701_476">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 23.6365)" />
        </clipPath>
        <clipPath id="clip2_701_476">
          <rect width="61.0909" height="40" fill="white" transform="translate(1.45459 12)" />
        </clipPath>
      </defs>
    </svg>
  )
}
