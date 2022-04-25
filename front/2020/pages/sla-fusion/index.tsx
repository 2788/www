/**
 * @file          component  sla-fusion
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaFusion() {
  return <Redirect target="/agreements/sla/fusion" />
}
