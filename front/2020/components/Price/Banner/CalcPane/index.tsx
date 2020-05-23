import React, { useEffect, ReactNode, useContext } from 'react'
import Button from 'components/UI/Button'
import { useSticky } from 'hooks/scroll'

import { Pane } from '../Pane'
import ShoppingCart from './ShoppingCart'

import style from './index.less'
import { BannerContext } from '..'

export type CalcPaneProps = {
  children: ReactNode
  // 是否禁用加入购物车按钮
  disabled?: boolean
  total?: string
  buyLink?: string
  onAdd?(): void
}

export default function CalcPane({ children, disabled, total, buyLink, onAdd }: CalcPaneProps) {
  const { registerPane } = useContext(BannerContext)

  useEffect(() => registerPane('calc'), [registerPane])

  const empty = !total && !buyLink && !onAdd

  // 给 iframe 嵌套进来的页面用
  if (empty) {
    return (
      <Pane name="calc" className={style.wrapper}>
        {children}
      </Pane>
    )
  }

  return (
    <Pane name="calc" className={style.wrapper}>
      <div className={style.content}>
        {children}
        <Footer disabled={disabled} onAdd={onAdd} buyLink={buyLink} total={total} />
      </div>
      <ShoppingCart />
    </Pane>
  )
}

function Footer({ total, buyLink, onAdd, disabled }: Pick<CalcPaneProps, 'total' | 'buyLink' | 'onAdd' | 'disabled'>) {
  const [setElm] = useSticky()

  return (
    <div ref={setElm} className={style.footer}>
      <div className={style.left}>总费用：</div>
      <div className={style.right}>
        <p className={style.price}><span className={style.num}>{total}</span> 元</p>
        <Button type="primary" href={buyLink}>立即购买</Button>
        <Button disabled={disabled} onClick={onAdd} withBorder style={{ marginLeft: '12px' }}>加入预算清单</Button>
      </div>
    </div>
  )
}
