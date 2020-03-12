/**
 * @file Production Mode of RichText
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import { ComponentName, IComponentInfo } from 'apis/component'

import * as styles from './style.m.less'

export interface IConfig {
  background_from: string // 背景色开始色
  background_to: string // 背景颜色结束色
  html: string // 富文本内容
}

export interface IProps {
  info: IComponentInfo<ComponentName.RichText>
}

export default observer(function RichText({ info: { data } }: IProps) {
  const { background_from, background_to, html } = data

  const bgColorStyle = {
    background: `linear-gradient(${background_from}, ${background_to})`
  }

  return (
    <div className="features" style={bgColorStyle}>
      <div className="container">
        <div className={styles.mainWrapper} dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    </div>
  )
})
