import { useEffect, useRef } from 'react'

export function useOnChange(handler: () => void, deps: any[]) {
  const firstRef = useRef(true)
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false
      return
    }
    handler()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
