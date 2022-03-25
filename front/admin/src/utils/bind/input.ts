/**
 * @file input bindings for icecream v1 & formstate-x v2
 * @author nighca <nighca@live.cn>
 */

import { ChangeEvent } from 'react'
import * as v2 from 'formstate-x-v2'
import { RadioChangeEvent } from 'react-icecream-1/lib/radio'
import { CheckboxChangeEvent } from 'react-icecream-1/lib/checkbox'
import { SelectValue } from 'react-icecream-1/lib/select'
import { RangePickerProps } from 'react-icecream-1/lib/date-picker'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Moment } from 'moment'

export interface ITarget<T> {
  value?: T
}

export interface IHasTarget<T> {
  target: ITarget<T>
}

export interface InputBindings<T, E = T> {
  value: T;
  onChange(event: E): void;
}

export function bindInputWithTarget<T, E extends IHasTarget<T> = IHasTarget<T>>(state: v2.FieldState<T>) {
  return v2.bindInput<T, E>(state, e => e.target.value!)
}

export interface IHasCurrentTarget<T> {
  target: ITarget<T>
  currentTarget: ITarget<T>
}

export function bindInputWithCurrentTarget<
  T, E extends IHasCurrentTarget<T> = IHasCurrentTarget<T>
>(state: v2.FieldState<T>) {
  return v2.bindInput<T, E>(state, event => event.currentTarget.value!)
}

export function bindTextInput(state: v2.FieldState<string>) {
  return bindInputWithCurrentTarget<string, ChangeEvent<HTMLInputElement>>(state)
}

export type InputNumberValue = number | string | void
export function bindInputNumber(state: v2.FieldState<InputNumberValue>) {
  return v2.bindInput<number>(state as any)
}

export function bindRadioGroup<T>(state: v2.FieldState<T>) {
  return bindInputWithTarget<T, RadioChangeEvent>(state)
}

export function bindCheckbox(state: v2.FieldState<boolean>) {
  const { value, onChange } = v2.bindInput<boolean, CheckboxChangeEvent>(state, event => event.target.checked)
  return { checked: value, onChange }
}

export function bindSwitch(state: v2.FieldState<boolean>) {
  const { value, onChange } = v2.bindInput<boolean>(state)
  return { checked: value, onChange }
}

export function bindSelect<T extends SelectValue>(state: v2.FieldState<T>) {
  return v2.bindInput<T>(state)
}

export type BindRangePickerResult = Pick<RangePickerProps, 'value' | 'onChange'>

export function bindRangePicker(
  startState: v2.FieldState<Moment>,
  endState: v2.FieldState<Moment>
): BindRangePickerResult {
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

export function bindCheckboxGroup(state: v2.FieldState<CheckboxValueType[]>) {
  return {
    // eslint-disable-next-line no-underscore-dangle
    value: state._value,
    onChange: (value: CheckboxValueType[]) => state.onChange(value)
  }
}
