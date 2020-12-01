import React from 'react'

import { Container, Column } from 'libs/layout-element'

export default function Main({ children }: React.PropsWithChildren<{}>) {
  return (
    <Container overflow="auto">
      <Container width="calc(100% - 48px)" margin="24px" padding="24px" color="#fff" shrinkWrap>
        <Column overflow="auto">{children}</Column>
      </Container>
    </Container>
  )
}
