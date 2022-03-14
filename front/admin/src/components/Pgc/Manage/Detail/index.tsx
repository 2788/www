/**
 * @file 新增 / 编辑
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import TestEditor from '../MarkdownPreview/Test.dev'

export type Props = {
  mode: 'add'
} | {
  mode: 'edit'
  id: string
}

export default observer(function Detail(_props: Props) {
  return (
    <div>
      <TestEditor />
    </div>
  )
})
