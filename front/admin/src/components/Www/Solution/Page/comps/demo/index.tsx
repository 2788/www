/**
 * @file demo 体验
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import {
  SolutionComponentDemoConfig, SolutionComponentDemoProps, DemoItem
} from 'constants/solution/page/comp-demo'
import WwwUrlPath, { createState as createWwwUrlPathState } from 'components/common/www/UrlPath'

import styles from './style.m.less'

function createState(props?: SolutionComponentDemoProps) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        demoUrl: createWwwUrlPathState(item.demoUrl),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length === 0) {
        return '数量最少 1 个'
      }

      if (items.length > 4) {
        return '数量最多 4 个'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentDemoProps
  visible: boolean
  onSubmit(config: SolutionComponentDemoProps): void
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
    props.onSubmit({ type: 'default', ...state.value })
  }

  function addItem() {
    const item: DemoItem = {
      demoUrl: '',
      desc: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Demo]}
      width={560}
      layout="horizontal"
      labelWidth="2em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="Demo" labelWidth="4ex" required state={state.$.items}>
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
            labelWidth="3em"
            className={styles.sectionItem}
            state={itemState}
          >
            <FormItem label="地址" required>
              <WwwUrlPath state={itemState.$.demoUrl} />
            </FormItem>
            <FormItem label="描述" required>
              <TextInput state={itemState.$.desc} />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompDemo() {
  const [config, setConfig] = useState<SolutionSection<SolutionComponentDemoConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentDemoConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentDemoConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentDemoProps) {
    const newConfig: SolutionSection<SolutionComponentDemoConfig> = {
      name: SolutionModule.Demo,
      title: solutionModuleTitleMap[SolutionModule.Demo],
      component: {
        name: SolutionComponentName.Demo,
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
