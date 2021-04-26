import * as React from 'react'
import { observer } from 'mobx-react'
import { Select } from 'react-icecream'
import { FieldState } from 'formstate-x'
import { bindSelect } from 'admin-base/common/utils/form'

export type State = FieldState<number>

export function createState(value: number): State {
  return new FieldState(value)
}

export function getValue(state: State): number {
  return state.value
}

interface IProps {
  state: State
  maxNum?: number
}

export default observer(function OrderSelect(props: IProps) {
  const max = props.maxNum || 4
  const arr = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <Select
      placeholder="请选择展示顺序"
      {...bindSelect(props.state)}
    >
      {arr.map((item, index) => (
        <Select.Option key={index} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  )
})
