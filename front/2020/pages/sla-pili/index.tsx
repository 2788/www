/**
 * @file          component  sla-pili
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaPili() {
  return <Redirect target="/agreements/sla/pili" />
}
