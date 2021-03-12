/**
 * @file 上报 cps 访问信息 externals
 * @description 用于外部集成
 */

import React from 'react'

import Layout from 'components/Layout/External'
import CpsVisitReporter from 'components/CpsVisitReporter'

import { register } from './helper'

register('cps-visit-reporter', () => (
  <Layout>
    <CpsVisitReporter />
  </Layout>
))
