/**
 * @file 视频看点
 * @author  yinxulai <yinxulai@qiniu.com>
 */

import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-icecream-2'
import { AddThinIcon } from 'react-icecream/icons'
import { ArrayFormState, FormState, FieldState } from 'formstate-x'
import { DatePicker, DrawerForm, FormItem, TextInput } from 'react-icecream-form'

import {
  HighlightVideo,
  VideoHighlightsComponentConfig,
  VideoHighlightsComponentProps
} from 'constants/activity/page/comp-video-highlights'
import {
  ActivitySection,
  activityComponentNameTitleMap
} from 'constants/activity/page'
import { UploadImgInput } from 'components/common/Upload/Img'
import UploadVideo from 'components/common/Upload/Video'

import { useModalLike } from 'utils/async'
import { ActivityComponentName } from 'constants/activity/page/comp-common'
import { SectionConfigForm, createSectionState } from '../common/section'

function createState(init?: VideoHighlightsComponentProps | null) {
  const initData = init?.videos ? init?.videos : []
  return new ArrayFormState(initData, item => {
    const nonNull = (v: string) => !v && '不能为空'

    const title = new FieldState(item.title).withValidator(nonNull)
    const description = new FieldState(item.description).withValidator(nonNull)
    const coverUrl = new FieldState(item.coverUrl).withValidator(nonNull)
    const videoUrl = new FieldState(item.videoUrl).withValidator(nonNull)
    const releaseTime = new FieldState(item.releaseTime)
    return new FormState({ title, description, coverUrl, videoUrl, releaseTime })
  })
}

interface Props {
  props?: ActivitySection<VideoHighlightsComponentConfig>
  onSubmit(config: ActivitySection<VideoHighlightsComponentConfig>): void

  visible: boolean
  onCancel(): void
}

const VideoHighlightsDrawerForm = observer(function _(props: Props) {
  const sectionState = useMemo(
    () => createSectionState(props.props),
    [props.props]
  )
  const componentState = useMemo(
    () => createState(props.props?.component.props),
    [props.props]
  )

  function submit() {
    props.onSubmit({
      repeated: false,
      name: ActivityComponentName.VideoHighlights,
      title: sectionState.value.title,
      subtitle: sectionState.value.subtitle,
      component: {
        name: ActivityComponentName.VideoHighlights,
        props: {
          type: 'default',
          videos: componentState.value
        }
      }
    })
  }

  function addItem() {
    const item: HighlightVideo = {
      title: '',
      description: '',
      coverUrl: '',
      videoUrl: '',
      releaseTime: 0
    }
    componentState.append(item)
  }

  function removeItem(index: number) {
    componentState.remove(index)
  }

  return (
    <DrawerForm
      title={
        activityComponentNameTitleMap[ActivityComponentName.VideoHighlights]
      }
      width={800}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={componentState}
      onSubmit={submit}
      onCancel={() => {
        props.onCancel()
      }}
    >
      <SectionConfigForm state={sectionState} />
      <FormItem label="视频" labelWidth="4em" required state={componentState}>
        {componentState.$.map((itemState, index) => (
          <FormItem layout="horizontal" key={index}>
            <FormItem label="标题" required state={itemState.$.title}>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="说明" required state={itemState.$.description}>
              <TextInput state={itemState.$.description} />
            </FormItem>
            <FormItem label="视频封面" required state={itemState.$.coverUrl}>
              <UploadImgInput state={itemState.$.coverUrl} />
            </FormItem>
            <FormItem label="视频" required state={itemState.$.videoUrl}>
              <UploadVideo
                uploadBucketKeyRule="activity-content"
                state={itemState.$.videoUrl}
              />
            </FormItem>
            <FormItem label="创建时间" required state={itemState.$.releaseTime}>
              <DatePicker state={itemState.$.releaseTime} />
            </FormItem>
            <Button type="secondary" onClick={() => removeItem(index)}>
              删除该条记录
            </Button>
          </FormItem>
        ))}
        <Button
          type="dashed"
          icon={<AddThinIcon />}
          onClick={() => {
            addItem()
          }}
        />
      </FormItem>
    </DrawerForm>
  )
})

export default function useVideoHighlights() {
  const [config, setConfig] = useState<
    ActivitySection<VideoHighlightsComponentConfig> | undefined
  >(undefined)
  const { visible, resolve, reject, open } = useModalLike<ActivitySection<VideoHighlightsComponentConfig>>()

  async function createConfig(
    initConfig?: ActivitySection<VideoHighlightsComponentConfig>
  ) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: ActivitySection<VideoHighlightsComponentConfig>) {
    resolve(props)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <VideoHighlightsDrawerForm
      props={config}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [createConfig, view] as const
}
