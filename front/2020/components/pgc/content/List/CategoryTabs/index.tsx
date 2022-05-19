/**
 * @file 类别选择
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'

import { useMobile } from 'hooks/ua'
import { ContentType, ContentCategory, contentCategories, contentCategoryTextMap } from 'constants/pgc/content'
import Tabs, { Tab } from 'components/UI/Tabs'
import Link from 'components/Link'

import { getListUrl } from '../../url'

import style from './style.less'

export interface Props {
  type: ContentType
  category: ContentCategory | null
}

export default function CategoryTabs({ type, category }: Props) {
  const selectedCategoryValue = category ?? 'all'
  const isMobile = useMobile()
  return (
    <Tabs
      theme={isMobile ? 'thin-grey' : 'thin-primary-light'}
      size={isMobile ? 'mini' : 'default'}
      value={selectedCategoryValue}
      className={style.tabs}
    >
      {(['all', ...contentCategories] as const).map(contentCategory => {
        const className = classNames(selectedCategoryValue === contentCategory && style.active)
        return (
          <Tab
            key={contentCategory}
            value={contentCategory}
            className={style.tab}
          >
            {
              contentCategory === 'all'
              ? (
                <Link href={getListUrl(type, null)} className={className}>
                  全部
                </Link>
              )
              : (
                <Link href={getListUrl(type, contentCategory)} className={className}>
                  {contentCategoryTextMap[contentCategory]}
                </Link>
              )
            }
          </Tab>
        )
      })}
    </Tabs>
  )
}
