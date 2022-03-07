import React from 'react'
import { observer } from 'mobx-react'
import moment, { Moment } from 'moment'
import { FormState, ValueOf, FieldState } from 'formstate-x'
import DatePicker from 'react-icecream/lib/date-picker'

import { bindRangePicker } from 'utils/bind'

export type State = FormState<{
  effectTime: FieldState<Moment>
  invalidTime: FieldState<Moment>
}>

export type Value = ValueOf<State>

export function createState({ effectTime, invalidTime }: Value): State {
  return new FormState({
    effectTime: new FieldState(effectTime),
    invalidTime: new FieldState(invalidTime)
  })
}

export function getValue(state: State): Value {
  return state.value
}

interface IProps {
  state: State
}

export default observer(function RangeTime({ state }: IProps) {
  return (
    <DatePicker.RangePicker
      {...bindRangePicker(state.$.effectTime, state.$.invalidTime)}
      style={{ width: '100%' }}
      disabledDate={current => !!current && current < moment().startOf('day')}
      allowClear={false}
    />
  )
})
