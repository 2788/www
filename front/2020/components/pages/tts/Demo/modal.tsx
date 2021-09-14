import React from 'react'
import { Modal } from 'react-icecream'

export default function showModal() {
  return new Promise(resolve => {
    Modal.confirm({
      title: '提示',
      content: (
        <>
          <p>体验语音合成将产生费用，计费方式：1.7 元/万字</p>
        </>),
      okText: '确定',
      cancelText: '取消',
      onOk: () => resolve()
    })
  })
}
