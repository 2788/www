/**
 * @file 当前登录用户信息提供组件
 */

import React, { createContext, useContext, PropsWithChildren, useEffect, useState } from 'react'
import { getUserInfo } from 'apis/gaea'
import { login as sensorsLogin } from 'utils/sensors'
import { useQueryValue } from 'hooks/url'

export interface UserInfo {
  email: string
  signedIn: boolean
  name: string
  uid: number
  is_certified: boolean
}

const context = createContext<UserInfo | null>(null)
const loadingContext = createContext(true)

/** 向子元素提供当前用户信息 */
export function Provider({ children }: PropsWithChildren<{}>) {
  const [isLoading, setIsLoading] = useState(true)
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
      setIsLoading(false)
    } else {
      let cancelled = false
      getUserInfo().then(data => {
        if (!cancelled) {
          setUserinfo({
            signedIn: true,
            email: data.customer_email,
            name: data.full_name,
            uid: data.uid,
            is_certified: data.is_certified
          })
          setIsLoading(false)
        }
      }, () => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })
      return () => {
        cancelled = true
      }
    }
  }, [userinfoOfQuery])

  // 绑定 sensors login id
  useEffect(() => {
    if (userInfo && userInfo.signedIn) {
      sensorsLogin(userInfo.uid + '')
    }
  }, [userInfo])

  return (
    <loadingContext.Provider value={isLoading}>
      <context.Provider value={userInfo}>
        {children}
      </context.Provider>
    </loadingContext.Provider>
  )
}

/** 获取当前用户信息 */
export function useUserInfo(): UserInfo | null {
  return useContext(context)
}

/** 是否正在加载当前用户信息 */
export function useIsLoadingUserInfo() {
  return useContext(loadingContext)
}
