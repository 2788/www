/**
 * @file 内容站 - 列表页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'

import { useMobile } from 'hooks/ua'
import { ContentType, ContentCategory, ReleasedContent } from 'constants/pgc/content'
import { listReleasedContent } from 'apis/admin/pgc/content'
import ResultEmpty from 'components/UI/ResultEmpty'

import Breadcrumb from './Breadcrumb'
import TypeNav from './TypeNav'
import CategoryTabs from './CategoryTabs'
import LoadMore from './LoadMore'
import ArticleList from './ArticleList'
import VideoList from './VideoList'
import FileList from './FileList'

import style from './style.less'

export function getPageSize(type: ContentType, isMobile: boolean) {
  return {
    [ContentType.Article]: isMobile ? 6 : 8,
    [ContentType.Video]: isMobile ? 7 : 12,
    [ContentType.File]: isMobile ? 6 : 10
  }[type]
}

interface FirstScreenContent { // 首屏
  contents: ReleasedContent[]
  total: number
}

export interface Props {
  type: ContentType
  category: ContentCategory | null
  firstScreenContent: FirstScreenContent
}

export default function List(props: Props) {
  const { type, category, firstScreenContent } = props

  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = getPageSize(type, isMobile)
  const [contents, setContents] = useState(firstScreenContent.contents.slice(0, pageSize))
  const [hasMore, setHasMore] = useState(firstScreenContent.total > pageSize)

  async function loadMore() {
    // FIXME: 如果一个页面能在 mobile 与否之间反复横跳，这里就可能会出 bug…
    const offset = currentPage * pageSize

    setIsLoading(true)
    const { data, count } = await listReleasedContent({
      type,
      category: category ?? undefined,
      limit: pageSize,
      offset
    }).finally(() => {
      setIsLoading(false)
    })

    setCurrentPage(currentPage + 1)
    setContents([...contents, ...data])
    if (offset + data.length >= count) {
      setHasMore(false)
    }
  }

  const listView = {
    [ContentType.Article]: (<ArticleList contents={contents} />),
    [ContentType.Video]: (<VideoList contents={contents} />),
    [ContentType.File]: (<FileList contents={contents} />)
  }[type]

  return (
    <div className={style.wrapper}>
      <Breadcrumb type={type} />
      <div className={style.content}>
        <TypeNav type={type} category={category} />
        <div className={style.main}>
          <CategoryTabs type={type} category={category} />
          {
            contents.length
            ? (
              <>
                {listView}
                <LoadMore
                  loading={isLoading}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                />
              </>
            )
            : (
              <ResultEmpty className={style.empty} tip="暂无内容" />
            )
          }
        </div>
      </div>
    </div>
  )
}
