/**
 * @file 图标配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo } from 'react'
import partition from 'lodash/partition'
import { FormState, DebouncedFieldState, TransformedState } from 'formstate-x'
import { observer } from 'mobx-react'
import { ModalForm, FormItem, useFormstateX, TextInput, Select, SelectOption } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { useModalLike } from 'utils/async'
import { IconId, IconInfo as BaseIconInfo, iconConfig } from 'constants/icon'
import IconInfoApis, { IconInfo } from 'apis/icon'
import { UploadImgInput, createState as createUploadImgState } from 'components/common/Upload/Img'

import SvgFileInput, { createState as createSvgFileInputState } from './SvgFileInput'

import styles from './style.m.less'

function getBaseValue(iconInfo: BaseIconInfo | undefined) {
  const type = iconInfo?.type ?? 'svg-inline'
  return {
    id: iconInfo?.id ?? '',
    name: iconInfo?.name ?? '',
    file: {
      type,
      url: type === 'url' && iconInfo && 'url' in iconInfo && iconInfo.url ? iconInfo.url : '',
      content: type === 'svg-inline' && iconInfo && 'content' in iconInfo && iconInfo.content ? iconInfo.content : ''
    }
  }
}

function createState(icons: BaseIconInfo[], current?: BaseIconInfo) {
  const init = getBaseValue(current)

  const typeState = new DebouncedFieldState(init.file.type)
  const state = new FormState({
    id: new DebouncedFieldState(init.id).withValidator(id => {
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
    name: new DebouncedFieldState(init.name).withValidator(name => {
      if (name.trim() === '') {
        return '不能为空'
      }
      if (icons.some(iconInfo => iconInfo.name === name)) {
        return '该图标名已存在'
      }
    }),
    file: new FormState({
      type: typeState,
      url: createUploadImgState(init.file.url).withValidator(url => {
        if (url === '') {
          return '不能为空'
        }
      }).disableWhen(() => typeState.value !== 'url'),
      content: createSvgFileInputState(init.file.content).withValidator(content => {
        if (content === '') {
          return '不能为空'
        }
      }).disableWhen(() => typeState.value !== 'svg-inline')
    })
  })

  return new TransformedState<typeof state, BaseIconInfo, ReturnType<typeof getBaseValue>>(
    state,
    ({ file, ...value }) => {
      const newFile = file.type === 'url'
        ? {
          type: file.type,
          url: file.url
        }
        : {
          type: file.type,
          content: file.content
        }
      return {
        ...value,
        ...newFile
      }
    },
    getBaseValue
  )
}

const imgFilter = ['.png', '.jpg', '.jpeg', '.gif']

interface Props {
  current?: BaseIconInfo
  icons: BaseIconInfo[]
  title: string
  onSubmit(iconInfo: BaseIconInfo): Promise<void>
  onCancel(): void
}

const IconModalForm = observer(function _IconModalForm(props: Props) {
  const state = useFormstateX(createState, [props.icons, props.current])
  const fields = state.$.$

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
        <TextInput state={fields.id} inputProps={{ readOnly: props.current != null }} />
      </FormItem>
      <FormItem label="名称" required>
        <TextInput state={fields.name} />
      </FormItem>
      <FormItem label="图片" required>
        <div className={styles.inputGroup}>
          <Select state={fields.file.$.type} className={styles.inputGroupSelect}>
            <SelectOption<BaseIconInfo['type']> value="url">普通图片</SelectOption>
            <SelectOption<BaseIconInfo['type']> value="svg-inline">SVG</SelectOption>
          </Select>
          {fields.file.$.type.value === 'svg-inline' && (
            <SvgFileInput state={fields.file.$.content} />
          )}
          {fields.file.$.type.value === 'url' && (
            <UploadImgInput
              state={fields.file.$.url}
              uploadBucketKeyRule="icon"
              accept={imgFilter}
              previewType="contain"
              width={iconConfig.width}
              height={iconConfig.height}
              desc={`最大 ${iconConfig.maxSize} KB`}
              maxSize={iconConfig.maxSize}
            />
          )}
        </div>
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
