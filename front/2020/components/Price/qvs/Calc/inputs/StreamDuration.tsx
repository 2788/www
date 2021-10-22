import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { NumberInput } from 'react-icecream-2/lib/form-x'
import { InputGroup, InputGroupItem } from 'react-icecream-2'

export type State = FieldState<number>

export function createState() {
  return new FieldState<number>(12)
}

export function getSeconds(state: State): number {
  const hours = state.value
  return hours * 3600
}

export default observer(function StreamDuration({ state }: { state: State }) {
  return (
    <InputGroup style={{ width: '100%' }}>
      <NumberInput
        state={state}
        digits={1}
        min={0.1}
        emptyValue={12}
      />
      <InputGroupItem>小时/天</InputGroupItem>
    </InputGroup>
  )
})
