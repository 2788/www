/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState, TransformedState } from 'formstate-x'
import { FormItem, InputWrapper } from 'react-icecream-form'

import SelectImg, { createState as createSelectImgState, ImgItem } from 'components/common/SelectImg'

import HorizontalDetailScene, {
  SceneConfig as HorizontalDetailSceneConfig,
  createState as createHorizontalDetailSceneState,
  previewImg as horizontalDetailScenePreviewImg
} from './HorizontalDetailScene'
import VerticalScene, {
  SceneConfig as VerticalSceneConfig,
  createState as createVerticalSceneState,
  previewImg as verticalScenePreviewImg
} from './VerticalScene'

export enum SceneType {
  // TODO: HorizontalSimple = 'horizontal-simple'
  HorizontalDetail = 'horizontal-detail',
  Vertical = 'vertical'
}

type SceneConfigWithType<T extends SceneType, U> = { type: T } & U

export { HorizontalDetailSceneConfig, VerticalSceneConfig }

export type SceneConfig<T extends SceneType = SceneType> = (
  T extends SceneType.HorizontalDetail ? SceneConfigWithType<SceneType.HorizontalDetail, HorizontalDetailSceneConfig>
  : T extends SceneType.Vertical ? SceneConfigWithType<SceneType.Vertical, VerticalSceneConfig>
  : never
)

export function createState<T extends SceneType>(allowSceneTypes: T[], initSceneConfig?: SceneConfig<T>) {
  const allowTypes: SceneType[] = allowSceneTypes
  const init: SceneConfig | undefined = initSceneConfig

  const allows: Record<SceneType, boolean> = {
    [SceneType.HorizontalDetail]: allowTypes.includes(SceneType.HorizontalDetail),
    [SceneType.Vertical]: allowTypes.includes(SceneType.Vertical)
  }

  const typeState = createSelectImgState((init?.type ?? allowSceneTypes[0]) as T)

  const state = new FormState({
    allows: new FieldState(allows), // TODO: 优化实现方式？
    type: typeState,
    horizontalDetail: createHorizontalDetailSceneState(
      init?.type === SceneType.HorizontalDetail ? init : undefined
    ).disableWhen(() => typeState.value !== SceneType.HorizontalDetail),
    vertical: createVerticalSceneState(
      init?.type === SceneType.Vertical ? init : undefined
    ).disableWhen(() => typeState.value !== SceneType.Vertical)
  })

  function stateValueToSceneConfig(value: typeof state.value): SceneConfig<T>
  function stateValueToSceneConfig(value: typeof state.value): SceneConfig {
    const type: SceneType = value.type

    if (type === SceneType.HorizontalDetail) {
      return {
        type,
        ...value.horizontalDetail
      }
    }

    if (type === SceneType.Vertical) {
      return {
        type,
        ...value.vertical
      }
    }

    throw new Error(`不支持该类型 ${value.type}`)
  }

  function sceneConfigToStateValue(sceneConfig: SceneConfig<T>): (typeof state.value)
  function sceneConfigToStateValue(sceneConfig: SceneConfig): (typeof state.value) {
    if (sceneConfig.type === SceneType.HorizontalDetail) {
      const { type, ...horizontalDetail } = sceneConfig
      return {
        allows,
        type: type as T,
        horizontalDetail,
        vertical: state.$.vertical.value
      }
    }

    if (sceneConfig.type === SceneType.Vertical) {
      const { type, ...vertical } = sceneConfig
      return {
        allows,
        type: type as T,
        vertical,
        horizontalDetail: state.$.horizontalDetail.value
      }
    }

    throw new Error(`不支持该类型 ${sceneConfig!.type}`)
  }

  return new TransformedState(
    state,
    stateValueToSceneConfig,
    sceneConfigToStateValue
  )
}

export interface Props {
  state: ReturnType<typeof createState>
  labelWidth?: string
  previewTypeSize?: {
    width?: string
    height?: string
  }
}

export default observer(function Scene({ state, labelWidth = '4em', previewTypeSize }: Props) {
  const fields = state.$.$
  const allows = fields.allows.value
  return (
    <InputWrapper state={state}>
      {Object.values(allows).filter(Boolean).length > 1 && (
        <FormItem label="样式类型" required labelWidth={labelWidth}>
          <SelectImg state={fields.type}>
            {allows[SceneType.HorizontalDetail] && (
              <ImgItem<SceneType>
                value={SceneType.HorizontalDetail}
                src={horizontalDetailScenePreviewImg}
                width={previewTypeSize?.width}
                height={previewTypeSize?.height}
              />
            )}
            {allows.vertical && (
              <ImgItem<SceneType>
                value={SceneType.Vertical}
                src={verticalScenePreviewImg}
                width={previewTypeSize?.width}
                height={previewTypeSize?.height}
              />
            )}
          </SelectImg>
        </FormItem>
      )}
      {fields.type.value === SceneType.HorizontalDetail && (
        <FormItem>
          <HorizontalDetailScene state={fields.horizontalDetail} labelWidth={labelWidth} />
        </FormItem>
      )}
      {fields.type.value === SceneType.Vertical && (
        <FormItem>
          <VerticalScene state={fields.vertical} labelWidth={labelWidth} />
        </FormItem>
      )}
    </InputWrapper>
  )
})
