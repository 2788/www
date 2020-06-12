/**
 * @file 搜索页的结果部分（适配手机端）
 */

import React from 'react'
import { SearchResult } from 'apis/search'
import Button from 'components/UI/Button'
import Loading from 'components/UI/Loading'
import ResultEmpty from 'components/ResultEmpty'
import { ResultList } from '.'
import style from './style.less'

export type Props = {
  /** 搜索结果 */
  result: SearchResult | null
  /** 加载更多回调 */
  onLoadMore(): void
  /** 是否正在加载 */
  loading: boolean
}

export default function SearchResultMobile({ result, onLoadMore, loading }: Props) {
  if (!result || result.items.length <= 0) {
    return <ResultEmpty className={style.empty} tip="暂无搜索结果" />
  }

  const hasMore = result.items.length < result.total

  const loadMoreView = hasMore && (
    <div className={style.paginationLine}>
      <Button className={style.loadMore} withBorder onClick={onLoadMore}>
        {loading ? '加载中...' : '加载更多'}
      </Button>
    </div>
  )

  return (
    <div className={style.wrapper}>
      <Loading loading={loading}>
        <ResultList items={result.items} />
      </Loading>
      {loadMoreView}
    </div>
  )
}
