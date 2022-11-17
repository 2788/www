/**
 * @file 基本信息
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo } from 'react'
import partition from 'lodash/partition'
import { FormState, DebouncedFieldState } from 'formstate-x'
import { Loading } from 'react-icecream'
import { DrawerForm, FormItem, useFormstateX, TextInput, TextArea } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { useModalLike } from 'utils/async'
import { SolutionId, wwwSolutionPathPrefix, SolutionInfo as BaseSolutionInfo } from 'constants/solution'
import SolutionApis, { SolutionInfo } from 'apis/solution'
import SelectTags from 'components/common/SelectTags'
import SelectIcon, { createState as createSelectIcon } from 'components/common/SelectIcon'

function createState(solutionInfoList: BaseSolutionInfo[], currentSolutionInfo?: BaseSolutionInfo) {
  return new FormState({
    path: new DebouncedFieldState(currentSolutionInfo?.path ?? '').withValidator(path => {
      if (path.trim() === '') {
        return '不能为空'
      }
      if (!/^[a-z-]+$/.test(path)) {
        return '存在非法字符'
      }
      if (solutionInfoList.some(solution => solution.path === path)) {
        return '该方案已存在'
      }
    }),
    name: new DebouncedFieldState(currentSolutionInfo?.name ?? '').withValidator(name => {
      if (name.trim() === '') {
        return '不能为空'
      }
      if (solutionInfoList.some(solution => solution.name === name)) {
        return '该方案名已存在'
      }
      if (name.length > 12) {
        return '不能超过 12 个字'
      }
    }),
    title: new DebouncedFieldState(currentSolutionInfo?.title ?? '').withValidator(title => {
      if (title.trim() === '') {
        return '不能为空'
      }
    }),
    keywords: new DebouncedFieldState(currentSolutionInfo?.keywords ?? []).withValidator(keywords => {
      if (keywords.length === 0) {
        return '不能为空'
      }
      for (const keyword of keywords) {
        if (keyword.trim() === '') {
          return '不能有空标签'
        }
      }
    }),
    desc: new FormState({
      brief: new DebouncedFieldState(currentSolutionInfo?.desc.brief ?? '').withValidator(brief => {
        if (brief.trim() === '') {
          return '不能为空'
        }
        if (brief.length > 40) {
          return '不能超过 40 个字'
        }
      }),
      detail: new DebouncedFieldState(currentSolutionInfo?.desc.detail ?? '').withValidator(detail => {
        if (detail.trim() === '') {
          return '不能为空'
        }
        if (detail.length > 124) {
          return '不能超过 124 个字'
        }
      })
    }),
    icon: new FormState({
      line: createSelectIcon(currentSolutionInfo?.icon.line).withValidator(line => {
        if (!line) {
          return '不能为空'
        }
      }),
      lineSmall: createSelectIcon(currentSolutionInfo?.icon.lineSmall).withValidator(lineSmall => {
        if (!lineSmall) {
          return '不能为空'
        }
      }),
      glass: createSelectIcon(currentSolutionInfo?.icon.glass).withValidator(glass => {
        if (!glass) {
          return '不能为空'
        }
      })
    })
  })
}

function useDrawerFormState(
  solutionId: SolutionId | undefined,
  solutionInfoList: SolutionInfo[] | undefined
) {
  const solutionApis = useInjection(SolutionApis)

  const isNew = solutionId == null

  const [[solutionInfo], otherSolutionInfoList] = useMemo(
    () => partition(solutionInfoList ?? [], (({ path }) => path === solutionId)),
    [solutionId, solutionInfoList]
  )

  const state = useFormstateX(createState, [otherSolutionInfoList, solutionInfo])

  async function submitForm() {
    const { icon, ...value } = state.value
    const newValue = {
      ...value,
      icon: {
        line: icon.line!,
        lineSmall: icon.lineSmall!,
        glass: icon.glass!
      }
    }

    if (isNew) {
      const newSolutionInfo: BaseSolutionInfo = {
        banner: null,
        sections: [],
        ...newValue
      }
      await solutionApis.create(newSolutionInfo)
    } else {
      const newSolutionInfo: SolutionInfo = {
        ...solutionInfo,
        ...newValue
      }
      await solutionApis.update(newSolutionInfo)
    }
  }

  return { isNew, state, submitForm }
}

function useModalState() {
  const toasterStore = useInjection(ToasterStore)
  const solutionApis = useInjection(SolutionApis)

  const { visible, resolve, reject, open } = useModalLike()

  const [solutionId, setSolutionId] = useState<SolutionId | undefined>(undefined)
  const [solutionInfoList, setSolutionInfoList] = useState<SolutionInfo[] | undefined>(undefined)

  const { isNew, state, submitForm } = useDrawerFormState(solutionId, solutionInfoList)

  function clean() {
    setSolutionId(undefined)
    setSolutionInfoList(undefined)
  }

  function cancel() {
    reject()
    clean()
  }

  async function submit() {
    await toasterStore.promise(submitForm())
    resolve()
    clean()
  }

  async function setSolutionInfo(id?: SolutionId) {
    setSolutionId(id)
    toasterStore.promise(
      solutionApis.listAll().then(
        list => { setSolutionInfoList(list) },
        err => {
          cancel()
          throw err
        }
      )
    )
    await open()
  }

  return {
    isNew,
    isLoading: solutionInfoList == null,
    visible,
    submit,
    cancel,
    state,
    setSolutionInfo
  }
}

export default function useMetaInfo() {
  const {
    isNew, isLoading, visible, submit, cancel, state,
    setSolutionInfo
  } = useModalState()

  const metaView = (
    <DrawerForm
      title={isNew ? '新增' : '修改'}
      width={458}
      layout="horizontal"
      labelWidth="5em"
      state={state}
      visible={visible}
      onSubmit={submit}
      onCancel={cancel}
    >
      <Loading loading={isLoading}>
        <FormItem label="路径" required>
          <TextInput
            state={state.$.path}
            inputProps={{ readOnly: !isNew }}
            prefix={wwwSolutionPathPrefix}
          />
        </FormItem>
        <FormItem label="名称" required>
          <TextInput state={state.$.name} />
        </FormItem>
        <FormItem label="页面标题" required>
          <TextInput state={state.$.title} />
        </FormItem>
        <FormItem label="标签关键字" required tip="用于解决方案页 TDK、解决方案相关搜索等">
          <SelectTags state={state.$.keywords} />
        </FormItem>
        <FormItem label="短描述" required tip="用于导航栏等">
          <TextArea state={state.$.desc.$.brief} maxCount={40} textareaProps={{ rows: 3 }} />
        </FormItem>
        <FormItem label="长描述" required tip="用于解决方案页 banner、解决方案页 TDK 等">
          <TextArea state={state.$.desc.$.detail} maxCount={124} textareaProps={{ rows: 7 }} />
        </FormItem>
        <FormItem label="线框图标" required>
          <SelectIcon state={state.$.icon.$.line} />
        </FormItem>
        <FormItem label="线框小图标" required>
          <SelectIcon state={state.$.icon.$.lineSmall} />
        </FormItem>
        <FormItem label="毛玻璃图标" required>
          <SelectIcon state={state.$.icon.$.glass} />
        </FormItem>
      </Loading>
    </DrawerForm>
  )

  return {
    metaView,
    setSolutionInfo
  }
}
