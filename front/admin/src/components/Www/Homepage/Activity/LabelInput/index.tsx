import React from 'react'
import { observer } from 'mobx-react'
import { Input, Radio } from 'react-icecream'
import { FieldState, FormState } from 'formstate-x'
import { bindTextInput, bindRadioGroup } from 'admin-base/common/form'

import style from './style.m.less'

export const labelMap = {
  hot: 'HOT',
  new: 'NEW',
  other: '自定义'
}

export type State = FormState<{
  label: FieldState<string>
  customLabel: FieldState<string>
}>

export function createState(value: string): State {
  let label
  let customLabel
  if (value === 'hot' || value === 'new') {
    label = new FieldState(value)
    customLabel = new FieldState('')
  } else {
    label = new FieldState('other')
    customLabel = new FieldState(value)
  }
  return new FormState({
    label,
    customLabel
  }).validators(val => {
    if (!val.label) {
      return '请选择一个标签'
    }
    if (!val.customLabel && val.label === 'other') {
      return '选择自定义时，输入不能为空'
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

export default observer(function LabelInput({ state }: IProps) {
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
})
