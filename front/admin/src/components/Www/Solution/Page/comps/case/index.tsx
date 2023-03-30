/**
 * @file 客户案例
 */

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { DrawerForm, useFormstateX, FormItem, TextInput, TextArea } from 'react-icecream-form'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'

import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { SolutionComponentCaseConfig, SolutionComponentCaseProps, CaseItem } from 'constants/solution/page/comp-case'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'

import { useModalLike } from 'utils/async'

import styles from './style.m.less'

function createState(props?: SolutionComponentCaseProps) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        name: new DebouncedFieldState(item.name).withValidator(name => {
          if (name.trim() === '') {
            return '不能为空'
          }
          if (name.length > 30) {
            return '客户名称字数不能超过 30 个'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 150) {
            return '描述信息字数不能超过 150 个'
          }
        }),
        logoUrl: createUploadImgState(item.logoUrl).withValidator(logoUrl => {
          if (logoUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length === 0) {
        return '数量最少 1 个'
      }
      if (items.length > 6) {
        return '数量最多 6 个'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentCaseProps
  visible: boolean
  onSubmit(config: SolutionComponentCaseProps): void
  onCancel(): void
}

export const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  useEffect(() => {
    if (!props.visible) {
      state.reset()
    }
  }, [props.visible, state])

  function submit() {
    props.onSubmit({ type: 'default', ...state.value })
  }

  function addItem() {
    const item: CaseItem = {
      name: '',
      desc: '',
      logoUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Case]}
      width={560}
      layout="horizontal"
      labelWidth="5em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="客户案例" labelWidth="4em" required state={state.$.items}>
        {state.$.items.$.map((itemState, index) => (
          <FormItem
            key={index}
            label={
              <span className={styles.sectionLabel}>
                <span>{index + 1}</span>
                <Button
                  type="link"
                  icon={<DeleteIcon />}
                  className={styles.btn}
                  onClick={() => { removeItem(index) }}
                />
              </span>
            }
            labelWidth="4em"
            className={styles.sectionLabel}
            state={itemState}
          >
            <FormItem label="客户名称" required>
              <TextInput state={itemState.$.name} />
            </FormItem>
            <FormItem label="描述" required>
              <TextArea state={itemState.$.desc} maxCount={150} textareaProps={{ rows: 3 }} />
            </FormItem>
            <FormItem label="客户 logo" required>
              <UploadImgInput
                state={itemState.$.logoUrl}
                previewType="contain"
                width={228}
                height={80}
              />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompCase() {
  const [config, setConfig] = useState<SolutionSection<SolutionComponentCaseConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentCaseConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentCaseConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentCaseProps) {
    const newConfig: SolutionSection<SolutionComponentCaseConfig> = {
      name: SolutionModule.Case,
      title: solutionModuleTitleMap[SolutionModule.Case],
      component: {
        name: SolutionComponentName.Case,
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

  return [start, view] as const
}
