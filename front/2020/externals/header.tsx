/**
 * @file 顶部导航
 * @description 顶部导航 对应的 HTML 片段，用于外部集成
 */

import React from 'react'
import Layout from 'components/Layout/External'
import Header from 'components/Header'
import { register } from './helper'

register('header', () => (
  <Layout>
    <Header />
  </Layout>
))
