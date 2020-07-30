import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import { Node } from '..'
import style from '../index.less'
import MultipleMediaProcessPlatIcon from '../icons/machine/MultipleMediaProcessPlat'
import MultipleMediaServiceIcon from '../icons/machine/MultipleMediaService'

import animation from '../animation.less'
import ContentCensorIcon from '../icons/machine/ContentCensor'
import AIIcon from '../icons/machine/AI'
import OpenApiIcon from '../icons/machine/OpenApi'

export default function MultipleMediaProcessPlat() {
  return (
    <>
      <Positioned identity={Node.MultiMediaDataProcessDetail} top={0} left={235} animationArea={false}>
        <svg width="660" height="310" viewBox="0 0 660 310">
          <defs>
            <mask id="智能视频服务-b" width="660" height="310" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox">
              <rect width="660" height="310" x="0" y="0"></rect>
            </mask>
            <filter id="智能视频服务-d" width="110.8%" height="118.2%" x="-5.4%" y="-9.1%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
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
            <filter id="智能视频服务-m" width="115.4%" height="125.4%" x="-7.7%" y="-12.7%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <g fill="none">
            <rect width="660" height="310" x="0" y="0" stroke="#00AAE7" strokeDasharray="4 8" strokeWidth="2" mask="url(#智能视频服务-b)"></rect>
            <g className={animation.area}>
              <Link className={style.link} href="/products/dora">
                <g transform="translate(12 125)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#00AAE7">
                    <tspan x="11" y="21">智能多媒体服务</tspan>
                  </text>
                </g>
              </Link>
              <MultipleMediaServiceIcon />
            </g>
            <g className={animation.area}>
              <g transform="translate(528 125)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="35" y="21">Open API</tspan>
                </text>
              </g>
              <OpenApiIcon />
            </g>

            <g className={animation.area}>
              <g transform="translate(356 125)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="54" y="21">AI</tspan>
                </text>
              </g>
              <AIIcon />
            </g>
            <g className={animation.area}>
              <Link className={style.link} href="/products/censor">
                <g transform="translate(184 125)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#00AAE7">
                    <tspan x="32" y="21">内容审核</tspan>
                  </text>
                </g>
              </Link>
              <ContentCensorIcon />
            </g>
            <polyline stroke="#AAC5FA" strokeWidth="2" points="72 183 72 163 588 163 588 183" transform="matrix(1 0 0 -1 0 346)"></polyline>
            <line x1="244" x2="244" y1="163" y2="183" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 346)"></line>
            <line x1="416" x2="416" y1="163" y2="183" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 346)"></line>
            <line x1="330.5" x2="330.5" y1="182" y2="196" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 378)"></line>
          </g>
        </svg>
      </Positioned>
      <Positioned identity={Node.MultiMediaDataProcess} top={200} left={491} zIndex={1}>
        <svg width="300" height="110">
          <MultipleMediaProcessPlatIcon />
          <g transform="translate(150 40)">
            <rect width="148" height="32" fill="#E0F7FF"></rect>
            <text fill="#00AAE7">
              <tspan x="11" y="21">多媒体数据处理平台</tspan>
            </text>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
