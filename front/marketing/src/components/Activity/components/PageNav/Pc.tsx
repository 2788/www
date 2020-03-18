/**
 * @file component Pc of PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-icecream/lib/icon'

import { ICommonProps } from '.'

import * as styles from './style.m.less'

export interface IProps extends ICommonProps {}

export default observer(function Pc({ visible, setVisible, children }: IProps) {
  // FIXME: enter 到 body 上的时候也需要 close，比如鼠标绕出去再回来，或者 window resize 导致的 toggle

  const hotspotView = !visible && (
    <div
      onMouseEnter={() => setVisible(true)}
      className={styles.hotspot}
    >
      页面导航
      <Icon type="caret-right" className={styles.iconCaret} />
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
