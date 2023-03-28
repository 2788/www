/**
 * @file banner button
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState } from 'formstate-x'
import { InputWrapper, FormItem, TextInput } from 'react-icecream-form'

import { BannerButton as BannerButtonValue, labelOuterWidth } from '../common'
import { createPcState, renderPc } from '../pc'
import { createMobileState, renderMobile } from '../mobile'
import { createMpState, renderMp } from '../mp'

export function createState(button: BannerButtonValue) {
  return new FormState({
    text: new DebouncedFieldState(button.text).withValidator(text => {
      if (text.trim() === '') {
        return '不能为空'
      }
      if (text.length > 8) {
        return '不能超过 8 个字'
      }
    }),
    pc: createPcState(button.pc),
    mobile: createMobileState(button.mobile),
    mp: createMpState(button.mp)
  }).withValidator(({ pc, mobile, mp }) => {
    if (pc == null && mobile == null && mp == null) {
      return '最少选 1 个平台'
    }
  })
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function BannerButton({ state }: Props) {
  return (
    <InputWrapper state={state}>
      <FormItem label="文案" required labelWidth={labelOuterWidth}>
        <TextInput state={state.$.text} />
      </FormItem>
      {renderPc(state.$.pc)}
      {renderMobile(state.$.mobile)}
      {renderMp(state.$.mp)}
    </InputWrapper>
  )
})
