import React from 'react'

import animation from '../../animation.less'

// 内容审核
export default function ContentCensorIcon() {
  return (
    <svg>
      <defs>
        <linearGradient id="智能视频服务-i" x1="50%" x2="50%" y1="0%" y2="97.606%">
          <stop offset="0%" stopColor="#98D5FF"></stop>
          <stop offset="100%" stopColor="#34A1EC"></stop>
        </linearGradient>
        <filter id="智能视频服务-k" width="128.1%" height="116%" x="-14.1%" y="-8%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
          <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
          <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
      <g transform="translate(184 12)">
        <polygon fill="#C2E7FF" points="0 64.857 60 100.499 120 64.857 60 32"></polygon>
        <g className={animation.levitate1}>
          <g transform="translate(28)">
            <polygon fill="#C1E6FF" points="0 11.556 .698 8.662 32 .127 63.547 8.662 64 11.556"></polygon>
            <path fill="url(#智能视频服务-i)" d="M64,48.8888889 C64,66.5620009 49.673112,80.8888889 32,80.8888889 C14.326888,80.8888889 0,66.5620009 0,48.8888889 L0,11.5555556 L32,3.55555556 L64,11.5555556 L64,48.8888889 Z"></path>
            <g transform="rotate(45 32.889 39.159)">
              <polygon points="40 26.667 40 51.651 25.778 51.651 25.778 47.182 35.53 47.18 35.531 26.667" fill="#2C99E4"></polygon>
              <polygon points="40 26.667 40 51.651 25.778 51.651 25.778 47.182 35.53 47.18 35.531 26.667" fill="#000" filter="url(#智能视频服务-k)"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
