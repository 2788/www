import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { bindFormItem, bindSwitch } from 'admin-base/common/utils/form'
import Switch from 'react-icecream/lib/switch'
import Form from 'react-icecream/lib/form'

export type State = FieldState<boolean>

export type Value = boolean

export function createState(value: Value = false): State {
  return new FieldState(value)
}

export function getValue(state: State): Value {
  return state.value
}

export type Props = {
  state: State
}

export default observer(function IsDescInput({ state }: Props) {
  return (
    <Form.Item label="是否默认描述" {...bindFormItem(state)}>
      <Switch {...bindSwitch(state)} />
    </Form.Item>
  )
})
