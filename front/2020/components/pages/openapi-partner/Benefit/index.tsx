import React, { ReactNode } from 'react'
import { chunk } from 'lodash'

import Section from 'components/Product/Section'
import { Card, Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'

import style from './style.less'

type CardProps = {
  icon: ReactNode
  title: string
}

const benefits: CardProps[] = [
  { icon: <Icon1 />, title: '在云市场售卖产品' },
  { icon: <Icon2 />, title: '七牛云销售支持' },
  { icon: <Icon3 />, title: '可参与市场营销活动' },
  { icon: <Icon4 />, title: '有机会参与七牛云线下活动' }
]

export default function Benefit() {
  return (
    <Section title="您将享受以下权益" name="benefit">
      {
        useMobile() ? <ForMobile data={benefits} /> : <ForPc data={benefits} />
      }
    </Section>
  )
}

function ForPc({ data }: { data: CardProps[] }) {
  return (
    <Row>
      {
        data.map((item, index) => (
          <Card className={style.cardWrapper} key={index}>
            <div className={style.cardIcon}>{item.icon}</div>
            <div className={style.cardTitle}>{item.title}</div>
          </Card>
        ))
      }
    </Row>
  )
}

function ForMobile({ data }: { data: CardProps[] }) {
  return (
    <>
      {
        chunk(data, 2).map((group, index) => (
          <Row key={index} className={style.row}>
            {
              group.map((item, i) => (
                <Card className={style.cardWrapper} key={i}>
                  <div className={style.cardIcon}>{item.icon}</div>
                  <div className={style.cardTitle}>{item.title}</div>
                </Card>
              ))
            }
          </Row>
        ))
      }
    </>
  )
}
