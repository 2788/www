import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import { Node } from '..'
import style from '../index.less'
import Line from '../Line'

export default function DataLake() {
  return (
    <>
      <Positioned top={458} left={523}><Line width={27} /></Positioned>
      <Positioned identity={Node.Kodo} top={360} left={575} zIndex={1}>
        <svg width="160" height="197" viewBox="0 0 160 197">
          <defs>
            <filter id="异构数据湖-b" width="103%" height="105.1%" x="-1.5%" y="-2.5%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation=".5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
          </defs>
          <g fill="none">
            <Link className={style.link} href="/products/kodo">
              <g transform="translate(20 165)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#34A1EC">
                  <tspan x="25" y="21">异构数据湖</tspan>
                </text>
              </g>
            </Link>
            <polygon fill="#C2E7FF" points="0 103.81 80 151.331 160 103.81 80 60"></polygon>
            <g transform="translate(24 52)">
              <polygon fill="#006EBB" points="0 30.667 56 30.667 56 84.667 0 50.267"></polygon>
              <polygon fill="#34A1EC" points="56 30.667 112 30.667 112 84.667 56 50.267" transform="matrix(-1 0 0 1 168 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 30.667 56 63.932 112 30.667 56 0"></polygon>
              <polygon fill="#A7DBFF" points="60.667 67.333 60.667 74.14 73.034 66 73.034 59.962"></polygon>
            </g>
            <g transform="translate(24 26)">
              <polygon fill="#006EBB" points="0 30.667 56 30.667 56 84.667 0 50.267"></polygon>
              <polygon fill="#34A1EC" points="56 30.667 112 30.667 112 84.667 56 50.267" transform="matrix(-1 0 0 1 168 0)"></polygon>
              <polygon fill="#5EBDFF" points="0 30.667 56 63.932 112 30.667 56 0"></polygon>
              <polygon fill="#A7DBFF" points="60.667 67.333 60.667 74.14 73.034 66 73.034 59.962"></polygon>
            </g>
            <g transform="translate(24)">
              <polygon fill="#006EBB" points="0 30.667 56 30.667 56 84.667 0 50.267"></polygon>
              <polygon fill="#34A1EC" points="56 30.667 112 30.667 112 84.667 56 50.267" transform="matrix(-1 0 0 1 168 0)"></polygon>
              <polygon fill="#98D5FF" points="0 30.667 56 63.932 112 30.667 56 0"></polygon>
              <polygon fill="#A7DBFF" points="60.667 67.333 60.667 74.14 73.034 66 73.034 59.962"></polygon>
              <path d="M61.7754412,41 L66.4731951,43.5817007 L54.5321466,50.478058 L50,47.8503318 L61.7754412,41 Z M52.7754412,35 L57.4731951,37.5817007 L45.5321466,44.478058 L41,41.8503318 L52.7754412,35 Z M43.7754412,30 L48.4731951,32.5817007 L36.5321466,39.478058 L32,36.8503318 L43.7754412,30 Z M85.7754412,27 L90.4731951,29.5817007 L78.5321466,36.478058 L74,33.8503318 L85.7754412,27 Z M34.7754412,25 L39.4731951,27.5817007 L27.5321466,34.478058 L23,31.8503318 L34.7754412,25 Z M76.7754412,21 L81.4731951,23.5817007 L69.5321466,30.478058 L65,27.8503318 L76.7754412,21 Z M67.7754412,16 L72.4731951,18.5817007 L60.5321466,25.478058 L56,22.8503318 L67.7754412,16 Z M58.7754412,11 L63.4731951,13.5817007 L51.5321466,20.478058 L47,17.8503318 L58.7754412,11 Z" fill="#34A1EC"></path>
              <path d="M61.7754412,41 L66.4731951,43.5817007 L54.5321466,50.478058 L50,47.8503318 L61.7754412,41 Z M52.7754412,35 L57.4731951,37.5817007 L45.5321466,44.478058 L41,41.8503318 L52.7754412,35 Z M43.7754412,30 L48.4731951,32.5817007 L36.5321466,39.478058 L32,36.8503318 L43.7754412,30 Z M85.7754412,27 L90.4731951,29.5817007 L78.5321466,36.478058 L74,33.8503318 L85.7754412,27 Z M34.7754412,25 L39.4731951,27.5817007 L27.5321466,34.478058 L23,31.8503318 L34.7754412,25 Z M76.7754412,21 L81.4731951,23.5817007 L69.5321466,30.478058 L65,27.8503318 L76.7754412,21 Z M67.7754412,16 L72.4731951,18.5817007 L60.5321466,25.478058 L56,22.8503318 L67.7754412,16 Z M58.7754412,11 L63.4731951,13.5817007 L51.5321466,20.478058 L47,17.8503318 L58.7754412,11 Z" fill="#000" filter="url(#异构数据湖-b)"></path>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
