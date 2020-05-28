/**
 * @file 搜索表单的下拉联想组件
 */

/* eslint-disable react/no-danger */

import React from 'react'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'
import ResultEmpty from 'components/ResultEmpty'
import { getSuggestions } from 'apis/search'
import { useApiWithParams } from 'hooks/api'
import { withLoading } from 'utils/loading'
import style from './style.less'

export type Props = {
  keyword: string
  onSelect(selected: string): void
}

export default function Suggestion({ keyword, onSelect }: Props) {
  const { $: items, loading } = useApiWithParams(
    getSuggestions,
    { params: [keyword], delay: 500 }
  )

  const itemsView = (items || []).map((item, i) => (
    <DropdownMenuItem
      key={i}
      title={item}
      className={style.suggestionItem}
      onClick={() => onSelect(item)}
    >
      <span dangerouslySetInnerHTML={{ __html: item }}></span>
    </DropdownMenuItem>
  ))

  const content = withLoading(loading)(
    !items || items.length <= 0
      ? <ResultEmpty className={style.empty} tip="暂无结果" />
      : itemsView
  )

  return (
    <DropdownMenu className={style.suggestionWrapper}>
      {content}
    </DropdownMenu>
  )
}

