import React from 'react'
import { Modal } from 'react-icecream'
import style from './style.less'

export default function showModal() {
  return new Promise(resolve => {
    Modal.confirm({
      title: '提示',
      content: (
        <>
          <p>体验审核产品将产生费用</p>
          <p>
            具体参考：
            <a target="_blank" rel="noopener" href="https://developer.qiniu.com/censor/manual/4833/censor-price">
              「计费方式」
            </a>
          </p>
        </>),
      okText: '确定',
      cancelText: '取消',
      onOk: () => resolve(),
      className: style.modal
    })
  })
}
