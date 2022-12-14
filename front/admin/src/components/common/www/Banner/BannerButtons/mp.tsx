/**
 * @file 小程序
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { FormItem, Switch } from 'react-icecream-form'

import ButtonClick, { createState as createButtonClickState } from 'components/common/www/ButtonClick'

import { BannerButton, buttonMpTypes, platformMap, labelOuterWidth, labelInnerWidth } from './common'

function getBaseValue(mp: BannerButton['mp']) {
  return {
    enabled: !!mp,
    click: mp?.click ?? {
      type: 'webLink' as const,
      url: ''
    }
  }
}

function createBaseState(init: BannerButton['mp']) {
  const mp = getBaseValue(init)

  const enabledState = new DebouncedFieldState(mp.enabled)
  return new FormState({
    enabled: enabledState,
    click: createButtonClickState(mp.click, buttonMpTypes).withValidator(button => {
      if (
        button.type === 'webLink' && button.url.trim() === ''
        || button.type === 'mpLink' && button.url.trim() === ''
      ) {
        return '不能为空'
      }
    })
  })
}

export function createMpState(init: BannerButton['mp']) {
  const state = createBaseState(init)

  return new TransformedState(
    state,
    ({ enabled, ...mp }) => (enabled ? mp : undefined),
    getBaseValue
  ).disableWhen(() => !state.$.enabled.value)
}

export function renderMp(state: ReturnType<typeof createMpState>) {
  const fields = state.$.$
  return (
    <FormItem label={platformMap.mp} state={state} labelWidth={labelOuterWidth} labelVerticalAlign="text">
      <FormItem>
        <Switch state={fields.enabled} />
      </FormItem>
      {fields.enabled.value && (
        <FormItem label="点击" required labelWidth={labelInnerWidth}>
          <ButtonClick state={fields.click} />
        </FormItem>
      )}
    </FormItem>
  )
}
