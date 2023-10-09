/**
 *  @file 方案优势 垂直布局 图片为 Img
 *  @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { ArrayFormState, DebouncedFieldState, FormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { FormItem, InputWrapper, TextInput, TextArea } from 'react-icecream-form'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'

import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import previewImg from './preview.jpg'
import styles from './style.m.less'

export { previewImg }

interface AdvantageItem {
  title: string
  desc: string
  bgImgUrl?: string
}

export interface AdvantageConfig {
  items: AdvantageItem[]
}

export function createState(config?: AdvantageConfig) {
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
          if (desc.length > 50) {
            return '不能超过 50 个字'
          }
        }),
        bgImgUrl: createUploadImgState(item.bgImgUrl ?? '')
      })
    )).withValidator(items => {
      if (items.length < 3) {
        return '最少 3 组'
      }
      if (items.length > 6) {
        return '最多 6 组'
      }
    })
  })
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function VerticalImgAdvantage({ state }: Props) {
  const labelWidth = '2em'

  function addItem() {
    const item: AdvantageItem = {
      title: '',
      desc: '',
      bgImgUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <InputWrapper state={state}>
      <FormItem label="优势" labelWidth={labelWidth} required state={state.$.items}>
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
            <FormItem label="名称" labelWidth={labelWidth} required>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="描述" labelWidth={labelWidth} required>
              <TextArea state={itemState.$.desc} maxCount={50} textareaProps={{ rows: 3 }} />
            </FormItem>
            <FormItem label="图片" labelWidth={labelWidth} required>
              <UploadImgInput
                state={itemState.$.bgImgUrl}
                previewType="contain"
                width={460}
                height={230}
              />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </InputWrapper>
  )

})
