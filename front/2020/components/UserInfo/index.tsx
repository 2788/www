/**
 * @file 当前登录用户信息提供组件
 */

import React, { createContext, useContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserInfo, getUserInfo } from 'apis/legacy'
import { login as sensorsLogin } from 'utils/sensors'
import { useQueryValue } from 'hooks/url'

const context = createContext<UserInfo | null>(null)

/** 向子元素提供当前用户信息 */
export function Provider({ children }: PropsWithChildren<{}>) {
  const [userInfo, setUserinfo] = useState<UserInfo | null>(null)
  // 参数可能指定用户信息，比如小程序
  const [userinfoOfQuery] = useQueryValue('userInfo', '')

  useEffect(() => {
    // 如果是从小程序带过来直接 parse，不需要发送请求
    if (userinfoOfQuery) {
      try {
        const parsedUserinfo: UserInfo = JSON.parse(userinfoOfQuery)
        setUserinfo(parsedUserinfo)
      } catch {
        // 无需处理
      }
    } else {
      getUserInfo().then(setUserinfo)
    }
  }, [userinfoOfQuery])

  // 绑定 sensors login id
  useEffect(() => {
    if (userInfo && userInfo.signedIn) {
      sensorsLogin(userInfo.uid + '')
    }
  }, [userInfo])

  return <context.Provider value={userInfo}>{children}</context.Provider>
}

/** 获取当前用户信息 */
export function useUserInfo(): UserInfo | null {
  return useContext(context)
}

