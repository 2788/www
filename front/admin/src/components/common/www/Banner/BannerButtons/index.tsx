/**
 * @file banner buttons
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { ArrayFormState, TransformedState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { FormItem, InputWrapper } from 'react-icecream-form'

import { BannerButton as BannerButtonValue, platformMap } from './common'
import BannerButton, { createState as createButtonState } from './BannerButton'

import styles from './style.m.less'

export { BannerButtonValue as BannerButton }

export function createState(buttons: BannerButtonValue[]) {
  const state = new ArrayFormState(buttons, createButtonState).withValidator(list => {
    const countMap: Record<keyof typeof platformMap, number> = {
      pc: 0,
      mobile: 0,
      mp: 0
    }

    for (const item of list) {
      if (item.pc) {
        countMap.pc++
      }
      if (item.mobile) {
        countMap.mobile++
      }
      if (item.mp) {
        countMap.mp++
      }
    }

    for (const [key, count] of Object.entries(countMap)) {
      if (key !== 'mp' && count === 0) {
        return `${platformMap[key]} 最少 1 个按钮`
      }

      if (count > 3) {
        return `${platformMap[key]} 最多 3 个按钮`
      }
    }
  })

  return new TransformedState(
    state,
    list => list.map(({ pc, mobile, mp, ...button }) => ({
      ...button,
      ...(pc && ({ pc })),
      ...(mobile && ({ mobile })),
      ...(mp && ({ mp }))
    })),
    list => list
  )
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function BannerButtons({ state }: Props) {
  function addButton() {
    const button: BannerButtonValue = {
      text: ''
    }
    state.$.append(button)
  }

  function removeButton(index: number) {
    state.$.remove(index)
  }

  function renderButton(buttonState: ReturnType<typeof createButtonState>, index: number) {
    return (
      <FormItem
        key={index}
        label={
          <span className={styles.sectionLabel}>
            <span>{index + 1}</span>
            <Button
              type="link"
              icon={<DeleteIcon />}
              className={styles.btn}
              onClick={() => { removeButton(index) }}
            />
          </span>
        }
        labelWidth="3em"
        className={styles.sectionItem}
      >
        <BannerButton state={buttonState} />
      </FormItem>
    )
  }

  return (
    <InputWrapper state={state}>
      {state.$.$.map(renderButton)}
      <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addButton() }} />
    </InputWrapper>
  )
})
