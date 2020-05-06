import React from 'react'
import Storage from './Storage'
import Service from './Service'
import Video from './Video'

import style from './index.less'

export type ContentType = 'storage' | 'service' | 'video'

const contentMap: { [key in ContentType]: React.FC } = {
  storage: Storage,
  service: Service,
  video: Video
}

export default function Content({ content }: { content: ContentType }) {
  return (
    <ul className={style.content}>
      {React.createElement(contentMap[content])}
    </ul>
  )
}
