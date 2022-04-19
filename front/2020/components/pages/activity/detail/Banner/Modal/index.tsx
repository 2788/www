import React, { useState, useMemo, useRef } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState, ValueOf } from 'formstate-x'

import { Modal } from 'react-icecream'
import { PopupContainerProvider } from 'react-icecream-2'
import { useFormstateX, Form, FormItem, TextInput, Select, SelectOption, Checkbox } from 'react-icecream-2/esm/form-x'

import { verifySms, VerificationSmsOperation } from 'apis/admin/verification'
import { createRegistration as doSubmit, IRegistrationOptions, ISession } from 'apis/admin/activity'
import { track as sensorsTrack } from 'utils/sensors'
import { ApiException } from 'utils/fetch'
import { useOverlay } from 'components/Overlay'
import { useUserInfo } from 'components/UserInfo'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import OverlayModal from 'components/UI/OverlayModal'

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

const industries = [
  '政府及公共事业', '教育', '医疗', '交通', '能源', '金融', '制造',
  '信息与通信服务', '传媒', '互联网', '地产建筑', '零售与物流', '其他'
]
const departments = [
  '管理部', '技术部', '人力资源', '财务', '行政', '市场营销',
  '销售', '采购', '运营', '生产', '物流', '其他'
]
const positions = [
  '首席执行官/总经理', '首席信息官/IT经理', '市场总监/经理', '销售总监/经理',
  '技术总监/经理', '工程技术人员', '专员', '其他'
]
const relationships = [
  '客户', '生态伙伴/渠道', '媒体', '开发者', '员工', '分析师', '学生', '其他'
]

type Props = {
  marketActivityId: string
  sessions: ISession[]
}

export default observer(function MyModal({ marketActivityId, sessions }: Props) {
  const userInfo = useUserInfo()
  const form = useFormstateX(
    () => createState({
      ...userInfo,
      marketActivitySessionId: sessions.length === 0 ? 'default' : null
    }),
    [sessions.length, userInfo]
  )
  const { remove: removeModal } = useOverlay()
  const fields = form.$
  const [status, setStatus] = useState(Status.Initial)
  const [errorMsg, setErrorMsg] = useState('报名失败，请稍后重试')

  const buttonView = (
    status === Status.Submitting
      ? <Button type="primary" htmlType="submit" disabled>报名中...</Button>
      : <Button type="primary" htmlType="submit">立即报名</Button>
  )

  async function handleSubmit() {
    const value: Value = form.value
    sensorsTrack('WwwActivityRegistration', getSensorsOptions(marketActivityId, value))
    setStatus(Status.Submitting)
    try {
      const { location, phoneInfo, ...rest } = value
      await verifySms(phoneInfo.captcha, phoneInfo.phoneNumber, VerificationSmsOperation.ApplyActivity)
      const opts = {
        ...rest,
        location: `${location.province}/${location.city}`,
        phoneNumber: phoneInfo.phoneNumber,
        marketActivityId
      } as IRegistrationOptions
      await doSubmit(opts)
      removeModal()
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
    <OverlayModal title="报名信息" className={style.modal}>
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
          <FormItem label="姓名" required>
            <TextInput inputProps={{ name: 'userName' }} placeholder="请填写姓名" state={fields.userName} className={style.itemContent} />
          </FormItem>
          <PhoneInfoInput state={fields.phoneInfo} operation={VerificationSmsOperation.ApplyActivity} />
          <FormItem label="邮箱" required>
            <TextInput inputProps={{ name: 'email' }} placeholder="请填写邮箱" state={fields.email} className={style.itemContent} />
          </FormItem>
          <LocationInput state={fields.location} />
          <FormItem label="所在行业" required>
            <Select state={fields.industry} placeholder="请选择所在行业" className={style.itemContent}>
              {
                industries.map((item, index) => (
                  <SelectOption value={item} key={index}>{item}</SelectOption>
                ))
              }
            </Select>
          </FormItem>
          <FormItem label="公司" required>
            <TextInput inputProps={{ name: 'company' }} placeholder="请填写公司" state={fields.company} className={style.itemContent} />
          </FormItem>
          <FormItem label="部门" required>
            <Select state={fields.department} placeholder="请选择部门" className={style.itemContent}>
              {
                departments.map((item, index) => (
                  <SelectOption value={item} key={index}>{item}</SelectOption>
                ))
              }
            </Select>
          </FormItem>
          <FormItem label="职位" required>
            <Select state={fields.position} placeholder="请选择职位" className={style.itemContent}>
              {
                positions.map((item, index) => (
                  <SelectOption value={item} key={index}>{item}</SelectOption>
                ))
              }
            </Select>
          </FormItem>
          <FormItem label="与七牛的关系" required>
            <Select state={fields.relationship} placeholder="请选择与七牛的关系" className={style.itemContent}>
              {
                relationships.map((item, index) => (
                  <SelectOption value={item} key={index}>{item}</SelectOption>
                ))
              }
            </Select>
          </FormItem>
          {
            sessions.length !== 0 && (
              <FormItem label="场次" required>
                <Select state={fields.marketActivitySessionId} placeholder="请选择场次" className={style.itemContent}>
                  {
                    sessions.map((item, index) => (
                      <SelectOption value={item.id} key={index}>{item.title}</SelectOption>
                    ))
                  }
                </Select>
              </FormItem>
            )
          }
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
    </OverlayModal>
  )
})

interface IProps {
  name: string
  phoneNumber: string
  captcha: string
  email: string
  company: string
  province: string | null // 所在省份
  city: string | null // 所在城市
  industry: string | null // 所在行业
  department: string | null // 部门
  position: string | null // 职位
  relationship: string | null // 与七牛的关系
  marketActivitySessionId: string | null // 活动场次 id
  isReaded: boolean
}

const defaultStateValue = {
  name: '',
  phoneNumber: '',
  captcha: '',
  email: '',
  company: '',
  province: null,
  city: null,
  industry: null,
  department: null,
  position: null,
  relationship: null,
  marketActivitySessionId: null,
  isReaded: false
} as IProps

type State = FormState<{
  userName: FieldState<string>
  phoneInfo: phoneInfoInput.State
  email: FieldState<string>
  company: FieldState<string>
  location: locationInput.State
  industry: FieldState<string | null>
  department: FieldState<string | null>
  position: FieldState<string | null>
  relationship: FieldState<string | null>
  marketActivitySessionId: FieldState<string | null>
  isReaded: FieldState<boolean>
}>

type Value = ValueOf<State>

const validateIsReaded = (checked: boolean) => (checked ? null : '请勾选同意协议内容')

function createState(originalProps: Partial<IProps>): State {
  const props = { ...defaultStateValue, ...originalProps }
  return new FormState({
    userName: new FieldState(props.name).validators(validateTextRequired),
    phoneInfo: phoneInfoInput.createState({ phoneNumber: props.phoneNumber, captcha: props.captcha }),
    email: new FieldState(props.email).validators(validateTextRequired, validateEmail),
    company: new FieldState(props.company).validators(validateTextRequired),
    location: locationInput.createState({ province: props.province, city: props.city }),
    industry: new FieldState(props.industry).validators(validateSelectorRequired),
    department: new FieldState(props.department).validators(validateSelectorRequired),
    position: new FieldState(props.position).validators(validateSelectorRequired),
    relationship: new FieldState(props.relationship).validators(validateSelectorRequired),
    marketActivitySessionId: new FieldState(props.marketActivitySessionId).validators(validateSelectorRequired),
    isReaded: new FieldState(props.isReaded).validators(validateIsReaded)
  })
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
    registration_company: value.company,
    registration_province: value.location.province,
    registration_city: value.location.city,
    registration_industry: value.industry,
    registration_department: value.department,
    registration_position: value.position,
    registration_relationship: value.relationship,
    registration_session_id: value.marketActivitySessionId
  }
}
