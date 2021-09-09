import React from 'react'
import { chunk } from 'lodash'

import Section from 'components/Product/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Card, Row, InvisibleCard } from 'components/UI/Card'
import Link from 'components/Link'

import { HandpickValue, CardProps } from '..'
import style from './style.less'

export default function ForPc({ data }: { data: HandpickValue }) {
  return (
    <Section name="services" title="服务精选">
      <Tabs defaultValue="内容审核">
        {data.map(({ key, group }) => (
          <TabPane value={key} tab={key} key={key}>
            {group.map(({ title, list }) => (
              <>
                <div className={style.companyWrapper}>
                  <div className={style.prefix} />
                  <div className={style.company}>{title}</div>
                </div>
                <TabContent data={list} />
              </>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </Section >
  )
}

function TabContent({ data }: { data: CardProps[] }) {
  return (
    <>
      {
        chunk(data, 3).map((group, index) => {
          const list: Array<CardProps | null> = group
          while (group.length < 3) {
            list.push(null)
          }
          return (
            <Row key={index} className={style.row}>
              {
                list.map((item, i) => (
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

function MyCard({ title, desc, href }: CardProps) {
  return (
    <Card className={style.wrapper}>
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.desc}>{desc}</div>
      </div>
      <Link href={href} className={style.href}>了解更多 &gt;</Link>
    </Card>
  )
}
