import { FieldState } from 'formstate-x'
import { RangePickerProps } from 'antd/lib/date-picker/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Moment } from 'moment'

export type BindRangePickerResult = Pick<RangePickerProps, 'value' | 'onChange'>

export function bindRangePicker(startState: FieldState<Moment>, endState: FieldState<Moment>): BindRangePickerResult {
  return {
    // eslint-disable-next-line no-underscore-dangle
    value: [startState._value, endState._value],
    onChange: dates => {
      const moments = dates as [Moment, Moment]
      startState.onChange(moments[0])
      endState.onChange(moments[1])
    }
  }
}

export function bindCheckboxGroup(state: FieldState<CheckboxValueType[]>) {
  return {
    // eslint-disable-next-line no-underscore-dangle
    value: state._value,
    onChange: (value: CheckboxValueType[]) => state.onChange(value)
  }
}
