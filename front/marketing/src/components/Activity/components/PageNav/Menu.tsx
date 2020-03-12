/**
 * @file component Menu of PageNav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import { v4 as uuid } from 'uuid'

import * as styles from './style.m.less'

import { IConfig } from '.'

export interface IProps extends IConfig {
  onSelect(key: string): void
}

export default observer(function Menu({ onSelect, ...config }: IProps) {
  const { current: uniqueClassName } = useRef('menu-' + uuid())

  const { list, background_from, background_to, background_hover } = config

  // TODO: 感觉效果会不好
  // HACK: pseudo class - hover
  const styleText = `
    .${uniqueClassName} {
      color: ${background_hover};
      background-image: linear-gradient(${background_from}, ${background_to});
    }
    .${uniqueClassName} .${styles.item}:hover {
      color: ${background_from};
      background-color: ${background_hover};
    }
  `

  return (<>
    <style>{styleText}</style>
    <ul className={`${styles.menu} ${uniqueClassName}`}>
      {list.map(({ key, text }) => (
        <li
          key={key}
          onClick={() => onSelect(key)}
          className={styles.item}
          dangerouslySetInnerHTML={{ __html: text }}
        ></li>
      ))}
    </ul>
  </>)
})
