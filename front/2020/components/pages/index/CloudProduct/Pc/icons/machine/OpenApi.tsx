import React from 'react'

import animation from '../../animation.less'

// 开发 API
export default function OpenApiIcon() {
  return (
    <svg>
      <defs>
        <filter id="智能视频服务-f" width="109.1%" height="115.2%" x="-4.6%" y="-7.6%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
          <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
          <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
      <g transform="translate(528 16)">
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
            <path d="M42.6112279,10 L54.115838,16.7433523 L51.461,18.34 L63.7892887,25.5064313 L46.3231665,36.3750476 C38.7824219,31.6547726 34.5978933,28.9822309 33.7695807,28.3574227 L31.2579297,29.8693524 L20,22.9267699 L26.6112279,19 L38.115838,25.7433523 L35.631,27.237 L46.332,34.013 L59.91,25.564 L49.486,19.528 L47.2579297,20.8693524 L36,13.9267699 L42.6112279,10 Z" fill="#2793DF"></path>
            <path d="M42.6112279,10 L54.115838,16.7433523 L51.461,18.34 L63.7892887,25.5064313 L46.3231665,36.3750476 C38.7824219,31.6547726 34.5978933,28.9822309 33.7695807,28.3574227 L31.2579297,29.8693524 L20,22.9267699 L26.6112279,19 L38.115838,25.7433523 L35.631,27.237 L46.332,34.013 L59.91,25.564 L49.486,19.528 L47.2579297,20.8693524 L36,13.9267699 L42.6112279,10 Z" fill="#000" filter="url(#智能视频服务-f)"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
