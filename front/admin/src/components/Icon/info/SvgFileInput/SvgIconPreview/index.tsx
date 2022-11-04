/**
 * @file 图标库 svg 图标预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import classnames from 'classnames'
import { Modal, ModalFooter } from 'react-icecream-2'

import { iconConfig } from 'constants/icon'

import style from './style.m.less'

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
        className={classnames(style.main, className)}
        onClick={() => { setVisible(true) }}
      >
        <div
          className={classnames(style.icon, style.bordered, !svg && style.hidden)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>
      </div>
      <Modal
        title="预览大图"
        width={150}
        visible={visible}
        onOk={() => { setVisible(false) }}
        onCancel={() => { setVisible(false) }}
        footer={<ModalFooter cancelButtonProps={{ className: style.hidden }} />}
      >
        <div
          className={classnames(style.preview, style.bordered)}
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
