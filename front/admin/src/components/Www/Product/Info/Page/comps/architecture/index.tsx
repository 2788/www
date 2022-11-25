/**
 * @file 架构图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentArchitectureConfig } from 'constants/product/page/comp-architecture'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

function createState(props?: ProductComponentArchitectureConfig['props']) {
  return new FormState({
    title: new DebouncedFieldState(props?.title ?? ''),
    url: createUploadImgState(props?.url ?? '').withValidator(url => {
      if (url === '') {
        return '不能为空'
      }
    }),
    alt: new DebouncedFieldState(props?.alt ?? '')
  })
}

interface Props {
  props?: ProductComponentArchitectureConfig['props']
  visible: boolean
  onSubmit(config: ProductComponentArchitectureConfig['props']): void
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
    const { title, alt, ...value } = state.value
    const result = {
      ...value,
      ...(title && ({ title })),
      ...(alt && ({ alt }))
    }
    props.onSubmit(result)
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Architecture]}
      width={445}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="标题">
        <TextInput state={state.$.title} />
      </FormItem>
      <FormItem label="图片地址" required>
        <UploadImgInput
          state={state.$.url}
          previewType="contain"
          width={1180}
          height={800}
          maxSize={1024}
        />
      </FormItem>
      <FormItem label="图片说明">
        <TextInput state={state.$.alt} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompArchitecture() {
  const [config, setConfig] = useState<ProductSection<ProductComponentArchitectureConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ProductSection<ProductComponentArchitectureConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentArchitectureConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentArchitectureConfig['props']) {
    const newConfig: ProductSection<ProductComponentArchitectureConfig> = {
      name: ProductModule.Architecture,
      title: productModuleTitleMap[ProductModule.Architecture],
      component: {
        name: ProductComponentName.Architecture,
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
