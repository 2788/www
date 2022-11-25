/**
 * @file 图片预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import classnames from 'classnames'
import { Modal, ModalFooter } from 'react-icecream'

import style from './style.m.less'

interface Size {
  width: number
  height: number
}

const iconMaxSize: Size = {
  width: 80,
  height: 32
}

const previewMaxSize: Size = {
  width: 800,
  height: 500
}

function getSize(width: number | undefined, height: number | undefined, maxSize: Size): Size | undefined {
  if (!width || !height) {
    return undefined
  }

  if (width <= maxSize.width && height <= maxSize.height) {
    return {
      width,
      height
    }
  }

  const isTooWide = width / height > maxSize.width / maxSize.height
  return isTooWide
    ? {
      width: maxSize.width,
      height: maxSize.width * height / width
    }
    : {
      width: maxSize.height * width / height,
      height: maxSize.height
    }
}

export interface Props {
  url: string
  /** 默认 contain */
  type?: 'contain' | 'cover'
  width?: number
  height?: number
  className?: string
}

export default function ImgPreview({ url, type, width, height, className }: Props) {
  const [visible, setVisible] = useState(false)

  if (!url) {
    return null
  }

  const commonImgStyles = {
    backgroundImage: `url("${url}")`,
    backgroundSize: type ?? 'contain'
  }

  const previewSize = getSize(width, height, previewMaxSize)
  const previewView = previewSize && (
    <div
      className={classnames(style.preview, style.bordered)}
      style={{
        ...commonImgStyles,
        width: `${previewSize.width}px`,
        height: `${previewSize.height}px`
      }}
    >
    </div>
  )

  const iconSize = getSize(width, height, iconMaxSize)
  return (
    <>
      <div
        title={previewView ? '点击预览大图' : undefined}
        className={classnames(style.main, className)}
        style={{
          maxWidth: `${iconMaxSize.width}px`,
          maxHeight: `${iconMaxSize.height}px`,
          cursor: previewView ? 'pointer' : 'default'
        }}
        onClick={() => {
          if (previewView) {
            setVisible(true)
          }
        }}
      >
        <div
          className={classnames(style.icon, iconSize && style.bordered)}
          style={{
            ...commonImgStyles,
            width: `${iconSize?.width || iconMaxSize.width}px`,
            height: `${iconSize?.height || iconMaxSize.height}px`
          }}
        >
        </div>
      </div>
      <Modal
        title="预览大图"
        width={previewMaxSize.width + 24 * 2} // @icecream-gap-lg = 24
        visible={visible}
        onOk={() => { setVisible(false) }}
        onCancel={() => { setVisible(false) }}
        footer={<ModalFooter cancelButtonProps={{ className: style.hidden }} />}
      >
        {previewView}
      </Modal>
    </>
  )
}
