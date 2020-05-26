import React, { useState } from 'react'
import classnames from 'classnames'
import Contents, { ContentType } from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<ContentType>('storage')

  return (
    <div className={style.overlay}>
      <ul className={style.menus}>
        <li className={classnames(content === 'storage' && 'active')} onMouseEnter={() => setContent('storage')}>
          <div className={style.title}>存储与数据湖</div>
          <div className={style.subtitle}>Storage and Data</div>
        </li>
        <li className={classnames(content === 'service' && 'active')} onMouseEnter={() => setContent('service')}>
          <div className={style.title}>基础服务</div>
          <div className={style.subtitle}>Basic Services</div>
        </li>
        <li className={classnames(content === 'video' && 'active')} onMouseEnter={() => setContent('video')}>
          <div className={style.title}>智能视频</div>
          <div className={style.subtitle}>Smart Video</div>
        </li>
        <li className={classnames(content === 'intelligence' && 'active')} onMouseEnter={() => setContent('intelligence')}>
          <div className={style.title}>机器数据智能</div>
          <div className={style.subtitle}>Machine Data Intelligence</div>
        </li>
      </ul>
      <Contents content={content} />
    </div>
  )
}
