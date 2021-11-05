import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { NumberInput } from 'react-icecream-2/lib/form-x'
import { InputGroup, InputGroupItem } from 'react-icecream-2'

export type State = FieldState<number>

export function createState(defaultCount?: number): State {
  return new FieldState(defaultCount ?? 1)
}

export interface Props {
  state: State
  unit: string
  min?: number
  max?: number
  emptyValue?: number
}

export default observer(function Count({ state, unit, min = 1, max, emptyValue = 1 }: Props) {
  return (
    <InputGroup style={{ width: '100%' }}>
      <NumberInput
        state={state}
        min={min}
        max={max}
        step={1}
        emptyValue={emptyValue}
      />
      <InputGroupItem>{unit}</InputGroupItem>
    </InputGroup>
  )
})
