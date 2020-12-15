import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { bindFormItem, bindTextInput } from 'admin-base/common/utils/form'
import Input from 'react-icecream/lib/input'
import Form from 'react-icecream/lib/form'

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
