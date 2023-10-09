/**
 * @file 核心优势
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState, TransformedState } from 'formstate-x'
import { FormItem, InputWrapper } from 'react-icecream-form'

import SelectImg, { createState as createSelectImgState, ImgItem } from 'components/common/SelectImg'

import VerticalIconAdvantage, {
  AdvantageConfig as VerticalIconAdvantageConfig,
  createState as createVerticalIconAdvantageState,
  previewImg as verticalIconAdvantagePreviewImg
} from './VerticalIconAdvantage'

import VerticalImgAdvantage, {
  AdvantageConfig as VerticalImgAdvantageConfig,
  createState as createVerticalImgAdvantageState,
  previewImg as verticalImgAdvantagePreviewImg
} from './VerticalImgAdvantage'

export enum AdvantageType {
  // TODO: VerticalSimple = 'vertical-simple'
  VerticalIcon = 'vertical-icon',
  VerticalImg = 'vertical-img'
}

export { VerticalIconAdvantageConfig, VerticalImgAdvantageConfig }

type AdvantageConfigWithType<T extends AdvantageType, U> = { type: T } & U

export type AdvantageConfig<T extends AdvantageType = AdvantageType> = (
  T extends AdvantageType.VerticalIcon ?
    AdvantageConfigWithType<AdvantageType.VerticalIcon, VerticalIconAdvantageConfig>
    : T extends AdvantageType.VerticalImg ?
      AdvantageConfigWithType<AdvantageType.VerticalImg, VerticalImgAdvantageConfig>
      : never
)

export function createState<T extends AdvantageType>(
  allowAdvantageTypes: T[],
  initAdvantageConfig?: AdvantageConfig<T>
) {
  const allowTypes: AdvantageType[] = allowAdvantageTypes
  const init: AdvantageConfig | undefined = initAdvantageConfig

  const allows: Record<AdvantageType, boolean> = {
    [AdvantageType.VerticalIcon]: allowTypes.includes(AdvantageType.VerticalIcon),
    [AdvantageType.VerticalImg]: allowTypes.includes(AdvantageType.VerticalImg)
  }

  const typeState = createSelectImgState((init?.type ?? allowAdvantageTypes[0]) as T)

  const state = new FormState({
    allows: new FieldState(allows),
    type: typeState,
    verticalIcon: createVerticalIconAdvantageState(
      init?.type === AdvantageType.VerticalIcon ? init : undefined
    ).disableWhen(() => typeState.value !== AdvantageType.VerticalIcon),
    verticalImg: createVerticalImgAdvantageState(
      init?.type === AdvantageType.VerticalImg ? init : undefined
    ).disableWhen(() => typeState.value !== AdvantageType.VerticalImg)
  })

  function stateValueToAdvantageConfig(value: typeof state.value): AdvantageConfig<T>
  function stateValueToAdvantageConfig(value: typeof state.value): AdvantageConfig {
    const type: AdvantageType = value.type

    if (type === AdvantageType.VerticalIcon) {
      return {
        type,
        ...value.verticalIcon
      }
    }

    if (type === AdvantageType.VerticalImg) {
      return {
        type,
        ...value.verticalImg
      }
    }

    throw new Error(`不支持该类型 ${value.type}`)
  }

  function advantageConfigToStateValue(advantageConfig: AdvantageConfig<T>): (typeof state.value)
  function advantageConfigToStateValue(advantageConfig: AdvantageConfig): (typeof state.value) {
    if (advantageConfig.type === AdvantageType.VerticalIcon) {
      const { type, ...verticalIcon } = advantageConfig
      return {
        allows,
        type: type as T,
        verticalIcon,
        verticalImg: state.$.verticalImg.value
      }
    }

    if (advantageConfig.type === AdvantageType.VerticalImg) {
      const { type, ...verticalImg } = advantageConfig
      return {
        allows,
        type: type as T,
        verticalImg,
        verticalIcon: state.$.verticalIcon.value
      }
    }

    throw new Error(`不支持该类型 ${advantageConfig!.type}`)
  }

  return new TransformedState(
    state,
    stateValueToAdvantageConfig,
    advantageConfigToStateValue
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

export default observer(function Advantage({ state, labelWidth = '4em', previewTypeSize }: Props) {
  const fields = state.$.$
  const allows = fields.allows.value

  return (
    <InputWrapper state={state}>
      {Object.values(allows).filter(Boolean).length > 1 && (
        <FormItem label="样式类型" required labelWidth={labelWidth}>
          <SelectImg state={fields.type}>
            {allows[AdvantageType.VerticalIcon] && (
              <ImgItem<AdvantageType>
                value={AdvantageType.VerticalIcon}
                src={verticalIconAdvantagePreviewImg}
                width={previewTypeSize?.width}
                height={previewTypeSize?.height}
              />
            )}
            {allows[AdvantageType.VerticalImg] && (
              <ImgItem<AdvantageType>
                value={AdvantageType.VerticalImg}
                src={verticalImgAdvantagePreviewImg}
                width={previewTypeSize?.width}
                height={previewTypeSize?.height}
              />
            )}
          </SelectImg>
        </FormItem>
      )}
      {fields.type.value === AdvantageType.VerticalIcon && (
        <FormItem>
          <VerticalIconAdvantage state={fields.verticalIcon} />
        </FormItem>
      )}
      {fields.type.value === AdvantageType.VerticalImg && (
        <FormItem>
          <VerticalImgAdvantage state={fields.verticalImg} />
        </FormItem>
      )}
    </InputWrapper>
  )
})
