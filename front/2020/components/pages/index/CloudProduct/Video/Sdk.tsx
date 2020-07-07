import React from 'react'
import { Node } from '..'
import Positioned from '../Positioned'
import Line from '../Line'

export default function Sdk() {
  return (
    <>
      <Positioned top={458} left={146}><Line width={27} /></Positioned>
      <Positioned identity={Node.Sdk} top={415} left={184}>
        <svg width="144" height="285" viewBox="0 0 144 285">
          <defs>
            <mask id="全部产品-sdk-b" width="144" height="176" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox">
              <rect width="144" height="176" x="0" y="109"></rect>
            </mask>
            <filter id="全部产品-sdk-d" width="112.1%" height="119%" x="-6.1%" y="-9.5%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <g fill="none">
            <g transform="translate(12 109)">
              <rect width="120" height="32" fill="#E0F7FF"></rect>
              <text fill="#34A1EC">
                <tspan x="46" y="21">SDK</tspan>
              </text>
            </g>
            <polygon fill="#C2E7FF" points="12 60.857 72 96.498 132 60.857 72 28"></polygon>
            <g transform="translate(30 32)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(30 16)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(30)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
              <path d="M47.8625716,13 L57,18.45861 L52.535,20.472 L57,23.1370967 L39.9440854,34 L24,24.2961023 L41.6943091,14 L45.413,16.22 L47.8625716,13 Z" fill="#319EEA"></path>
              <path d="M47.8625716,13 L57,18.45861 L52.535,20.472 L57,23.1370967 L39.9440854,34 L24,24.2961023 L41.6943091,14 L45.413,16.22 L47.8625716,13 Z" fill="#000" filter="url(#全部产品-sdk-d)"></path>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
