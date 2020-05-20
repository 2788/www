/**
 * @file input-related utils
 * @author nighca <nighca@live.cn>
 */

import { ChangeEvent } from 'react'
import { FieldState, bindInput } from 'formstate-x'
import { RadioChangeEvent } from 'react-icecream/lib/radio'
import { CheckboxChangeEvent } from 'react-icecream/lib/checkbox'
import { SelectValue } from 'react-icecream/lib/select'
import { RangePickerProps, RangePickerValue } from 'react-icecream/lib/date-picker'

export interface ITarget<T> {
  value?: T
}

export interface IHasTarget<T> {
  target: ITarget<T>
}

export function bindInputWithTarget<T, E extends IHasTarget<T> = IHasTarget<T>>(state: FieldState<T>) {
  return bindInput<T, E>(state, e => e.target.value!)
}

export interface IHasCurrentTarget<T> {
  target: ITarget<T>
  currentTarget: ITarget<T>
}

export function bindInputWithCurrentTarget<
  T, E extends IHasCurrentTarget<T> = IHasCurrentTarget<T>
>(state: FieldState<T>) {
  return bindInput<T, E>(state, event => event.currentTarget.value!)
}

export function bindTextInput(state: FieldState<string>) {
  return bindInputWithCurrentTarget<string, ChangeEvent<HTMLInputElement>>(state)
}

export function bindTextArea(state: FieldState<string>) {
  return bindInputWithCurrentTarget<string, ChangeEvent<HTMLTextAreaElement>>(state)
}

export type InputNumberValue = number | string | void
export function bindInputNumber(state: FieldState<InputNumberValue>) {
  return bindInput<number>(state as any)
}

export function bindRadioGroup<T>(state: FieldState<T>) {
  return bindInputWithTarget<T, RadioChangeEvent>(state)
}

export function bindCheckbox(state: FieldState<boolean>) {
  const { value, onChange } = bindInput<boolean, CheckboxChangeEvent>(state, event => event.target.checked)
  return { checked: value, onChange }
}

export function bindSwitch(state: FieldState<boolean>) {
  const { value, onChange } = bindInput<boolean>(state)
  return { checked: value, onChange }
}

export function bindSelect<T extends SelectValue>(state: FieldState<T>) {
  return bindInput<T>(state)
}

export function bindRangePicker(state: FieldState<RangePickerValue>): Pick<RangePickerProps, 'value' | 'onChange'> {
  return bindInput(state)
}

export function bindTansfer(state: FieldState<string[]>) {
  const { value, onChange } = bindInput<string[]>(state)
  return { targetKeys: value, onChange }
}

// TODO: bind select (with other types), ...
