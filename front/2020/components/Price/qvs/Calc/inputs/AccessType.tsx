import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { RadioGroup, Radio } from 'react-icecream-2/lib/form-x'

import { AccessType } from '../constants'

export type State = FieldState<AccessType>

export function createState(): State {
  return new FieldState(AccessType.RTMP)
}

export default observer(function AccessTypeSelect({ state }: { state: State }) {
  return (
    <RadioGroup state={state} radioType="button">
      <Radio value={AccessType.RTMP}>{AccessType.RTMP}</Radio>
      <Radio value={AccessType.GB28181}>{AccessType.GB28181}</Radio>
    </RadioGroup>
  )
})
