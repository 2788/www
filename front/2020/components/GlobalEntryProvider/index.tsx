/**
 * @file 全局的底部入口: 默认为注册
 * @description 移动端 & PC 端表现不同
 */

import React, { useState, useContext, createContext, ReactNode, FC, PropsWithChildren } from 'react'
import { useUserInfo } from 'components/UserInfo'
import { useMobile } from 'hooks/ua'
import MobileRegisterEntry from './Mobile'

import styles from './style.less'

interface IEntry {
  set: (node: ReactNode) => void
}

const globalEntryContext = createContext<IEntry | undefined>(undefined)

const GlobalEntryProvider: FC<PropsWithChildren<ReactNode>> = props => {
  const userInfo = useUserInfo()
  const isMobile = useMobile()
  const [entry, setEntry] = useState<ReactNode | null>(null)

  if (isMobile) {
    // 如 PC 端、无用户信息或未登录，则展示注册入口
    if ((!userInfo || !userInfo.signedIn) && entry == null) {
      setEntry(<MobileRegisterEntry />)
    }
  }

  return (
    <globalEntryContext.Provider value={{
      set: node => setEntry(node)
    }}
    >
      {props.children}
      {entry
        && <div className={styles.wrapper}>
          <div className={styles.fixed}>
            {entry}
          </div>
        </div>}
    </globalEntryContext.Provider>
  )
}

export const useGlobalEntryContext = () => {
  const ctx = useContext(globalEntryContext)
  if (ctx == null) {
    throw new Error('未到找 GloablEntryContext! 请检查是否有 GlobalEntryProvider 包装')
  }
  return ctx
}

export default GlobalEntryProvider
