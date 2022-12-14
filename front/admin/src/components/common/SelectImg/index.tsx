/**
 * @file 选择图片
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'
import { observer } from 'mobx-react'
import { FieldState, IState } from 'formstate-x'
import { RadioGroup, Radio } from 'react-icecream-form'
import { Tooltip } from 'react-icecream'

import styles from './style.m.less'

export type Value = string

export function createState<T extends Value>(value: T) {
  return new FieldState<T>(value)
}

export interface ImgItemProps<T extends Value> {
  value: T
  src: string
  name?: string
  width?: string
  height?: string
}

export function ImgItem<T extends Value>({ value, src, name, width, height }: ImgItemProps<T>) {
  return (
    <span className={styles.item}>
      <Radio<T> value={value} className={styles.radio}>
        <Tooltip
          title={
            <span
              className={styles.largeImgWrapper}
              style={{
                ...(width && { width }),
                ...(height && { height })
              }}
            >
              <img src={src} alt={value} />
            </span>
          }
          placement="bottomLeft"
          overlayClassName={styles.overlay}
        >
          <span className={styles.smallImgWrapper}>
            <img src={src} alt={value} />
          </span>
        </Tooltip>
      </Radio>
      {name && (<span className={styles.name}>{name}</span>)}
    </span>
  )
}

export interface Props<T extends Value> {
  state: IState<T>
  children: ReactNode
  className?: string
}

export default observer(function SelectImg<T extends Value>({ state, children, className }: Props<T>) {
  return (
    <div className={className}>
      <RadioGroup<T> radioType="button" state={state}>
        {children}
      </RadioGroup>
    </div>
  )
})
