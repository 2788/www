import React, { createContext, ReactNode, useState, useLayoutEffect } from 'react'
import classnames from 'classnames'
import Button from 'components/UI/Button'
import { useQueryValue } from 'hooks/url'

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
  const [query, setQuery] = useQueryValue('tab', 'price')

  useLayoutEffect(() => {
    if (query === 'price') {
      setActive('price')
    }

    if (query === 'calc') {
      setActive('calc')
    }
  }, [query])

  function handleTabClick(target: Active) {
    if (target === 'price') {
      setQuery('price')
    }

    if (target === 'calc') {
      setQuery('calc')
    }
  }

  return (
    <>
      <div className={style.bannerWrapper}>
        <div className={style.content}>
          <div className={style.actions}>
            <div className={style.title}>价格 | CDN</div>
            <Button className={style.btn}>查看其他产品价格</Button>
          </div>
          <div className={style.navigator}>
            <Button className={classnames(style.tabBtn, active !== 'price' && style.activeTab)} onClick={() => handleTabClick('price')}>价格文档</Button>
            <Button className={classnames(style.tabBtn, active !== 'calc' && style.activeTab)} onClick={() => handleTabClick('calc')}>价格计算器</Button>
          </div>
        </div>
      </div>
      <BannerContext.Provider value={{ active, setActive: handleTabClick }}>{children}</BannerContext.Provider>
    </>
  )
}
