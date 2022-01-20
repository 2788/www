/**
 * @file 多行文本输入
 */

import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { FormState, FieldState, Validator } from 'formstate-x'

import { FormItem, TextInput, useFormstateX } from 'react-icecream-2/lib/form-x'

import { ensureValid } from 'utils/form'

import style from './style.less'

export type ValidValue = string[]
export type Value = string[]
export type State = FormState<Array<FieldState<string>>>

export function useMultiTextInputState(
  textValidator: Validator<string>,
  isDisabled: () => boolean
) {
  const form = useFormstateX(() => createForm(isDisabled, textValidator), [isDisabled, textValidator])
  const getValidValueWithState = useCallback(() => getValidValue(form, isDisabled), [form, isDisabled])
  const state = useMemo(() => ({
    form,
    getValidValue: getValidValueWithState,
    textValidator,
    isDisabled
  }), [form, getValidValueWithState, textValidator, isDisabled])
  return state
}

function createTextField(textValidator: Validator<string>, text = '') {
  return new FieldState(text).validators(value => {
    if (!value) {
      return '不可为空'
    }

    if (/\s/.test(value)) {
      return '不可有空白字符'
    }
  }).validators(textValidator)
}

function createForm(isDisabled: () => boolean, textValidator: Validator<string>) {
  return new FormState([createTextField(textValidator)]).disableValidationWhen(isDisabled)
}

function getValue(state: State): Value {
  return state.value
}

function getValidValue(state: State, isDisabled: () => boolean): ValidValue {
  ensureValid(state, isDisabled())
  return getValue(state)
}

export interface Props {
  state: ReturnType<typeof useMultiTextInputState>
  label: string
}

export default observer(function MultiTextInput({ state, label }: Props) {
  const { form, textValidator, isDisabled } = state

  const itemsView = form.$.map((field, index) => {
    const itemProps = index === 0
      ? {
        label,
        required: true
      }
      : {
        label: ' '
      }

    function add() {
      form.$.push(createTextField(textValidator))
    }

    function remove() {
      form.$.splice(index, 1)
      field.dispose()
    }

    return (
      <FormItem key={index} {...itemProps} className={classnames(isDisabled() && style.multiTextDisabled)}>
        <div className={style.textItem}>
          <TextInput state={field} />
          <span className={style.btns}>
            {index !== 0 && (
              <span className={style.btn} onClick={() => remove()}>-</span>
            )}
            {index + 1 === form.$.length && (
              <span className={style.btn} onClick={() => add()}>+</span>
            )}
          </span>
        </div>
      </FormItem>
    )
  })

  return (<>{itemsView}</>)
})
