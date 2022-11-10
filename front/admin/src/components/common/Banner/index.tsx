/**
 * @file 配置产品、解决方案等 banner 的一些基本配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { InputWrapper, FormItem, RadioGroup, Radio } from 'react-icecream-form'
import { Button } from 'react-icecream'
import { CloseCircleIcon } from 'react-icecream/icons'

import { isDark, getBgColor } from 'utils/color'
import ColorPicker, { createState as createColorPickerState } from 'components/common/ColorPicker'
import { UploadImgInput, createState as createUploadImgState, IProps as UploadImgInputProps } from 'components/common/Upload/Img'

import styles from './style.m.less'

function getDefaultBgColor(isLight: boolean) {
  return isLight ? '#B8DFFE' : '#213148'
}

function normalizeColors(colors: string[]) {
  return [...new Set(colors)].sort()
}

export interface Value {
  /** 主题：深色 / 浅色 */
  light: boolean
  bgColor: string
  bgImgUrl: {
    /** 默认图片，PC 端使用，其他端亦可 */
    large: string
    /** 针对移动端、小程序等场景优化，非必需 */
    small?: string
  }
}

export function createState(banner?: Value) {
  const isLight = banner?.light ?? false

  const state = new FormState({
    light: new DebouncedFieldState(isLight),
    bgColor: createColorPickerState(banner?.bgColor ?? getDefaultBgColor(isLight)),
    bgImgUrl: new FormState({
      large: createUploadImgState(banner?.bgImgUrl.large ?? '').withValidator(url => {
        if (url === '') {
          return ' 不能为空'
        }
      }),
      small: createUploadImgState(banner?.bgImgUrl.small ?? '')
    })
  })

  // 智能联动数据流方向：bgImgUrl -> bgColor -> light

  state.addDisposer(reaction(
    () => state.$.bgColor.value,
    bgColor => { state.$.light.set(!isDark(bgColor)) }
  ))

  return new TransformedState(
    state,
    ({ bgImgUrl, ...value }) => ({
      ...value,
      bgImgUrl: {
        large: bgImgUrl.large,
        ...(bgImgUrl.small && { small: bgImgUrl.small })
      }
    }),
    value => ({
      ...value,
      bgImgUrl: {
        ...value.bgImgUrl,
        small: value.bgImgUrl.small ?? ''
      }
    })
  )
}

type UploadImgConfig = Pick<UploadImgInputProps, 'maxSize' | 'previewType' | 'width' | 'height' | 'desc'>

export interface Props {
  state: ReturnType<typeof createState>
  uploadLarge?: UploadImgConfig
  uploadSmall?: UploadImgConfig
}

export default observer(function Banner({ state, uploadLarge, uploadSmall }: Props) {
  const fields = state.$.$

  const [colors, setColors] = useState<string[]>(() => normalizeColors([
    getDefaultBgColor(false), getDefaultBgColor(true), '#FFFFFF', '#000000'
  ]))

  function handleUploaded(_url: string, file: File) {
    getBgColor(file).then(
      color => {
        fields.bgColor.set(color)
        setColors(normalizeColors([...colors, color]))
      },
      () => undefined
    )
  }

  return (
    <InputWrapper state={state}>
      <FormItem label="主题色" required labelVerticalAlign="text">
        <RadioGroup state={fields.light}>
          <Radio value={false}>深色</Radio>
          <Radio value>浅色</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="背景色" required>
        <ColorPicker state={fields.bgColor} colors={colors} />
      </FormItem>
      <FormItem label="背景大图" required>
        <UploadImgInput
          {...uploadLarge}
          state={fields.bgImgUrl.$.large}
          onUploaded={handleUploaded}
          previewType="cover"
          width={5120}
          height={960}
          maxSize={1024}
        />
      </FormItem>
      <FormItem label="背景小图" className={styles.smallBg}>
        <UploadImgInput
          {...uploadSmall}
          state={fields.bgImgUrl.$.small}
          onUploaded={handleUploaded}
          previewType="cover"
          width={2304}
          height={750}
          desc="针对移动端和小程序，推荐尺寸 2304 × 750 px，最大 500 KB"
        >
          <Button type="link" className={styles.uploadBtn}>上传</Button>
          {fields.bgImgUrl.$.small.value && (
            <CloseCircleIcon
              className={styles.clearIcon}
              onClick={e => { e.stopPropagation(); fields.bgImgUrl.$.small.onChange('') }}
            />
          )}
        </UploadImgInput>
      </FormItem>
    </InputWrapper>
  )
})
