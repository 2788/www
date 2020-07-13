import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'
import Line from '../Line'
import TerminalUserIcon from '../icons/media/TerminalUser'

export default function TerminalUser() {
  return (
    <>
      <Positioned top={458} left={938}><Line width={27} /></Positioned>
      <Positioned identity={Node.TerminalUser} top={415} left={1008}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <TerminalUserIcon />
        </svg>
      </Positioned>
    </>
  )
}
