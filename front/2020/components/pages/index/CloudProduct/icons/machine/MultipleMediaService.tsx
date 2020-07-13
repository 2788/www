import React from 'react'

import animation from '../../animation.less'

// 智能多媒体服务
export default function MultipleMediaServiceIcon() {
  return (
    <svg>
      <defs>
        <filter id="智能视频服务-d" width="110.8%" height="118.2%" x="-5.4%" y="-9.1%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
          <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
          <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
      <g transform="translate(12 16)">
        <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
        <g className={animation.levitate3}>
          <g transform="translate(18 32)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate2}>
          <g transform="translate(18 16)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate1}>
          <g transform="translate(18)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
            <path d="M42.9935373,24 L51.5002218,29 L43.4089605,33.9222276 L34.4868528,28.9611138 L42.9935373,24 Z M52.5066845,18 L61.013369,23 L52.7832144,27.9222276 L44,22.9611138 L52.5066845,18 Z M32.5066845,18 L41.013369,23 L32.9221078,27.9222276 L24,22.9611138 L32.5066845,18 Z M42.5066845,12 L51.013369,17 L42.5066845,21.9016631 L34,16.9611138 L42.5066845,12 Z" fill="#319EEA"></path>
            <path d="M42.9935373,24 L51.5002218,29 L43.4089605,33.9222276 L34.4868528,28.9611138 L42.9935373,24 Z M52.5066845,18 L61.013369,23 L52.7832144,27.9222276 L44,22.9611138 L52.5066845,18 Z M32.5066845,18 L41.013369,23 L32.9221078,27.9222276 L24,22.9611138 L32.5066845,18 Z M42.5066845,12 L51.013369,17 L42.5066845,21.9016631 L34,16.9611138 L42.5066845,12 Z" fill="#000" filter="url(#智能视频服务-d)"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
