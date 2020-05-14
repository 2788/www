import React, { createContext, ReactNode, useState } from 'react'
import Button from 'components/UI/Button'

import style from './index.less'

export * from './Pane'

export type Active = 'price' | 'calc'

export type BannerContext = {
  active: Active
  setActive(active: Active): void
}

export const BannerContext = createContext<BannerContext>({} as BannerContext)

export type PriceBannerProps = {
  children: ReactNode
}

export default function PriceBanner(props: PriceBannerProps) {
  const { children } = props
  const [active, setActive] = useState<Active>('price')

  return (
    <>
      <div className={style.bannerWrapper}>
        <div className={style.content}>
          <div className={style.actions}>
            <div className={style.title}>价格 | CDN</div>
            <Button className={style.btn}>查看其他产品价格</Button>
          </div>
          <div className={style.navigator}>
            <Button className={style.priceBtn} onClick={() => setActive('price')}>价格文档</Button>
            <Button type="hollow" className={style.calcBtn} onClick={() => setActive('calc')}>价格计算器</Button>
          </div>
        </div>
      </div>
      <BannerContext.Provider value={{ active, setActive }}>{children}</BannerContext.Provider>
    </>
  )
}
