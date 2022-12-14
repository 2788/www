/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentRelatedConfig, ProductComponentRelatedProps } from 'constants/product/page/comp-related'
import SelectProducts, { createState as createSelectProductsState } from 'components/common/www/SelectProducts'

function createState(props?: ProductComponentRelatedProps) {
  return new FormState({
    products: createSelectProductsState(props?.products).withValidator(items => {
      if (![3, 4, 6].includes(items.length)) {
        return '数量只能为 3 4 6'
      }
    })
  })
}

interface Props {
  props?: ProductComponentRelatedProps
  visible: boolean
  onSubmit(config: ProductComponentRelatedProps): void
  onCancel(): void
}

const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  function submit() {
    props.onSubmit({ type: 'default', ...state.value })
  }

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Related]}
      width={450}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="产品列表" required>
        <SelectProducts state={state.$.products} isVertical />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompRelated() {
  const [config, setConfig] = useState<ProductSection<ProductComponentRelatedConfig> | undefined>(undefined)
  const { visible, resolve, reject, open, render } = useModalLike<ProductSection<ProductComponentRelatedConfig>>()

  async function start(initConfig?: ProductSection<ProductComponentRelatedConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ProductComponentRelatedProps) {
    const newConfig: ProductSection<ProductComponentRelatedConfig> = {
      name: ProductModule.Related,
      title: productModuleTitleMap[ProductModule.Related],
      component: {
        name: ProductComponentName.Related,
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

  const view = render(
    <CompDrawerForm
      props={config?.component.props}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [start, view] as const
}
