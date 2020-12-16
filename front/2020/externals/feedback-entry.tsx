/**
 * @file 用户反馈入口
 * @description 用户反馈入口 对应的 HTML 片段，用于外部集成
 */

import React, { useEffect } from 'react'
import Layout from 'components/Layout/External'
import { Entry as FeedbackEntry, useModal } from 'components/Feedback'
import { register } from './helper'

// 调起反馈浮层的函数
let showModalFn: (() => void) | undefined

/**
 * 把用于调起反馈浮层的函数扔出来
 * 方便 external 的嵌入方通过代码逻辑调起反馈浮层
 */
function FeedbackInvoker() {
  const { showModal } = useModal()
  useEffect(() => {
    showModalFn = showModal
    return () => {
      showModalFn = undefined
    }
  }, [showModal])
  return null
}

register('feedback-entry', () => (
  <Layout>
    <FeedbackInvoker />
    <FeedbackEntry />
  </Layout>
), {
  showModal() {
    if (!showModalFn) {
      // eslint-disable-next-line no-console
      console.warn('showModal() not ready yet')
      return
    }
    showModalFn()
  }
})
