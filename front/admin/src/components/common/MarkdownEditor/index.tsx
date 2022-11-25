/**
 * @file WYSIWYG Markdown editor (vditor)
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { IState } from 'formstate-x'
import { InputWrapper, bindInput } from 'react-icecream-form'
import { Icon } from 'react-icecream-1'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

import UploadImage, { IProps as UploadImageProps } from 'components/common/Upload'

import style from './style.m.less'

const uploadImageEntryId = 'upload-image-entry'

type VditorOptions = NonNullable<ConstructorParameters<typeof Vditor>[1]>
type VditorToolbarMenuItemOptions = Exclude<NonNullable<VditorOptions['toolbar']>[number], string>

const uploadImageToolbarMenuItemOptions: VditorToolbarMenuItemOptions = {
  name: 'upload-image',
  tip: '插入图片',
  tipPosition: 'n',
  icon: `<div data-role="${uploadImageEntryId}"></div>`,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  click() {} // TODO: https://github.com/qbox/www/pull/2527#discussion_r825239527
}

const vditorBaseOptions: VditorOptions = {
  // debugger: process.env.NODE_ENV !== 'production',
  // theme: 'dark',
  mode: 'wysiwyg',
  lang: 'zh_CN',
  cache: {
    enable: false
  },
  icon: 'material',
  minHeight: 300,
  // height: 'auto',
  placeholder: '请填写内容',
  toolbarConfig: {
    pin: true,
    hide: false
  },
  toolbar: [
    // 暂时先阉割掉、后续可能会逐步放开的能力：
    //   both, emoji, strike, check, inline-code, record, table, content-theme, code-theme, info
    'bold', 'italic', 'headings', 'quote', 'code', 'line',
    'list', 'ordered-list', 'outdent', 'indent', 'insert-before', 'insert-after',
    'link', '|',
    uploadImageToolbarMenuItemOptions, '|', // TODO: +'upload' 上传视频 & 文件（注意不要直接跟 pgc 业务耦合）
    'undo', 'redo', '|',
    'edit-mode', 'fullscreen', 'outline', 'preview', 'export', '|',
    'help',
    {
      name: 'more',
      toolbar: [
        'devtools'
      ]
    }
  ]
}

interface BaseProps {
  value: string
  // eslint-disable-next-line react/no-unused-prop-types
  onChange(value: string): void
  uploadBucketKeyRule: UploadImageProps['uploadBucketKeyRule']
  previewClassName?: string
}

function BaseEditor(props: BaseProps) {
  const latestPropsRef = useRef(props)
  latestPropsRef.current = props

  const vditorContainerRef = useRef<HTMLDivElement>(null)
  const [vditorUploadImageEntry, setVditorUploadImageEntry] = useState<Element | null>(null)
  const [vditor, setVditor] = useState<Vditor | null>(null)

  const currentValueRef = useRef('')

  function syncValue(value: string) {
    currentValueRef.current = value
    latestPropsRef.current.onChange(value)
  }

  useEffect(() => {
    const defaultValue = latestPropsRef.current.value
    currentValueRef.current = defaultValue

    const vditorInstance = new Vditor(vditorContainerRef.current!, {
      ...vditorBaseOptions,
      value: defaultValue,
      input(value) { // 自带 1s debounce TODO: 把时间设短一点？
        syncValue(value)
      },
      after() { // mount
        const placeholderEle = (
          vditorContainerRef.current!.querySelector(`[data-role="${uploadImageEntryId}"]`)! as HTMLElement
        )
        // HACK: 干掉 veditor 的 button 包裹节点，因为我们自己的 UploadImage 组件无法塞到 button 里
        const vditorContainerEle = placeholderEle.parentNode!.parentNode as Element
        vditorContainerEle.innerHTML = ''
        setVditorUploadImageEntry(vditorContainerEle)
      },
      classes: { preview: props.previewClassName ?? '' }
    })

    setVditor(vditorInstance)

    return () => {
      currentValueRef.current = ''
      vditorInstance.destroy()
      setVditor(null)
      setVditorUploadImageEntry(null)
    }
  }, [props.previewClassName])

  useEffect(() => {
    // 非受控组件转受控的同时保证编辑器局部状态不丢失 & 性能
    if (vditor && currentValueRef.current !== props.value) {
      currentValueRef.current = props.value
      vditor.setValue(props.value)
    }
  }, [vditor, props.value])

  const handleImageUploaded = useCallback((url: string) => {
    // insertValue 后会同步触发一次 input 事件，因此这里不需要手动调用一次 syncValue
    vditor?.insertValue(`![内容站插图](${url})`)
  }, [vditor])

  const uploadImageToolbarMenuItemView = vditorUploadImageEntry && vditor && ReactDOM.createPortal(
    // HACK: 由于上面干掉了 veditor 自己的节点，这里需要把样式和 DOM 结构啥的对应重新补上去
    (
      <div
        className={`vditor-tooltipped vditor-tooltipped__n ${style.uploadImageEntry}`}
        aria-label={uploadImageToolbarMenuItemOptions.tip}
      >
        {/* TODO: 增加 1 MB 图片体积上限 */}
        <UploadImage uploadBucketKeyRule={props.uploadBucketKeyRule} onUploaded={handleImageUploaded}>
          <Icon type="picture" theme="filled" className={style.pictureIcon} />
        </UploadImage>
      </div>
    ),
    vditorUploadImageEntry
  )

  return (
    <>
      <div ref={vditorContainerRef}></div>
      {uploadImageToolbarMenuItemView}
    </>
  )
}

export interface Props extends Omit<BaseProps, 'value' | 'onChange'> {
  state: IState<string>
}

export default observer(function Editor({ state, ...rest }: Props) {
  return (
    <InputWrapper state={state}>
      <BaseEditor {...bindInput(state)} {...rest} />
    </InputWrapper>
  )
})
