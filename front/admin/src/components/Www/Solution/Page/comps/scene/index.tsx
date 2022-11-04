/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { FormState, DebouncedFieldState, ArrayFormState } from 'formstate-x'
import { Button } from 'react-icecream'
import { AddIcon, DeleteIcon } from 'react-icecream/icons'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea } from 'react-icecream-form'

import { useModalLike } from 'utils/async'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { SolutionComponentSceneConfig, SceneItem, SceneProblem } from 'constants/solution/page/comp-scene'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import styles from './style.m.less'

function createState(props?: SolutionComponentSceneConfig['props']) {
  return new FormState({
    items: new ArrayFormState(props?.items ?? [], item => (
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
          if (desc.length > 60) {
            return '不能超过 60 个字'
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
              if (desc.length > 120) {
                return '不能超过 120 个字'
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
      if (items.length < 3) {
        return '最少 3 个'
      }
      if (items.length > 8) {
        return '最多 8 个'
      }
    })
  })
}

interface Props {
  props?: SolutionComponentSceneConfig['props']
  visible: boolean
  onSubmit(config: SolutionComponentSceneConfig['props']): void
  onCancel(): void
}

const CompDrawerForm = observer(function _CompDrawerForm(props: Props) {
  const state = useFormstateX(createState, [props.props])

  useEffect(() => {
    if (!props.visible) {
      state.reset()
    }
  }, [props.visible, state])

  function submit() {
    props.onSubmit(state.value)
  }

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
    <DrawerForm
      title={solutionModuleTitleMap[SolutionModule.Scene]}
      width={700}
      layout="horizontal"
      labelWidth="4em"
      visible={props.visible}
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="场景" labelWidth="2em" required state={state.$.items}>
        {state.$.items.$.map((itemState, itemIndex) => (
          <Fragment key={itemIndex}>
            <FormItem
              label={
                <span className={styles.section}>
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
              state={itemState}
            >
              <FormItem label="名称" required>
                <TextInput state={itemState.$.name} />
              </FormItem>
              <FormItem label="描述" required>
                <TextArea state={itemState.$.desc} maxCount={60} textareaProps={{ rows: 3 }} />
              </FormItem>
              <FormItem label="图片" required>
                <UploadImgInput
                  state={itemState.$.imgUrl}
                  previewType="cover"
                  width={634}
                  height={332}
                />
              </FormItem>
              <FormItem label="解决问题" required state={itemState.$.problems}>
                {itemState.$.problems.$.map((problemState, problemIndex) => (
                  <Fragment key={problemIndex}>
                    <FormItem
                      label={
                        <span className={styles.section}>
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
                      state={problemState}
                    >
                      <FormItem label="标题" required>
                        <TextInput state={problemState.$.name} />
                      </FormItem>
                      <FormItem label="描述" required>
                        <TextArea state={problemState.$.desc} maxCount={120} textareaProps={{ rows: 5 }} />
                      </FormItem>
                    </FormItem>
                  </Fragment>
                ))}
                <Button icon={<AddIcon />} onClick={() => { addProblem(itemIndex) }} />
              </FormItem>
            </FormItem>
          </Fragment>
        ))}
        <Button icon={<AddIcon />} onClick={() => { addItem() }} />
      </FormItem>
    </DrawerForm>
  )
})

export default function useCompScene() {
  const [config, setConfig] = useState<SolutionSection<SolutionComponentSceneConfig> | undefined>(undefined)
  const { visible, resolve, reject, open } = useModalLike<SolutionSection<SolutionComponentSceneConfig>>()

  async function start(initConfig?: SolutionSection<SolutionComponentSceneConfig>) {
    setConfig(initConfig)
    return open()
  }

  function submit(props: SolutionComponentSceneConfig['props']) {
    const newConfig: SolutionSection<SolutionComponentSceneConfig> = {
      name: SolutionModule.Scene,
      title: solutionModuleTitleMap[SolutionModule.Scene],
      component: {
        name: SolutionComponentName.Scene,
        props
      }
    }
    resolve(newConfig)
    setConfig(undefined)
  }

  function cancel() {
    reject()
    setConfig(undefined)
  }

  const view = (
    <CompDrawerForm
      props={config?.component.props}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [start, view] as const
}
