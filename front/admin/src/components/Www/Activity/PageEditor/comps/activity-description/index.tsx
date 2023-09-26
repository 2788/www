/**
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { DrawerForm } from 'react-icecream-form'

import { ActivityDescriptionComponentConfig } from 'constants/activity/page/comp-activity-description'
import { ActivitySection, activityComponentNameTitleMap } from 'constants/activity/page'

import { ActivityComponentName } from 'constants/activity/page/comp-common'
import { createSectionState, SectionConfigForm } from '../common/section'
import { useModalLike } from 'utils/async'

interface Props {
  props?: ActivitySection<ActivityDescriptionComponentConfig>
  onSubmit(config: ActivitySection<ActivityDescriptionComponentConfig>): void

  visible: boolean
  onCancel(): void
}

const DrawerFormContent = observer((props: Props) => {
  const sectionState = useMemo(() => createSectionState(props.props), [props.props])

  function submit() {
    props.onSubmit({
      repeated: false,
      name: ActivityComponentName.ActivityDescription,
      title: sectionState.value.title,
      subtitle: sectionState.value.subtitle,
      component: {
        name: ActivityComponentName.ActivityDescription,
        props: {
          type: 'default'
        }
      }
    })
  }

  return (
    <DrawerForm
      title={activityComponentNameTitleMap[ActivityComponentName.ActivityDescription]}
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

export default function useActivityDescription() {
  const [config, setConfig] = useState<ActivitySection<ActivityDescriptionComponentConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<ActivitySection<ActivityDescriptionComponentConfig>>()

  async function createConfig(initConfig?: ActivitySection<ActivityDescriptionComponentConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ActivitySection<ActivityDescriptionComponentConfig>) {
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
