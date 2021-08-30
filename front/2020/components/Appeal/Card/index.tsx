/**
 * @file Card
 */

import React, { ReactNode } from 'react'
import classnames from 'classnames'

import { Card, Title, Content } from 'components/UI/Card'

import style from './style.less'

export interface Props {
  title: string
  children: ReactNode
  className?: string
}

export default function AppealCard({ title, children, className }: Props) {
  return (
    <Card className={classnames(style.card, className)}>
      <Title className={style.title}>{title}</Title>
      <Content className={style.content}>{children}</Content>
    </Card>
  )
}
