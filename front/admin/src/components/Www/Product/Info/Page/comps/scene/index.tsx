/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentSceneConfig, ProductComponentSceneProps } from 'constants/product/page/comp-scene'
import Scene, { SceneType, SceneConfig, createState as createSceneState } from 'components/common/www/Scene'

function createState(props?: ProductComponentSceneProps) {
  function getSceneConfig(): SceneConfig | undefined {
    if (props == null) {
      return undefined
    }

    if (props.type !== 'default' && props.type != null) {
      return props
    }

    // 兼容老数据
    const verticalSceneConfig = {
      ...props,
      type: SceneType.Vertical as const
    }
    return verticalSceneConfig
  }

  return createSceneState(
    [SceneType.Vertical, SceneType.HorizontalDetail],
    getSceneConfig()
  )
}

interface Props {
  props?: ProductComponentSceneProps
  visible: boolean
  onSubmit(config: ProductComponentSceneProps): void
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

  return (
    <DrawerForm
      title={productModuleTitleMap[ProductModule.Scene]}
      width={725}
      layout="horizontal"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem>
        <Scene state={state} labelWidth="4em" previewTypeSize={{ width: '700px', height: '400px' }} />
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

  function submit(props: ProductComponentSceneProps) {
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
