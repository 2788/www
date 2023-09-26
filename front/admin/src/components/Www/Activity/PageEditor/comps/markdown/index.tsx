/**
 * @file 富文本块
 * @author  yinxulai <yinxulai@qiniu.com>
*/

import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState } from 'formstate-x'
import { DrawerForm, Form, FormItem } from 'react-icecream-form'

import { ActivityComponentName } from 'constants/activity/page/comp-common'
import { ActivitySection, activityComponentNameTitleMap } from 'constants/activity/page'
import { ActivityComponentMarkdownProps, MarkdownComponentConfig } from 'constants/activity/page/comp-markdown'

import MarkdownEditor from 'components/common/MarkdownEditor'

import { SectionConfigForm, createSectionState } from '../common/section'
import { useModalLike } from 'utils/async'

function createState(init?: ActivityComponentMarkdownProps | null) {
  return new FormState({
    content: new FieldState(init?.content ?? '# TODO')
  })
}

interface Props {
  props?: ActivitySection<MarkdownComponentConfig>
  onSubmit(config: ActivitySection<MarkdownComponentConfig>): void

  visible: boolean
  onCancel(): void
}

const MarkdownDrawerForm = observer((props: Props) => {
  const sectionState = useMemo(() => createSectionState(props.props), [props.props])
  const componentState = useMemo(() => createState(props.props?.component.props), [props.props])

  function submit() {
    props.onSubmit({
      repeated: true,
      name: sectionState.value.name,
      title: sectionState.value.title,
      subtitle: sectionState.value.subtitle,
      component: {
        name: ActivityComponentName.Markdown,
        props: {
          type: 'default',
          content: componentState.$.content.value
        }
      }
    })
  }

  return (
    <DrawerForm
      title={activityComponentNameTitleMap[ActivityComponentName.Markdown]}
      width={800}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={componentState}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <SectionConfigForm forceName state={sectionState} />
      <Form footer={null} labelWidth="4em" state={componentState}>
        <FormItem label="说明" required>
          <MarkdownEditor
            state={componentState.$.content}
            uploadBucketKeyRule="activity-content"
          />
        </FormItem>
      </Form>
    </DrawerForm>
  )
})

export default function useMarkdown() {
  const [config, setConfig] = useState<ActivitySection<MarkdownComponentConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ActivitySection<MarkdownComponentConfig>>()

  async function createConfig(initConfig?: ActivitySection<MarkdownComponentConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ActivitySection<MarkdownComponentConfig>) {
    resolve(props)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <MarkdownDrawerForm
      props={config}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [createConfig, view] as const
}
