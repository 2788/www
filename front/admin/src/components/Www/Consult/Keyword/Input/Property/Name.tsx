import React from 'react'
import { Input, Form } from 'react-icecream-1'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x-v2'

import { bindFormItem, bindTextInput } from 'utils/bind'

export type State = FieldState<string>

export type Value = string

export function createState(value: Value = ''): State {
  return new FieldState(value).validators(
    v => !v.trim() && '不可为空'
  )
}

export function getValue(state: State): Value {
  return state.value.trim()
}

export type Props = {
  state: State
}

export default observer(function NameInput({ state }: Props) {
  return (
    <Form.Item label="名称" {...bindFormItem(state)}>
      <Input placeholder="" {...bindTextInput(state)} />
    </Form.Item>
  )
})
