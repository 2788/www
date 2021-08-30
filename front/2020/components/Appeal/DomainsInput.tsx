/**
 * @file 域名输入框
 */

import React from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { FormState, FieldState } from 'formstate-x'

import { FormItem, TextInput } from 'react-icecream-2/lib/form-x'

import { ensureValid } from 'utils/form'

import style from './style.less'

/** 宽松版：普通域名、中文域名、内网域名、本地域名、泛域名（通配符）、IPv4、IPv6 等等 */
function isHostname(hostname: string): boolean {
  return /^[a-zA-Z0-9-_:.*[\]\u0100-\uFFFF]+$/i.test(hostname)
}

export type ValidValue = string[]
export type Value = string[]
export type State = FormState<Array<FieldState<string>>>

function createDomainField(domain = '') {
  return new FieldState(domain).validators(value => {
    value = value.trim()

    if (!value) {
      return '不可为空'
    }

    if (/\s/.test(value)) {
      return '不能有空白字符'
    }

    if (!isHostname(value)) {
      return '不是合法的域名'
    }
  })
}

export function createState(isDisabled?: () => boolean) {
  const state = new FormState([createDomainField()])

  if (isDisabled != null) {
    state.disableValidationWhen(isDisabled)
  }

  return state
}

export function getValue(state: State): Value {
  return state.value.map(domain => domain.trim())
}

export function getValidValue(state: State, isDisabled?: () => boolean): ValidValue {
  ensureValid(state, isDisabled?.())
  return getValue(state)
}

export interface Props {
  state: State
  label: string
  isDisabled?: () => boolean
}

export default observer(function DomainsInput({ state, isDisabled, label }: Props) {
  const itemsView = state.$.map((field, index) => {
    const itemProps = index === 0
      ? {
        label,
        required: true
      }
      : {
        label: ' '
      }

    function add() {
      state.$.push(createDomainField())
    }

    function remove() {
      state.$.splice(index, 1)
      field.dispose()
    }

    return (
      <FormItem key={index} {...itemProps} className={classnames(isDisabled?.() && style.domainsDisabled)}>
        <div className={style.domainItem}>
          <TextInput state={field} />
          <span className={style.btns}>
            {index !== 0 && (
              <span className={style.addDomain} onClick={() => remove()}>-</span>
            )}
            {index + 1 === state.$.length && (
              <span className={style.removeDomain} onClick={() => add()}>+</span>
            )}
          </span>
        </div>
      </FormItem>
    )
  })

  return (<>{itemsView}</>)
})
