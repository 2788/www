/**
 * @file multiple select tags
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 交互优化 https://github.com/qbox/horn/issues/430

import React from 'react'
import { observer } from 'mobx-react'
import { IState } from 'formstate-x'
import { InputWrapper } from 'react-icecream-form'
import { Select } from 'react-icecream-1' // TODO: 使用 icecream 2

export interface Props<T = string> {
  state: IState<T[]>
}

export default observer(function SelectTags({ state }: Props) {
  return (
    <InputWrapper state={state}>
      <Select
        mode="tags"
        value={state.value}
        onChange={v => state.onChange(v as string[])}
      />
    </InputWrapper>
  )
})
