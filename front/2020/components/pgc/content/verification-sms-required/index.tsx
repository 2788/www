/**
 * @file 手机短信验证
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useRef, useCallback } from 'react'
import { FormState } from 'formstate-x'
import { useFormstateX, Form, useFormFooterCtx } from 'react-icecream-2/esm/form-x'

import { ApiException } from 'utils/fetch'
import { verifySms, VerificationSmsOperation } from 'apis/admin/verification'
import { ModalWithHeader, ModalHeader } from 'components/UI/Modal'
import PhoneInfoInput, * as phoneInfoInput from 'components/PhoneInfoInput'

import Button from '../Button'

import style from './style.less'

function hasCode(data: any): data is { code: number } {
  return Boolean(data?.code) && typeof data.code === 'number'
}

function getErrorMessage(code: number) {
  switch (code) {
    case 400011: // 验证码过期
    case 400012:
      return '验证码不正确'
    case 400013:
      return '生成验证码太频繁'
    default:
      return '未知错误'
  }
}

interface FooterProps {
  submitText: string
  errorMsg: string
}

function Footer({ submitText, errorMsg }: FooterProps) {
  const { submitting } = useFormFooterCtx()

  return (
    <div className={style.footer}>
      {errorMsg && (
        <p className={style.error}>{errorMsg}</p>
      )}
      <Button htmlType="submit" disabled={submitting} className={style.submitBtn}>{submitText}</Button>
    </div>
  )
}

interface PhoneModalProps {
  visible: boolean
  text: string
  operation: VerificationSmsOperation
  onSubmit(): void
  onCancel(): void
}

function PhoneModal({ visible, text, operation, onSubmit, onCancel }: PhoneModalProps) {
  const state = useFormstateX(() => new FormState({
    phoneInfo: phoneInfoInput.createState()
  }), [])

  const [errorMsg, setErrorMsg] = useState('')

  const submit = useCallback(async () => {
    setErrorMsg('')

    const { captcha, phoneNumber } = state.value.phoneInfo
    try {
      await verifySms(captcha, phoneNumber, operation)
    } catch (error) {
      if (!(error instanceof ApiException) || !hasCode(error.data)) {
        setErrorMsg('验证失败，请稍后重试')
        return
      }
      setErrorMsg(getErrorMessage(error.data.code))
      return
    }

    onSubmit()
  }, [state, operation, onSubmit])

  return (
    <ModalWithHeader
      visible={visible}
      header={
        <ModalHeader
          title={`手机号验证后即可${text}`}
          className={style.header}
          onClose={() => {
            onCancel()
          }}
        />
      }
      onCancel={() => {
        onCancel()
      }}
      modalClassName={style.modal}
    >
      <Form
        onSubmit={submit}
        state={state}
        size="large"
        layout="horizontal"
        footer={<Footer submitText={text} errorMsg={errorMsg} />}
        className={style.form}
      >
        <PhoneInfoInput state={state.$.phoneInfo} operation={operation} hasLabel={false} />
      </Form>
    </ModalWithHeader>
  )
}

function getPromise() {
  let resolve!: () => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {
    promise, resolve, reject
  }
}

export function useVerifySms(operation: VerificationSmsOperation, text: string) {
  const promiseRef = useRef(getPromise())
  const [verified, setVerified] = useState(false)
  const [visible, setVisible] = useState(false)

  const verify = useCallback(() => {
    if (verified) {
      return promiseRef.current.promise
    }

    setVisible(true)
    promiseRef.current = getPromise()
    return promiseRef.current.promise
  }, [verified])

  const modalView = (
    <PhoneModal
      visible={visible}
      text={text}
      operation={operation}
      onSubmit={() => {
        setVerified(true)
        setVisible(false)
        promiseRef.current.resolve()
      }}
      onCancel={() => {
        setVisible(false)
      }}
    />
  )

  return [verify, modalView] as const
}
