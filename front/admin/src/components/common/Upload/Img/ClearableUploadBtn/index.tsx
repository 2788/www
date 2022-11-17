/**
 * @file 带清空按钮的上传按钮
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'react-icecream'
import { CloseCircleIcon } from 'react-icecream/icons'
import { IState } from 'formstate-x'

import styles from './style.m.less'

export interface IProps {
  state: IState<string>
}

export default observer(function ClearableUploadBtn({ state }: IProps) {
  return (
    <>
      <Button type="link" className={styles.uploadBtn}>上传</Button>
      {state.value && (
        <CloseCircleIcon
          className={styles.clearIcon}
          onClick={e => { e.stopPropagation(); state.onChange('') }}
        />
      )}
    </>
  )
})
