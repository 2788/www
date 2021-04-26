import React, { useCallback, FormEvent, useState } from 'react'
import { Icon } from 'react-icecream'
import { observer } from 'mobx-react'
import { FieldState } from 'formstate-x'
import { useFormState } from 'hooks/form'

import SimpleInput from './SimpleInput'

export interface Props {
  value: string
  onChange: (value: string) => Promise<void>
}

type State = FieldState<string>

function createState(value = ''): State {
  return new FieldState(value).validators(
    v => !v.trim() && '不可为空'
  )
}

export default observer(function NameViewer({ value, onChange }: Props) {
  const state = useFormState(() => createState(value))
  const [editing, setEditting] = useState(false)

  const startEdit = useCallback(() => {
    setEditting(true)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditting(false)
    state.reset()
  }, [state])

  const handleSubmit = useCallback(async (e?: FormEvent) => {
    if (e) e.preventDefault()
    const { hasError } = await state.validate()
    if (hasError) return
    await onChange(state.value.trim())
    setEditting(false)
  }, [state, onChange])

  if (value && !editing) {
    return (
      <span>
        {value}
        <Icon type="edit" title="编辑" onClick={startEdit} style={{ marginLeft: '.5em', color: '#8C8C8C' }} />
      </span>
    )
  }

  return (
    <SimpleInput
      state={state}
      onSubmit={handleSubmit}
      onCancel={cancelEdit}
      style={{ width: '120px' }}
    />
  )
})
