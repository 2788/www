/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentSceneConfig, SceneItem } from 'constants/product/page/comp-scene'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import styles from './style.m.less'

function createState(props?: ProductComponentSceneConfig['props']) {
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
          if (desc.length > 60) {
            return '不能超过 60 个字'
          }
        }),
        imgUrl: createUploadImgState(item.imgUrl).withValidator(imgUrl => {
          if (imgUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (![3, 4].includes(items.length)) {
        return '数量只能为 3 4'
      }
    })
  })
}

interface Props {
  props?: ProductComponentSceneConfig['props']
  visible: boolean
  onSubmit(config: ProductComponentSceneConfig['props']): void
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
    const item: SceneItem = {
      title: '',
      desc: '',
      imgUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Scene]}
      width={570}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="场景" labelWidth="2em" required state={state.$.items}>
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
              <FormItem label="名称" required>
                <TextInput state={itemState.$.title} />
              </FormItem>
              <FormItem label="描述" required>
                <TextArea state={itemState.$.desc} maxCount={60} textareaProps={{ rows: 3 }} />
              </FormItem>
              <FormItem label="图片" required>
                <UploadImgInput
                  state={itemState.$.imgUrl}
                  previewType="cover"
                  width={776}
                  height={370}
                />
              </FormItem>
            </FormItem>
          </Fragment>
        ))}
        <Button icon={<AddIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompScene() {
  const [config, setConfig] = useState<ProductSection<ProductComponentSceneConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ProductSection<ProductComponentSceneConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentSceneConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentSceneConfig['props']) {
    const newConfig: ProductSection<ProductComponentSceneConfig> = {
      name: ProductModule.Scene,
      title: productModuleTitleMap[ProductModule.Scene],
      component: {
        name: ProductComponentName.Scene,
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
