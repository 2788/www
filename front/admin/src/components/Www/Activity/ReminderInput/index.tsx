import React from 'react'
import { observer } from 'mobx-react'
import { Checkbox, InputNumber } from 'react-icecream'
import { FieldState, FormState } from 'formstate-x'
import { bindCheckbox, bindInputNumber } from 'admin-base/common/utils/form'
import * as style from './style.m.less'

export type State = FormState<{
  enableReminder: FieldState<boolean>
  reminderTime: FieldState<number>
}>

export type ReminderType = {
  enableReminder: boolean,
  reminderTime: number
}

export function createState({ enableReminder, reminderTime }: ReminderType): State {
  return new FormState({
    enableReminder: new FieldState(enableReminder),
    reminderTime: new FieldState(reminderTime)
  }).validators(val => {
    if (val.enableReminder && val.reminderTime <= 0) {
      return '请输入正整数'
    }
    return null
  })
}

export function getValue(state: State): ReminderType {
  return state.value
}

interface IProps {
  state: State
  disabled: boolean
}

export default observer(function Reminder({ state, disabled }: IProps) {
  return (
    <div className={style.container}>
      <Checkbox {...bindCheckbox(state.$.enableReminder)} disabled={disabled}>开启活动提醒</Checkbox>
      {
        state.$.enableReminder.value && (
          <>
            <InputNumber {...bindInputNumber(state.$.reminderTime)} disabled={disabled} />
            <p>分钟前提醒</p>
          </>
        )
      }
    </div>
  )
})
