import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { bindFormItem, bindInputWithTarget } from 'admin-base/common/utils/form'
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

export default observer(function AnswerInput({ state }: Props) {
  return (
    <Form.Item label="回答" {...bindFormItem(state)}>
      <Input.TextArea
        style={{ maxWidth: 'none', marginTop: '4px' }}
        autosize={{ minRows: 4, maxRows: 8 }}
        {...bindTextArea(state)}
      />
    </Form.Item>
  )
})

function bindTextArea(state: FieldState<string>) {
  return bindInputWithTarget(state)
}
