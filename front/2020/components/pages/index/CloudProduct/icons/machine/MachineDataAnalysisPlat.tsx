import React from 'react'

import animation from '../../animation.less'

export default function MachineDataAnalysisPlatIcon() {
  return (
    <svg width="144" height="106">
      <g fill="none" transform="translate(0, 10)">
        <polygon fill="#C2E7FF" points="13 60.857 73 96.498 133 60.857 73 28"></polygon>
        <g className={animation.levitate1}>
          <g transform="translate(78)">
            <polygon fill="#006EBB" points="0 6.571 12 11.571 12 61.714 0 54.343"></polygon>
            <polygon fill="#34A1EC" points="12 6.571 24 4.571 24 61.714 12 54.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
            <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate2}>
          <g transform="translate(62 23)">
            <polygon fill="#006EBB" points="0 6.571 12 10.571 12 47.714 0 40.343"></polygon>
            <polygon fill="#34A1EC" points="12 6.571 24 10.571 24 47.714 12 40.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
            <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate3}>
          <g transform="translate(46 47)">
            <polygon fill="#006EBB" points="0 6.571 12 6.571 12 33.714 0 26.343"></polygon>
            <polygon fill="#34A1EC" points="12 6.571 24 6.571 24 33.714 12 26.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
            <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
          </g>
        </g>
      </g>
    </svg>
  )
}
