/**
 * @file          component  UploadMdFile
 * @description   product price 专有的上传 md 文件组件，并提供定制化 md 文件预览
 * @author        renpanpan
 */

import React from 'react'
import { observer } from 'mobx-react'
import Modal from 'react-icecream/lib/modal'
import { RcFile } from 'react-icecream/lib/upload'

import UploadMdFile, { Props as CommonProps } from 'components/common/Upload/MdFile'
import MdPreview from '../MdPreview'
import style from './style.m.less'

export type Props = Pick<CommonProps, 'state' | 'onUploaded' | 'children'>

export { State, Value, createState, getValue } from 'components/common/Upload/MdFile'

const maxSize = 500 // 文件最大值，单位 kb

const PriceUploadMdFile = observer(function PriceUploadMdFile(props: Props) {
  const { state, onUploaded, children } = props

  function beforeUpload(file: RcFile): Promise<void> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        const result = typeof reader.result === 'string' ? reader.result : ''
        const content = (
          <>
            <h4 className={style.previewText}>效果预览：</h4>
            <MdPreview className={style.previewContent} text={result} />
          </>
        )
        Modal.confirm({
          title: `确认上传 ${file.name}？`,
          content,
          width: 900,
          centered: true,
          okText: '确认',
          cancelText: '取消',
          onOk: () => resolve()
        })
      }
    })
  }

  return (
    <UploadMdFile state={state} maxSize={maxSize} beforeUpload={beforeUpload} onUploaded={onUploaded}>
      {children}
    </UploadMdFile>
  )
})

export default PriceUploadMdFile
