import React, { PropsWithChildren } from 'react'
import { Pane } from '../Pane'

export * from './PricePaneSection'

export default function PricePane({ children }: PropsWithChildren<{}>) {
  return (
    <Pane name="price">{children}</Pane>
  )
}
