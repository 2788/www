import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { NumberInput } from 'react-icecream-2/lib/form-x'
import { InputGroup, InputGroupItem } from 'react-icecream-2'

export type State = FieldState<number>

export function createState(): State {
  return new FieldState(1)
}

export default observer(function Count({ state, unit }: { state: State, unit: string }) {
  return (
    <InputGroup style={{ width: '100%' }}>
      <NumberInput
        state={state}
        min={1}
        step={1}
        emptyValue={1}
      />
      <InputGroupItem>{unit}</InputGroupItem>
    </InputGroup>
  )
})
