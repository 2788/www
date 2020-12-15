/**
 * @file 咨询信息表单
 */

import React, { useRef, useState, FormEvent, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate-x'
import IcecreamForm from 'react-icecream/lib/form'
import Input from 'react-icecream/lib/input'
import Select, { SelectValue } from 'react-icecream/lib/select'

import { createFeedback } from 'apis/legacy'
import { track as sensorsTrack } from 'utils/sensors'
import { useMobile } from 'hooks/ua'
import { useFormState } from 'hooks/form'
import { useUserInfo } from 'components/UserInfo'
import Button from 'components/UI/Button'
import { bindFormItem, bindTextInput, bindSelect, textNotEmpty, textOfPattern, bindTextArea } from 'utils/form'

import { useDisposer } from '../../utils'
import style from './style.less'

export type FormValue = {
  content: string // 咨询内容
  company: string // 公司名称
  name: string // 称呼
  phone: string // 电话
  email: string // 邮箱
  province: string // 地区
}

enum Status {
  Initial,
  Submitting,
  Failed,
  Succeeded,
  Terminated
}

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

const provinces = [
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '上海市',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '广西壮族自治区',
  '海南省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '青海省',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
  '台湾'
]

export type Props = {
  consult: string
  onSubmit: () => void
  onCancel: () => void
}

// Antd Form 自己不能把内容撑开，即，把容器撑到它能到的最大宽度
// 这里用一段长的，不可见的文字把内容撑开，以保证表单可以撑开其所在的聊天气泡
const longEmptyText = Array.from({ length: 100 }).join('&nbsp;')
const longEmptyContent = (
  <p style={{ margin: '0', height: '0', visibility: 'hidden' }}>{longEmptyText}</p>
)

export default observer(function Form({ consult: consultContent, onSubmit, onCancel }: Props) {
  const isMobile = useMobile()
  const state = useFormState(() => createState(consultContent))
  const wrapperRef = useRef<HTMLDivElement>(null)
  const userInfo = useUserInfo()

  useEffect(() => {
    if (userInfo?.signedIn) {
      state.$.name.set(userInfo.name)
      state.$.email.set(userInfo.email)
    }
  }, [userInfo, state])

  const fields = state.$
  const [status, setStatus] = useState(Status.Initial)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = await state.validate()
    if (result.hasError) return

    sensorsTrack('Feedback', getSensorsOptions(consultContent, state))

    setStatus(Status.Submitting)
    try {
      await createFeedback(result.value)
      setStatus(Status.Succeeded)
      onSubmit()
    } catch {
      setStatus(Status.Failed)
    }
  }

  // 会话结束时，将表单状态设置为 Terminated
  useDisposer(useCallback(() => {
    if (status === Status.Succeeded || status === Status.Terminated) return
    setStatus(Status.Terminated)
  }, [status]))

  // 退出会话时，发送 QuitFeedback 事件
  useDisposer(useCallback(() => {
    if (status === Status.Succeeded || status === Status.Terminated) return
    if (!state.value.company && !state.value.phone && !state.value.province) return
    sensorsTrack('QuitFeedback', getSensorsOptions(consultContent, state))
  }, [status, state, consultContent]))

  const errorView = status === Status.Failed && (
    <p className={style.errorLine}>提交失败，请稍后重试</p>
  )

  const proviceOptionsView = [
    <Select.Option key={0} value="">请选择</Select.Option>,
    ...provinces.map(
      province => (
        <Select.Option key={province} value={province}>{province}</Select.Option>
      )
    )
  ]

  const disabled = status === Status.Succeeded || status === Status.Terminated

  const cancelBtnView = (
    isMobile
    ? null
    : (
      <Button
        className={style.button}
        type="default-grey"
        onClick={onCancel}
        withBorder
        size="small"
        htmlType="button"
      >取消</Button>
    )
  )

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      {longEmptyContent}
      <IcecreamForm onSubmit={handleSubmit} {...formItemLayout}>
        <IcecreamForm.Item label="称呼" required {...bindFormItem(fields.name)}>
          <Input name="name" disabled={disabled} {...bindTextInput(fields.name)} />
        </IcecreamForm.Item>
        <IcecreamForm.Item label="电话" required {...bindFormItem(fields.phone)}>
          <Input name="phone" disabled={disabled} {...bindTextInput(fields.phone)} />
        </IcecreamForm.Item>
        <IcecreamForm.Item label="邮箱" required {...bindFormItem(fields.email)}>
          <Input name="email" disabled={disabled} {...bindTextInput(fields.email)} />
        </IcecreamForm.Item>
        <IcecreamForm.Item label="地区" required {...bindFormItem(fields.province)}>
          <Select
            {...bindSelect<SelectValue>(fields.province)}
            disabled={disabled}
            getPopupContainer={() => wrapperRef.current || window.document.body}
            placeholder="请选择"
          >{proviceOptionsView}</Select>
        </IcecreamForm.Item>
        <IcecreamForm.Item label="公司" {...bindFormItem(fields.company)}>
          <Input name="company" disabled={disabled} {...bindTextInput(fields.company)} />
        </IcecreamForm.Item>
        <IcecreamForm.Item label="咨询内容" required {...bindFormItem(fields.content)}>
          <Input.TextArea className={style.contentInput} name="content" disabled={disabled} {...bindTextArea(fields.content)} />
        </IcecreamForm.Item>
        {errorView}
        <div className={style.submitLine}>
          <SubmitButton status={status} />
          {cancelBtnView}
        </div>
      </IcecreamForm>
    </div>
  )
})

const validateNotEmpty = textNotEmpty('请填写')
const validatePhone = textOfPattern(/^\d{11}$/, '请填写正确的手机号')
const validateEmail = textOfPattern(/^.+@.+$/, '请填写正确的 E-mail 地址')
const validateProvince = (v: string) => (v ? null : '请选择')

function createState(content: string) {
  return new FormState({
    company: new FieldState(''),
    name: new FieldState('').validators(validateNotEmpty),
    phone: new FieldState('').validators(validateNotEmpty, validatePhone),
    email: new FieldState('').validators(validateNotEmpty, validateEmail),
    province: new FieldState('').validators(validateProvince),
    content: new FieldState(content).validators(validateNotEmpty)
  })
}

const buttonProps = {
  className: style.button,
  type: 'primary',
  size: 'small',
  htmlType: 'submit'
} as const

function SubmitButton({ status }: { status: Status }) {
  if (status === Status.Submitting) {
    return <Button {...buttonProps} disabled>提交中...</Button>
  }
  if (status === Status.Succeeded) {
    return <Button {...buttonProps} disabled>提交成功</Button>
  }
  return (
    <Button {...buttonProps} disabled={status === Status.Terminated}>提交</Button>
  )
}

// 神策统计需要收集的数据
function getSensorsOptions(consultContent: string, state: ReturnType<typeof createState>) {
  return {
    feedback_content: consultContent,
    feedback_company: state.value.company,
    feedback_name: state.value.name,
    feedback_phone: state.value.phone,
    feedback_email: state.value.email,
    feedback_province: state.value.province
  }
}
