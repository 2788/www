/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { SolutionComponentSceneConfig, SolutionComponentSceneProps } from 'constants/solution/page/comp-scene'
import Scene, { SceneType, SceneConfig, createState as createSceneState } from 'components/common/www/Scene'

function createState(props?: SolutionComponentSceneProps) {
  function getSceneConfig(): SceneConfig<SceneType.HorizontalDetail | SceneType.Vertical> | undefined {
    if (props == null) {
      return undefined
    }

    if (props.type !== 'default' && props.type != null) {
      return props
    }

    // 兼容老数据
    const verticalSceneConfig = {
      ...props,
      type: SceneType.HorizontalDetail as const
    }
    return verticalSceneConfig
  }

  return createSceneState(
    [SceneType.HorizontalDetail, SceneType.Vertical],
    getSceneConfig()
  )
}

interface Props {
  props?: SolutionComponentSceneProps
  visible: boolean
  onSubmit(config: SolutionComponentSceneProps): void
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
      title={solutionModuleTitleMap[SolutionModule.Scene]}
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
  const [config, setConfig] = useState<SolutionSection<SolutionComponentSceneConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentSceneConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentSceneConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentSceneProps) {
    const newConfig: SolutionSection<SolutionComponentSceneConfig> = {
      name: SolutionModule.Scene,
      title: solutionModuleTitleMap[SolutionModule.Scene],
      component: {
        name: SolutionComponentName.Scene,
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
