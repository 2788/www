/**
 * @file 移动端
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { FormItem, Switch } from 'react-icecream-form'

import { BannerButton, buttonMobileTypes, platformMap } from './common'
import ButtonClick, { createState as createButtonClickState } from './ButtonClick'

function getBaseValue(mobile: BannerButton['mobile']) {
  return {
    enabled: !!mobile,
    click: mobile?.click ?? {
      type: 'webLink' as const,
      url: ''
    }
  }
}

function createBaseState(init: BannerButton['mobile']) {
  const mobile = getBaseValue(init)

  const enabledState = new DebouncedFieldState(mobile.enabled)
  return new FormState({
    enabled: enabledState,
    click: createButtonClickState(mobile.click, buttonMobileTypes).withValidator(button => {
      if (button.type === 'webLink' && button.url.trim() === '') {
        return '不能为空'
      }
    })
  })
}

export function createMobileState(init: BannerButton['mobile']) {
  const state = createBaseState(init)

  return new TransformedState(
    state,
    ({ enabled, ...mobile }) => (enabled ? mobile : undefined),
    getBaseValue
  ).disableWhen(() => !state.$.enabled.value)
}

export function renderMobile(state: ReturnType<typeof createMobileState>) {
  const fields = state.$.$
  return (
    <FormItem label={platformMap.mobile} state={state} labelWidth="3em">
      <FormItem>
        <Switch state={fields.enabled} />
      </FormItem>
      {fields.enabled.value && (
        <FormItem label="点击" required labelWidth="2em">
          <ButtonClick state={fields.click} />
        </FormItem>
      )}
    </FormItem>
  )
}
