/**
 * @file: 小程序相关
 */

import { useEffect } from 'react'

type WX = {
  miniProgram: {
    navigateTo(options: { url: string }): void
    navigateBack(): void
    reLaunch(options: { url: string }): void
  }
}

declare const wx: WX

export function useWxEffect(create: (wx: WX) => void, deps?: any[]) {
  const jssdkSrc = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'

  useEffect(() => {
    let jssdkScript: HTMLScriptElement | null = document.querySelector(`[src="${jssdkSrc}"]`)

    if (jssdkScript === null) {
      jssdkScript = document.createElement('script')
      jssdkScript.src = jssdkSrc
      document.body.appendChild(jssdkScript)
    }

    const listener = () => create(wx)
    jssdkScript.addEventListener('load', listener)
    return () => jssdkScript?.removeEventListener('load', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [create].concat(deps || []))
}

export function useAliEffect() {
  // TODO
}
