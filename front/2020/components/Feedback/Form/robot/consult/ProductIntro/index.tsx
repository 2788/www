/**
 * @file 产品介绍信息
 */

import React from 'react'
import Text from '../Text'
import style from './style.less'

export type Props = {
  name: string
  desc: string
}

export default function ProductIntro({ name, desc }: Props) {
  return (
    <div className={style.productIntro}>
      <h5 className={style.name}>{name}</h5>
      <p className={style.desc}>
        <Text content={desc} />
      </p>
    </div>
  )
}
