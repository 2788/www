/**
 * @file          component  sdk-agreement
 * @description   拦截老页面
 * @author        zhouhang
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function SdkAgreement() {
  return <Redirect target="/agreements/sdk-agreement" />
}
