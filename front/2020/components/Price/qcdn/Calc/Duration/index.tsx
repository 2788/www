import React from 'react'
import InputNumber from 'components/UI/InputNumber'

import style from './index.less'

export default function Duration({ onChange }: { onChange(duration: number): void }) {
  return (
    <section className={style.area}>
      <div>
        <div className={style.areaTitle}>使用时间</div>
        <div className={style.areaItem}>
          <InputNumber
            showBtns
            min={1}
            defaultValue="1"
            style={{ width: '44px', textAlign: 'center' }}
            onChange={onChange}
          />
          <span style={{ marginLeft: '16px' }}>月</span>
        </div>
      </div>
    </section>
  )
}
