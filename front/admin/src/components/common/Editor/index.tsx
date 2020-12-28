import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Button, Icon } from 'react-icecream'
import { FieldState, FormState, bindInput } from 'formstate-x'
import BraftEditor, { ControlType, ExtendControlType, EditorState } from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import UploadImg, * as uploadImg from '../UploadImg'
import 'braft-editor/dist/index.css'
import * as style from './style.m.less'

const maxLen = 5000 // 文本最大长度

const controls = [
  'undo', 'redo', 'separator',
  'font-size', 'separator',
  'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  'remove-styles', 'separator',
  'text-indent', 'text-align', 'separator',
  'headings', 'list-ul', 'list-ol', 'separator',
  'link', 'separator',
  'hr', 'separator',
  'clear', 'fullscreen'
] as ControlType[]

interface IProps {
  state: State
  readOnly: boolean
}

export type State = FormState<{
  editorState: FieldState<EditorState>
  img: uploadImg.State
}>

export function createState(value: string): State {
  const editorState = BraftEditor.createEditorState(value)
  return new FormState({
    editorState: new FieldState(editorState, 600).validators(val => {
      const len = val.toText().length
      if (!len) return '不可为空'
      if (len > maxLen) return `长度不能大于 ${maxLen}`
      return null
    }),
    img: uploadImg.createState('')
  })
}

export function getValue(state: State): string {
  return state.$.editorState.$.toHTML()
}

export default observer(function Editor({ state, readOnly }: IProps) {
  const uploadHandler = useCallback(
    url => {
      state.$.editorState.onChange(
        ContentUtils.insertMedias(state.$.editorState.value, [{
          type: 'IMAGE',
          url
        }])
      )
    },
    [state.$.editorState]
  )

  const extendControls = [
    {
      key: 'uploader',
      type: 'component',
      component: (
        <UploadImg state={state.$.img} onUploaded={uploadHandler} maxSize={500}>
          <Button data-title="插入图片" className={style.btn}>
            <Icon type="picture" theme="filled" className={style.icon} />
          </Button>
        </UploadImg>
      )
    }
  ] as ExtendControlType[]

  return (
    <div className={style.container}>
      <BraftEditor
        {...bindInput(state.$.editorState)}
        controls={controls}
        extendControls={extendControls}
        readOnly={readOnly}
      />
    </div>
  )
})
