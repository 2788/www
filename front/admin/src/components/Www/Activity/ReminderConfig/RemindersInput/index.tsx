import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { InputNumber, Input, Icon } from 'react-icecream-1'
import { FieldState, FormState } from 'formstate-x-v2'

import { bindInputNumber, bindTextArea } from 'utils/bind'
import { IReminder } from 'apis/activity/market'
import style from './style.m.less'
import { ACTIVITY_REMINDER_SMS_TEMPLATE } from 'constants/activity'
import { smsMatchKeysValidator } from 'components/Www/Activity/util'

type ReminderState = FormState<{
  id: FieldState<string>
  reminderTime: FieldState<number>
  reminderStatus: FieldState<number>
  createdAt: FieldState<number>
  updatedAt: FieldState<number>
  smsTemplate: FieldState<string>
}>

export type Value = IReminder[]

export type State = FormState<ReminderState[]>

const defaultTime = 30 // 默认开启活动前提醒时间，单位为分钟

function createReminderState(reminderValue?: IReminder): ReminderState {
  const now = dayjs()
  const val = reminderValue || {
    id: `${now.valueOf()}`,
    reminderTime: defaultTime,
    reminderStatus: 0,
    createdAt: now.unix(),
    updatedAt: now.unix(),
    smsTemplate: ''
  }
  const reminderState = new FormState({
    id: new FieldState(val.id),
    reminderTime: new FieldState(val.reminderTime),
    reminderStatus: new FieldState(val.reminderStatus),
    createdAt: new FieldState(val.createdAt),
    updatedAt: new FieldState(val.updatedAt),
    smsTemplate: new FieldState(val.smsTemplate || ACTIVITY_REMINDER_SMS_TEMPLATE).validators(smsMatchKeysValidator)
  })
  return reminderState
}

export function createState(value: Value): State {
  const state = new FormState<ReminderState[]>([])
  // 依次创建并添加其中的 field state
  value.forEach(item => {
    state.$.push(createReminderState(item))
  })
  if (value.length === 0) {
    state.$.push(createReminderState()) // 令活动提醒数组长度最少为 1，否则用户无法进行提醒时间配置
  }
  return state.validators(val => {
    // 校验时间是否都大于 0 且无重复数据
    if (val.some(
      compareTo => compareTo.reminderTime <= 0
    )) {
      return '请输入正整数'
    }
    let duplicatedTime = 0
    if (val.some(
      compareTo => {
        duplicatedTime = compareTo.reminderTime
        return compareTo !== val.find(item => item.reminderTime === compareTo.reminderTime)
      }
    )) {
      return `提醒时间重复，请检查数值为 ${duplicatedTime} 的数据`
    }
  })
}

export function getValue(state: State): Value {
  return state.value
}

interface IProps {
  state: State
  disabled: boolean
  visible: boolean
}

export default observer(function RemindersInput({ state, disabled, visible }: IProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(action(() => {
    state.$.push(createReminderState())
  }), [state])
  const handleDelete = useCallback((index: number) => action(() => {
    state.$.splice(index, 1)
  }), [state])

  const contentView = state.$.map((item, index, arr) => (
    <div className={style.reminderItem} key={index}>
      <div className={style.row}>
        <p>提醒时间: </p>
        <InputNumber
          disabled={disabled}
          {...bindInputNumber(item.$.reminderTime)}
        />
        <p>分钟前提醒</p>
      </div>
      <div className={style.row}>
        <p>通知模板:</p>
        <Input.TextArea className={style.textArea} {...bindTextArea(item.$.smsTemplate)} />
        <div className={style.reminderOperation}>
          {(index === arr.length - 1 && !disabled) && <Icon type="plus" className={style.icon} onClick={handleAdd} />}
          {(index !== 0 && !disabled) && <Icon type="minus" className={style.icon} onClick={handleDelete(index)} />}
        </div>
      </div>
    </div>
  ))

  return (
    <div className={style.container} style={!visible ? { display: 'none' } : undefined}>
      {contentView}
    </div>
  )
})
