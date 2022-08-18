/**
 * @file 产品 / 解决方案
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import Link from 'components/Link'

import ArrowRightIcon from './arrow-right.svg'
import style from './item.less'

export interface Props {
  name: string
  desc: string
  icon: string
  url: string
}

export default function Item(props: Props) {
  return (
    <Link href={props.url} className={style.link}>
      <img className={style.icon} src={props.icon} alt="icon" />
      <div className={style.main}>
        <div className={style.title}>{props.name}</div>
        <div className={style.desc}>{props.desc}</div>
      </div>
      <ArrowRightIcon className={style.arrow} />
    </Link>
  )
}
