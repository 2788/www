import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import { Node } from '..'
import Line from '../Line'
import style from '../index.less'
import DataCollectIcon from '../icons/machine/DataCollect'

import animation from '../animation.less'
import OpenAppMarketIcon from '../icons/machine/OpenAppMarket'
import MachineDataAnalysisPlatIcon from '../icons/machine/MachineDataAnalysisPlat'

export default function MachineDataAnalysisPlat() {
  return (
    <>
      <Positioned top={220} left={323}><Line width={26} /></Positioned>
      <Positioned identity={Node.MachineDataAnalysisPlatDetail} top={17} left={378} animationArea={false}>
        <svg width="534" height="444" viewBox="0 0 534 444">
          <defs>
            <filter id="机器数据模块-c" width="111%" height="116.7%" x="-5.5%" y="-8.4%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
            <filter id="机器数据模块-e" width="111%" height="116.7%" x="-5.5%" y="-8.4%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
            <filter id="机器数据模块-g" width="109.8%" height="117.4%" x="-4.9%" y="-8.7%" filterUnits="objectBoundingBox">
              <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
              <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
              <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
            </filter>
            <mask id="机器数据模块-h" width="534" height="444" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox">
              <rect width="534" height="444" x="0" y="0"></rect>
            </mask>
          </defs>
          <g fill="none">
            <g className={animation.area}>
              <g transform="translate(12 251)">
                <rect width="132" height="48" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="38.5" y="20">数据解析 </tspan>
                  <tspan x="11.263" y="40">Schema on Read </tspan>
                </text>
              </g>
              <g transform="translate(18 132)">
                <DataCollectIcon />
              </g>
            </g>
            <g className={animation.area}>
              <g transform="translate(201 251)">
                <rect width="132" height="48" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="38.5" y="19">数据分析 </tspan>
                  <tspan x="53.466" y="39">SPL</tspan>
                </text>
              </g>
              <g transform="translate(207 132)">
                <DataCollectIcon />
              </g>
            </g>
            <g transform="translate(390 133)">
              <rect width="132" height="48" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="31" y="29">数据可视化</tspan>
              </text>
            </g>
            <g transform="translate(390 192)">
              <rect width="132" height="48" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="38" y="29">监控告警</tspan>
              </text>
            </g>
            <g transform="translate(390 251)">
              <rect width="132" height="48" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="45" y="29">更多…</tspan>
              </text>
            </g>
            <g className={animation.area}>
              <g transform="translate(207 23)">
                <OpenAppMarketIcon />
              </g>
              <g transform="translate(345 66)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="18" y="21">开放应用市场</tspan>
                </text>
              </g>
            </g>
            <rect width="534" height="444" x="0" y="0" stroke="#00AAE7" strokeDasharray="4 8" strokeWidth="2" mask="url(#机器数据模块-h)"></rect>
            <path fill="#00AAE7" d="M178.789476 208.402692L192.983683 215 179.189313 222.396981 179.018 216.399 153.02856 217.141983 152.028968 217.170543 151.971848 215.171359 152.97144 215.142799 178.96 214.4 178.789476 208.402692zM366.789476 208.402692L380.983683 215 367.189313 222.396981 367.018 216.399 341.02856 217.141983 340.028968 217.170543 339.971848 215.171359 340.97144 215.142799 366.96 214.4 366.789476 208.402692z" opacity=".3"></path>
            <path fill="#B2E5F7" d="M367,149 L381,156 L367,163 L367,157 L354,157 L354,275 L367,275 L367,269 L381,276 L367,283 L367,277 L352,277 L352,155 L367,155 L367,149 Z"></path>
            <polyline stroke="#AAC5FA" strokeWidth="2" points="78 320 78 307 456 307 456 320" transform="matrix(1 0 0 -1 0 627)"></polyline>
            <line x1="267" x2="267" y1="307" y2="328" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 635)"></line>
          </g>
        </svg>
      </Positioned>
      <Positioned identity={Node.MachineDataAnalysisPlat} top={345} left={572} zIndex={1}>
        <svg width="300" height="110">
          <MachineDataAnalysisPlatIcon />
          <Link className={style.link} href="/products/pandora">
            <g transform="translate(150 40)">
              <rect width="132" height="32" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="10" y="21">机器数据分析平台</tspan>
              </text>
            </g>
          </Link>
        </svg>
      </Positioned>
      <Positioned top={220} left={939}><Line width={26} /></Positioned>
    </>
  )
}
