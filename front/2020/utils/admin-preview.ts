import { useEffect, useState, createContext } from 'react'

export const isPreviewContext = createContext(false)

export function usePreviewMessage<T>(key: string) {
  const [data, setData] = useState<T>()

  useEffect(() => {
    function receiveMessage(event: MessageEvent) {
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

      let input
      try {
        input = JSON.parse(event.data)
      } catch (error) {
        return
      }

      if (!(key in input)) {
        return
      }

      const d: T = input[key]

      setData(d)
    }

    window.addEventListener('message', receiveMessage, false)
    window.parent.postMessage(`[${key}] READY`, '*')
    return () => {
      window.removeEventListener('message', receiveMessage, false)
    }
  }, [key])

  return data
}
