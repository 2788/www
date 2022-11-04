/**
 * @file 方案优势
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
import { SolutionComponentAdvantageConfig, AdvantageItem } from 'constants/solution/page/comp-advantage'
import ImgIconInput, { createState as createImgIconState } from 'components/common/ImgIcon'

import styles from './style.m.less'

function createState(props?: SolutionComponentAdvantageConfig['props']) {
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
        iconUrl: createImgIconState(item.iconUrl).withValidator(iconUrl => {
          if (iconUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (![4, 6].includes(items.length)) {
        return '数量只能为 4 6'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentAdvantageConfig['props']
  visible: boolean
  onSubmit(config: SolutionComponentAdvantageConfig['props']): void
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
    props.onSubmit(state.value)
  }

  function addItem() {
    const item: AdvantageItem = {
      title: '',
      desc: '',
      iconUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Advantage]}
      width={720}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="优势" labelWidth="2em" required state={state.$.items}>
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
                <TextArea state={itemState.$.desc} maxCount={70} textareaProps={{ rows: 3 }} />
              </FormItem>
              <FormItem label="图标地址" required>
                <ImgIconInput state={itemState.$.iconUrl} />
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
  const [config, setConfig] = useState<SolutionSection<SolutionComponentAdvantageConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentAdvantageConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentAdvantageConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentAdvantageConfig['props']) {
    const newConfig: SolutionSection<SolutionComponentAdvantageConfig> = {
      name: SolutionModule.Advantage,
      title: solutionModuleTitleMap[SolutionModule.Advantage],
      component: {
        name: SolutionComponentName.Advantage,
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
