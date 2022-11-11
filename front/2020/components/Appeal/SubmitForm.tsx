/**
 * @file 发起申诉
 */

import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { FormState, FieldState, bindInput } from 'formstate-x'

import { useFormstateX, Form, FormFooter, FormItem, TextInput, TextArea } from 'react-icecream-2/lib/form-x'

import { bindFormItem, textOfPattern, textNotEmpty } from 'utils/form'
import { isHost, isUrl } from 'utils'
import { useApiWithDialogToaster } from 'hooks/api'
import { AppealType, appealTypeTextMap } from 'constants/appeal'
import { createAppeal, CreateAppealOptions } from 'apis/meihua'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import Card from './Card'
import MultiTextInput, { useMultiTextInputState, State as MultiTextInputFormState } from './MultiTextInput'
import FileUploadInput, * as fileUploadInput from './FileUploadInput'

import style from './style.less'

const textAreaMaxCount = 140

const validateDomain = (domain: string) => !isHost(domain) && '请填写正确的域名'
const validateUrl = (url: string) => !isUrl(url) && '请填写正确的地址'

function isAttachmentAvailable(type: AppealType) {
  return type !== AppealType.Url
}

function createTypeField(appealType = AppealType.Domain) {
  return new FieldState(appealType)
}

function createState(
  typeState: FieldState<AppealType>,
  domainsState: MultiTextInputFormState,
  urlsState: MultiTextInputFormState
) {
  return new FormState({
    title: new FieldState('').validators(textNotEmpty()),
    type: typeState,
    domains: domainsState,
    urls: urlsState,
    mobile: new FieldState('').validators(textNotEmpty(), textOfPattern(/^\d{11}$/, '请填写正确的手机号')),
    email: new FieldState('').validators(textNotEmpty(), textOfPattern(/^.+@.+$/, '请填写正确的邮箱')),
    reason: new FieldState('').validators(
      value => value.length > textAreaMaxCount && `不可超过 ${textAreaMaxCount} 个字`
    ),
    attachment: fileUploadInput.createState().disableValidationWhen(() => !isAttachmentAvailable(typeState.value))
  })
}

function useSubmitState() {
  const typeField = useFormstateX(createTypeField, [])

  const isDomainsStateDisabled = useCallback(() => typeField.value !== AppealType.Domain, [typeField])
  const domainsState = useMultiTextInputState(validateDomain, isDomainsStateDisabled)

  const isUrlsStateDisabled = useCallback(() => typeField.value !== AppealType.Url, [typeField])
  const urlsState = useMultiTextInputState(validateUrl, isUrlsStateDisabled)

  const form = useFormstateX(
    () => createState(typeField, domainsState.form, urlsState.form),
    [typeField, domainsState.form, urlsState.form]
  )

  return {
    domainsState,
    urlsState,
    form
  }
}

export default observer(function SubmitCard({ onSubmitted }: { onSubmitted: () => void }) {
  const { form, domainsState, urlsState } = useSubmitState()
  const fields = form.$
  const type = fields.type.value

  const {
    call: submit,
    Dialog
  } = useApiWithDialogToaster(createAppeal, '申诉提交成功', '申诉提交失败')

  const getValidDomains = domainsState.getValidValue
  const getValidUrls = urlsState.getValidValue
  const handleSubmit = useCallback(async () => {
    const { domains, urls, attachment, ...otherValues } = form.value
    const value: CreateAppealOptions = {
      ...otherValues,
      ...(type === AppealType.Domain && { domains: getValidDomains() }),
      ...(type === AppealType.Url && { urls: getValidUrls() }),
      ...(isAttachmentAvailable(type) && {
        attaches: [fileUploadInput.getValidValue(form.$.attachment)]
      })
    }

    await submit(value)

    form.reset()

    onSubmitted()
  }, [form, type, getValidDomains, getValidUrls, submit, onSubmitted])

  return (
    <Card className={style.submit} title="发起申诉">
      <Form
        state={form}
        onSubmit={handleSubmit}
        layout="horizontal"
        labelWidth="4em"
        footer={<FormFooter align="right" submitText="提交申诉" />}
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
        <MultiTextInput label="申诉域名" state={domainsState} />
        <MultiTextInput label="申诉链接" state={urlsState} />
        <FormItem label="手机号" required>
          <TextInput inputProps={{ name: 'mobile' }} state={fields.mobile} />
        </FormItem>
        <FormItem label="邮箱" required>
          <TextInput inputProps={{ name: 'email' }} state={fields.email} />
        </FormItem>
        <FormItem
          label="申诉说明"
          required
          className={isAttachmentAvailable(fields.type.value) ? undefined : style.hide}
        >
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
