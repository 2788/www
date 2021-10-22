import React from 'react'
import { observer } from 'mobx-react'

import Duration, { State } from './inputs/Duration'
import { DurationUnit } from './constants'

import style from './index.less'

export { createState, getDays } from './inputs/Duration'

export function getDesc(state: State) {
  const { duration, unit } = state.value
  return `${duration} ${unit === DurationUnit.Year ? '年' : '个月'}`
}

export default observer(function DurationSection({ state }: { state: State }) {
  return (
    <div style={{ marginBottom: '100px' }}>
      <div className={style.inputItem}>
        <p>使用时间</p>
        <Duration state={state} />
      </div>
    </div>
  )
})
