/**
 * @file component Pc of PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import { ICommonProps } from '.'

import * as styles from './style.m.less'

export interface IProps extends ICommonProps {}

export default observer(function Pc({ visible, setVisible, children }: IProps) {
  const hotspotView = !visible && (
    <div
      onMouseEnter={() => setVisible(true)}
      className={styles.hotspot}
    >
      页面导航
    </div>
  )

  return (
    <div className={styles.pc}>
      {hotspotView}
      <div
        onMouseLeave={() => setVisible(false)}
        className={styles.menuWrapper}
      >
        {children}
      </div>
    </div>
  )
})
