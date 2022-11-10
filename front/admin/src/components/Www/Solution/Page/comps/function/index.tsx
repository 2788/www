/**
 * @file 方案功能
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { SolutionComponentFunctionConfig, FunctionItem } from 'constants/solution/page/comp-function'
import WwwUrlPath, { createState as createWwwUrlPathState } from 'components/common/WwwUrlPath'

import styles from './style.m.less'

function createState(props?: SolutionComponentFunctionConfig['props']) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        title: new DebouncedFieldState(item.title).withValidator(title => {
          if (title.trim() === '') {
            return '不能为空'
          }
          if (title.length > 12) {
            return '不能超过 12 个字'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 70) {
            return '不能超过 70 个字'
          }
        }),
        url: createWwwUrlPathState(item.url ?? '')
      })
    )).withValidator(items => {
      if (items.length < 3) {
        return '最少 3 组'
      }
      if (items.length > 9) {
        return '最多 9 组'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentFunctionConfig['props']
  visible: boolean
  onSubmit(config: SolutionComponentFunctionConfig['props']): void
  onCancel(): void
}

const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  useEffect(() => {
    if (!props.visible) {
      state.reset()
    }
  }, [props.visible, state])

  function submit() {
    const { items, ...value } = state.value
    const result = {
      ...value,
      items: items.map(({ url, ...item }) => ({
        ...item,
        ...(url && { url })
      }))
    }
    props.onSubmit(result)
  }

  function addItem() {
    const item: FunctionItem = {
      title: '',
      desc: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Function]}
      width={570}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="功能" labelWidth="2em" required state={state.$.items}>
        {state.$.items.$.map((itemState, index) => (
          <Fragment key={index}>
            <FormItem
              label={
                <span className={styles.section}>
                  <span>{index + 1}</span>
                  <Button
                    type="link"
                    icon={<DeleteIcon />}
                    className={styles.btn}
                    onClick={() => { removeItem(index) }}
                  />
                </span>
              }
              labelWidth="3em"
              state={itemState}
            >
              <FormItem label="标题" required>
                <TextInput state={itemState.$.title} />
              </FormItem>
              <FormItem label="副标题" required>
                <TextArea state={itemState.$.desc} maxCount={70} textareaProps={{ rows: 4 }} />
              </FormItem>
              <FormItem label={<div className={styles.urlLabel}>立即体验<br />跳转地址</div>}>
                <WwwUrlPath state={itemState.$.url} />
              </FormItem>
            </FormItem>
          </Fragment>
        ))}
        <Button icon={<AddIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompAdvantage() {
  const [config, setConfig] = useState<SolutionSection<SolutionComponentFunctionConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentFunctionConfig>>()

  async function createSelectSolutionsState(initConfig?: SolutionSection<SolutionComponentFunctionConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentFunctionConfig['props']) {
    const newConfig: SolutionSection<SolutionComponentFunctionConfig> = {
      name: SolutionModule.Function,
      title: solutionModuleTitleMap[SolutionModule.Function],
      component: {
        name: SolutionComponentName.Function,
        props
      }
    }
    resolve(newConfig)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <CompDrawerForm
      props={config?.component.props}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [createSelectSolutionsState, view] as const
}
