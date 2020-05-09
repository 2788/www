import React from 'react'
import Industry from './Industry'
import Scene from './Scene'
import style from './index.less'

export type ContentType = 'industry' | 'scene'

const contentMap: { [key in ContentType]: React.FC } = {
  industry: Industry,
  scene: Scene
}

export default function Content({ content }: { content: ContentType }) {
  return (
    <ul className={style.content}>
      {React.createElement(contentMap[content])}
    </ul>
  )
}
