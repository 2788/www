/**
 * @file 标签
 * @description 在 icecream 自带的标签基础上稍微调整下样式，比如原 tag 左右 padding 有点奇怪，在内部放 icon 的时候看上去不太对
 */

import React from 'react'
import cns from 'classnames'
import IcecreamTag, { TagProps } from 'react-icecream-1/lib/tag'

import style from './style.m.less'

export type Props = TagProps

export default function Tag(props: Props) {
  return <IcecreamTag {...props} className={cns(props.className, style.tag)} />
}
