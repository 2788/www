import React, { useContext } from 'react'
import Positioned from '../Positioned'
import Line from '../Line'
import { Context } from '..'

export default function DataCollect() {
  const { isMachine } = useContext(Context)
  if (!isMachine) return null
  return (
    <>
      <Positioned top={159} left={188}>
        <svg width="120" height="157" viewBox="0 0 120 157">
          <defs>
            <filter id="数据采集logkit-b" width="111%" height="116.7%" x="-5.5%" y="-8.4%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <g fill="none">
            <g transform="translate(0 109)">
              <rect width="120" height="48" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="32" y="19">数据采集</tspan>
                <tspan x="39.665" y="39">Logkit</tspan>
              </text>
            </g>
            <polygon fill="#C2E7FF" points="0 60.857 60 96.498 120 60.857 60 28"></polygon>
            <g transform="translate(18 32)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(18 16)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
            </g>
            <g transform="translate(18)">
              <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
              <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
              <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
              <path d="M52.4504705,25.3469056 L56.4301758,27.5 L43.0820962,35.9744749 L38.9468478,33.5 L52.4504705,25.3469056 Z M51.1645818,14.4701966 L55.1442871,16.623291 L33.0820962,29.9744749 L28.9468478,27.5 L51.1645818,14.4701966 Z M36.6730434,12.039388 L40.5153809,14.4472656 L24.0820962,23.9744749 L19.9468478,21.5 L36.6730434,12.039388 Z" fill="#319EEA"></path>
              <path d="M52.4504705,25.3469056 L56.4301758,27.5 L43.0820962,35.9744749 L38.9468478,33.5 L52.4504705,25.3469056 Z M51.1645818,14.4701966 L55.1442871,16.623291 L33.0820962,29.9744749 L28.9468478,27.5 L51.1645818,14.4701966 Z M36.6730434,12.039388 L40.5153809,14.4472656 L24.0820962,23.9744749 L19.9468478,21.5 L36.6730434,12.039388 Z" fill="#000" filter="url(#数据采集logkit-b)"></path>
            </g>
          </g>
        </svg>
      </Positioned>
      <Positioned top={220} left={135}><Line width={26} /></Positioned>
    </>
  )
}
