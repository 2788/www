/**
 * @file          component  sla-sms
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SlaSms() {
  return <Redirect target="/agreements/sla/sms" />
}
