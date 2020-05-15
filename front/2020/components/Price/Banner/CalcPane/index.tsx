import React, { PropsWithChildren } from 'react'
import { Pane } from '../Pane'

export * from './PricePaneSection'

export default function CalcPane({ children }: PropsWithChildren<{}>) {
  return (
    <Pane name="calc">{children}</Pane>
  )
}
