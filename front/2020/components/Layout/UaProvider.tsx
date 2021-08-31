/**
 * @file UA 信息 Provider
 * @description UA 信息包括是否移动、浏览器、操作系统等
 */

import React, { PropsWithChildren, useState, useEffect } from 'react'
import { UAParser } from 'ua-parser-js'
import { UaContext, useUa, Ua } from 'hooks/ua'

export default function UaProvider({ children }: PropsWithChildren<{}>) {
  // 满足某些场景需要手动提供 ua 的情况，可以在父组件 provider 覆盖手动值
  const ua = useUa()
  const isMobile = useIsMobile()
  const isWx = useIsWx()
  const isMp = useIsMp()
  const loaded = useLoaded()
  const uaParser = useUaParser()

  const uaValue: Ua = {
    isMobile,
    isWx,
    isMp,
    loaded,
    browser: uaParser.getBrowser(),
    os: uaParser.getOS(),
    ...ua
  }

  return (
    <UaContext.Provider value={uaValue}>
      {children}
    </UaContext.Provider>
  )
}

// 默认 UA 值，用于静态渲染 & 首屏初始化逻辑
const defaultUaText = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'

function useUaParser() {
  const [parser, setParser] = useState<UAParser>(new UAParser(defaultUaText))
  useEffect(() => {
    setParser(new UAParser())
  }, [])
  return parser
}

function useIsMobile() {
  // 初始状态使用 false，以保持客户端渲染跟静态（服务端）渲染逻辑的一致
  return useIsMobileWithInitialState(false)
}

export function useIsMobileWithInitialState(initialState: boolean) {
  const [isMobile, setIsMobile] = useState(initialState)

  useEffect(() => {
    function syncIsMobile() {
      setIsMobile(getIsMobile())
    }
    syncIsMobile()
    window.addEventListener('resize', syncIsMobile)
    return () => window.removeEventListener('resize', syncIsMobile)
  }, [])

  return isMobile
}

export function getIsMobile() {
  return (
    typeof window !== 'undefined'
    // 同 utils/style.less `.mobile()` 实现
    && window.matchMedia('(max-width: 767px)').matches
  )
}

function useLoaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.document.readyState === 'complete') {
      setLoaded(true)
      return
    }

    const markLoaded = () => setLoaded(true)
    window.addEventListener('load', markLoaded)
    return () => window.removeEventListener('load', markLoaded)
  }, [])

  return loaded
}

function useIsWx() {
  // 是否是微信环境
  const uaParser = useUaParser()
  const [isWx, setIsWx] = useState(false)

  useEffect(() => {
    if (uaParser.getBrowser().name === 'WeChat') {
      setIsWx(true)
    }
  }, [uaParser])

  return isWx
}

function useIsMp() {
  // 是否是小程序环境
  const uaParser = useUaParser()
  const [isMp, setIsMp] = useState(false)

  useEffect(() => {
    // __wxjs_environment 同步有可能为空，则应该在 WeixinJSBridgeReady 中判断，或者使用 getEnv
    // eslint-disable-next-line no-underscore-dangle
    if ((window as any).__wxjs_environment === 'miniprogram') {
      setIsMp(true)
      return
    }

    const mainVersion = uaParser.getBrowser().version?.split('.')[0] || ''

    // 从微信 [7.0.0] 开始，可以通过判断 [userAgent] 中包含 [miniProgram] 字样来判断小程序 web-view 环境。
    if (+mainVersion >= 7) {
      if (uaParser.getUA().indexOf('miniProgram') > -1) {
        setIsMp(true)
        return
      }
    }

    // UAParser 是通过 micromessenger 关键词来判断是否为微信的，但是有该关键词的不一定就是微信小程序，也有可能是微信内置浏览器
    // 目前安卓企业微信就是用的的 tbs x5 内置浏览器，所以这边增加判断 wx.miniProgram 是否有值
    if (uaParser.getBrowser().name === 'WeChat' && wx.miniProgram) {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          setIsMp(true)
        }
      })
    }
  }, [uaParser])

  return isMp
}
