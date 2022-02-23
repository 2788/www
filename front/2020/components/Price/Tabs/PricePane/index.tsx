import React, { PropsWithChildren, useEffect, useContext } from 'react'
import { Pane } from '../Pane'
import { TabsContext } from '..'

export * from './PricePaneSection'
export * from './PricePaneSubSection'

export default function PricePane({ children }: PropsWithChildren<{}>) {
  const { registerPane } = useContext(TabsContext)

  useEffect(() => registerPane('price'), [registerPane])

  return (
    <Pane name="price">{children}</Pane>
  )
}
