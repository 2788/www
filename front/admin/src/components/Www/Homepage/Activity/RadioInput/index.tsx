import React from 'react'
import { Input, Radio } from 'react-icecream'
import { bindTextInput, bindRadioGroup } from 'admin-base/common/utils/form'
import { FieldState, FormState } from 'formstate-x'
import * as style from './style.m.less'

export const labelMap = {
  hot: '热门',
  new: 'new',
  other: '自定义'
}

export type State = FormState<{
  label: FieldState<string>
  customLabel: FieldState<string>
}>

export function createState(value: string): State {
  const labelVal = value === 'hot' || value === 'new' ? value : 'other'
  const customLabel = new FieldState(value)
  return new FormState({
    label: new FieldState(labelVal),
    customLabel
  }).validators(val => {
    if (!val.label) {
      return '请选择一个标签'
    }
    if (!val.customLabel) {
      return '选择自定义时，不能输入为空！'
    }
    return null
  })
}

export function getValue(state: State): string {
  return (
    state.$.label.value === 'other'
      ? state.$.customLabel.value
      : state.$.label.value
  )
}

interface IProps {
  state: State
}

export default function RadioInput({ state }: IProps) {
  return (
    <Radio.Group {...bindRadioGroup(state.$.label)}>
      <Radio value="hot">
        {labelMap.hot}
      </Radio>
      <Radio value="new">
        {labelMap.new}
      </Radio>
      <Radio value="other">
        {labelMap.other}
        {
          state.$.label.value === 'other' ? <Input className={style.other} {...bindTextInput(state.$.customLabel)} /> : null
        }
      </Radio>
    </Radio.Group>
  )
}
