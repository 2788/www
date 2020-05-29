import React, { useState } from 'react'
import classnames from 'classnames'
import useDelay from 'hooks/use-delay'

import Contents, { ContentType } from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<ContentType>('storage')
  const delayObj = useDelay(50)

  function handleMouseEnter(_content: ContentType) {
    return () => {
      delayObj.start(() => setContent(_content))
    }
  }

  function handleMouseLeave() {
    delayObj.stop()
  }

  return (
    <div className={style.overlay}>
      <ul className={style.menus}>
        <li className={classnames(content === 'storage' && 'active')} onMouseEnter={handleMouseEnter('storage')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>存储与数据湖</div>
          <div className={style.subtitle}>Storage and Data Lake</div>
        </li>
        <li className={classnames(content === 'service' && 'active')} onMouseEnter={handleMouseEnter('service')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>基础服务</div>
          <div className={style.subtitle}>Cloud Essentials</div>
        </li>
        <li className={classnames(content === 'video' && 'active')} onMouseEnter={handleMouseEnter('video')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>智能视频</div>
          <div className={style.subtitle}>Intelligent Video Service</div>
        </li>
        <li className={classnames(content === 'intelligence' && 'active')} onMouseEnter={handleMouseEnter('intelligence')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>机器数据智能</div>
          <div className={style.subtitle}>Machine Data Intelligence</div>
        </li>
      </ul>
      <Contents content={content} />
    </div>
  )
}
