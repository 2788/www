/**
 * @file 内容站 - 首页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'

import { useMobile } from 'hooks/ua'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { ContentCategory, contentCategories, contentCategoryTextMap, ReleasedContent } from 'constants/pgc/content'
import { Banner } from 'constants/pgc/content-banner'

import Swiper from './Swiper'
import TypeEntry from './TypeEntry'
import List from './List'

import style from './style.less'

export interface Props {
  banners: Banner[]
  articles: ReleasedContent[]
  hasMoreArticles: boolean
  videos: ReleasedContent[]
}

export default function PgcIndex({ banners, articles, hasMoreArticles, videos }: Props) {
  const isMobile = useMobile()
  const [category, setCategory] = useState<ContentCategory | null>(null)

  return (
    <div className={style.page}>
      <Swiper banners={banners} />
      <TypeEntry />
      {
        isMobile
        ? (
          <List
            isActive
            category={null}
            defaultArticles={articles}
            defaultHasMoreArticles={hasMoreArticles}
            defaultVideos={videos}
          />)
        : (
          <Tabs
            theme="thin-primary-light"
            value={category ?? 'all'}
            onChange={value => setCategory(value === 'all' ? null : value as ContentCategory)}
          >
            <TabPane key="all" value="all" tab="全部">
              <List
                isActive={category == null}
                category={null}
                defaultArticles={articles}
                defaultHasMoreArticles={hasMoreArticles}
                defaultVideos={videos}
              />
            </TabPane>
            {contentCategories.map(contentCategory => (
              <TabPane
                key={contentCategory}
                value={contentCategory}
                tab={contentCategoryTextMap[contentCategory]}
              >
                <List isActive={category === contentCategory} category={contentCategory} />
              </TabPane>
            ))}
          </Tabs>
        )
      }
    </div>
  )
}
