/**
 * @file 加入社群
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { DrawerForm } from 'react-icecream-form'

import { PartnerComponentConfig } from 'constants/activity/page/comp-partner'
import { ActivitySection, activityComponentNameTitleMap } from 'constants/activity/page'

import { ActivityComponentName } from 'constants/activity/page/comp-common'
import { createSectionState, SectionConfigForm } from '../common/section'
import { useModalLike } from 'utils/async'

interface Props {
  props?: ActivitySection<PartnerComponentConfig>
  onSubmit(config: ActivitySection<PartnerComponentConfig>): void

  visible: boolean
  onCancel(): void
}

const DrawerFormContent = observer((props: Props) => {
  const sectionState = useMemo(() => createSectionState(props.props), [props.props])

  function submit() {
    props.onSubmit({
      repeated: false,
      name: ActivityComponentName.Partner,
      title: sectionState.value.title,
      subtitle: sectionState.value.subtitle,
      component: {
        name: ActivityComponentName.Partner,
        props: {
          type: 'default'
        }
      }
    })
  }

  return (
    <DrawerForm
      title={activityComponentNameTitleMap[ActivityComponentName.Partner]}
      width={570}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={sectionState}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <SectionConfigForm state={sectionState} />
    </DrawerForm>
  )
})

export default function usePartner() {
  const [config, setConfig] = useState<ActivitySection<PartnerComponentConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ActivitySection<PartnerComponentConfig>>()

  async function createConfig(initConfig?: ActivitySection<PartnerComponentConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ActivitySection<PartnerComponentConfig>) {
    resolve(props)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <DrawerFormContent
      props={config}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [createConfig, view] as const
}
