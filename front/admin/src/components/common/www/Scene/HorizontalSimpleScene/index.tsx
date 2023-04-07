/**
 * @file tab 水平布局内容简单类型
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { InputWrapper, FormItem, TextArea, TextInput } from 'react-icecream-form'

import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import previewImg from './preview.jpg'
import styles from './style.m.less'

export { previewImg }

interface SceneItem {
  /** 场景标题 */
  title: string
  /** 场景描述 */
  desc: string
  /** 场景图片 */
  imgUrl: string
}

export interface SceneConfig {
  items: SceneItem[]
}

export function createState(config?: SceneConfig) {
  return new FormState({
    items: new ArrayFormState(config?.items ?? [], item => (
      new FormState({
        title: new DebouncedFieldState(item.title).withValidator(title => {
          if (title.trim() === '') {
            return '不能为空'
          }
          if (title.length > 8) {
            return '不能超过 8 个字'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 120) {
            return '不能超过 120 个字'
          }
        }),
        imgUrl: createUploadImgState(item.imgUrl).withValidator(imgUrl => {
          if (imgUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length < 3) {
        return '最少 3 个'
      }
      if (items.length > 8) {
        return '最多 8 个'
      }
    })
  })
}

export interface Props {
  state: ReturnType<typeof createState>
  labelWidth?: string
}

export default observer(function HorizontalSimpleScene({ state, labelWidth = '2em' }: Props) {
  function addItem() {
    const item: SceneItem = {
      title: '',
      desc: '',
      imgUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <InputWrapper state={state}>
      <FormItem label="场景" labelWidth={labelWidth} required state={state.$.items}>
        {state.$.items.$.map((itemState, itemIndex) => (
          <FormItem
            key={itemIndex}
            label={
              <span className={styles.sectionLabel}>
                <span>{itemIndex + 1}</span>
                <Button
                  type="link"
                  icon={<DeleteIcon />}
                  className={styles.btn}
                  onClick={() => { removeItem(itemIndex) }}
                />
              </span>
            }
            labelWidth="3em"
            className={styles.sectionItem}
            state={itemState}
          >
            <FormItem label="标题" labelWidth={labelWidth} required>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="描述" labelWidth={labelWidth} required>
              <TextArea state={itemState.$.desc} maxCount={120} textareaProps={{ rows: 3 }} />
            </FormItem>
            <FormItem label="图片" labelWidth={labelWidth} required>
              <UploadImgInput
                state={itemState.$.imgUrl}
                previewType="contain"
                width={1180}
                height={390}
                maxSize={1024}
              />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </InputWrapper>
  )
})
