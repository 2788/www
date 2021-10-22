import React from 'react'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { RadioGroup, Radio } from 'react-icecream-2/lib/form-x'

import { BillingType, billingTypeTextMap } from '../constants'

export type State = FieldState<BillingType>

export function createState(): State {
  return new FieldState(BillingType.Bandwidth)
}

export default observer(function BillingTypeSelect({ state }: { state: State }) {
  return (
    <RadioGroup state={state} radioType="button">
      <Radio value={BillingType.Bandwidth}>{billingTypeTextMap[BillingType.Bandwidth]}</Radio>
      <Radio value={BillingType.Traffic}>{billingTypeTextMap[BillingType.Traffic]}</Radio>
    </RadioGroup>
  )
})
