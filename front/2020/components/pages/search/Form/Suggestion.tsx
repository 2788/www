/**
 * @file 搜索表单的下拉联想组件
 */

import React from 'react'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'
import { getSuggestions } from 'apis/search'
import { useApiWithParams } from 'hooks/api'
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

  if (loading) {
    // TODO: loading 样式
    return (
      <div className={style.suggestionWrapper}>
        <p className={style.loading}>loading...</p>
      </div>
    )
  }

  if (!items || items.length <= 0) {
    return null
  }

  const itemsView = items.map(item => (
    <DropdownMenuItem key={item} className={style.suggestionItem} onClick={() => onSelect(item)}>
      {item}
    </DropdownMenuItem>
  ))

  return (
    <DropdownMenu className={style.suggestionWrapper}>
      {itemsView}
    </DropdownMenu>
  )
}

