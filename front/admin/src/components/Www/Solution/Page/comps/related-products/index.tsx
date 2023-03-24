/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { FormState } from 'formstate-x'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import {
  SolutionComponentRelatedProductsConfig, SolutionComponentRelatedProductsProps
} from 'constants/solution/page/comp-related-products'
import SelectProducts, { createState as createSelectProductsState } from 'components/common/www/SelectProducts'

function createState(props?: SolutionComponentRelatedProductsProps) {
  return new FormState({
    products: createSelectProductsState(props?.products).withValidator(items => {
      if (![3, 4, 6].includes(items.length)) {
        return '数量只能为 3 4 6'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentRelatedProductsProps
  visible: boolean
  onSubmit(config: SolutionComponentRelatedProductsProps): void
  onCancel(): void
}

const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  function submit() {
    props.onSubmit({ type: 'default', ...state.value })
  }

  return (
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.RelatedProducts]}
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
  const [config, setConfig] = useState<SolutionSection<SolutionComponentRelatedProductsConfig> | undefined>(undefined)
  const {
    visible, resolve, reject, open, render
  } = useModalLike<SolutionSection<SolutionComponentRelatedProductsConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentRelatedProductsConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentRelatedProductsProps) {
    const newConfig: SolutionSection<SolutionComponentRelatedProductsConfig> = {
      name: SolutionModule.RelatedProducts,
      title: solutionModuleTitleMap[SolutionModule.RelatedProducts],
      component: {
        name: SolutionComponentName.RelatedProducts,
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
