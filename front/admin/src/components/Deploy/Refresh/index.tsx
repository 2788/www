/**
 * @file 刷新缓存
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { FormState, DebouncedFieldState } from 'formstate-x'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { Button, Alert, Dialog, DialogFooter } from 'react-icecream-2'
import { InfoIcon } from 'react-icecream-2/icons'
import { Form, FormItem, useFormstateX, TextArea, Checkbox, useFormFooterCtx } from 'react-icecream-form'

import { wwwPaths, pathRule } from 'constants/deploy/refresh'
import { validatePath } from 'transforms/deploy/refresh'
import { RefreshClient } from 'apis/refresh'

import style from './style.m.less'

function createState() {
  return new FormState({
    paths: new DebouncedFieldState('').withValidator(pathsText => {
      if (pathsText.trim() === '') {
        return
      }
      const paths = getPathsFromTextarea(pathsText)
      for (const [index, path] of paths.entries()) {
        if (path === '') {
          continue // 注意：这里的空字符串并不代表首页
        }
        const result = validatePath(path)
        if (result) {
          return `${result}: ${path} (第 ${index + 1} 行)`
        }
      }
    }),
    withIndex: new DebouncedFieldState(false),
    withSub: new DebouncedFieldState(true)
  }).withValidator(value => {
    const paths = getAllPaths(value)
    if (paths.length === 0) {
      return '请指定刷新路径'
    }
  })
}

function getPathsFromTextarea(textInput: string): string[] {
  return textInput.split('\n').map(line => line.trim())
}

function getAllPaths(value: ReturnType<typeof createState>['value']) {
  const paths = getPathsFromTextarea(value.paths).filter(Boolean)
  if (value.withIndex) {
    paths.push('')
  }
  return [...new Set(paths)].sort()
}

interface FormFooterProps {
  state: ReturnType<typeof createState>
  onSetGlobalDefault(): void
}

function FormFooter({ state, onSetGlobalDefault }: FormFooterProps) {
  const { submitting } = useFormFooterCtx()
  return (
    <div className={style.formFooter}>
      <div>
        <Button type="primary" htmlType="submit" loading={submitting} danger>开始刷新</Button>
        <Button type="secondary" onClick={() => { onSetGlobalDefault() }}>填入主站全局更新默认配置</Button>
      </div>
      <p className={style.formError}>{state.ownError}</p>
    </div>
  )
}

export default observer(function Refresh() {
  const toasterStore = useInjection(ToasterStore)
  const refreshClient = useInjection(RefreshClient)

  const [confirmVisible, setConfirmVisible] = useState(false)

  const state = useFormstateX(() => createState(), [])

  async function refresh() {
    const paths = getAllPaths(state.value)
    // TODO: 获取最终的操作结果
    await toasterStore.promise(refreshClient.refresh(paths, state.value.withSub), '刷新任务提交成功')
    setConfirmVisible(false)
  }

  function setDefaultGlobal() {
    state.set({
      paths: wwwPaths.filter(path => path !== '').join('\n'),
      withIndex: true,
      withSub: true
    })
  }

  return (
    <div className={style.wrapper}>
      <p className={style.doc}>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://github.com/qbox/www/blob/2020/admin-backend/apis.md" target="_blank">相关文档</a>
      </p>
      <Form
        layout="horizontal"
        labelWidth="3em"
        state={state}
        onSubmit={() => { setConfirmVisible(true) }}
        footer={<FormFooter state={state} onSetGlobalDefault={setDefaultGlobal} />}
      >
        <FormItem label="子目录" labelVerticalAlign="text">
          <Checkbox state={state.$.withSub}>需要刷新</Checkbox>
        </FormItem>
        <FormItem label="路径" required>
          <Alert type="info" message={`以 / 开头，不以 / 结尾（完整规则为 ${pathRule.toString()}）`} />
          <TextArea state={state.$.paths} placeholder="每行一个" textareaProps={{ rows: 10 }} />
        </FormItem>
        <FormItem label="" labelVerticalAlign="text">
          <Checkbox state={state.$.withIndex}>首页</Checkbox>
        </FormItem>
      </Form>
      <Dialog
        title="确定刷新？"
        icon={<InfoIcon />}
        visible={confirmVisible}
        onOk={() => refresh()}
        onCancel={() => { setConfirmVisible(false) }}
        footer={<DialogFooter okButtonProps={{ danger: true }} />}
      >
        <ol className={style.previewList}>
          {getAllPaths(state.value).map((path, index) => (<li key={index}>{path || '首页'}</li>))}
        </ol>
      </Dialog>
    </div>
  )
})
