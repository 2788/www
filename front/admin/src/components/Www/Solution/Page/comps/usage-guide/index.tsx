/**
 * @file 底部引导
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { FormState, TransformedState, DebouncedFieldState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { SolutionComponentUsageGuideProps, buttonClickTypes } from 'constants/solution/page/comp-usage-guide'
import { SolutionModule, solutionModuleTitleMap } from 'constants/solution/page'
import { useModalLike } from 'utils/async'
import { SolutionInfo } from 'apis/solution'
import ButtonClick, { createState as createButtonClickState } from 'components/common/www/ButtonClick'

function createState(init?: SolutionComponentUsageGuideProps | null) {
  const state = new FormState({
    title: new DebouncedFieldState(init?.title ?? '').withValidator(title => {
      if (title.trim() === '') {
        return '不能为空'
      }
    }),
    desc: new DebouncedFieldState(init?.desc ?? ''),
    button: new FormState({
      text: new DebouncedFieldState(init?.button.text ?? '').withValidator(text => {
        if (text.trim() === '') {
          return '不能为空'
        }
      }),
      click: createButtonClickState(
        init?.button.click ?? {
          type: 'webLink' as const,
          url: ''
        },
        buttonClickTypes
      )
    })
  })

  return new TransformedState(
    state,
    ({ desc, ...rest }) => ({
      ...(desc && { desc }),
      ...rest
    }),
    ({ desc, ...rest }) => ({
      desc: desc ?? '',
      ...rest
    })
  )
}

export default function useCompUsageGuide(solutionInfo: SolutionInfo | undefined) {
  const { visible, resolve, reject, open } = useModalLike<SolutionComponentUsageGuideProps>()

  const state = useFormstateX(createState, [visible ? solutionInfo?.usageGuide : undefined])

  const fields = state.$.$

  const view = solutionInfo != null && (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.UsageGuide]}
      width={580}
      layout="horizontal"
      labelWidth="4em"
      visible={visible}
      state={state}
      onSubmit={() => { resolve({ type: 'default', ...state.value }) }}
      onCancel={() => { reject() }}
    >
      <FormItem label="标题" required>
        <TextInput state={fields.title} />
      </FormItem>
      <FormItem label="描述">
        <TextInput state={fields.desc} />
      </FormItem>
      <FormItem label="按钮文案" required>
        <TextInput state={fields.button.$.text} />
      </FormItem>
      <FormItem label="按钮点击" required>
        <ButtonClick state={fields.button.$.click} />
      </FormItem>
    </DrawerForm>
  )

  return [open, view] as const
}
