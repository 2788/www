/**
 * @file WYSIWYG Markdown editor (vditor) for Pgc, etc.
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import debounce from 'lodash/debounce'
import { IState } from 'formstate-x'
import { InputWrapper, bindInput } from 'react-icecream-form'
import { Icon } from 'react-icecream-1'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

import UploadImage from 'components/common/Upload'

import style from './style.m.less'

const uploadImageEntryId = 'upload-image-entry'

type VditorOptions = NonNullable<ConstructorParameters<typeof Vditor>[1]>
type VditorToolbarMenuItemOptions = Exclude<NonNullable<VditorOptions['toolbar']>[0], string>

const uploadImageToolbarMenuItemOptions: VditorToolbarMenuItemOptions = {
  name: 'upload-image',
  tip: '插入图片',
  tipPosition: 'n',
  icon: `<div data-role="${uploadImageEntryId}"></div>`,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  click() {}
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
  classes: {
    preview: '' // TODO: 样式，缺省匹配官网内容站
  },
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
    uploadImageToolbarMenuItemOptions, '|', // TODO: +'upload' 上传视频 & 文件
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

// FIXME: insertValue 后接下来的第一次用户输入（按 debounce 算）无法触发 vditor 的 input 事件
// 参考 https://github.com/Vanessa219/vditor/issues/1193
// 因此目前用轮询来临时 fix 一下，后续直接去掉即可
function useAutoSyncValueHandler(
  getValue: () => string | undefined, // 非空表示已经 dirty 了
  syncValue: (value: string) => void
) {
  const time = 1000

  const getValueRef = useRef(getValue)
  getValueRef.current = getValue

  const latestSyncingValueRef = useRef<string | undefined>()

  const latestSyncValueRef = useRef(syncValue)
  latestSyncValueRef.current = syncValue
  const sync = useMemo( // 直接 useCallback 的话 lint 不太对劲但 ignore deps 又不太好
    () => debounce((value: string) => latestSyncValueRef.current(value), 1000),
    []
  )

  const [state, setState] = useState<'normal' | 'inserted' | 'syncing'>('normal')

  useEffect(() => {
    if (state !== 'syncing') {
      return
    }

    // console.info('Vditor: start syncing.')

    const timer = setInterval(() => {
      const value = getValueRef.current()
      if (value != null && latestSyncingValueRef.current !== value) {
        latestSyncingValueRef.current = value // 如果短期内 sync 过这个值，证明还处于 debounce 阶段，无需再次重复 sync
        sync(value)
      }
    }, time / 2)

    return () => {
      clearInterval(timer)
      latestSyncingValueRef.current = undefined
      // console.info('Vditor: stop syncing.')
    }
  }, [state, sync])

  const handle = useCallback((event: 'insert' | 'input') => {
    if (event === 'insert') {
      setState('inserted')
    } else if (event === 'input') {
      setState(current => {
        if (current === 'normal') {
          return 'normal' // 正常情况下啥事不干
        }
        if (current === 'inserted') {
          return 'syncing' // 跳过 insertValue 后同步触发的那次 input 并进入临时 syncing 模式
        }
        if (current === 'syncing') { // 此后如果再触发 input 事件，证明编辑器已恢复正常，那么回到 normal 状态即可
          return 'normal'
        }
        throw new Error(`Unknown editor status: ${current}.`)
      })
    }
  }, [])

  return handle
}

interface BaseProps {
  value: string
  // eslint-disable-next-line react/no-unused-prop-types
  onChange(value: string): void
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

  const handle = useAutoSyncValueHandler(
    () => {
      if (!vditor) {
        return
      }

      const value = vditor.getValue()
      if (currentValueRef.current !== value) {
        return value
      }
    },
    value => syncValue(value)
  )

  useEffect(() => {
    const defaultValue = latestPropsRef.current.value
    currentValueRef.current = defaultValue

    const vditorInstance = new Vditor(vditorContainerRef.current!, {
      ...vditorBaseOptions,
      value: defaultValue,
      input(value) { // 自带 1s debounce TODO: 把时间设短一点？
        syncValue(value)
        handle('input')
      },
      after() { // mount
        const placeholderEle = (
          vditorContainerRef.current!.querySelector(`[data-role="${uploadImageEntryId}"]`)! as HTMLElement
        )
        // HACK: 干掉 veditor 的 button 包裹节点，因为我们自己的 UploadImage 组件无法塞到 button 里
        const vditorContainerEle = placeholderEle.parentNode!.parentNode as Element
        vditorContainerEle.innerHTML = ''
        setVditorUploadImageEntry(vditorContainerEle)
      }
    })

    setVditor(vditorInstance)

    return () => {
      currentValueRef.current = ''
      vditorInstance.destroy()
      setVditor(null)
      setVditorUploadImageEntry(null)
    }
  }, [handle])

  useEffect(() => {
    // 非受控组件转受控的同时保证编辑器局部状态不丢失 & 性能
    if (vditor && currentValueRef.current !== props.value) {
      vditor.setValue(props.value)
    }
  }, [vditor, props.value])

  const handleImageUploaded = useCallback((url: string) => {
    // insertValue 后会同步触发一次 input 事件，因此这里不需要手动调用一次 syncValue
    vditor?.insertValue(`![内容站插图](${url})`)
    // 但后续依然需要短暂、持续地 syncValue 具体情况看代码定义处
    handle('insert')
  }, [vditor, handle])

  const uploadImageToolbarMenuItemView = vditorUploadImageEntry && vditor && ReactDOM.createPortal(
    // HACK: 由于上面干掉了 veditor 自己的节点，这里需要把样式和 DOM 结构啥的对应重新补上去
    (
      <div
        className={`vditor-tooltipped vditor-tooltipped__n ${style.uploadImageEntry}`}
        aria-label={uploadImageToolbarMenuItemOptions.tip}
      >
        <UploadImage onUploaded={handleImageUploaded}>
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

export interface Props {
  state: IState<string>
}

export default observer(function Editor({ state }: Props) {
  return (
    <InputWrapper state={state}>
      <BaseEditor {...bindInput(state)} />
    </InputWrapper>
  )
})
