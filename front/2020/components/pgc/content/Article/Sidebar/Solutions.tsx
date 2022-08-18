/**
 * @file 相关解决方案
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo } from 'react'

import { Solution, nameMap, descMap, largeIconMap, urlMap } from 'constants/solutions'

import Item, { Props as ItemProps } from './Item'
import style from './solutions.less'

interface SolutionInfo extends ItemProps {
  key: string
}

function match(keyword: string): SolutionInfo | undefined {
  const tag = keyword.replace('解决方案', '').replace(/\s/g, '').toLowerCase()
  const keys = Object.keys(nameMap) as Solution[]
  for (const key of keys) {
    const name = nameMap[key]
    if (name.replace(/\s/g, '').toLowerCase() === tag) {
      const icon = largeIconMap[key]
      const url = urlMap[key]
      if (icon && url) {
        return {
          key,
          name,
          desc: descMap[key],
          icon,
          url
        }
      }
    }
  }
}

export interface Props {
  keywords: string[]
}

export default function Solutions({ keywords }: Props) {
  const solutions = useMemo(
    () => keywords.map(keyword => match(keyword)).filter(Boolean).slice(0, 3) as SolutionInfo[],
    [keywords]
  )

  if (solutions.length === 0) {
    return null
  }

  return (
    <div className={style.main}>
      <div className={style.title}>相关解决方案</div>
      <div className={style.list}>
        {solutions.map(solution => (<Item key={solution.key} {...solution} />))}
      </div>
    </div>
  )
}
