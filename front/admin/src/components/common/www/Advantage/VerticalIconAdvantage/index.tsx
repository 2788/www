/**
 * @file 方案优势 垂直布局 图片为 Icon
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddThinIcon, DeleteIcon } from 'react-icecream/icons'
import { FormItem, TextInput, TextArea, InputWrapper } from 'react-icecream-form'

import ImgIconInput, { createState as createImgIconState } from 'components/common/ImgIcon'

import previewImg from './preview.jpg'
import styles from './style.m.less'

export { previewImg }

interface AdvantageItem {
  title: string
  desc: string
  iconUrl?: string
}

export interface AdvantageConfig {
  items: AdvantageItem[]
}

export function createState(props?: AdvantageConfig) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
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
          if (desc.length > 70) {
            return '不能超过 70 个字'
          }
        }),
        iconUrl: createImgIconState(item.iconUrl).withValidator(iconUrl => {
          if (iconUrl === '') {
            return '不能为空'
          }
        })
      })
    )).withValidator(items => {
      if (items.length < 3) {
        return '最少 3 个'
      }
      if (items.length > 6) {
        return '最多 6 个'
      }
    })
  })
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function VerticalIconAdvantage({ state }: Props) {
  function addItem() {
    const item: AdvantageItem = {
      title: '',
      desc: '',
      iconUrl: ''
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  return (
    <InputWrapper state={state}>
      <FormItem label="优势" labelWidth="2em" required state={state.$.items}>
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
            <FormItem label="标题" required>
              <TextInput state={itemState.$.title} />
            </FormItem>
            <FormItem label="副标题" required>
              <TextArea state={itemState.$.desc} maxCount={70} textareaProps={{ rows: 3 }} />
            </FormItem>
            <FormItem label="图标地址" required>
              <ImgIconInput state={itemState.$.iconUrl} />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </InputWrapper>
  )
})
