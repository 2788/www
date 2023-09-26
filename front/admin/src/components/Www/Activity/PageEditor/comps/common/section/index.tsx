import React from 'react'
import { Form, FormItem, TextInput } from 'react-icecream-form'

import { createSectionState } from './state'
import styles from './style.m.less'

export { createSectionState } from './state'

interface Props {
  forceName?: boolean
  state: ReturnType<typeof createSectionState>
}

export function SectionConfigForm(props: Props) {
  return (
    <Form footer={null} className={styles.form} labelWidth="4em" state={props.state}>
      {props.forceName && (
        <FormItem label="anchor" required tip="内容格式只能是字母数字，用于页面模块的锚点定位">
          <TextInput state={props.state.$.name} />
        </FormItem>
      )}
      <FormItem label="标题" required>
        <TextInput state={props.state.$.title} />
      </FormItem>
      <FormItem label="子标题">
        <TextInput state={props.state.$.subtitle} />
      </FormItem>
    </Form>
  )
}
