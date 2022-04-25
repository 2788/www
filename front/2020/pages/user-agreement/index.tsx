/**
 * @file          component  user-agreement
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function UserAgreement() {
  return <Redirect target="/agreements/user-agreement" />
}
