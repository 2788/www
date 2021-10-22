import React from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate-x'
import { NumberInput, Select, SelectOption } from 'react-icecream-2/lib/form-x'
import { InputGroup } from 'react-icecream-2'

import { DurationUnit, durationUnitDaysMap } from '../constants'

export function createState() {
  return new FormState({
    duration: new FieldState(1),
    unit: new FieldState(DurationUnit.Month)
  })
}

export type State = ReturnType<typeof createState>

export function getDays(state: State): number {
  const { duration, unit } = state.value
  return duration * durationUnitDaysMap[unit]
}

export default observer(function Duration({ state }: { state: State }) {
  return (
    <InputGroup style={{ width: '100%' }}>
      <NumberInput
        state={state.$.duration}
        min={1}
        step={1}
        emptyValue={1}
      />
      <Select state={state.$.unit}>
        <SelectOption value={DurationUnit.Month}>{DurationUnit.Month}</SelectOption>
        <SelectOption value={DurationUnit.Year}>{DurationUnit.Year}</SelectOption>
      </Select>
    </InputGroup>
  )
})
