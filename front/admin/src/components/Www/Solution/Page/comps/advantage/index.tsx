/**
 * @file 核心优势
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { DrawerForm, FormItem, useFormstateX } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { SolutionComponentAdvantageConfig, SolutionComponentAdvantageProps } from 'constants/solution/page/comp-advantage'

import Advantage, { AdvantageConfig, AdvantageType, createState as createAdvantageState } from 'components/common/www/Advantage'

function createState(props?: SolutionComponentAdvantageProps) {
  function getAdvantageConfig(): AdvantageConfig<AdvantageType.VerticalIcon | AdvantageType.VerticalImg> | undefined {
    if (props == null) {
      return undefined
    }

    if (props.type !== 'default' && props.type != null) {
      return props
    }

    const horizontalAdvantageConfig = {
      ...props,
      type: AdvantageType.VerticalIcon as const
    }

    return horizontalAdvantageConfig
  }

  return createAdvantageState(
    [AdvantageType.VerticalIcon, AdvantageType.VerticalImg],
    getAdvantageConfig()
  )
}

interface Props {
  props?: SolutionComponentAdvantageProps
  visible: boolean
  onSubmit(config: SolutionComponentAdvantageProps): void
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
      title={solutionModuleTitleMap[SolutionModule.Advantage]}
      width={685}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem>
        <Advantage state={state} labelWidth="4em" previewTypeSize={{ width: '700px', height: '400px' }} />
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

  function submit(props: SolutionComponentAdvantageProps) {
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
