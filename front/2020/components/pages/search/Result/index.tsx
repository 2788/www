/**
 * @file 搜索页的结果部分
 */

import React from 'react'
import { SearchResultItem, SearchResult as SearchResultData } from 'apis/search'
import Pagination from 'components/UI/Pagination'
import ResultEmpty from 'components/ResultEmpty'
import { useMobile } from 'hooks/ua'
import style from './style.less'

export const pageSize = 10

export type Props = {
  /** 搜索结果 */
  result: SearchResultData | null
  /** 页码，从 0 开始 */
  page: number
  /** 页码变更回调 */
  onPageChange(page: number): void
  /** 是否正在加载 */
  loading: boolean // TODO: 处理 loading
}

export default function SearchResult({ result, page, onPageChange }: Props) {
  if (!result || result.items.length <= 0) {
    return <ResultEmpty className={style.empty} tip="暂无搜索结果" />
  }

  return (
    <div className={style.wrapper}>
      <ResultList items={result.items} />
      <div className={style.paginationLine}>
        <Pagination
          className={style.pagination}
          current={page + 1}
          onChange={p => onPageChange(p - 1)}
          total={result.total}
        />
      </div>
    </div>
  )
}

export type ResultListProps = {
  items: SearchResultItem[]
}

export function ResultList({ items }: ResultListProps) {
  const itemsView = items.map(
    (item, i) => <ResultItem key={i} {...item} />
  )
  return (
    <ul className={style.resultList}>
      {itemsView}
    </ul>
  )
}

export function ResultItem({ title, matched, url }: SearchResultItem) {

  const content = matched[0] // TODO: 不应该只用第一个
  const contentView = (
    // eslint-disable-next-line react/no-danger
    <p className={style.itemContent} dangerouslySetInnerHTML={{ __html: content }}></p>
  )

  const isMobile = useMobile()

  // 在移动端整个块都可点击跳转
  if (isMobile) {
    return (
      <li className={style.resultItem}>
        <a href={url}>
          <h5 className={style.itemTitle}>{title}</h5>
          {contentView}
          <p className={style.itemLinkLine}>来源：{url}</p>
        </a>
      </li>
    )
  }

  return (
    <li className={style.resultItem}>
      <h5 className={style.itemTitle}>
        <a href={url}>{title}</a>
      </h5>
      {contentView}
      <p className={style.itemLinkLine}>
        来源：<a href={url}>{url}</a>
      </p>
    </li>
  )
}