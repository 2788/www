/**
 * @file 官网相关
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { useEffect, useRef, useState } from 'react'

export function useWwwPreviewMessage<T>(key: string, data: T) {
  const [isReady, setIsReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function onReady(event: MessageEvent) {
      if (event.origin === window.location.origin) {
        return
      }

      const { hostname } = new URL(event.origin)
      if (
        ![
          /\.qiniu\.com$/,
          /\.qiniu\.io$/,
          /^localhost$/
        ].some(pattern => pattern.test(hostname))
      ) {
        return
      }

      if (event.data === `[${key}] READY`) {
        setIsReady(true)
      }
    }

    window.addEventListener('message', onReady, false)
    return () => {
      window.removeEventListener('message', onReady, false)
      setIsReady(false)
    }
  }, [key])

  useEffect(() => {
    if (isReady) {
      iframeRef.current!.contentWindow!.postMessage(JSON.stringify({ [key]: data }), '*')
    }
  }, [isReady, key, data])

  return iframeRef
}
