/**
 * @file 完整列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo, useState, useEffect } from 'react'
import Loading from 'components/UI/Loading'

import { ContentType, ContentCategory, ReleasedContent } from 'constants/pgc/content'
import { articlesCount, videosMinCount, videosMaxCount } from 'constants/pgc/content-banner'
import { listReleasedContent } from 'apis/admin/pgc/content'
import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import ResultEmpty from 'components/UI/ResultEmpty'

import { getListUrl } from '../../url'
import ArticleList from '../ArticleList'
import VideoList from '../VideoList'

import style from './style.less'

const topCount = 3

export interface Props {
  isActive: boolean
  category: ContentCategory | null
  defaultArticles?: ReleasedContent[]
  defaultHasMoreArticles?: boolean
  defaultVideos?: ReleasedContent[]
}

export default function List({ isActive, category, defaultArticles, defaultHasMoreArticles, defaultVideos }: Props) {
  const isMobile = useMobile()

  const [articles, setArticles] = useState(defaultArticles)
  const [hasMoreArticles, setHasMoreArticles] = useState(defaultHasMoreArticles ?? false)
  const [videos, setVideos] = useState(defaultVideos)
  const [isLoading, setIsLoading] = useState(defaultArticles == null || defaultVideos == null)

  const hasSidebar = false // TODO: 后续右侧加上营销活动广告侧边栏后再把这里的实现补充完整
  const displayVideos = useMemo(() => {
    if (videos == null) {
      return []
    }

    const resultVideos = videos.slice(0, hasSidebar ? videosMinCount : videosMaxCount)
    return resultVideos.length < (hasSidebar || isMobile ? videosMinCount : videosMaxCount) ? [] : resultVideos
  }, [videos, hasSidebar, isMobile])

  const topArticles = useMemo(() => (articles ?? []).slice(0, topCount), [articles])
  const bottomArticles = useMemo(() => (articles ?? []).slice(topCount), [articles])

  useEffect(() => {
    if (!isActive || !isLoading) {
      return
    }

    setIsLoading(true)
    Promise.all([
      listReleasedContent({
        type: ContentType.Article,
        category: category ?? undefined,
        limit: articlesCount
      }),
      listReleasedContent({
        type: ContentType.Video,
        category: category ?? undefined,
        limit: videosMaxCount
      })
    ])
      .then(([newArticles, newVideos]) => {
        setArticles(newArticles.data)
        setHasMoreArticles(newArticles.count > articlesCount)
        setVideos(newVideos.data)
      })
      .finally(() => { setIsLoading(false) })
  }, [isActive, isLoading, category])

  if (isLoading) {
    return (
      <Loading className={style.loading} />
    )
  }

  if (topArticles.length === 0 && displayVideos.length === 0) {
    return (
      <ResultEmpty className={style.empty} />
    )
  }

  return (
    <>
      <ArticleList contents={topArticles} className={style.topArticles} />
      <VideoList contents={displayVideos} category={category} />
      <ArticleList contents={bottomArticles} className={style.bottomArticles} />
      {hasMoreArticles && (
        <div className={style.moreArticlesLinkWrapper}>
          <Link href={getListUrl(ContentType.Article, category)}>查看全部文章</Link>
        </div>
      )}
    </>
  )
}
