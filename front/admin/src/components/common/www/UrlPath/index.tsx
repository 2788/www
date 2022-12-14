/**
 * @file 设置完整 url，或官网站内相对地址
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { TextInput, InputWrapper } from 'react-icecream-form'
import { DebouncedFieldState, TransformedState } from 'formstate-x'

import { wwwHost } from 'constants/env'

export function createState(initUrl?: string) {
  const state = new DebouncedFieldState(initUrl ?? '').withValidator(url => {
    if (/\s/.test(url)) {
      return '不能有空白符'
    }
  })

  return new TransformedState(
    state,
    url => (url.startsWith(wwwHost) ? (url.slice(wwwHost.length) || '/') : url),
    url => url
  )
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function WwwUrlPath({ state }: Props) {
  return (
    <InputWrapper state={state}>
      <TextInput state={state.$} />
    </InputWrapper>
  )
})
