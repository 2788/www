import React from 'react'
import { observer } from 'mobx-react'
import Checkbox from 'react-icecream/lib/checkbox'
import { FieldState, FormState } from 'formstate-x'
import { bindCheckbox } from 'admin-base/common/form'

import RemindersInput, * as remindersInput from './RemindersInput'
import style from './style.m.less'

export type State = FormState<{
  enableReminder: FieldState<boolean>
  reminders: remindersInput.State
}>

export type Value = {
  enableReminder: boolean,
  reminders: remindersInput.Value
}

export function createState({ enableReminder, reminders }: Value): State {
  const enableReminderState = new FieldState(enableReminder)
  return new FormState({
    enableReminder: enableReminderState,
    reminders: remindersInput.createState(reminders)
      .disableValidationWhen(() => !enableReminderState.value)
  })
}

export function getValue(state: State): Value {
  return state.value
}

interface IProps {
  state: State
  disabled: boolean
}

export default observer(function ReminderConfig({ state, disabled }: IProps) {
  const fields = state.$

  return (
    <div className={style.container}>
      <Checkbox className={style.checkbox} disabled={disabled} {...bindCheckbox(fields.enableReminder)}>
        开启活动提醒
      </Checkbox>
      <RemindersInput state={fields.reminders} disabled={disabled} visible={fields.enableReminder.value} />
    </div>
  )
})
