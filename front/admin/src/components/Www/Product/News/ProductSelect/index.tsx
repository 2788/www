/**
 * @file          component  ProductSelect
 * @description   所属产品选择框，默认选择第一个产品页
 * @author        renpanpan
 */

import * as React from 'react'
import { observer } from 'mobx-react'
import { Select } from 'react-icecream'
import { FieldState } from 'formstate-x'
import { useInjection } from 'qn-fe-core/di'
import { bindSelect } from 'admin-base/common/utils/form'
import NewsStore from '../store'

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value).validators(val => !val && '请选择一个产品页')
}

export function getValue(state: State): string {
  return state.value
}

interface IProps {
  state: State
}

export default observer(function ProductSelect({ state }: IProps) {
  const newsStore = useInjection(NewsStore)
  const pageList = newsStore.pageList
  // 默认取 pageList 第一个页面的 id 值
  if (!pageList.some(item => item.id === state.value) && pageList.length > 0) {
    state.set(pageList[0].id)
  }
  return (
    <Select
      placeholder="请选择关联产品页"
      {...bindSelect(state)}
    >
      {pageList.map((item, index) => (
        <Select.Option key={index} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
})
