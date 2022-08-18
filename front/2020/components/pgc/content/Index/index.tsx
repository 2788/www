/**
 * @file 内容站 - 首页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'

import { useMobile } from 'hooks/ua'
import { PgcHomePageActivity, AdvertInfo } from 'apis/thallo'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { ContentCategory, contentCategories, contentCategoryTextMap, ReleasedContent } from 'constants/pgc/content'
import { Banner } from 'constants/pgc/content-banner'

import Swiper from './Swiper'
import TypeEntry from './TypeEntry'
import List from './List'
import Activities from './Activities'

import style from './style.less'

export interface Props {
  banners: Banner[]
  articles: ReleasedContent[]
  hasMoreArticles: boolean
  videos: ReleasedContent[]
  activities: Array<AdvertInfo<PgcHomePageActivity>>
}

export default function PgcIndex({ banners, articles, hasMoreArticles, videos, activities }: Props) {
  const isMobile = useMobile()
  const hasSidebar = activities.length > 0 && !isMobile
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
            hasSidebar={hasSidebar}
            defaultArticles={articles}
            defaultHasMoreArticles={hasMoreArticles}
            defaultVideos={videos}
          />)
        : (
          <div className={style.main}>
            <Tabs
              theme="thin-primary-light"
              value={category ?? 'all'}
              onChange={value => setCategory(value === 'all' ? null : value as ContentCategory)}
              className={style.tabs}
            >
              <TabPane key="all" value="all" tab="全部">
                <List
                  isActive={category == null}
                  category={null}
                  hasSidebar={hasSidebar}
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
                  <List
                    isActive={category === contentCategory}
                    category={contentCategory}
                    hasSidebar={hasSidebar}
                  />
                </TabPane>
              ))}
            </Tabs>
            {hasSidebar && (<Activities activities={activities} />)}
          </div>
        )
      }
    </div>
  )
}
