import { useState, useCallback } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggleValue = useCallback(() => {
    setValue(v => !v)
  }, [])
  return [value, toggleValue] as const
}
