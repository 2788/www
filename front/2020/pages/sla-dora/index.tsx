/**
 * @file          component  sla-dora
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaDora() {
  return <Redirect target="/agreements/sla/dora" />
}
