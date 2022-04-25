/**
 * @file          component  sla-kodo
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaKodo() {
  return <Redirect target="/agreements/sla/kodo" />
}
