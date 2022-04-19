/**
 * @file 手机号及验证码
 */

// TODO: 把 `apis/admin/verification` 的 `verifySms` 相关逻辑也集成进来，然后删掉散落在各处的相关代码

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState, ValueOf } from 'formstate-x'
import { Button } from 'react-icecream-2'
import { FormItem, TextInput } from 'react-icecream-2/esm/form-x'
import { bindFormItem } from 'utils/form'
import { ApiException } from 'utils/fetch'
import { useInterval, useOnChange } from 'hooks'
import { sendVerificationSms, VerificationSmsOperation } from 'apis/admin/verification'

import { validateTextRequired, validatePhone } from './validators'
import { hasCode } from './utils'
import style from './style.less'

enum Status {
  Initial,
  Processing,
  Failed,
  Succeeded
}

export type State = FormState<{
  phoneNumber: FieldState<string>
  captcha: FieldState<string>
}>

export type Value = ValueOf<State>

export function createState(value?: Value) {
  return new FormState({
    phoneNumber: new FieldState(value?.phoneNumber ?? '').validators(validateTextRequired, validatePhone),
    captcha: new FieldState(value?.captcha ?? '').validators(validateTextRequired)
  })
}

export interface Props {
  state: State
  operation: VerificationSmsOperation
  hasLabel?: boolean
}

const delay = 1000 // 定时器时延，单位为 ms

export default observer(function PhoneInfoInput({ state, operation, hasLabel = true }: Props) {
  const fields = state.$
  const [status, setStatus] = useState<Status>(Status.Initial)
  const [count, setCount] = useState<number>(0)

  const intervalObj = useInterval(() => {
    setCount(count + 1)
  }, delay)

  useOnChange(() => {
    if (count > 60) {
      intervalObj.stop()
      setCount(0)
      setStatus(Status.Initial)
    }
  }, [count, intervalObj])
  const handleClick = () => {
    setStatus(Status.Processing)
    sendVerificationSms(fields.phoneNumber.value, operation).then(
      () => {
        intervalObj.start()
        setStatus(Status.Succeeded)
      },
      error => {
        setStatus(Status.Failed)
        if (!(error instanceof ApiException) || !hasCode(error.data)) {
          throw new Error('获取验证码失败，请稍后重试')
        }
        throw new Error(getErrorMessage(error.data.code))
      }
    )
  }
  const buttonProps = {
    buttonContent: '获取验证码',
    disabled: true
  }
  switch (status) {
    case Status.Initial:
      buttonProps.buttonContent = '获取验证码'
      buttonProps.disabled = false
      break
    case Status.Processing:
      buttonProps.buttonContent = '发送中...'
      buttonProps.disabled = true
      break
    case Status.Succeeded:
      buttonProps.buttonContent = `${60 - count} 秒后重试`
      buttonProps.disabled = true
      break
    case Status.Failed:
      buttonProps.buttonContent = '重试'
      buttonProps.disabled = false
      break
    default:
  }
  if (!fields.phoneNumber.validated || fields.phoneNumber.hasError) {
    buttonProps.disabled = true
  }

  return (
    <>
      <FormItem label={hasLabel ? '手机号' : undefined} required {...bindFormItem(fields.phoneNumber)}>
        <TextInput inputProps={{ name: 'phoneNumber' }} placeholder="请填写手机号" state={fields.phoneNumber} className={style.itemContent} />
      </FormItem>
      <FormItem label={hasLabel ? '手机验证码' : undefined} required {...bindFormItem(fields.captcha)}>
        <div className={style.captchaWrapper}>
          <TextInput inputProps={{ name: 'captcha' }} placeholder="请填写手机验证码" state={fields.captcha} className={style.itemContent} />
          <Button
            type="link"
            size="default"
            onClick={handleClick}
            disabled={buttonProps.disabled}
            className={style.captchaButton}
          >
            {buttonProps.buttonContent}
          </Button>
        </div>
      </FormItem>
    </>
  )
})

function getErrorMessage(code: number) {
  switch (code) {
    case 429:
      return '请求太频繁（一分钟同一个手机号 1 次, 同一个 IP 地址一分钟 5 次）'
    case 400006:
      return '手机号不合法'
    case 400013:
      return '生成验证码太频繁（1 小时同一个手机号 10 次生成验证码的机会）'
    default:
      return '未知错误'
  }
}
