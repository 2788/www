/**
 * @file 搜索页的页面类型（tag）的筛选 tab
 */

import React from 'react'
import { Tag } from 'apis/search'
import Tabs, { Tab } from 'components/UI/Tabs'
import style from './style.less'

export const tagOptionAll = 'all'
export type TagOption = Tag | typeof tagOptionAll
export const tagOptions: TagOption[] = [tagOptionAll, Tag.Product, Tag.Solution, Tag.Other]

export function isTagOption(str: string): str is TagOption {
  return tagOptions.indexOf(str as TagOption) >= 0
}

export function tagOption2Tag(tagOption: TagOption): Tag | null {
  return tagOption === tagOptionAll ? null : tagOption
}

const tagTextMap = {
  [tagOptionAll]: '全部',
  [Tag.Product]: '产品',
  [Tag.Solution]: '解决方案',
  [Tag.Other]: '其他'
}

export type Props = {
  /** 当前选中 tab */
  value: TagOption
  /** tab 变化回调 */
  onChange(tagOption: TagOption): void
  /** 搜索结果数量列表，顺序同 tagOptions */
  counts: number[]
}

export default function SearchTabs({ value, onChange, counts }: Props) {

  const tabsView = tagOptions.map(
    (tagOption, i) => (
      <Tab key={tagOption} value={tagOption}>
        {tagTextMap[tagOption]}
        {counts[i] != null && ` (${counts[i]})`}
      </Tab>
    )
  )

  const handleTabsChange = onChange as (value: string) => void

  return (
    <Tabs className={style.wrapper} value={value} onChange={handleTabsChange}>
      {tabsView}
    </Tabs>
  )
}
