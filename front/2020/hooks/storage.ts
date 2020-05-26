import { useEffect, useState, useRef } from 'react'
import { useOnChange } from 'hooks'

export function useLocalStorage<T>(key: string, content?: T) {
  const [value, setValue] = useState(content || null)
  // 存一下序列化的结果方便做对比
  const valueStr = useRef<string | null>(null)

  // 初始化和恢复
  useEffect(() => {
    if (content) {
      const str = JSON.stringify(content)
      window.localStorage.setItem(key, str)
      valueStr.current = str
    } else {
      const previous = window.localStorage.getItem(key)
      valueStr.current = previous

      if (previous) {
        setValue(JSON.parse(previous))
      }
    }
  }, [content, key])

  // 持久化
  useOnChange(() => {
    const str = JSON.stringify(value)
    window.localStorage.setItem(key, str)
    valueStr.current = str
  }, [value, key])

  // 粗暴的模拟一个自动监听 localStorage 变化的逻辑
  useEffect(() => {
    const i = setInterval(() => {
      const current = window.localStorage.getItem(key)

      // 浅对比 value 和 current
      if (current && current !== valueStr.current) {
        setValue(JSON.parse(current))
      }
    }, 300)

    return () => clearInterval(i)
  }, [key])

  return [value, setValue] as const
}
