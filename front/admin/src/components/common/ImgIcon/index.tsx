/**
 * @file 选择 icon 或上传自定义 icon / 图片
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Select, SelectOption, InputWrapper } from 'react-icecream-form'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'

import { hasIconScheme } from 'transforms/icon'
import * as uploadImg from 'components/common/Upload/Img'
import SelectIcon, * as selectIcon from 'components/common/SelectIcon'

import styles from './style.m.less'

interface OriginValue {
  type: 'http' | 'icon'
  http: string
  icon: string | null
}

function createOriginState(value: OriginValue) {
  const typeState = new DebouncedFieldState<OriginValue['type']>(value.type)
  return new FormState({
    type: typeState,
    http: uploadImg.createState(value.http).disableWhen(() => typeState.value !== 'http'),
    icon: selectIcon.createState(value.icon).disableWhen(() => typeState.value !== 'icon')
  })
}

function fromOrigin(value: OriginValue): string {
  return value.type === 'icon' ? (value.icon ?? '') : value.http
}

function toOrigin(url = ''): OriginValue {
  const isIcon = hasIconScheme(url)
  const type = !url || isIcon ? 'icon' : 'http'
  return {
    type,
    http: type === 'http' && !isIcon ? url : '',
    icon: type === 'icon' && isIcon ? url : null
  }
}

export function createState(url?: string) {
  const state = createOriginState(toOrigin(url))
  // FIXME: TransformedState 类型推导有点问题，这里需要手动标注一下，有空查一下
  return new TransformedState<typeof state, string, OriginValue>(state, fromOrigin, toOrigin)
}

export interface Props extends Omit<uploadImg.IProps, 'state'> {
  state: ReturnType<typeof createState>
}

// FIXME: Can't perform a React state update on an unmounted component
// 具体用这个 `src/components/Www/Product/Info/Page/comps/advantage/index.tsx` 传图片点确定可复现
export default observer(function ImgIconInput({ state, ...props }: Props) {
  const originState = state.$.$
  return (
    <InputWrapper state={state}>
      <div className={styles.inputGroup}>
        <Select state={originState.type} className={styles.typeSelect}>
          <SelectOption<OriginValue['type']> value="icon">图标库</SelectOption>
          <SelectOption<OriginValue['type']> value="http">图片</SelectOption>
        </Select>
        {originState.type.value === 'icon' && (
          <SelectIcon {...props} state={originState.icon} />
        )}
        {originState.type.value === 'http' && (
          <uploadImg.UploadImgInput
            {...props}
            state={originState.http}
            previewType="contain"
            width={96}
            height={96}
            desc="最大 100 KB"
            maxSize={100}
          />
        )}
      </div>
    </InputWrapper>
  )
})
