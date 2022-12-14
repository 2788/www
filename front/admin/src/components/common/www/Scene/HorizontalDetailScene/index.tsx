/**
 * @file tab 水平布局内容复杂类型
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

interface SceneProblem {
  name: string
  desc: string
}

interface SceneItem {
  /** 场景名称 */
  name: string
  /** 场景描述 */
  desc: string
  imgUrl: string
  /** 能够解决的问题 */
  problems: SceneProblem[]
}

export interface SceneConfig {
  items: SceneItem[]
}

export function createState(config?: SceneConfig) {
  return new FormState({
    items: new ArrayFormState(config?.items ?? [], item => (
      new FormState({
        name: new DebouncedFieldState(item.name).withValidator(name => {
          if (name.trim() === '') {
            return '不能为空'
          }
          if (name.length > 12) {
            return '不能超过 12 个字'
          }
        }),
        desc: new DebouncedFieldState(item.desc).withValidator(desc => {
          if (desc.trim() === '') {
            return '不能为空'
          }
          if (desc.length > 85) {
            return '不能超过 85 个字'
          }
        }),
        imgUrl: createUploadImgState(item.imgUrl).withValidator(imgUrl => {
          if (imgUrl === '') {
            return '不能为空'
          }
        }),
        problems: new ArrayFormState(item.problems, problem => (
          new FormState({
            name: new DebouncedFieldState(problem.name).withValidator(name => {
              if (name.trim() === '') {
                return '不能为空'
              }
              if (name.length > 12) {
                return '不能超过 12 个字'
              }
            }),
            desc: new DebouncedFieldState(problem.desc).withValidator(desc => {
              if (desc.trim() === '') {
                return '不能为空'
              }
              if (desc.length > 80) {
                return '不能超过 80 个字'
              }
            })
          })
        )).withValidator(items => {
          if (items.length === 0) {
            return '最少 1 组'
          }
        })
      })
    )).withValidator(items => {
      if (items.length === 0) {
        return '最少 1 个'
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

export default observer(function HorizontalDetailScene({ state, labelWidth = '2em' }: Props) {
  const midWidth = '4em'
  const innerWidth = '2em'

  function addItem() {
    const item: SceneItem = {
      name: '',
      desc: '',
      imgUrl: '',
      problems: []
    }
    state.$.items.append(item)
  }

  function removeItem(index: number) {
    state.$.items.remove(index)
  }

  function addProblem(itemIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const problemState = itemState.$.problems
    const problem: SceneProblem = {
      name: '',
      desc: ''
    }
    problemState.append(problem)
  }

  function removeProblem(itemIndex: number, problemIndex: number) {
    const itemState = state.$.items.$[itemIndex]
    const problemState = itemState.$.problems
    problemState.remove(problemIndex)
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
            <FormItem label="名称" labelWidth={midWidth} required>
              <TextInput state={itemState.$.name} />
            </FormItem>
            <FormItem label="描述" labelWidth={midWidth} required>
              <TextArea state={itemState.$.desc} maxCount={85} textareaProps={{ rows: 3 }} />
            </FormItem>
            <FormItem label="图片" labelWidth={midWidth} required>
              <UploadImgInput
                state={itemState.$.imgUrl}
                previewType="cover"
                width={634}
                height={328}
              />
            </FormItem>
            <FormItem label="解决问题" labelWidth={midWidth} required state={itemState.$.problems}>
              {itemState.$.problems.$.map((problemState, problemIndex) => (
                <FormItem
                  key={problemIndex}
                  label={
                    <span className={styles.sectionLabel}>
                      <span>{problemIndex + 1}</span>
                      <Button
                        type="link"
                        icon={<DeleteIcon />}
                        className={styles.btn}
                        onClick={() => { removeProblem(itemIndex, problemIndex) }}
                      />
                    </span>
                  }
                  labelWidth="3em"
                  className={styles.sectionItem}
                  state={problemState}
                >
                  <FormItem label="标题" labelWidth={innerWidth} required>
                    <TextInput state={problemState.$.name} />
                  </FormItem>
                  <FormItem label="描述" labelWidth={innerWidth} required>
                    <TextArea state={problemState.$.desc} maxCount={80} textareaProps={{ rows: 5 }} />
                  </FormItem>
                </FormItem>
              ))}
              <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addProblem(itemIndex) }} />
            </FormItem>
          </FormItem>
        ))}
        <Button type="dashed" icon={<AddThinIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </InputWrapper>
  )
})
