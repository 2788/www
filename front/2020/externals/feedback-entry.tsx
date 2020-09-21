/**
 * @file 用户反馈入口
 * @description 用户反馈入口 对应的 HTML 片段，用于外部集成
 */

import React from 'react'
import Layout from 'components/Layout/External'
import { Entry as FeedbackEntry } from 'components/Feedback'
import { register } from './helper'

register('feedback-entry', () => (
  <Layout>
    <FeedbackEntry />
  </Layout>
))
