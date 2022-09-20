/**
 * @file 用于 external 内容的 Layout
 * @description external 即会被嵌入到其他站点页面中的片段
 */

import React, { PropsWithChildren, useRef, useCallback } from 'react'
import { UrlObject, format } from 'url'
import singletonRouter, { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import UaProvider, { useIsMobileWithInitialState, getIsMobile } from 'components/Layout/UaProvider'
import { Provider as UserInfoProvider } from 'components/UserInfo'
import * as feedback from 'components/Feedback'
import { DropdownContainerProvider } from 'components/UI/Dropdown'
import WechatConsultModal, { ModalProvider as WechatConsultModalProvider } from 'components/WechatConsultModal'
import { UaContext, useUa } from 'hooks/ua'
import { host } from 'constants/env'

import 'react-icecream/dist/icecream.min.css'
import styles from './style.less'

type Url = UrlObject | string

function resolve(url: Url) {
  const urlAsString = format(url)
  const resolved = new URL(urlAsString, host)
  return format(resolved)
}

const fakeEmitter = {
  on: () => null,
  off: () => null,
  emit: () => null
}

const router: NextRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',

  async push(url: Url) {
    window.location.assign(resolve(url))
    return true
  },
  async replace(url: Url) {
    window.location.replace(resolve(url))
    return true
  },
  reload() { window.location.reload() },
  back() { window.history.back() },
  async prefetch() { /* do nothing */ },
  beforePopState() { /* do nothing */ },
  events: fakeEmitter,
  isFallback: false
}

singletonRouter.router = router as any

export default function ExternalLayout({ children }: PropsWithChildren<{}>) {

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const getWrapper = useCallback(() => wrapperRef.current || document.body, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <RouterContext.Provider value={router}>
        <UaProvider>
          <InstantMobileProvider>
            <UserInfoProvider>
              <DropdownContainerProvider getContainer={getWrapper}>
                <WechatConsultModalProvider>
                  <feedback.ModalProvider>
                    {children}
                    <feedback.Modal />
                    <WechatConsultModal />
                  </feedback.ModalProvider>
                </WechatConsultModalProvider>
              </DropdownContainerProvider>
            </UserInfoProvider>
          </InstantMobileProvider>
        </UaProvider>
      </RouterContext.Provider>
    </div>
  )
}

// externals 内容不走 SSR / SSG，因此不需要维护一个固定的初始状态，以保持客户端渲染跟静态（服务端）渲染逻辑的一致
// 可以在初次渲染时就使用正确的 mobile 信息；这里 InstantMobileProvider 将更精确/即时的 mobile 信息 provide 下去
function InstantMobileProvider({ children }: PropsWithChildren<{}>) {
  const ua = useUa()
  const instantMobile = useIsMobileWithInitialState(getIsMobile())
  const uaWithInstantMobile = { ...ua, isMobile: instantMobile }
  return (
    <UaContext.Provider value={uaWithInstantMobile}>
      {children}
    </UaContext.Provider>
  )
}
