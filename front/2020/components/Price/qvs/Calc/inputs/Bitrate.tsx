import React from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate-x'
import { NumberInput, Select, SelectOption } from 'react-icecream-2/lib/form-x'
import { InputGroup } from 'react-icecream-2'

import { BitrateUnit, bitrateUnitToBpsMap } from '../constants'

export function createState() {
  return new FormState({
    bitrate: new FieldState(1),
    unit: new FieldState(BitrateUnit.Mbps)
  })
}

export type State = ReturnType<typeof createState>

export function getBps(state: State): number {
  const { bitrate, unit } = state.value
  return bitrate * bitrateUnitToBpsMap[unit]
}

export default observer(function Bitrate({ state }: { state: State }) {
  return (
    <InputGroup style={{ width: '100%' }}>
      <NumberInput
        state={state.$.bitrate}
        min={1}
        step={1}
        emptyValue={1}
      />
      <Select state={state.$.unit}>
        <SelectOption value={BitrateUnit.Mbps}>{BitrateUnit.Mbps}</SelectOption>
        <SelectOption value={BitrateUnit.Kbps}>{BitrateUnit.Kbps}</SelectOption>
      </Select>
    </InputGroup>
  )
})
