import React, { useState } from 'react'
import classnames from 'classnames'
import useDelay from 'hooks/use-delay'
import { Category, categoryNameMap } from 'constants/solutions'

import Contents from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<Category>(Category.Scene)
  const delayObj = useDelay(50)

  function handleMouseEnter(_content: Category) {
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
        <li className={classnames(content === Category.Scene && 'active')} onMouseEnter={handleMouseEnter(Category.Scene)} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>{categoryNameMap[Category.Scene]}</div>
          <div className={style.subtitle}>Solutions by Scenario</div>
        </li>
        <li className={classnames(content === Category.Industry && 'active')} onMouseEnter={handleMouseEnter(Category.Industry)} onMouseLeave={handleMouseLeave}>
          <div className={style.title}>{categoryNameMap[Category.Industry]}</div>
          <div className={style.subtitle}>Solutions by Industry</div>
        </li>
      </ul>
      <Contents content={content} />
    </div>
  )
}
