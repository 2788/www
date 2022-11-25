/**
 * @file upload icon
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { RcFile } from 'react-icecream-1/lib/upload'
import { Loading, Dialog, DialogFooter } from 'react-icecream'
import { InputWrapper } from 'react-icecream-form'
import { FieldState, FormState, TransformedState } from 'formstate-x'
import { getMessage } from 'qn-fe-core/exception'

import { iconConfig, IconFile } from 'constants/icon'
import CommonUpload from 'components/common/Upload'
import { ClearableUploadBtn } from 'components/common/Upload/Img'

import IconPreview from 'components/common/IconPreview'

import styles from './style.m.less'

const imgFilter = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

function isSvg(filePath: string): boolean {
  return /\.svg$/i.test(filePath)
}

// TODO: 优化类似的设计模式
function getBaseValue(fileInfo: IconFile | undefined) {
  const type = fileInfo?.type ?? 'svg-inline'
  return {
    type,
    url: type === 'url' && fileInfo && 'url' in fileInfo && fileInfo.url ? fileInfo.url : '',
    content: type === 'svg-inline' && fileInfo && 'content' in fileInfo && fileInfo.content ? fileInfo.content : ''
  }
}

// TODO: 优化类似的设计模式
export const defaultValue = {
  type: 'svg-inline' as const,
  content: ''
}

export function createState(iconFile?: IconFile) {
  const init = getBaseValue(iconFile)

  const typeState = new FieldState(init.type)
  const state = new FormState({
    type: typeState,
    url: new FieldState(init.url).disableWhen(() => typeState.value !== 'url'),
    content: new FieldState(init.content).disableWhen(() => typeState.value !== 'svg-inline')
  })

  return new TransformedState<typeof state, IconFile, ReturnType<typeof getBaseValue>>(
    state,
    file => {
      if (file.type === 'svg-inline') {
        return {
          type: file.type,
          content: file.content
        }
      }

      if (file.type === 'url') {
        return {
          type: file.type,
          url: file.url
        }
      }

      throw new Error(`Unsupported icon file type ${file.type}.`)
    },
    getBaseValue
  ).withValidator(value => {
    // TODO: 这种情况下如何让子表单的校验跟 `FormItem` 结合在一起？这样就可以把校验逻辑直接写在子表单里而不是集中在这里
    if (
      value.type === 'svg-inline' && value.content === ''
      || value.type === 'url' && value.url === ''
    ) {
      return '不能为空'
    }
  })
}

export interface Props {
  state: ReturnType<typeof createState>
}

export default observer(function UploadIcon({ state }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const fields = state.$.$

  function handleBeforeUpload(file: RcFile): boolean {
    const isOver = file.size > iconConfig.maxSize * 1024
    if (isOver) {
      setErrorText(`上传的图片大小不能超过 ${iconConfig.maxSize} KB`)
      return false
    }

    setIsLoading(true)

    if (!isSvg(file.name)) {
      fields.type.set('url')
      return true
    }

    fields.type.set('svg-inline')
    file.text()
      .then(
        svg => { fields.content.set(svg) },
        err => { setErrorText(getMessage(err) ?? '') }
      )
      .finally(() => {
        setIsLoading(false)
      })

    return false
  }

  function handleUploaded(url: string) {
    fields.url.set(url)
    setIsLoading(false)
  }

  return (
    <InputWrapper state={state}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <Loading loading={isLoading}>
            <CommonUpload
              accept={imgFilter.join(', ')}
              uploadBucketKeyRule="icon"
              beforeUpload={handleBeforeUpload}
              onUploaded={handleUploaded}
            >
              <ClearableUploadBtn state={fields.type.value === 'url' ? fields.url : fields.content} />
            </CommonUpload>
          </Loading>
          <IconPreview icon={state.value} className={styles.icon} />
        </div>
        <p className={styles.desc}>最大 {iconConfig.maxSize} KB</p>
        <Dialog
          visible={!!errorText}
          onOk={() => { setErrorText('') }}
          onCancel={() => { setErrorText('') }}
          icon
          footer={<DialogFooter okText="知道了" cancelButtonProps={{ className: styles.hidden }} />}
        >
          {errorText}
        </Dialog>
      </div>
    </InputWrapper>
  )
})
