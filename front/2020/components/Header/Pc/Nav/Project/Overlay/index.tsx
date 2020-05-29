import React, { useState } from 'react'
import classnames from 'classnames'
import useDelay from 'hooks/use-delay'

import Contents, { ContentType } from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<ContentType>('scene')
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
        <li className={classnames(content === 'scene' && 'active')} onMouseEnter={handleMouseEnter('scene')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>场景解决方案</div>
          <div className={style.subtitle}>Solutions by Scenario</div>
        </li>
        <li className={classnames(content === 'industry' && 'active')} onMouseEnter={handleMouseEnter('industry')} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>行业解决方案</div>
          <div className={style.subtitle}>Solutions by Industry</div>
        </li>
      </ul>
      <Contents content={content} />
    </div>
  )
}
