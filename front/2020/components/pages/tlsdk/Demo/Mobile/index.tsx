import React from 'react'
import ArrowRightIcon from './arrow-right.svg'

import style from './index.less'

export default function Mobile() {
  return (
    <ul>
      <li>
        <a
          href="https://apps.apple.com/cn/app/%E4%B8%83%E7%89%9B%E7%9B%B4%E6%92%AD/id1362526971"
          target="_blank noopener"
          className={style.item}
        >
          iOS Demo 体验 <ArrowRightIcon />
        </a>
      </li>
      <li>
        <a
          href="https://sdk-release.qnsdk.com/streaming-2.4.1.apk"
          target="_blank noopener"
          className={style.item}
        >
          Android Demo 体验 <ArrowRightIcon />
        </a>
      </li>
    </ul>
  )
}
