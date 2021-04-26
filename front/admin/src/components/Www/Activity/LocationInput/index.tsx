import React from 'react'
import { observer } from 'mobx-react'
import { Input, Radio } from 'react-icecream'
import { bindTextInput, bindRadioGroup } from 'admin-base/common/utils/form'
import { FieldState, FormState } from 'formstate-x'
import * as style from './style.m.less'

export const locationMap = {
  online: '线上',
  offline: '线下'
}

export type State = FormState<{
  location: FieldState<string>
  customLocation: FieldState<string>
}>

export function createState(value: string): State {
  let location: FieldState<string>
  let customLocation: FieldState<string>
  if (value === 'online') {
    location = new FieldState(value)
    customLocation = new FieldState('')
  } else {
    location = new FieldState('offline')
    customLocation = new FieldState(value)
  }
  return new FormState({
    location,
    customLocation
  }).validators(val => {
    if (!val.location) {
      return '请选择一个标签'
    }
    if (val.customLocation === 'offline') {
      return '选择线下时，输入不能为空'
    }
    return null
  })
}

export function getValue(state: State): string {
  return (
    state.$.location.value === 'offline'
      ? state.$.customLocation.value
      : state.$.location.value
  )
}

interface IProps {
  state: State
  disabled: boolean
}

export default observer(function LocationInput({ state, disabled }: IProps) {
  return (
    <Radio.Group {...bindRadioGroup(state.$.location)} disabled={disabled}>
      <Radio value="online">
        {locationMap.online}
      </Radio>
      <Radio value="offline">
        {locationMap.offline}
        {
          state.$.location.value === 'offline' ? <Input className={style.other} {...bindTextInput(state.$.customLocation)} disabled={disabled} /> : null
        }
      </Radio>
    </Radio.Group>
  )
})
