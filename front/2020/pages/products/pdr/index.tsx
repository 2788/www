/**
 * @file Pandora 2.0 在老官网的路由（/pdr），重定向到 /pandora
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function PdrPage() {
  return <Redirect target="/products/pandora" />
}
