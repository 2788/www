import React from 'react'
import { Switch, Form } from 'react-icecream'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x-v2'

import { bindFormItem, bindSwitch } from 'utils/bind'

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
