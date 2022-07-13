/**
 * @file 微信咨询，带图片、文字和诱导点击的波纹
 * @description 一般用于 PC 端，固定在页面右下角
 */

import React, { PropsWithChildren } from 'react'
import cls from 'classnames'

import { useHoverHandlers } from 'hooks/hover'

import wechatEntry from './images/wechat.jpg'

import style from './style.less'

export type Props = PropsWithChildren<{
  onHover?: (hovered: boolean) => void
}>

export default function WechatEntry({
  onHover
}: Props) {
  const hoverHandlers = useHoverHandlers(onHover)

  return (
    <div className={style.wrapper} {...hoverHandlers}>
      <div className={style.imgWrapper}>
        <div className={style.waveWrapper}>
          <div className={cls(style.wave, style.waving_1)} />
        </div>

        <div className={style.waveWrapper}>
          <div className={cls(style.wave, style.waving_2)} />
        </div>

        <div className={style.waveWrapper}>
          <img src={wechatEntry} alt="微信咨询" />
        </div>
      </div>

      <span>微信咨询</span>
    </div>
  )
}
