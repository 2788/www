import React, { PropsWithChildren, useEffect, useContext } from 'react'
import { Pane } from '../Pane'
import { BannerContext } from '..'

export * from './PricePaneSection'

export default function PricePane({ children }: PropsWithChildren<{}>) {
  const { registerPane } = useContext(BannerContext)

  useEffect(() => registerPane('price'), [registerPane])

  return (
    <Pane name="price">{children}</Pane>
  )
}
