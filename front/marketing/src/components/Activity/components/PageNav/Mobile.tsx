/**
 * @file component Mobile of PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-icecream/lib/icon'

import { ICommonProps } from '.'

import * as styles from './style.m.less'

export interface IProps extends ICommonProps {
  color: string
}

export default observer(function Mobile({ visible, setVisible, color, children }: IProps) {
  // onTap / onClick 的时候暂时不需要 close

  const buttonView = (
    <div className={styles.buttonWrapper}>
      <span
        className={styles.button}
        style={{ color }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <Icon type="close" />
        ) : (
          <Icon type="unordered-list" />
        )}
      </span>
    </div>
  )

  return (
    <div className={styles.mobile}>
      <div className={styles.menuWrapper}>
        {children}
      </div>
      {buttonView}
    </div>
  )
})
