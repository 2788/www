import React from 'react'
import { chunk } from 'lodash'

import Section from 'components/Product/Section'
import Button from 'components/UI/Button'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card, Row, InvisibleCard } from 'components/UI/Card'

import { Type, CardProps, textMap, typeArr } from '..'
import style from './style.less'

export default function ForPc({ dataMap }: { dataMap: { [k in Type]: Array<CardProps | null> } }) {
  return (
    <Section name="services" title="服务精选">
      <Tabs defaultValue={Type.Image}>
        {
          typeArr.map(type => (
            <TabPane value={type} tab={textMap[type]} key={type}>
              <TabContent data={dataMap[type]} />
            </TabPane>
          ))
        }
      </Tabs>
    </Section >
  )
}

function TabContent({ data }: { data: Array<CardProps | null> }) {
  return (
    <>
      {
        chunk(data, 4).map((group, index) => {
          while (group.length < 4) {
            group.push(null)
          }
          return (
            <Row key={index}>
              {
                group.map((item, i) => (
                  item !== null
                    ? <MyCard {...item} key={i} />
                    : <InvisibleCard className={style.wrapper} />
                ))
              }
            </Row>
          )
        })
      }
    </>
  )
}

function MyCard({ title, icon, desc, href }: CardProps) {
  return (
    <Card className={style.wrapper}>
      <div className={style.icon}>{icon}</div>
      <div className={style.title}>{title}</div>
      <div className={style.desc}>{desc}</div>
      <Button href={href} className={style.btn} type="hollow" withBorder>了解更多</Button>
    </Card>
  )
}
