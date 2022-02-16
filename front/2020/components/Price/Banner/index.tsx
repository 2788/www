import React, { createContext, ReactNode, useState, useEffect, useCallback } from 'react'
import classnames from 'classnames'
import { useQueryValue } from 'hooks/url'
import { useMobile } from 'hooks/ua'

import style from './index.less'

export * from './Pane'

export type Active = 'price' | 'calc'
export type Pane = 'price' | 'calc'

export type BannerContext = {
  panes: Active[]
  registerPane(pane: Pane): void
  active: Active
  setActive(active: Active): void
}

export const BannerContext = createContext<BannerContext>({} as BannerContext)

export type PriceBannerProps = {
  product: string
  children: ReactNode
}

export default function PriceBanner(props: PriceBannerProps) {
  const { children, product } = props
  const [query, setQuery] = useQueryValue<Active>('tab', 'price')
  const [active, setActive] = useState<Active>(query)
  const [panes, setPanes] = useState<Pane[]>([])
  const isMobile = useMobile()

  const registerPane = useCallback((pane: Pane) => {
    setPanes(previous => [...previous, pane])
  }, [])

  useEffect(() => {
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
            <div className={style.title}>{product}</div>
          </div>
          {
            !isMobile && (
              <div className={style.navigator}>
                {panes.indexOf('price') > -1 && <div className={classnames(style.tabBtn, active !== 'price' && style.activeTab)} onClick={() => handleTabClick('price')}>价格文档</div>}
                {panes.indexOf('calc') > -1 && <div className={classnames(style.tabBtn, active !== 'calc' && style.activeTab)} onClick={() => handleTabClick('calc')}>价格计算器</div>}
              </div>
            )
          }
        </div>
      </div>
      <BannerContext.Provider value={{ active, setActive: handleTabClick, panes, registerPane }}>
        {children}
      </BannerContext.Provider>
    </>
  )
}
