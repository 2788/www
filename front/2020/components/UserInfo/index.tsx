/**
 * @file 当前登录用户信息提供组件
 */

import React, { createContext, useContext, PropsWithChildren, useEffect } from 'react'
import { UserInfo, getUserInfo } from 'apis/legacy'
import { useApiWithParams } from 'hooks/api'
import { login as sensorsLogin } from 'utils/sensors'

const context = createContext<UserInfo | null>(null)

/** 向子元素提供当前用户信息 */
export function Provider({ children }: PropsWithChildren<{}>) {
  const { $: userInfo } = useApiWithParams(getUserInfo, { params: [] })

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

