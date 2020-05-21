/**
 * @file 合作页面申请表单
 */

import React, { useRef, FormEvent, useState } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState } from 'formstate-x'
import Form from 'react-icecream/lib/form'
import Input from 'react-icecream/lib/input'
import { createDeveloperCooperation as doSubmit } from 'apis/legacy'
import { bindFormItem, bindTextInput, textNotEmpty, textOfPattern } from 'utils/form'
import Button from 'components/UI/Button'

import style from './style.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

enum Status {
  Initial,
  Submitting,
  Failed,
  Succeeded
}

export default observer(function ApplyForm() {
  const state = useRef(createState()).current
  const fields = state.$
  const [status, setStatus] = useState(Status.Initial)

  const buttonView = (
    status === Status.Submitting
    ? <Button type="primary" htmlType="submit" disabled>提交中...</Button>
    : <Button type="primary" htmlType="submit">提交</Button>
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = await state.validate()
    if (result.hasError) return

    const value = state.value
    setStatus(Status.Submitting)
    try {
      await doSubmit({
        resource_name: value.name,
        resource_desc: value.desc,
        author_name: value.userName,
        phone: value.phone,
        im: value.qq,
        email: value.email,
        website: value.userHomepage,
        download_link: value.downloadUrl,
        doc_link: value.docUrl,
        sourcecode_link: value.srcUrl
      })
      setStatus(Status.Succeeded)
    } catch {
      setStatus(Status.Failed)
    }
  }

  if (status === Status.Succeeded) {
    return (
      <p className={style.successLine}>感谢提交！我们会尽快处理</p>
    )
  }

  const errorView = status === Status.Failed && (
    <p className={style.errorLine}>提交失败，请稍后重试</p>
  )

  return (
    <Form className={style.wrapper} onSubmit={handleSubmit} {...formItemLayout}>
      <Form.Item label="资源名称" required {...bindFormItem(fields.name)}>
        <Input name="name" {...bindTextInput(fields.name)} />
      </Form.Item>
      <Form.Item label="资源描述" required {...bindFormItem(fields.desc)}>
        <Input name="desc" {...bindTextInput(fields.desc)} />
      </Form.Item>
      <Form.Item label="姓名" required {...bindFormItem(fields.userName)}>
        <Input name="userName" {...bindTextInput(fields.userName)} />
      </Form.Item>
      <Form.Item label="手机" required {...bindFormItem(fields.phone)}>
        <Input name="phone" {...bindTextInput(fields.phone)} />
      </Form.Item>
      <Form.Item label="QQ" required {...bindFormItem(fields.qq)}>
        <Input name="qq" {...bindTextInput(fields.qq)} />
      </Form.Item>
      <Form.Item label="E-mail" required {...bindFormItem(fields.email)}>
        <Input name="email" {...bindTextInput(fields.email)} />
      </Form.Item>
      <Form.Item label="作者主页" {...bindFormItem(fields.userHomepage)}>
        <Input name="userHomepage" {...bindTextInput(fields.userHomepage)} />
      </Form.Item>
      <Form.Item label="下载链接" required {...bindFormItem(fields.downloadUrl)}>
        <Input name="downloadUrl" {...bindTextInput(fields.downloadUrl)} />
      </Form.Item>
      <Form.Item label="文档链接" required {...bindFormItem(fields.docUrl)}>
        <Input name="docUrl" {...bindTextInput(fields.docUrl)} />
      </Form.Item>
      <Form.Item label="源码链接" required {...bindFormItem(fields.srcUrl)}>
        <Input name="srcUrl" {...bindTextInput(fields.srcUrl)} />
      </Form.Item>
      {errorView}
      <div className={style.submitLine}>
        {buttonView}
      </div>
    </Form>
  )
})

const validateRequired = textNotEmpty('请填写')
const validatePhone = textOfPattern(/^\d{11}$/, '请填写正确的手机号')
const validateQQ = textOfPattern(/^\d{5,}$/, '请填写正确的 QQ 号')
const validateUrl = textOfPattern(/^[a-z]+:\/\/\w+/, '请填写正确的 URL 地址')
const validateEmail = textOfPattern(/^.+@.+$/, '请填写正确的 E-mail 地址')

function createState() {
  return new FormState({
    name: new FieldState('').validators(validateRequired),
    desc: new FieldState('').validators(validateRequired),
    userName: new FieldState('').validators(validateRequired),
    phone: new FieldState('').validators(validateRequired, validatePhone),
    qq: new FieldState('').validators(validateRequired, validateQQ),
    email: new FieldState('').validators(validateRequired, validateEmail),
    userHomepage: new FieldState(''),
    downloadUrl: new FieldState('').validators(validateRequired, validateUrl),
    docUrl: new FieldState('').validators(validateRequired, validateUrl),
    srcUrl: new FieldState('').validators(validateRequired, validateUrl)
  })
}
