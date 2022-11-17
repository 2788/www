/**
 * @file 客户案例 他们都在用
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentCaseConfig, CaseItem } from 'constants/product/page/comp-case'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import styles from './style.m.less'

function createState(props?: ProductComponentCaseConfig['props']) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
      new FormState({
        name: new DebouncedFieldState(item.name).withValidator(name => {
          if (name.trim() === '') {
            return '不能为空'
          }
        }),
        logoUrl: createUploadImgState(item.logoUrl).withValidator(logoUrl => {
          if (logoUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length < 4) {
        return '最少 4 张'
      }
      if (items.length > 24) {
        return '最多 24 张'
      }
    })
  })
}

interface Props {
  props?: ProductComponentCaseConfig['props']
  visible: boolean
  onSubmit(config: ProductComponentCaseConfig['props']): void
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
    const item: CaseItem = {
      name: '',
      logoUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Case]}
      width={570}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="客户" labelWidth="2em" required state={state.$.items}>
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
            <FormItem label="名称" required>
              <TextInput state={itemState.$.name} />
            </FormItem>
            <FormItem label="图标地址" required>
              <UploadImgInput
                state={itemState.$.logoUrl}
                previewType="contain"
                width={182}
                height={52}
                maxSize={100}
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
  const [config, setConfig] = useState<ProductSection<ProductComponentCaseConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ProductSection<ProductComponentCaseConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentCaseConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentCaseConfig['props']) {
    const newConfig: ProductSection<ProductComponentCaseConfig> = {
      name: ProductModule.Case,
      title: productModuleTitleMap[ProductModule.Case],
      component: {
        name: ProductComponentName.Case,
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
