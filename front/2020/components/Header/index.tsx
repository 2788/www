import React, { useEffect } from 'react'

import { useMobile } from 'hooks/ua'
import { useQueryValue } from 'hooks/url'
import { useApi } from 'hooks/api'

import { setCpsKeyCookie } from 'apis/cps'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Header() {
  const isMobile = useMobile()

  // 如果 url 有 cps_key query 参数
  // 则调用后端接口种下对应的 cookie
  // https://jira.qiniu.io/browse/BO-15948
  // TODO: 后续将对应逻辑迁移到 externals 中
  // https://jira.qiniu.io/browse/BO-16041
  const [cpsKey] = useQueryValue('cps_key', '')
  const { call: callSetCpsKeyCookie } = useApi(setCpsKeyCookie)

  useEffect(() => {
    if (!cpsKey) return

    callSetCpsKeyCookie({
      cps_key: cpsKey
    })
  }, [cpsKey, callSetCpsKeyCookie])

  return isMobile ? <Mobile /> : <Pc />
}
