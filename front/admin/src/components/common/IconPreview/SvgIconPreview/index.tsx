/**
 * @file 图标库 svg 图标预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import classNames from 'classnames'
import { Modal, ModalFooter } from 'react-icecream'

import { iconConfig } from 'constants/icon'

import styles from './style.m.less'

export interface Props {
  svg: string
  className?: string
}

export default function SvgIconPreview({ svg, className }: Props) {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div
        title="点击预览大图"
        className={classNames(styles.main, className)}
        onClick={() => { setVisible(true) }}
      >
        <div
          className={classNames(styles.icon, styles.bordered, !svg && styles.hidden)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>
      </div>
      <Modal
        title="预览大图"
        width={800}
        visible={visible}
        onOk={() => { setVisible(false) }}
        onCancel={() => { setVisible(false) }}
        footer={<ModalFooter cancelButtonProps={{ className: styles.hidden }} />}
      >
        <div
          className={classNames(styles.preview, styles.bordered)}
          style={{
            width: `${iconConfig.width}px`,
            height: `${iconConfig.height}px`
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>
      </Modal>
    </>
  )
}

export function SvgIconPreviewNano({ svg, className }: Props) {
  return (
    <div
      className={classNames(styles.iconNano, className)}
      // TODO: 无法避免 svg 内容被搜索出来的问题
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    >
    </div>
  )
}
