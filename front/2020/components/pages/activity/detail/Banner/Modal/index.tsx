import React, { FormEvent, useState, useMemo } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate-x'

import { Modal } from 'react-icecream'
import Form from 'react-icecream/lib/form'
import Input from 'react-icecream/lib/input'

import { createRegistration as doSubmit } from 'apis/admin/activity'
import { bindFormItem, bindTextInput, textNotEmpty, textOfPattern } from 'utils/form'
import { track as sensorsTrack } from 'utils/sensors'
import { ApiException } from 'utils/fetch'
import { useFormState } from 'hooks/form'
import { useOverlay } from 'components/Overlay'
import { useUserInfo } from 'components/UserInfo'
import Button from 'components/UI/Button'
import OverlayModal from 'components/UI/OverlayModal'

import style from './style.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 14 }
  }
}

enum Status {
  Initial,
  Submitting,
  Failed
}

export default observer(function MyModal({ marketActivityId }: { marketActivityId: string }) {
  const userInfo = useUserInfo()
  const state = useFormState(() => createState({ ...userInfo }))
  const { remove: removeModal } = useOverlay()
  const fields = state.$
  const [status, setStatus] = useState(Status.Initial)
  const [errorMsg, setErrorMsg] = useState('报名失败，请稍后重试')

  const buttonView = (
    status === Status.Submitting
      ? <Button type="primary" htmlType="submit" disabled>报名中...</Button>
      : <Button type="primary" htmlType="submit">立即报名</Button>
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = await state.validate()
    if (result.hasError) return

    const value = state.value
    sensorsTrack('WwwActivityRegistration', getSensorsOptions(marketActivityId, state))
    setStatus(Status.Submitting)
    try {
      await doSubmit({ ...value, marketActivityId })
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

  return (
    <OverlayModal title="报名信息" className={style.modal}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="姓名" required {...bindFormItem(fields.userName)}>
          <Input name="userName" {...bindTextInput(fields.userName)} />
        </Form.Item>
        <Form.Item label="手机号" required {...bindFormItem(fields.phoneNumber)}>
          <Input name="phoneNumber" {...bindTextInput(fields.phoneNumber)} />
        </Form.Item>
        <Form.Item label="邮箱" required {...bindFormItem(fields.email)}>
          <Input name="email" {...bindTextInput(fields.email)} />
        </Form.Item>
        <Form.Item label="公司" {...bindFormItem(fields.company)}>
          <Input name="company" {...bindTextInput(fields.company)} />
        </Form.Item>
        {errorView}
        <div className={style.submitLine}>
          {buttonView}
        </div>
      </Form>
    </OverlayModal>
  )
})

const validateRequired = textNotEmpty('请填写')
const validatePhone = textOfPattern(/^(13[0-9]|14[579]|15[012356789]|166|17[235678]|18[0-9]|19[01589])[0-9]{8}$/, '请填写正确的手机号')
const validateEmail = textOfPattern(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z0-9](?:[\w-]*[\w])?/, '请填写正确的 E-mail 地址')

interface IProps {
  name: string,
  phoneNumber: string,
  email: string,
  company: string
}

const defaultStateValue = {
  name: '',
  phoneNumber: '',
  email: '',
  company: ''
} as IProps

function createState(props: Partial<IProps>) {
  props = { ...defaultStateValue, ...props }
  return new FormState({
    userName: new FieldState(props.name!).validators(validateRequired),
    phoneNumber: new FieldState(props.phoneNumber!).validators(validateRequired, validatePhone),
    email: new FieldState(props.email!).validators(validateRequired, validateEmail),
    company: new FieldState(props.company!)
  })
}

function hasCode(data: any): data is { code: number } {
  return Boolean(data.code) && typeof data.code === 'number'
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
      return '市场活动 id 不合法'
    case 400005:
      return '同一个 uid 报名人数达到上限'
    case 400006:
      return '电话号码不合法'
    default:
      return '未知错误'
  }
}

// 神策统计需要收集的数据
function getSensorsOptions(activityId: string, state: ReturnType<typeof createState>) {
  return {
    activity_id: activityId,
    registration_name: state.value.userName,
    registration_phone: state.value.phoneNumber,
    registration_email: state.value.email,
    registration_company: state.value.company
  }
}
