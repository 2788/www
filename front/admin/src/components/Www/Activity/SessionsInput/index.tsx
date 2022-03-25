import React, { useCallback } from 'react'
import cls from 'classnames'
import dayjs from 'dayjs'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Input, Icon } from 'react-icecream-1'
import { FieldState, FormState } from 'formstate-x-v2'
import { textNotBlank } from 'admin-base/common/form'

import { bindTextInput } from 'utils/bind'
import { ISession } from 'apis/activity'

import style from './style.m.less'

type SessionState = FormState<{
  id: FieldState<string>
  title: FieldState<string>
}>

export type Value = ISession[]

export type State = FormState<SessionState[]>

function createSessionState(value?: ISession): SessionState {
  const now = dayjs()
  const val = value || {
    id: `${now.valueOf()}`,
    title: ''
  }
  const state = new FormState({
    id: new FieldState(val.id),
    title: new FieldState(val.title).validators(textNotBlank)
  })
  return state
}

export function createState(value: Value): State {
  const state = new FormState(value.map(createSessionState))
  return state
}

export function getValue(state: State): Value {
  return state.value
}

interface IProps {
  state: State
  disabled: boolean
}

const maxSize = 5

export default observer(function SessionsInput({ state, disabled }: IProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(action(() => {
    state.$.push(createSessionState())
  }), [state])
  const makeDeleteHandler = useCallback((index: number) => action(() => {
    state.$.splice(index, 1)
  }), [state])

  const iconClassNames = cls(style.icon, disabled && style.disabled)
  const plusIcon = <Icon type="plus" className={iconClassNames} onClick={handleAdd} />
  const contentView = state.$.length === 0
    ? plusIcon
    : state.$.map((item, index, arr) => (
      <div className={style.row} key={index}>
        <Input
          placeholder="请输入场次标题"
          maxLength={200}
          disabled={disabled}
          className={style.input}
          {...bindTextInput(item.$.title)}
        />
        <div>
          {index === arr.length - 1 && index + 1 < maxSize && !disabled && plusIcon}
          {!disabled && <Icon type="minus" className={iconClassNames} onClick={makeDeleteHandler(index)} />}
        </div>
      </div>
    ))

  return <>{contentView}</>
})
