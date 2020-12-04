import React from 'react'

import { Column } from 'libs/layout-element'
import Container from 'components/common/Container'
import * as style from './style.m.less'

export default function Main({ children }: React.PropsWithChildren<{}>) {
  return (
    <Container className={style.container}>
      <div className={style.inner}>
        <Column overflow="auto">{children}</Column>
      </div>
    </Container>
  )
}
