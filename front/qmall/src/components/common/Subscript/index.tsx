/**
 * @file component Subscript
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import * as styles from './style.m.less'

export interface IProps {
  text: string
  color: string
}

export default observer(function Subscript(props: IProps) {
  const { text, color } = props

  const bgColorStyle = {
    backgroundColor: color
  }

  return (
    <span className={styles.mainWrapper} style={bgColorStyle}>{text}</span>
  )
})
