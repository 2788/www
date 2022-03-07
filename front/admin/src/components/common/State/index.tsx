import React from 'react'
import { Checkbox } from 'react-icecream'
import moment from 'moment'

import { stateOption, State } from 'constants/state'

import style from './style.m.less'

type StateProps = {
  effectTime: number
  invalidTime: number
}

type CheckboxProps = {
  onChange: (vals: State[]) => void
}

export function renderState(_: string, record: StateProps) {
  const now = moment().unix()
  if (now > record.invalidTime) {
    return State.End
  }
  if (now < record.effectTime) {
    return State.Start
  }
  return State.Mid
}

export function StateCheckboxGroup({ onChange }: CheckboxProps) {
  return (
    <div>
      <div className={style.filter}>
        <label>状态：</label>
        <Checkbox.Group
          options={stateOption}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

// 待上架：当前时间 < 生效时间
// 上架中: 生效时间 <= 当前 <= 失效时间
// 下架:  失效时间 < 当前
export function genFilteredList<T extends StateProps>(vals: State[], list: T[]): T[] {
  if (!vals || vals.length === 0) {
    return list
  }
  const now = moment().unix()
  const filteredList = list.filter(item => {
    let res = false
    if (vals.includes(State.Start)) {
      res = res || now < item.effectTime
    }
    if (vals.includes(State.Mid)) {
      res = res || (now <= item.invalidTime && now >= item.effectTime)
    }
    if (vals.includes(State.End)) {
      res = res || now > item.invalidTime
    }
    return res
  })
  return filteredList
}
