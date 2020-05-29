import React, { useState } from 'react'
import classnames from 'classnames'
import Contents, { ContentType } from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<ContentType>('scene')

  return (
    <div className={style.overlay}>
      <ul className={style.menus}>
        <li className={classnames(content === 'scene' && 'active')} onMouseEnter={() => setContent('scene')}>
          <div className={style.title}>场景解决方案</div>
          <div className={style.subtitle}>Solutions by Scenario</div>
        </li>
        <li className={classnames(content === 'industry' && 'active')} onMouseEnter={() => setContent('industry')}>
          <div className={style.title}>行业解决方案</div>
          <div className={style.subtitle}>Solutions by Industry</div>
        </li>
      </ul>
      <Contents content={content} />
    </div>
  )
}
