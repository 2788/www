import React from 'react'

import animation from '../../animation.less'

// 内容审核
export default function ContentCensorIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg" className={animation.levitate1}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.72705 22.5859L9.23486 20.4814L31.9998 14.2744L54.9433 20.4814L55.2725 22.5859H8.72705Z" fill="#AAE9FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M55.2725 49.7373C55.2725 62.5905 44.853 73.01 31.9998 73.01C19.1466 73.01 8.72705 62.5905 8.72705 49.7373V22.5858L31.9998 16.7676L55.2725 22.5858V49.7373Z" fill="url(#paint0_linear_701_443)" />
      <g filter="url(#filter0_di_701_443)">
        <path fillRule="evenodd" clipRule="evenodd" d="M42.7277 39.8937L29.8793 52.7422L22.5654 45.4283L24.8638 43.1298L29.8797 48.1446L40.4293 37.5953L42.7277 39.8937Z" fill="#2BB3FD" />
      </g>
      <defs>
        <filter id="filter0_di_701_443" x="22.5654" y="37.5952" width="20.1624" height="16.147" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_443" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_443" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_701_443" />
        </filter>
        <linearGradient id="paint0_linear_701_443" x1="31.9998" y1="16.7676" x2="31.9998" y2="73.01" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7CDCFF" />
          <stop offset="1" stopColor="#46BEFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
