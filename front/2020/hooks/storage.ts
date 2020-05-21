import { useEffect, useState } from 'react'
import { useOnChange } from 'hooks'

export function useLocalStorage<T>(key: string, content?: T) {
  const [value, setValue] = useState(content || null)

  // 初始化和恢复
  useEffect(() => {
    if (content) {
      window.localStorage.setItem(key, JSON.stringify(content))
    } else {
      const previous = window.localStorage.getItem(key)

      if (previous) {
        setValue(JSON.parse(previous))
      }
    }
  }, [content, key])

  // 持久化
  useOnChange(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  // 粗暴的模拟一个自动监听 localStorage 变化的逻辑
  useEffect(() => {
    const i = setInterval(() => {
      const current = window.localStorage.getItem(key)

      // 浅对比 value 和 current
      if (current) {
        setValue(JSON.parse(current))
      }
    }, 300)

    return () => clearInterval(i)
  }, [key])

  return [value, setValue] as const
}
