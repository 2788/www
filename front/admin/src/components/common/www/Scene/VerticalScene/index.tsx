/**
 * @file tab 垂直布局类型
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { InputWrapper, FormItem, TextInput, TextArea } from 'react-icecream-form'

import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import previewImg from './preview.jpg'
import styles from './style.m.less'

export { previewImg }

interface SceneItem {
  /** 场景名称 */
  title: string
  /** 场景描述 */
  desc: string
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
          if (title.length > 12) {
            return '不能超过 12 个字'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 60) {
            return '不能超过 60 个字'
          }
        }),
        imgUrl: createUploadImgState(item.imgUrl).withValidator(imgUrl => {
          if (imgUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length !== 3) {
        return '数量只能为 3 个'
      }
    })
  })
}

export interface Props {
  state: ReturnType<typeof createState>
  labelWidth?: string
}

export default observer(function VerticalScene({ state, labelWidth = '2em' }: Props) {
  const innerWidth = '2em'

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
        {state.$.items.$.map((itemState, index) => (
          <FormItem
            key={index}
            label={
              <span className={styles.sectionLabel}>
                <span>{index + 1}</span>
                <Button
                  type="link"
                  icon={<DeleteIcon />}
                  className={styles.btn}
                  onClick={() => { removeItem(index) }}
                />
              </span>
            }
            labelWidth="3em"
            className={styles.sectionItem}
            state={itemState}
          >
            <FormItem label="名称" labelWidth={innerWidth} required>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="描述" labelWidth={innerWidth} required>
              <TextArea state={itemState.$.desc} maxCount={60} textareaProps={{ rows: 4 }} />
            </FormItem>
            <FormItem label="图片" labelWidth={innerWidth} required>
              <UploadImgInput
                state={itemState.$.imgUrl}
                previewType="cover"
                width={746}
                height={394}
              />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </InputWrapper>
  )
})
