import React, { useState } from 'react'
import classnames from 'classnames'
import { Category, categories, categoryNameMap, categoryEnNameMap } from 'constants/products'
import useDelay from 'hooks/use-delay'

import Contents from './Contents'
import style from './index.less'

export default function Overlay() {
  const [content, setContent] = useState<Category>(Category.Storage)
  const delayObj = useDelay(50)

  function handleMouseEnter(_content: Category) {
    return () => {
      delayObj.start(() => setContent(_content))
    }
  }

  function handleMouseLeave() {
    delayObj.stop()
  }

  const itemsView = categories.map(category => (
    <li
      key={category}
      className={classnames(content === category && 'active')}
      onMouseEnter={handleMouseEnter(category)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.title}>{categoryNameMap[category]}</div>
      <div className={style.subtitle}>{categoryEnNameMap[category]}</div>
    </li>
  ))

  return (
    <div className={style.overlay}>
      <ul className={style.menus}>
        {itemsView}
      </ul>
      <Contents content={content} />
    </div>
  )
}
