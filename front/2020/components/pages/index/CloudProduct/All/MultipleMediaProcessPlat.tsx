import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'

export default function MultipleMediaProcessPlat() {
  return (
    <>
      <Positioned identity={Node.MultiMediaDataProcess} top={75} left={320} zIndex={1}>
        <svg width="144" height="141">
          <defs>
            <filter id="多媒体数据处理平台-b" width="115.4%" height="125.4%" x="-7.7%" y="-12.7%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <g fill="none">
            <g transform="translate(0 109)">
              <rect width="144" height="32" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="9" y="21">多媒体数据处理平台</tspan>
              </text>
            </g>
            <polygon fill="#C2E7FF" points="14 60.857 74 96.498 134 60.857 74 28"></polygon>
            <g transform="translate(32 32)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(32 16)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(32)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
              <polygon points="26 20.579 45.95 33.73 52 18" fill="#319EEA"></polygon>
              <polygon points="26 20.579 45.95 33.73 52 18" fill="#000" filter="url(#多媒体数据处理平台-b)"></polygon>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
