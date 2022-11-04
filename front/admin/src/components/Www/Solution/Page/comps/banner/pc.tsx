/**
 * @file pc
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { FormItem, Switch } from 'react-icecream-form'

import { BannerButton, buttonPcTypes, platformMap } from 'constants/solution/page/comp-banner'

import ButtonClick, { createState as createButtonClickState } from './ButtonClick'

function getBaseValue(pc: BannerButton['pc']) {
  return {
    enabled: !!pc,
    click: pc?.click ?? {
      type: 'webLink' as const,
      url: ''
    }
  }
}

function createBaseState(init: BannerButton['pc']) {
  const pc = getBaseValue(init)

  const enabledState = new DebouncedFieldState(pc.enabled)
  return new FormState({
    enabled: enabledState,
    click: createButtonClickState(pc.click, buttonPcTypes).withValidator(button => {
      if (button.type === 'webLink' && button.url.trim() === '') {
        return '不能为空'
      }
    })
  })
}

export function createPcState(init: BannerButton['pc']) {
  const state = createBaseState(init)

  return new TransformedState(
    state,
    ({ enabled, ...pc }) => (enabled ? pc : undefined),
    getBaseValue
  ).disableWhen(() => !state.$.enabled.value)
}

export function renderPc(state: ReturnType<typeof createPcState>) {
  const fields = state.$.$
  return (
    <FormItem label={platformMap.pc} state={state}>
      <FormItem>
        <Switch state={fields.enabled} />
      </FormItem>
      {fields.enabled.value && (
        <FormItem label="点击" required>
          <ButtonClick state={fields.click} />
        </FormItem>
      )}
    </FormItem>
  )
}
