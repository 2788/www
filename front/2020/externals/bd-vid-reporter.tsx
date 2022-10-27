/**
 * @file BDVidReporter 组件 externals
 * @author jiayizhen <jiayizhen@qiniu.com>
 * @description 用于外部集成
 */

import React from 'react'

import Layout from 'components/Layout/External'
import BDVidReporter from 'components/BDVidReporter'

import { register } from './helper'

register('bd-vid-reporter', () => (
  <Layout>
    <BDVidReporter />
  </Layout>
))
