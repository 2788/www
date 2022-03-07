/**
 * 颜色选择器
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { SketchPicker } from 'react-color'
import { FieldState } from 'formstate-x'
import { textNotBlank } from 'admin-base/common/form'

import style from './style.m.less'

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value).validators(textNotBlank)
}

export function getValue(state: State): string {
  return state.value
}

interface IProps {
  state: State
}

export default observer(function ColorPicker({ state }: IProps) {
  const [display, setDisplay] = useState(false)
  return (
    <div>
      <div className={style.swatch} onClick={() => setDisplay(!display)}>
        <div className={style.color} style={{ backgroundColor: `${state.value}` }} />
      </div>
      {
        display
        && (
          <div className={style.popover}>
            <div className={style.cover} onClick={() => setDisplay(false)} />
            <SketchPicker className={style.sketch} color={state.value} onChange={val => state.onChange(val.hex)} />
          </div>)
      }
    </div >
  )
})
