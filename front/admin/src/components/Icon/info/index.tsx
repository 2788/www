/**
 * @file 图标配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo } from 'react'
import partition from 'lodash/partition'
import { FormState, DebouncedFieldState } from 'formstate-x'
import { observer } from 'mobx-react'
import { ModalForm, FormItem, useFormstateX, TextInput } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { useModalLike } from 'utils/async'
import { IconId, IconInfo as BaseIconInfo } from 'constants/icon'
import IconInfoApis, { IconInfo } from 'apis/icon'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

function createState(icons: BaseIconInfo[], current?: BaseIconInfo) {
  return new FormState({
    id: new DebouncedFieldState(current?.id ?? '').withValidator(id => {
      if (id.trim() === '') {
        return '不能为空'
      }
      if (!/^[a-z-]+$/.test(id)) {
        return '存在非法字符'
      }
      if (icons.some(iconInfo => iconInfo.id === id)) {
        return '该图标已存在'
      }
    }),
    name: new DebouncedFieldState(current?.name ?? '').withValidator(name => {
      if (name.trim() === '') {
        return '不能为空'
      }
      if (icons.some(iconInfo => iconInfo.name === name)) {
        return '该图标名已存在'
      }
    }),
    url: createUploadImgState(current?.url ?? '').withValidator(url => {
      if (url === '') {
        return '不能为空'
      }
    })
  })
}

interface Props {
  current?: BaseIconInfo
  icons: BaseIconInfo[]
  title: string
  onSubmit(iconInfo: BaseIconInfo): Promise<void>
  onCancel(): void
}

const IconModalForm = observer(function _IconModalForm(props: Props) {
  const state = useFormstateX(createState, [props.icons, props.current])

  async function submit() {
    await props.onSubmit(state.value)
  }

  return (
    <ModalForm
      title={props.title}
      layout="horizontal"
      labelWidth="2em"
      visible
      state={state}
      onSubmit={submit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="id" required>
        <TextInput state={state.$.id} inputProps={{ readOnly: props.current != null }} />
      </FormItem>
      <FormItem label="名称" required>
        <TextInput state={state.$.name} />
      </FormItem>
      <FormItem label="图片">
        <UploadImgInput
          state={state.$.url}
          uploadBucketKeyRule="icon"
          previewType="contain"
          width={96}
          height={96}
          desc="最大 100 KB"
          maxSize={100}
        />
      </FormItem>
    </ModalForm>
  )
})

export default function useIconInfo(allIcons: IconInfo[]) {
  const toasterStore = useInjection(ToasterStore)
  const iconInfoApis = useInjection(IconInfoApis)

  const { visible, resolve, reject, open } = useModalLike()

  const [iconId, setIconId] = useState<IconId | undefined>(undefined)

  const [[currentIconInfo], otherIconInfoList] = useMemo(
    () => partition(allIcons, (({ id }) => id === iconId)),
    [iconId, allIcons]
  )

  async function start(id?: IconId) {
    setIconId(id)
    return open()
  }

  async function submit(iconInfo: BaseIconInfo) {
    const req = iconId
      ? iconInfoApis.update({ ...currentIconInfo!, ...iconInfo })
      : iconInfoApis.create(iconInfo)
    await toasterStore.promise(req)
    resolve()
    setIconId(undefined)
  }

  function cancel() {
    reject()
    setIconId(undefined)
  }

  const view = visible && (
    <IconModalForm
      current={currentIconInfo}
      icons={otherIconInfoList}
      title={iconId ? '修改' : '新增'}
      onSubmit={submit}
      onCancel={cancel}
    />
  )

  return [start, view] as const
}
