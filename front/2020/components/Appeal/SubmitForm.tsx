/**
 * @file 发起申诉
 */

import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState, bindInput } from 'formstate-x'

import { useFormstateX, Form, FormFooter, FormItem, TextInput, TextArea } from 'react-icecream-2/lib/form-x'

import { bindFormItem, textOfPattern, textNotEmpty } from 'utils/form'
import { useApiWithDialogToaster } from 'hooks/api'
import { AppealType, appealTypeTextMap } from 'constants/appeal'
import { createAppeal, CreateAppealOptions } from 'apis/meihua'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import Card from './Card'
import DomainsInput, * as domainsInput from './DomainsInput'
import FileUploadInput, * as fileUploadInput from './FileUploadInput'

import style from './style.less'

const textAreaMaxCount = 140

function createState() {
  const typeField = new FieldState(AppealType.Domain)
  return new FormState({
    title: new FieldState('').validators(textNotEmpty()),
    type: typeField,
    domains: domainsInput.createState(() => typeField.value !== AppealType.Domain),
    urls: domainsInput.createState(() => typeField.value !== AppealType.Url),
    mobile: new FieldState('').validators(textNotEmpty(), textOfPattern(/^\d{11}$/, '请填写正确的手机号')),
    email: new FieldState('').validators(textNotEmpty(), textOfPattern(/^.+@.+$/, '请填写正确的邮箱')),
    reason: new FieldState('').validators(
      value => value.length > textAreaMaxCount && `不能超过 ${textAreaMaxCount} 个字`
    ),
    attachment: fileUploadInput.createState()
  })
}

export default observer(function SubmitCard({ onSubmitted }: { onSubmitted: () => void }) {
  const state = useFormstateX(createState)
  const fields = state.$
  const type = fields.type.value

  const {
    call: submit,
    Dialog
  } = useApiWithDialogToaster(createAppeal, '申诉提交成功', '申诉提交失败')

  const handleSubmit = useCallback(async () => {
    const { domains, urls, attachment, ...otherValues } = state.value
    const value: CreateAppealOptions = {
      ...otherValues,
      ...(type === AppealType.Domain && { domains: domainsInput.getValidValue(state.$.domains) }),
      ...(type === AppealType.Url && { urls: domainsInput.getValidValue(state.$.urls) }),
      attaches: [fileUploadInput.getValidValue(state.$.attachment)]
    }

    await submit(value)

    state.reset()

    onSubmitted()
  }, [state, type, submit, onSubmitted])

  return (
    <Card className={style.submit} title="发起申诉">
      <Form
        state={state}
        onSubmit={handleSubmit}
        layout="horizontal"
        labelWidth="4em"
        footer={
          <div className={style.submitLine}>
            <FormFooter submitText="提交申诉" />
          </div>
        }
      >
        <FormItem label="标题" required>
          <TextInput state={fields.title} />
        </FormItem>
        <FormItem label="申诉类型" required {...bindFormItem(fields.type)}>
          <RadioGroup {...bindInput(fields.type)} className={style.type}>
            <Radio value={AppealType.Domain}>{appealTypeTextMap[AppealType.Domain]}</Radio>
            <Radio value={AppealType.Account}>{appealTypeTextMap[AppealType.Account]}</Radio>
            <Radio value={AppealType.Url}>{appealTypeTextMap[AppealType.Url]}</Radio>
          </RadioGroup>
        </FormItem>
        <DomainsInput label="申诉域名" state={fields.domains} isDisabled={() => type !== AppealType.Domain} />
        <DomainsInput label="申诉链接" state={fields.urls} isDisabled={() => type !== AppealType.Url} />
        <FormItem label="手机号" required>
          <TextInput inputProps={{ name: 'mobile' }} state={fields.mobile} />
        </FormItem>
        <FormItem label="邮箱" required>
          <TextInput inputProps={{ name: 'email' }} state={fields.email} />
        </FormItem>
        <FormItem label="申诉说明" required>
          <FileUploadInput state={fields.attachment} />
        </FormItem>
        <FormItem label="补充说明">
          <TextArea
            state={fields.reason}
            maxCount={textAreaMaxCount}
            textareaProps={{ rows: 5 }}
          />
        </FormItem>
      </Form>
      <Dialog />
    </Card>
  )
})
