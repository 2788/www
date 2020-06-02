import React from 'react'
import { Category } from 'constants/products'
import Storage from './Storage'
import Service from './Service'
import Video from './Video'
import Intelligence from './Intelligence'

import style from './index.less'

const contentMap = {
  [Category.Storage]: Storage,
  [Category.Service]: Service,
  [Category.Video]: Video,
  [Category.Intelligence]: Intelligence
}

export default function Content({ content }: { content: Category }) {
  return (
    <ul className={style.content}>
      {React.createElement(contentMap[content])}
    </ul>
  )
}
