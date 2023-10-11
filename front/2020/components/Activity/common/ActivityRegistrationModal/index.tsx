/**
 * 活动报名组件
 */

import React, { useState, useMemo, useRef } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { FormState, FieldState, ValueOf } from 'formstate-x'

import { Modal } from 'react-icecream'
import { PopupContainerProvider } from 'react-icecream-2'
import { useFormstateX, Form, FormItem, TextInput, Select, SelectOption, Checkbox } from 'react-icecream-2/esm/form-x'

import { verifySms, VerificationSmsOperation } from 'apis/admin/verification'
import { createRegistration as doSubmit, IRegistrationOptions, ISession } from 'apis/admin/activity'
import { track as sensorsTrack } from 'utils/sensors'
import { ApiException } from 'utils/fetch'
import { useUserInfo } from 'components/UserInfo'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { ModalHeader, ModalWithHeader } from 'components/UI/Modal'

import PhoneInfoInput, * as phoneInfoInput from 'components/PhoneInfoInput'
import LocationInput, * as locationInput from './LocationInput'
import { validateTextRequired, validateSelectorRequired, validateEmail } from './validators'
import { hasCode } from './utils'
import style from './style.less'

enum Status {
  Initial,
  Submitting,
  Failed
}

interface ExtraFormItemBase {
  type: string
  name: string
  key: string // 提交数据时的 key
  required?: boolean
  placeholder?: string
  tip?: React.ReactNode
  isVisible?: (state: Record<string, string | null>) => boolean
}

interface ExtraSelectFormItem extends ExtraFormItemBase {
  type: 'select'
  options: string[]
}

interface ExtraTextFormItem extends ExtraFormItemBase {
  type: 'text'
}

export type ExtraFormItem = ExtraSelectFormItem | ExtraTextFormItem

type Props = {
  visible: boolean
  onCancel: () => void
  marketActivityId: string
  sessions: ISession[]

  /** 配置额外的表单内容 */
  extraForm: ExtraFormItem[]
}

export default observer(function ActivityRegistration(props: Props) {
  const {
    visible,
    onCancel,
    sessions,
    marketActivityId
  } = props

  const userInfo = useUserInfo()
  const form = useFormstateX(
    () => createState({
      ...userInfo,
      marketActivitySessionId: sessions.length === 0 ? 'default' : null
    }, props.extraForm),
    [sessions.length, userInfo, visible]
  )
  const fields = form.$
  const [status, setStatus] = useState(Status.Initial)
  const [errorMsg, setErrorMsg] = useState('报名失败，请稍后重试')

  const buttonView = (
    status === Status.Submitting
      ? <Button type="primary" htmlType="submit" disabled>报名中...</Button>
      : <Button type="primary" htmlType="submit" name="activity-registration-button">立即报名</Button>
  )

  async function handleSubmit() {
    const value: Value = form.value
    sensorsTrack('WwwActivityRegistration', getSensorsOptions(marketActivityId, value))
    setStatus(Status.Submitting)

    const {
      location,
      phoneInfo,
      isReaded,
      userName,
      email,
      marketActivitySessionId,
      extraFromState
    } = value

    try {
      await verifySms(phoneInfo.captcha, phoneInfo.phoneNumber, VerificationSmsOperation.ApplyActivity)

      const saveData: IRegistrationOptions = {
        marketActivityId,
        marketActivitySessionId,
        userName,
        email,
        referrer: window.location.href,
        location: `${location.province}/${location.city}`,
        phoneNumber: phoneInfo.phoneNumber,
        isReaded,
        extraForm: extraFromState
      }

      await doSubmit(saveData)
      onCancel()
      Modal.success({
        title: '成功提示',
        content: '成功报名，请准时参加活动！'
      })
    } catch (error) {
      setStatus(Status.Failed)
      if (!(error instanceof ApiException) || !hasCode(error.data)) {
        setErrorMsg('报名失败，请稍后重试')
        return
      }
      setErrorMsg(getErrorMessage(error.data.code))
    }
  }

  const errorView = useMemo(() => {
    if (status === Status.Failed) {
      return <p className={style.errorLine}>{errorMsg}</p>
    }
    return null
  }, [errorMsg, status])

  const footer = <div className={style.footer}>{errorView}{buttonView}</div>
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <ModalWithHeader
      visible={visible}
      onCancel={onCancel}
      modalClassName={style.modalRoot}
      header={<ModalHeader title="报名信息" onClose={onCancel} />}
    >
      <Form
        onSubmit={handleSubmit}
        state={form}
        layout="horizontal"
        labelWidth="6em"
        labelAlign="left"
        className={style.form}
        footer={footer}
        formRef={formRef}
      >
        <PopupContainerProvider containerRef={formRef}>
          <div className={style.formItemGroupRoot}>
            <FormItem label="姓名" required>
              <TextInput inputProps={{ name: 'userName' }} placeholder="请填写姓名" state={fields.userName} className={style.itemContent} />
            </FormItem>
            <PhoneInfoInput state={fields.phoneInfo} operation={VerificationSmsOperation.ApplyActivity} />
            <FormItem label="邮箱" required>
              <TextInput inputProps={{ name: 'email' }} placeholder="请填写邮箱" state={fields.email} className={style.itemContent} />
            </FormItem>
            <LocationInput state={fields.location} />
            {props.extraForm && (
              <ExtraFormRender
                form={props.extraForm}
                state={fields.extraFromState}
                visibleState={fields.extraFromVisibleState}
              />
            )}
          </div>
          <FormItem>
            <div className={style.isReaded}>
              <Checkbox className={style.isReadedCheckbox} state={fields.isReaded} />
              我已阅读并同意&nbsp;
              <Link href="/user-agreement" target="_blank" rel="noopener" title="七牛云服务用户协议" blue>
                七牛云服务用户协议
              </Link>
              &nbsp;和&nbsp;
              <Link href="/privacy-right" target="_blank" rel="noopener" title="七牛云隐私权政策" blue>
                隐私权政策
              </Link>
            </div>
          </FormItem>
        </PopupContainerProvider>
      </Form>
    </ModalWithHeader>
  )
})

interface ExtraFormRenderProps {
  form: ExtraFormItem[]
  visibleState: FieldState<Record<string, boolean>>
  state: FormState<Record<string, FieldState<string | null>>>
}

const ExtraFormRender = observer(function ExtraFromRender(props: ExtraFormRenderProps) {
  const { form, visibleState, state } = props

  return (
    <>
      {form.map(item => {
        const isVisible = visibleState.value[item.key] === true
        if (!isVisible) return

        if (item.type === 'text') {
          return (
            <FormItem key={item.key} label={item.name} required={item.required} tip={item.tip}>
              <TextInput
                inputProps={{ name: item.key }}
                placeholder={item.placeholder}
                className={style.itemContent}
                state={state.$[item.key] as FieldState<string>}
              />
            </FormItem>
          )
        }
        if (item.type === 'select') {
          return (
            <FormItem key={item.key} label={item.name} required={item.required} tip={item.tip}>
              <Select
                className={style.itemContent}
                placeholder={item.placeholder}
                state={state.$[item.key] as FieldState<string>}
              >
                {item.options.map((option, index) => (
                  <SelectOption value={option} key={index}>{option}</SelectOption>
                ))}
              </Select>
            </FormItem>
          )
        }

        // eslint-disable-next-line no-console
        console.error(item)
        throw new Error('不支持的 ExtraFromType')
      })}
    </>
  )
})

interface IProps {
  name: string
  phoneNumber: string
  captcha: string
  email: string
  province: string | null // 所在省份
  city: string | null // 所在城市
  marketActivitySessionId: string | null // 活动场次 id
  isReaded: boolean
}

type State = FormState<{
  userName: FieldState<string>
  phoneInfo: phoneInfoInput.State
  email: FieldState<string>
  location: locationInput.State
  marketActivitySessionId: FieldState<string | null>
  isReaded: FieldState<boolean>

  extraFromVisibleState: FieldState<Record<string, boolean>>
  extraFromState: FormState<Record<string, FieldState<string | null>>>
}>

type Value = ValueOf<State>

const validateIsReaded = (checked: boolean) => (checked ? null : '请勾选同意协议内容')

function createState(originalProps: Partial<IProps>, extraForm: ExtraFormItem[] = []): State {
  const extraFormState: Record<string, FieldState<string | null>> = {}
  const extraFromVisibleState = new FieldState<Record<string, boolean>>({})

  if (extraForm.length > 0) {
    const extraFromVisibleTemp: Record<string, boolean> = {}
    for (const extraFormItem of extraForm) {
      extraFromVisibleTemp[extraFormItem.key] = true
      extraFormState[extraFormItem.key] = new FieldState<string | null>(null)
      if (extraFormItem.required) {
        extraFormState[extraFormItem.key]
          .validators(v => !v && '该项不能为空')
          .disableValidationWhen(() => extraFromVisibleState.value[extraFormItem.key] !== true)
      }
    }
    extraFromVisibleState.set(extraFromVisibleTemp)
  }

  const extraFromState = new FormState(extraFormState)

  const disposer = reaction(() => extraFromState.value, stateValue => {
    const extraFromVisibleTemp: Record<string, boolean> = {
      ...extraFromVisibleState.value
    }

    for (const extraFormItem of extraForm) {
      if (extraFormItem.isVisible != null) {
        const visible = extraFormItem.isVisible(stateValue)
        extraFromVisibleTemp[extraFormItem.key] = visible
      }
    }
    extraFromVisibleState.onChange(extraFromVisibleTemp)
  }, { fireImmediately: true })

  // eslint-disable-next-line dot-notation
  extraFromVisibleState['addDisposer'](disposer)

  const defaultStateValue = {
    name: '',
    phoneNumber: '',
    captcha: '',
    email: '',
    province: null,
    city: null,
    marketActivitySessionId: null,
    isReaded: false
  } as IProps

  const props = { ...defaultStateValue, ...originalProps }
  const state = new FormState({
    userName: new FieldState(props.name).validators(validateTextRequired),
    phoneInfo: phoneInfoInput.createState({ phoneNumber: props.phoneNumber, captcha: props.captcha }),
    email: new FieldState(props.email).validators(validateTextRequired, validateEmail),
    location: locationInput.createState({ province: props.province, city: props.city }),
    marketActivitySessionId: new FieldState(props.marketActivitySessionId).validators(validateSelectorRequired),
    isReaded: new FieldState(props.isReaded).validators(validateIsReaded),
    extraFromState: new FormState(extraFormState),
    extraFromVisibleState
  })

  return state
}

function getErrorMessage(code: number) {
  switch (code) {
    case 400001:
      return '必填参数为空'
    case 400002:
      return '邮箱不合法'
    case 400003:
      return '电话号码重复'
    case 400004:
      return '市场活动 ID 不合法'
    case 400005:
      return '同一个 UID 报名人数达到上限'
    case 400006:
      return '电话号码不合法'
    case 400007:
      return '请登录后再报名'
    case 400010:
      return '市场活动场次 ID 不合法'
    case 400011: // 验证码过期
    case 400012:
      return '验证码不正确'
    case 400013:
      return '生成验证码太频繁'
    default:
      return '未知错误'
  }
}

// 神策统计需要收集的数据
function getSensorsOptions(activityId: string, value: Value) {
  return {
    activity_id: activityId,
    registration_name: value.userName,
    registration_phone: value.phoneInfo.phoneNumber,
    registration_email: value.email,
    registration_province: value.location.province,
    registration_city: value.location.city,
    registration_session_id: value.marketActivitySessionId
  }
}
