import React, { ReactNode } from 'react'
import { Card, Img, Content } from 'components/UI/Card'
import Button from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import titleBg from './title_bg.png'

import style from './style.less'

export interface IDemoCardProps {
  title: ReactNode
  content: ReactNode
  link?: string
}

export default function DemoCard({ title, content, link }: IDemoCardProps) {
  const rootCls = [style.card]

  const isMobile = useMobile()
  rootCls.push(isMobile ? style.mobileDemoCard : style.pcDemoCard)

  const btnProps = {
    type: 'hollow',
    className: style.button,
    size: 'small'
  } as const

  const btnForPC = (
    <Button {...btnProps} withBorder href={link}>
      立即体验
    </Button>
  )

  const btnForMobile = (
    <Button {...btnProps} disabled>
      在 PC 端体验完整 Demo
    </Button>
  )

  return (
    <Card className={rootCls.join(' ')}>
      <Img src={titleBg} className={style.image}>
        {title}
      </Img>
      <Content className={style.content}>{content}</Content>
      {isMobile ? btnForMobile : btnForPC}
    </Card>
  )
}
