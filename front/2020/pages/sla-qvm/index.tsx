/**
 * @file          component  sla-qvm
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaQvm() {
  return <Redirect target="/agreements/sla/qvm" />
}
