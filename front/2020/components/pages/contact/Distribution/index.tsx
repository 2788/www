import React from 'react'
import Section from 'components/Product/Section'
import { Row, LayoutCard, Img, Desc, Title } from 'components/UI/Card'

import shanghai from './images/shanghai.png'
import beijing from './images/beijing.png'
import chengdu from './images/chengdu.png'
import guangzhou from './images/guangzhou.png'
import hangzhou from './images/hangzhou.png'
import nanjing from './images/nanjing.png'
import shenzhen from './images/shenzhen.png'
import xiamen from './images/xiamen.png'

import style from './index.less'

export default function Distribution() {
  return (
    <Section name="distri" title="公司分布">
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shanghai} />
          <Title className={style.title}>上海总部</Title>
          <Desc className={style.desc}>上海市浦东新区博霞路 66 号上海浦东软件园 Q 座</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={beijing} />
          <Title className={style.title}>北京分部</Title>
          <Desc className={style.desc}>北京市朝阳区太阳宫中路 12 号冠城大厦 1503 室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={hangzhou} />
          <Title className={style.title}>杭州分部</Title>
          <Desc className={style.desc}>浙江省杭州市下城区上塘路 15 号武林时代商务中心 21 楼</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shenzhen} />
          <Title className={style.title}>深圳分部</Title>
          <Desc className={style.desc}>广东省深圳市南山区科发路 19 号华润置地 D 座 1306 室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={guangzhou} />
          <Title className={style.title}>广州分部</Title>
          <Desc className={style.desc}>广东省广州市天河区珠江新城高德置地大厦 A 座 1706B 室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={chengdu} />
          <Title className={style.title}>成都分部</Title>
          <Desc className={style.desc}>四川省成都市高新区希顿国际 C 座 2504 室</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard className={style.card}>
          <Img className={style.image} src={nanjing} />
          <Title className={style.title}>南京分部</Title>
          <Desc className={style.desc}>江苏省南京市雨花区软件大道 106 号极客站</Desc>
        </LayoutCard>
        <LayoutCard className={style.card}>
          <Img className={style.image} src={xiamen} />
          <Title className={style.title}>厦门分部</Title>
          <Desc className={style.desc}>福建省厦门市思明区软件园二期望海路 12 号 3 单元 211 室</Desc>
        </LayoutCard>
      </Row>
    </Section>
  )
}
