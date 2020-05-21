import React, { useRef } from 'react'
import InputNumber from 'components/UI/InputNumber'
import { CalcInput } from '../../../Calculator'

import style from './index.less'

// 动态加速请求次数
export default function DynamicAcc({ onChange }: { onChange(input: CalcInput): void }) {
  const inputRef = useRef<CalcInput>({
    region: 'all',
    items: [
      { name: '动态加速请求数', count: 0 }
    ]
  })

  function handleChange(value: number) {
    inputRef.current.items[0].count = value
    onChange(inputRef.current)
  }

  return (
    <section className={style.area}>
      <div>
        <div className={style.areaTitle}>动态加速请求次数</div>
        <div className={style.areaItem}>
          <InputNumber onChange={handleChange} addonAfter="万次" />
        </div>
      </div>
    </section>
  )
}
