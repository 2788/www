/**
 * @file 简单的输入框
 * @description 用于输入完直接提交的场景，响应键盘事件来控制取消或提交
 */

import React, { useCallback, CSSProperties, KeyboardEvent } from 'react'
import { Input } from 'react-icecream'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x-v2'

import { bindTextInput } from 'utils/bind'

export interface Props {
  style?: CSSProperties
  state: FieldState<string>
  onSubmit: () => void
  onCancel: () => void
}

export default observer(function SimpleInput({ style, state, onSubmit, onCancel }: Props) {

  const inputRef = useCallback((input: Input) => {
    if (input) input.focus()
  }, [])

  // Esc 需要通过 keydown 捕捉
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onCancel()
  }, [onCancel])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') onSubmit()
  }, [onSubmit])

  return (
    <Input
      ref={inputRef}
      size="small"
      style={style}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      onBlur={onCancel}
      {...bindTextInput(state)}
    />
  )
})
