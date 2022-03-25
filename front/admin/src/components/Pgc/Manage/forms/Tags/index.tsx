/**
 * @file Tags
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import { IState, DebouncedFieldState } from 'formstate-x'
import { Tag, TextInput } from 'react-icecream'
import { AddIcon } from 'react-icecream/icons'
import { useFormstateX, InputWrapper, bindInput, FormItem } from 'react-icecream-form'

import style from './style.m.less'

export interface Props {
  state: IState<string[]>
}

export default observer(function Form({ state }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const newTagState = useFormstateX(
    () => new DebouncedFieldState('').withValidator(tag => {
      if (!tag.trim()) {
        return '不能为空'
      }

      if (state.value.includes(tag)) {
        return '该标签已存在'
      }
    }),
    [state]
  )

  async function add() {
    const result = await newTagState.validate()
    if (result.hasError) {
      inputRef.current!.focus()
    } else {
      state.onChange([...state.value, newTagState.value])
      newTagState.reset()
    }
  }

  function remove(index: number) {
    const newTags = [...state.value]
    newTags.splice(index, 1)
    state.onChange(newTags)
  }

  return (
    <InputWrapper state={state}>
      <div>
        <div className={style.tags}>
          {state.value.map((tag, index) => (
            <Tag key={index} closable onClose={() => { remove(index) }}>{tag}</Tag>
          ))}
        </div>
        <FormItem state={newTagState} className={style.inputWrapper}>
          <TextInput
            placeholder="新增"
            size="small"
            className={style.input}
            suffix={<AddIcon className={style.addIcon} onClick={() => { add() }} />}
            {...bindInput(newTagState)}
            inputRef={inputRef}
            inputProps={{
              onKeyPress(e) {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  add()
                }
              }
            }}
          />
        </FormItem>
      </div>
    </InputWrapper>
  )
})
