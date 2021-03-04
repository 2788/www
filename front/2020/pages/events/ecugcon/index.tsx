/**
 * @file /events/ecugcon 页面重定向到 https://www.ecug.org
 * @description 301 重定向放在老官网有一些问题，bucket 镜像回源的时候跟随 301
 * 因此在新官网直接重定向
 */

import React from 'react'

import Redirect from 'components/Redirect'

import { ecugHost } from 'constants/env'

export default function EcugConPage() {
  return <Redirect target={ecugHost} />
}
