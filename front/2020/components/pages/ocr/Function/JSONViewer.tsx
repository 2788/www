/**
 * @file JSON viewer
 */

import React, { useState, useEffect } from 'react'
import { isBrowser } from 'utils'

export type Props = {
  src: object
}

export default function JSONViewer({ src }: Props) {
  const [reactJson, setReactJson] = useState<any>(null)

  useEffect(() => {
    if (!isBrowser()) return
    import('react-json-view').then(
      // 这边把整个 exports 而不是 default export 放到 state 里
      // 是因为 default export 本身是个组件（是个 function），会被 useState
      // 当成是 setState(prevState => nextState) 这样的函数拿去直接调用，然后报错
      res => setReactJson(res)
    )
  }, [])

  if (!reactJson) return null

  const ReactJson = reactJson.default
  return (
    <ReactJson
      name={null}
      iconStyle="triangle"
      // indentWidth={2}
      collapsed={3}
      displayDataTypes={false}
      enableClipboard={false}
      src={src}
    />
  )
}
