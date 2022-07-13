/**
 * @file 用户反馈入口 V4
 * @description 用户反馈入口（含滚动到顶部的按钮）对应的 HTML 片段，用于外部集成
 */

import React, { useEffect } from 'react'

import Layout from 'components/Layout/External'
import { EntryV4 as FeedbackEntry, useModal } from 'components/Feedback'
import ScrollToTop from 'components/ScrollToTopV2'

import { register } from './helper'

// 调起反馈浮层的函数
let showModalFn: (() => void) | undefined

/**
 * 把用于调起反馈浮层的函数扔出来
 * 方便 external 的嵌入方通过代码逻辑调起反馈浮层
 */
function FeedbackInvoker() {
  const { startConsulting } = useModal()

  useEffect(() => {
    showModalFn = startConsulting

    return () => {
      showModalFn = undefined
    }
  }, [startConsulting])

  return null
}

register('feedback-entry-v4', () => (
  <Layout>
    <FeedbackInvoker />
    <FeedbackEntry />
    <ScrollToTop />
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
