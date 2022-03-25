/**
 * @file just for dev & test
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState } from 'formstate-x'
import { useFormstateX, Form, FormItem } from 'react-icecream-form'

import Editor from 'components/common/MarkdownEditor'

import MarkdownPreview from '.'

const initContent = `
abc

-----


  https://www.qiniu.com/pgc/detail/1ab5f2e47164060535b98d89



---

---
https://www.qiniu.com/pgc/detail/4d3d6f84eabc3f758b26c491
---
666


---

https://www.qiniu.com/pgc/detail/763aaacf2df90d158b336dc0

---


---

https://www.qiniu.com/pgc/detail/666

---



123
`

export default observer(function TestEditor() {
  const form = useFormstateX(
    () => new FormState({
      content: new FieldState(initContent).withValidator(value => (
        value.trim() === '' && '内容不能为空' // 其实未必准？
      ))
    }),
    []
  )

  return (
    <div>
      {/* eslint-disable-next-line no-console */}
      <Form state={form} onSubmit={value => console.log(value)}>
        <FormItem required>
          <Editor state={form.$.content} uploadBucketKeyRule="pgc-content" />
        </FormItem>
      </Form>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}><code><pre>{form.$.content.value}</pre></code></div>
        <MarkdownPreview text={form.$.content.value} />
      </div>
    </div>
  )
})
