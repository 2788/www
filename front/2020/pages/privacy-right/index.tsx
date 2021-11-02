/**
 * @file          component  privacy-right
 * @description   拦截老页面
 * @author        renpanpan
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function PrivacyRight() {
  return <Redirect target="/agreements/privacy-right" />
}
